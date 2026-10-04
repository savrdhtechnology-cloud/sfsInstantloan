import { staffSession } from "@/lib/supabase/server";
import { isConfigured } from "@/lib/supabase/config";
import { apiError, sameOrigin } from "@/lib/http";
import { noteSchema, updateSchema } from "@/lib/validation";
export async function GET(request: Request) {
  if (!isConfigured()) return apiError("Database is not connected.", 503);
  try {
    const session = await staffSession();
    if (!session)
      return apiError("Sign in with an authorized staff account.", 401);
    const id = new URL(request.url).searchParams.get("id");
    if (id) {
      if (!/^[\da-f-]{36}$/i.test(id))
        return apiError("Invalid application ID.");
      const { data, error } = await session.db
        .from("activity")
        .select("*")
        .eq("application_id", id)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return Response.json(
        { activity: data },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    const [apps, people] = await Promise.all([
      session.db
        .from("applications")
        .select(
          "id,reference,full_name,phone,email,city,employment,monthly_income,product,amount,tenure,purpose,status,assignee,follow_up_at,created_at,updated_at,disbursement_reference,disbursed_amount",
        )
        .order("created_at", { ascending: false })
        .limit(1000),
      session.db
        .from("staff")
        .select("id,full_name,role,active")
        .eq("active", true),
    ]);
    if (apps.error || people.error) throw apps.error || people.error;
    return Response.json(
      { applications: apps.data, staff: people.data },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return apiError("Unable to load CRM data. Verify the database setup.", 500);
  }
}
export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return apiError("Request origin rejected.", 403);
  if (!isConfigured()) return apiError("Database is not connected.", 503);
  try {
    const session = await staffSession();
    if (!session) return apiError("Staff sign-in required.", 401);
    const raw = await request.text();
    if (raw.length > 5000) return apiError("Request too large.", 413);
    const parsed = updateSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return apiError("Check the application update.");
    const { id, ...updates } = parsed.data;
    if (
      updates.status === "Disbursed" &&
      !["admin", "finance"].includes(session.staff.role)
    )
      return apiError("Only Finance or Admin can verify disbursement.", 403);
    if (
      updates.status === "Disbursed" &&
      (!updates.disbursement_reference || !updates.disbursed_amount)
    )
      return apiError(
        "A verified transaction reference and amount are required.",
      );
    const { data, error } = await session.db
      .from("applications")
      .update(updates)
      .eq("id", id)
      .select("id")
      .single();
    if (error) throw error;
    if (!data) return apiError("Application not available.", 404);
    return Response.json({ ok: true });
  } catch {
    return apiError(
      "Update failed. Check your role, transaction reference and current application state.",
      400,
    );
  }
}
export async function POST(request: Request) {
  if (!sameOrigin(request)) return apiError("Request origin rejected.", 403);
  if (!isConfigured()) return apiError("Database is not connected.", 503);
  try {
    const session = await staffSession();
    if (!session) return apiError("Staff sign-in required.", 401);
    const raw = await request.text();
    if (raw.length > 5000) return apiError("Request too large.", 413);
    const parsed = noteSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return apiError("Enter a note of 1–2000 characters.");
    const { error } = await session.db
      .from("activity")
      .insert({ ...parsed.data, actor_id: session.user.id });
    if (error) throw error;
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return apiError("Could not save the note.", 400);
  }
}
