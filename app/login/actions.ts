"use server";
import { serverClient } from "@/lib/supabase/server";
import { isConfigured } from "@/lib/supabase/config";
import { redirect } from "next/navigation";
export async function signIn(form: FormData) {
  if (!isConfigured())
    return {
      error:
        "Secure login will be available after the Financial Services database is connected.",
    };
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  if (!email || !password) return { error: "Enter your email and password." };
  const db = await serverClient();
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error || !data.user)
    return { error: "Unable to sign in. Check your email and password." };
  const { data: staff } = await db
    .from("staff")
    .select("id")
    .eq("id", data.user.id)
    .eq("active", true)
    .maybeSingle();
  if (!staff) {
    await db.auth.signOut();
    return {
      error:
        "This account does not have CRM access. Contact your administrator.",
    };
  }
  redirect("/crm");
}
export async function signOut() {
  if (isConfigured()) {
    const db = await serverClient();
    await db.auth.signOut();
  }
  redirect("/login");
}
export async function resetPassword(form: FormData) {
  if (!isConfigured())
    return {
      error: "Password reset is available once the database is connected.",
    };
  const email = String(form.get("email") || "").trim();
  if (!email || !email.includes("@"))
    return { error: "Enter your registered email first." };
  const db = await serverClient();
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!site) return { error: "Password reset is not configured." };
  const { error } = await db.auth.resetPasswordForEmail(email, {
    redirectTo: site + "/auth/callback?next=/login/reset",
  });
  if (error)
    return { error: "Unable to request a reset right now. Please try later." };
  return {
    message:
      "If your account exists, a password reset link will be sent to your email.",
  };
}
