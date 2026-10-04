export const products = [
  "Personal Loan",
  "Business Loan",
  "Professional Loan",
  "Loan Against Property",
] as const;
export const statuses = [
  "New",
  "Contacted",
  "Documents Pending",
  "Under Review",
  "Approved",
  "Disbursed",
  "Closed",
] as const;
export type LoanStatus = (typeof statuses)[number];
export function emi(principal: number, annualRate: number, months: number) {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(months) ||
    principal <= 0 ||
    annualRate < 0 ||
    months <= 0
  )
    return 0;
  const rate = annualRate / 1200;
  return rate === 0
    ? principal / months
    : (principal * rate * Math.pow(1 + rate, months)) /
        (Math.pow(1 + rate, months) - 1);
}
export const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
export const compactMoney = (v: number) =>
  v >= 10000000
    ? `₹${(v / 10000000).toFixed(1)} Cr`
    : v >= 100000
      ? `₹${(v / 100000).toFixed(1)} L`
      : money(v);
export type Application = {
  id: string;
  reference: string;
  full_name: string;
  phone: string;
  email: string;
  city: string;
  employment: string;
  monthly_income: number;
  product: string;
  amount: number;
  tenure: number;
  purpose: string;
  status: LoanStatus;
  assignee: string | null;
  follow_up_at: string | null;
  created_at: string;
  updated_at: string;
  disbursement_reference: string | null;
  disbursed_amount: number | null;
};
export type Activity = {
  id: string;
  application_id: string;
  actor_id: string | null;
  body: string;
  created_at: string;
};
export type Staff = {
  id: string;
  full_name: string;
  role: "admin" | "manager" | "agent" | "finance";
  active: boolean;
};
