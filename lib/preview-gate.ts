// "Próximamente" wall: while the site is being built, only people holding an
// access code can see it. Everyone else lands on /proximamente.
//
// Runs in middleware (Edge runtime), so this uses Web Crypto instead of the
// Node `crypto` module that admin-auth.ts relies on.
//
// PREVIEW_CODES is a comma-separated list, one code per person or team, so a
// single code can be revoked without kicking everyone out. Each session cookie
// is signed with the code that opened it: removing a code from the list
// invalidates every session it created.
//
// The wall is on by default. Set SITE_PUBLIC=true to take it down at launch.

export const PREVIEW_COOKIE = 'vitanoin_preview'
export const PREVIEW_DAYS = 30

export function isSitePublic() {
  return process.env.SITE_PUBLIC === 'true'
}

function previewCodes() {
  return (process.env.PREVIEW_CODES ?? '')
    .split(',')
    .map((code) => code.trim())
    .filter(Boolean)
}

/** Codes are matched case-insensitively so "Vitanoin2026" and "VITANOIN2026"
 *  both work when typed on a phone. */
function normalize(code: string) {
  return code.trim().toLowerCase()
}

async function sign(key: string, payload: string) {
  const enc = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(normalize(key)),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(payload))
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('')
}

/** Compare without leaking the answer through response timing. */
function safeEquals(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

/** Returns the matching configured code, or null. */
export function matchCode(input: string) {
  const wanted = normalize(input)
  if (!wanted) return null
  return previewCodes().find((code) => safeEquals(normalize(code), wanted)) ?? null
}

export async function createPreviewToken(code: string) {
  const expiresAt = String(Date.now() + PREVIEW_DAYS * 24 * 60 * 60 * 1000)
  return `${expiresAt}.${await sign(code, expiresAt)}`
}

export async function isValidPreviewToken(token: string | undefined) {
  if (!token) return false

  const [expiresAt, signature] = token.split('.')
  if (!expiresAt || !signature) return false

  const expiry = Number(expiresAt)
  if (!Number.isFinite(expiry) || expiry <= Date.now()) return false

  for (const code of previewCodes()) {
    if (safeEquals(signature, await sign(code, expiresAt))) return true
  }
  return false
}

/** Only same-site paths, so the code form can't be used as an open redirect. */
export function safeNextPath(next: unknown) {
  if (typeof next !== 'string' || !next.startsWith('/') || next.startsWith('//')) return '/'
  if (next.startsWith('/proximamente')) return '/'
  return next
}
