import { serverClient } from "@/lib/supabase/server";
import { isConfigured } from "@/lib/supabase/config";
import { redirect } from "next/navigation";
import { Brand } from "@/components/brand";
async function update(form: FormData) {
  "use server";
  if (!isConfigured()) redirect("/login");
  const password = String(form.get("password") || "");
  if (password.length < 12) redirect("/login/reset?error=length");
  const db = await serverClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");
  const { error } = await db.auth.updateUser({ password });
  if (error) redirect("/login/reset?error=failed");
  await db.auth.signOut();
  redirect("/login");
}
export default async function Reset({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  if (!isConfigured()) redirect("/login");
  const db = await serverClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");
  return (
    <main className="track-container form-card">
      <Brand />
      <h1 className="form-title" style={{ marginTop: 30 }}>
        Choose a new password
      </h1>
      <p className="form-subtitle">
        Use at least 12 characters. You’ll sign in again after updating.
      </p>
      {q.error ? (
        <div className="notice error">
          Password update failed. Use at least 12 characters and try again.
        </div>
      ) : null}
      <form action={update}>
        <label className="field">
          New password
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            required
            minLength={12}
          />
        </label>
        <button className="button button-dark" style={{ marginTop: 20 }}>
          Update password
        </button>
      </form>
    </main>
  );
}
