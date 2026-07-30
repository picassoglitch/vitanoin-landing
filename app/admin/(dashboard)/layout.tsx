import { redirect } from 'next/navigation'
import { hasValidSession } from '@/lib/admin-auth'

// Guards every route in this group. The login page sits outside the group so
// it stays reachable.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!(await hasValidSession())) redirect('/admin/login')
  return <>{children}</>
}
