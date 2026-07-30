// TEMPORARY diagnostic. Reports whether the Supabase env vars are visible to
// the running deployment. Returns names and booleans only -- never any value.
// Delete this route once the configuration is confirmed.

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return Response.json({
    supabaseUrlSet: Boolean(url),
    supabaseKeySet: Boolean(key),
    urlLength: url?.length ?? 0,
    keyLength: key?.length ?? 0,
    // Names only, so a typo or wrong prefix is visible without leaking secrets.
    matchingEnvNames: Object.keys(process.env)
      .filter((name) => /supabase/i.test(name))
      .sort(),
    vercelEnv: process.env.VERCEL_ENV ?? null,
  })
}
