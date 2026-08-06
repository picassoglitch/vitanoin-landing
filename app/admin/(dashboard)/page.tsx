import { PAGE_SIZE, TARGET_WINNERS, filtersToQuery, parseFilters } from '@/lib/applicant-fields'
import { fetchApplicants, fetchCounts } from '@/lib/applicants'
import { FiltersForm } from './filters'
import { logout, setStatus, setStatusForFiltered } from './actions'

export const metadata = {
  title: 'Registros | The Vitanoin Collective',
  robots: { index: false, follow: false },
}

// Applicant data changes as people register, so never serve this from cache.
export const dynamic = 'force-dynamic'

const number = (value: number) => value.toLocaleString('es-MX')

const STATUS_STYLES: Record<string, string> = {
  pendiente: 'bg-slate-100 text-slate-600',
  seleccionada: 'bg-emerald-100 text-emerald-700',
  descartada: 'bg-rose-100 text-rose-700',
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-[#002B66] mt-1">{value}</p>
      {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
    </div>
  )
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const filters = parseFilters(params)

  const [{ rows, total, page, pageCount, error }, counts] = await Promise.all([
    fetchApplicants(filters),
    fetchCounts(),
  ])

  const query = filtersToQuery(filters)
  const exportHref = `/api/admin/export${query ? `?${query}` : ''}`
  const remaining = TARGET_WINNERS - counts.seleccionada
  const firstRow = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const lastRow = Math.min(page * PAGE_SIZE, total)

  const pageHref = (target: number) =>
    `/admin?${filtersToQuery({ ...filters, page: target })}`

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-800">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-lg font-bold text-[#002B66]">LABORATORIOS PANALAB</span>
            <span className="ml-3 text-sm text-slate-500">Registros · The Vitanoin Collective</span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-semibold text-slate-600 border border-slate-200 px-4 py-2 rounded-md hover:bg-slate-50 transition"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-6">
        {error && (
          <div className="bg-rose-50 text-rose-700 p-4 rounded-md text-sm border border-rose-200">
            {error}
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Registros totales" value={number(counts.total)} />
          <Stat
            label="Seleccionadas"
            value={`${number(counts.seleccionada)} / ${number(TARGET_WINNERS)}`}
            hint={
              remaining > 0
                ? `Faltan ${number(remaining)}`
                : remaining === 0
                  ? 'Cupo completo'
                  : `${number(Math.abs(remaining))} por encima del cupo`
            }
          />
          <Stat label="Pendientes" value={number(counts.pendiente)} />
          <Stat label="Descartadas" value={number(counts.descartada)} />
        </section>

        <FiltersForm filters={filters} />

        <section className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            {total === 0
              ? 'Sin resultados con estos filtros.'
              : `Mostrando ${number(firstRow)}–${number(lastRow)} de ${number(total)} registros filtrados.`}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={exportHref}
              className="bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Exportar a Excel ({number(total)})
            </a>

            {total > 0 && (
              <>
                <form action={setStatusForFiltered}>
                  <input type="hidden" name="query" value={query} />
                  <input type="hidden" name="status" value="seleccionada" />
                  <button
                    type="submit"
                    className="text-sm font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 px-4 py-2 rounded-md hover:bg-emerald-100 transition"
                  >
                    Seleccionar las {number(total)} filtradas
                  </button>
                </form>
                <form action={setStatusForFiltered}>
                  <input type="hidden" name="query" value={query} />
                  <input type="hidden" name="status" value="pendiente" />
                  <button
                    type="submit"
                    className="text-sm font-semibold text-slate-600 border border-slate-200 px-4 py-2 rounded-md hover:bg-slate-50 transition"
                  >
                    Marcar como pendientes
                  </button>
                </form>
              </>
            )}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[1100px]">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {[
                  'Estado',
                  'Nombre',
                  'Instagram',
                  'TikTok',
                  'Seguidores',
                  'Engagement',
                  'Views prom.',
                  'Categoría',
                  'Ciudad',
                  'Contacto',
                  'Acciones',
                ].map((heading) => (
                  <th key={heading} className="text-left font-semibold px-3 py-2 whitespace-nowrap">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100 align-top">
                  <td className="px-3 py-2">
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${STATUS_STYLES[row.status] ?? ''}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="font-semibold text-[#002B66]">{row.full_name}</span>
                    <span className="block text-xs text-slate-400">
                      {new Date(row.created_at).toLocaleDateString('es-MX')}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <a
                      href={row.instagram_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:underline"
                    >
                      {row.instagram_handle}
                    </a>
                  </td>
                  <td className="px-3 py-2">
                    {row.tiktok_link ? (
                      <a
                        href={row.tiktok_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:underline"
                      >
                        {row.tiktok_handle ?? 'TikTok'}
                      </a>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 tabular-nums">{number(row.follower_count)}</td>
                  <td className="px-3 py-2 tabular-nums">
                    {row.engagement_rate === null ? '—' : `${row.engagement_rate}%`}
                  </td>
                  <td className="px-3 py-2 tabular-nums">
                    {row.avg_reel_views ? number(row.avg_reel_views) : '—'}
                  </td>
                  <td className="px-3 py-2">{row.primary_category}</td>
                  <td className="px-3 py-2">{row.city_state}</td>
                  <td className="px-3 py-2 text-xs">
                    <span className="block">{row.email}</span>
                    <span className="block text-slate-500">{row.phone}</span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      {row.status !== 'seleccionada' && (
                        <form action={setStatus}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="status" value="seleccionada" />
                          <button
                            type="submit"
                            title="Seleccionar"
                            className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded hover:bg-emerald-100 transition"
                          >
                            Seleccionar
                          </button>
                        </form>
                      )}
                      {row.status !== 'descartada' && (
                        <form action={setStatus}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="status" value="descartada" />
                          <button
                            type="submit"
                            title="Descartar"
                            className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1 rounded hover:bg-rose-100 transition"
                          >
                            Descartar
                          </button>
                        </form>
                      )}
                      {row.status !== 'pendiente' && (
                        <form action={setStatus}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="status" value="pendiente" />
                          <button
                            type="submit"
                            title="Volver a pendiente"
                            className="text-xs font-semibold text-slate-600 border border-slate-200 px-2 py-1 rounded hover:bg-slate-50 transition"
                          >
                            Pendiente
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-3 py-8 text-center text-slate-400">
                    No hay registros que coincidan con los filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {pageCount > 1 && (
          <nav className="flex items-center justify-between text-sm">
            {page > 1 ? (
              <a href={pageHref(page - 1)} className="text-sky-600 font-semibold hover:underline">
                ← Anterior
              </a>
            ) : (
              <span />
            )}
            <span className="text-slate-500">
              Página {number(page)} de {number(pageCount)}
            </span>
            {page < pageCount ? (
              <a href={pageHref(page + 1)} className="text-sky-600 font-semibold hover:underline">
                Siguiente →
              </a>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </main>
  )
}
