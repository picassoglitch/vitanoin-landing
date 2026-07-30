import { redirect } from 'next/navigation'
import { hasValidSession } from '@/lib/admin-auth'
import { login } from './actions'

export const metadata = {
  title: 'Acceso administrador | The Vitanoin Collective',
  robots: { index: false, follow: false },
}

const MESSAGES: Record<string, string> = {
  invalid: 'Contraseña incorrecta.',
  config: 'Falta configurar ADMIN_PASSWORD en el servidor.',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  if (await hasValidSession()) redirect('/admin')

  const { error } = await searchParams
  const message = error ? MESSAGES[error] ?? 'No pudimos iniciar sesión.' : null

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-2">
          The Vitanoin Collective
        </p>
        <h1 className="text-2xl font-bold text-[#002B66] mb-1">Panel de administración</h1>
        <p className="text-sm text-slate-500 mb-6">Acceso restringido al equipo de Panalab.</p>

        {message && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-md text-xs border border-rose-200 mb-4">
            {message}
          </div>
        )}

        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-slate-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#002B66] text-white font-semibold py-2.5 rounded-md hover:bg-blue-900 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}
