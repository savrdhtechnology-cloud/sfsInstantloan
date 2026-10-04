import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
const ids = {
  admin: "11111111-1111-4111-8111-111111111111",
  agent: "22222222-2222-4222-8222-222222222222",
  finance: "33333333-3333-4333-8333-333333333333",
  outsider: "44444444-4444-4444-8444-444444444444",
};
test("database intake, RLS, finance verification and immutable audit flow", async () => {
  const db = new PGlite();
  await db.exec(
    `create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to authenticated,service_role;grant execute on function auth.uid() to authenticated,service_role;`,
  );
  await db.exec(
    await readFile(
      new URL("../database/bootstrap.sql", import.meta.url),
      "utf8",
    ),
  );
  for (const [id, uuid] of Object.entries(ids)) {
    await db.query("insert into auth.users(id) values($1)", [uuid]);
    if (id !== "outsider")
      await db.query(
        "insert into public.staff(id,full_name,role) values($1,$2,$3)",
        [uuid, id, id],
      );
  }
  async function as(role, id = "") {
    await db.exec("reset role");
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id]);
    await db.exec(`set role ${role}`);
  }
  const payload = {
    request_id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    reference: "SIL-2026-A123456789",
    tracking_hash: "abc",
    ip_hash: "test-ip",
    full_name: "QA Test",
    phone: "9000000001",
    email: "qa@example.invalid",
    city: "Bhopal",
    employment: "Salaried",
    monthly_income: 50000,
    product: "Personal Loan",
    amount: 300000,
    tenure: 36,
    purpose: "Test",
    consent: true,
  };
  await as("service_role");
  let res = await db.query(
    "select public.submit_application($1::jsonb) as result",
    [JSON.stringify(payload)],
  );
  assert.equal(res.rows[0].result.reference, payload.reference);
  res = await db.query(
    "select public.submit_application($1::jsonb) as result",
    [JSON.stringify(payload)],
  );
  assert.equal(
    res.rows[0].result.reference,
    payload.reference,
    "retry is idempotent",
  );
  await assert.rejects(
    db.query("select public.submit_application($1::jsonb)", [
      JSON.stringify({
        ...payload,
        request_id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
      }),
    ]),
    /DUPLICATE/,
  );
  const app = (await db.query("select id from public.applications")).rows[0].id;
  await as("anon");
  await assert.rejects(
    db.query("select id from public.applications"),
    /permission denied/,
  );
  await assert.rejects(
    db.query("select public.submit_application($1::jsonb)", [
      JSON.stringify(payload),
    ]),
    /permission denied/,
  );
  await as("authenticated", ids.outsider);
  assert.equal(
    (await db.query("select id from public.applications")).rows.length,
    0,
  );
  await as("authenticated", ids.agent);
  assert.equal(
    (await db.query("select id from public.applications")).rows.length,
    0,
  );
  await as("authenticated", ids.admin);
  await db.query("update public.applications set assignee=$1 where id=$2", [
    ids.agent,
    app,
  ]);
  await as("authenticated", ids.agent);
  assert.equal(
    (await db.query("select id from public.applications")).rows.length,
    1,
  );
  await db.query(
    "update public.applications set status='Contacted' where id=$1",
    [app],
  );
  await assert.rejects(
    db.query(
      "update public.applications set status='Disbursed',disbursement_reference='TX1',disbursed_amount=250000 where id=$1",
      [app],
    ),
    /FINANCE_REQUIRED/,
  );
  await assert.rejects(
    db.query("select tracking_hash from public.applications"),
    /permission denied/,
  );
  await as("authenticated", ids.finance);
  await assert.rejects(
    db.query("update public.applications set status='Disbursed' where id=$1", [
      app,
    ]),
    /disbursement_evidence/,
  );
  await db.query(
    "update public.applications set status='Disbursed',disbursement_reference='TX1',disbursed_amount=250000 where id=$1",
    [app],
  );
  await assert.rejects(
    db.query("update public.applications set status='New' where id=$1", [app]),
    /VERIFIED_RECORD_IMMUTABLE/,
  );
  const notes = (
    await db.query("select body from public.activity where application_id=$1", [
      app,
    ])
  ).rows;
  assert.ok(notes.some((n) => n.body.includes("Contacted to Disbursed")));
  assert.ok(notes.some((n) => n.body.includes("Assignment updated")));
  await db.close();
});
