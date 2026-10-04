import { ApplicationForm } from "@/components/application-form";
import { acceptsApplications } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";
export const metadata = { title: "Start your application" };
export default async function Apply({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  const product = "Personal Loan";
  const amount = Math.min(300000, Math.max(5000, Number(q.amount) || 75000));
  const tenure = Math.min(60, Math.max(3, Number(q.tenure) || 18));
  return (
    <ApplicationForm
      connected={acceptsApplications()}
      initialProduct={product}
      initialAmount={amount}
      initialTenure={tenure}
    />
  );
}
