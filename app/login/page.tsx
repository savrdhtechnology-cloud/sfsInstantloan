import { LoginForm } from "@/components/login-form";
import { isConfigured } from "@/lib/supabase/config";
export const dynamic = "force-dynamic";
export const metadata = { title: "Team sign in" };
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  return (
    <LoginForm configured={isConfigured()} expired={q.error === "expired"} />
  );
}
