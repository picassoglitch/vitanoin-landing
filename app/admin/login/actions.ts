'use server'

import { redirect } from 'next/navigation'
import { isAdminConfigured, startSession, verifyPassword } from '@/lib/admin-auth'

export async function login(formData: FormData) {
  if (!isAdminConfigured()) {
    redirect('/admin/login?error=config')
  }

  const password = (formData.get('password') as string) ?? ''
  if (!verifyPassword(password)) {
    // Deliberately vague: never reveal whether the account or the password was
    // the problem, and never echo the submitted value back to the page.
    redirect('/admin/login?error=invalid')
  }

  await startSession()
  redirect('/admin')
}
