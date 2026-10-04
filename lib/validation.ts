import { z } from "zod";
import { products, statuses } from "./finance";
export const applicationSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email().max(254),
  city: z.string().trim().min(2).max(100),
  employment: z.enum([
    "Salaried",
    "Self-employed",
    "Business owner",
    "Professional",
    "Other",
  ]),
  monthly_income: z.coerce.number().min(0).max(100000000),
  product: z.enum(products),
  amount: z.coerce.number().min(25000).max(100000000),
  tenure: z.coerce.number().int().min(6).max(240),
  purpose: z.string().trim().max(1000).default(""),
  consent: z.literal(true),
  website: z.string().max(0).default(""),
  request_id: z.string().uuid(),
});
export const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(statuses),
  assignee: z.string().uuid().nullable(),
  follow_up_at: z.string().datetime().nullable(),
  disbursement_reference: z.string().trim().max(120).nullable(),
  disbursed_amount: z.coerce.number().positive().max(100000000).nullable(),
});
export const noteSchema = z.object({
  application_id: z.string().uuid(),
  body: z.string().trim().min(1).max(2000),
});
