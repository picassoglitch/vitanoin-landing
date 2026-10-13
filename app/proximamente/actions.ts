'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  PREVIEW_COOKIE,
  PREVIEW_DAYS,
  createPreviewToken,
  matchCode,
  safeNextPath,
} from '@/lib/preview-gate'

export async function unlock(formData: FormData) {
  const next = safeNextPath(formData.get('next'))
  const code = matchCode((formData.get('code') as string) ?? '')

  if (!code) {
    // Never echo the submitted value back to the page.
    const params = new URLSearchParams({ error: '1' })
    if (next !== '/') params.set('next', next)
    redirect(`/proximamente?${params}`)
  }

  const store = await cookies()
  store.set(PREVIEW_COOKIE, await createPreviewToken(code), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: PREVIEW_DAYS * 24 * 60 * 60,
  })
  redirect(next)
}
