import "server-only";

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const url = new URL(request.url);
  // Next.js may normalize request.url to its internal hostname. The Host header
  // retains the browser-facing host, including Preview domains and local ports.
  const host = request.headers.get("host") || url.host;
  const protocol =
    request.headers.get("x-forwarded-proto")?.split(",")[0].trim() ||
    url.protocol.slice(0, -1);
  if (protocol !== "http" && protocol !== "https") return false;
  try {
    return new URL(origin).origin === `${protocol}://${host}`;
  } catch {
    return false;
  }
}
export function apiError(message: string, status = 400) {
  return Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
