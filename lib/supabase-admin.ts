import 'server-only'
import { createClient } from '@supabase/supabase-js'

// The service role key bypasses Row Level Security, so this client must never
// reach the browser. The 'server-only' import above turns an accidental client
// import into a build error rather than a leaked key.
export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
