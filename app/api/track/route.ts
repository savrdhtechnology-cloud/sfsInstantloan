import { createHash } from "node:crypto";
import { adminClient } from "@/lib/supabase/server";
import { acceptsApplications } from "@/lib/supabase/config";
import { sameOrigin, apiError } from "@/lib/http";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return apiError("Request origin rejected.", 403);
  if (!acceptsApplications())
    return apiError(
      "Tracking is being connected. Call 8109995906 for assistance.",
      503,
    );
  try {
    const raw = await request.text();
    if (raw.length > 1000) return apiError("Invalid request.");
    const { reference, code } = JSON.parse(raw);
    if (
      typeof reference !== "string" ||
      !/^SIL-\d{4}-[A-F0-9]{10}$/.test(reference) ||
      typeof code !== "string" ||
      !/^[a-f0-9]{64}$/.test(code)
    )
      return apiError("Check your reference and private tracking code.");
    const hash = createHash("sha256").update(code).digest("hex");
    const { data, error } = await adminClient()
      .from("applications")
      .select("reference,product,amount,status,created_at,updated_at")
      .eq("reference", reference)
      .eq("tracking_hash", hash)
      .maybeSingle();
    if (error) throw error;
    if (!data)
      return apiError(
        "Application not found. Check both details and try again.",
        404,
      );
    return Response.json(
      { application: data },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return apiError(
      "Unable to check application status. Try again later.",
      500,
    );
  }
}
