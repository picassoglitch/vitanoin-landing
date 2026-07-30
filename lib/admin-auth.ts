import 'server-only'
import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'vitanoin_admin'
const SESSION_HOURS = 8

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? ''
}

export function isAdminConfigured() {
  return adminPassword().length > 0
}

/** Compare without leaking the answer through response timing. */
function safeEquals(a: string, b: string) {
  const bufA = Buffer.from(a, 'utf8')
  const bufB = Buffer.from(b, 'utf8')
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function verifyPassword(input: string) {
  const expected = adminPassword()
  if (!expected) return false
  return safeEquals(input, expected)
}

// The session token is just a signed expiry. Signing with the password means
// changing the password invalidates every existing session.
function sign(payload: string) {
  return createHmac('sha256', adminPassword()).update(payload).digest('hex')
}

function createToken() {
  const expiresAt = String(Date.now() + SESSION_HOURS * 60 * 60 * 1000)
  return `${expiresAt}.${sign(expiresAt)}`
}

function isValidToken(token: string | undefined) {
  if (!token || !isAdminConfigured()) return false

  const [expiresAt, signature] = token.split('.')
  if (!expiresAt || !signature) return false
  if (!safeEquals(signature, sign(expiresAt))) return false

  const expiry = Number(expiresAt)
  return Number.isFinite(expiry) && expiry > Date.now()
}

export async function startSession() {
  const store = await cookies()
  store.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_HOURS * 60 * 60,
  })
}

export async function endSession() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function hasValidSession() {
  const store = await cookies()
  return isValidToken(store.get(COOKIE_NAME)?.value)
}
