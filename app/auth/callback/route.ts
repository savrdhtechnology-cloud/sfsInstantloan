import { NextResponse } from "next/server";
import { serverClient } from "@/lib/supabase/server";
import { isConfigured } from "@/lib/supabase/config";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next =
    url.searchParams.get("next") === "/login/reset" ? "/login/reset" : "/crm";
  if (code && isConfigured()) {
    const db = await serverClient();
    const { error } = await db.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }
  return NextResponse.redirect(new URL("/login?error=expired", url.origin));
}
