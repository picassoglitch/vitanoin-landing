import { NextResponse, type NextRequest } from 'next/server'
import { PREVIEW_COOKIE, isSitePublic, isValidPreviewToken } from './lib/preview-gate'

// Sends anyone without a preview session to the "próximamente" wall.
// /admin keeps working behind its own password so the team can still review
// applications.
const ALWAYS_OPEN = ['/proximamente', '/admin', '/api/admin']

export async function middleware(request: NextRequest) {
  if (isSitePublic()) return NextResponse.next()

  const { pathname, search } = request.nextUrl
  if (ALWAYS_OPEN.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.next()
  }

  if (await isValidPreviewToken(request.cookies.get(PREVIEW_COOKIE)?.value)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = '/proximamente'
  url.search = pathname === '/' && !search ? '' : `?next=${encodeURIComponent(pathname + search)}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals and anything that looks like a static file, so the
  // wall itself can load its logo, product shot and fonts.
  matcher: ['/((?!_next/static|_next/image|images/|favicon.ico|.*\\.[a-z0-9]+$).*)'],
}
