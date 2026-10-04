import { ApplicationForm } from "@/components/application-form";
import { acceptsApplications } from "@/lib/supabase/config";
import { products } from "@/lib/finance";
export const dynamic = "force-dynamic";
export const metadata = { title: "Start your application" };
export default async function Apply({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  const product = products.find((p) => p === q.product) || "Personal Loan";
  const amount = Math.min(
    100000000,
    Math.max(25000, Number(q.amount) || 300000),
  );
  const tenure = Math.min(240, Math.max(6, Number(q.tenure) || 36));
  return (
    <ApplicationForm
      connected={acceptsApplications()}
      initialProduct={product}
      initialAmount={amount}
      initialTenure={tenure}
    />
  );
}
