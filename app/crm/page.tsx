import { CRM } from "@/components/crm";
import { staffSession } from "@/lib/supabase/server";
import { isConfigured } from "@/lib/supabase/config";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Team workspace",
  robots: { index: false, follow: false },
};
export default async function Workspace({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  const configured = isConfigured();
  if (!configured)
    return <CRM connected={false} user={null} view={q.view || "overview"} />;
  const session = await staffSession();
  if (!session) redirect("/login");
  return <CRM connected user={session.staff} view={q.view || "overview"} />;
}
