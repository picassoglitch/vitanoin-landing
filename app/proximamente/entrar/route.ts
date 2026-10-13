import { NextResponse, type NextRequest } from 'next/server'
import {
  PREVIEW_COOKIE,
  PREVIEW_DAYS,
  createPreviewToken,
  matchCode,
  safeNextPath,
} from '@/lib/preview-gate'

// A plain form POST rather than a server action: server action IDs change on
// every build, so a wall page left open across a deploy would fail to unlock.
export async function POST(request: NextRequest) {
  const form = await request.formData()
  const next = safeNextPath(form.get('next'))
  const code = matchCode((form.get('code') as string) ?? '')

  if (!code) {
    // Never echo the submitted value back to the page.
    const url = new URL('/proximamente', request.url)
    url.searchParams.set('error', '1')
    if (next !== '/') url.searchParams.set('next', next)
    return NextResponse.redirect(url, 303)
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303)
  response.cookies.set(PREVIEW_COOKIE, await createPreviewToken(code), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: PREVIEW_DAYS * 24 * 60 * 60,
  })
  return response
}
