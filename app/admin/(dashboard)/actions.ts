'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { endSession, hasValidSession } from '@/lib/admin-auth'
import { getAdminClient } from '@/lib/supabase-admin'
import { STATUSES, type Status, parseFilters } from '@/lib/applicant-fields'
import { fetchAllFiltered } from '@/lib/applicants'

async function requireSession() {
  if (!(await hasValidSession())) redirect('/admin/login')
}

export async function setStatus(formData: FormData) {
  await requireSession()

  const id = formData.get('id') as string
  const status = formData.get('status') as Status
  if (!id || !(STATUSES as readonly string[]).includes(status)) return

  const supabase = getAdminClient()
  if (!supabase) return

  const { error } = await supabase
    .from('vitanoin_applicants')
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq('id', id)

  if (error) console.error('Failed to update status:', error)
  revalidatePath('/admin')
}

/** Apply a status to every row matching the current filters. */
export async function setStatusForFiltered(formData: FormData) {
  await requireSession()

  const status = formData.get('status') as Status
  if (!(STATUSES as readonly string[]).includes(status)) return

  const supabase = getAdminClient()
  if (!supabase) return

  const params = Object.fromEntries(new URLSearchParams((formData.get('query') as string) ?? ''))
  const rows = await fetchAllFiltered(parseFilters(params))
  if (rows.length === 0) return

  // Chunked so a large selection stays under the URL length limit PostgREST
  // applies to `in` filters.
  const chunk = 200
  for (let i = 0; i < rows.length; i += chunk) {
    const ids = rows.slice(i, i + chunk).map((row) => row.id)
    const { error } = await supabase
      .from('vitanoin_applicants')
      .update({ status, reviewed_at: new Date().toISOString() })
      .in('id', ids)
    if (error) {
      console.error('Bulk status update failed:', error)
      break
    }
  }

  revalidatePath('/admin')
}

export async function logout() {
  await endSession()
  redirect('/admin/login')
}
