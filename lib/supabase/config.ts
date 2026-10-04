export function publicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Database connection is not configured.");
  return { url, key };
}
export function isConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
export function acceptsApplications() {
  return (
    isConfigured() &&
    Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.APPLICATION_HASH_SECRET,
    )
  );
}
