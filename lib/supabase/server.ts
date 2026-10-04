import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { publicConfig } from "./config";
export async function serverClient() {
  const { url, key } = publicConfig();
  const jar = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return jar.getAll();
      },
      setAll(values) {
        try {
          values.forEach(({ name, value, options }) =>
            jar.set(name, value, options),
          );
        } catch {
          /* Server components cannot write cookies. Proxy refreshes them. */
        }
      },
    },
  });
}
export function adminClient() {
  const { url } = publicConfig();
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Application intake is not configured.");
  return createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
export async function staffSession() {
  const db = await serverClient();
  const {
    data: { user },
    error,
  } = await db.auth.getUser();
  if (error || !user) return null;
  const { data: staff, error: staffError } = await db
    .from("staff")
    .select("id,full_name,role,active")
    .eq("id", user.id)
    .eq("active", true)
    .maybeSingle();
  if (staffError || !staff) return null;
  return { db, user, staff };
}
