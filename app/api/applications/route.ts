import { createHmac, randomBytes, createHash } from "node:crypto";
import { applicationSchema } from "@/lib/validation";
import { adminClient } from "@/lib/supabase/server";
import { acceptsApplications } from "@/lib/supabase/config";
import { sameOrigin, apiError } from "@/lib/http";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return apiError("Request origin rejected.", 403);
  if (!acceptsApplications())
    return apiError(
      "Online applications are being connected. Please call 8109995906 for assistance.",
      503,
    );
  try {
    const raw = await request.text();
    if (raw.length > 10000) return apiError("Request too large.", 413);
    const parsed = applicationSchema.safeParse(JSON.parse(raw));
    if (!parsed.success)
      return apiError(parsed.error.issues[0]?.message || "Check your details.");
    const data = parsed.data;
    const secret = process.env.APPLICATION_HASH_SECRET!;
    const token = createHmac("sha256", secret)
      .update(`track:${data.request_id}`)
      .digest("hex");
    const trackingHash = createHash("sha256").update(token).digest("hex");
    const ip =
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const fingerprint = createHmac("sha256", secret).update(ip).digest("hex");
    const reference =
      "SIL-" +
      new Date().getUTCFullYear() +
      "-" +
      randomBytes(5).toString("hex").toUpperCase();
    const { data: result, error } = await adminClient().rpc(
      "submit_application",
      {
        payload: {
          ...data,
          reference,
          tracking_hash: trackingHash,
          ip_hash: fingerprint,
        },
      },
    );
    if (error) {
      if (error.message.includes("RATE_LIMIT"))
        return apiError(
          "Too many requests. Please try again later or call 8109995906.",
          429,
        );
      if (error.message.includes("DUPLICATE"))
        return apiError(
          "An active application already exists for this mobile number. Use your tracking details or call 8109995906.",
          409,
        );
      throw error;
    }
    return Response.json(
      { reference: result.reference, tracking_code: token },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return apiError(
      "We could not save your application. Please try again or call 8109995906.",
      500,
    );
  }
}
