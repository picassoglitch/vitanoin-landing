import writeXlsxFile from 'write-excel-file/node'
import { hasValidSession } from '@/lib/admin-auth'
import { parseFilters, type Applicant } from '@/lib/applicant-fields'
import { fetchAllFiltered } from '@/lib/applicants'

export const dynamic = 'force-dynamic'

const HEADER = { fontWeight: 'bold', backgroundColor: '#E2E8F0', align: 'left' } as const

const text = (name: string, width: number, read: (row: Applicant) => string | null) => ({
  width,
  header: { value: name, ...HEADER },
  cell: (row: Applicant) => ({ value: read(row) ?? '', type: String }),
})

// Numbers keep their type so Excel can sort, filter and total the columns.
const numeric = (
  name: string,
  width: number,
  read: (row: Applicant) => number | null,
  format: string,
) => ({
  width,
  header: { value: name, ...HEADER },
  cell: (row: Applicant) => {
    const value = read(row)
    return value === null || value === undefined ? null : { value, type: Number, format }
  },
})

const dateTime = (value: string | null) => (value ? new Date(value).toLocaleString('es-MX') : null)

const COLUMNS = [
  text('Estado', 14, (r) => r.status),
  text('Fecha de registro', 20, (r) => dateTime(r.created_at)),
  text('Nombre completo', 28, (r) => r.full_name),
  text('Fecha de nacimiento', 18, (r) => r.birth_date),
  text('Ciudad y estado', 24, (r) => r.city_state),
  text('Correo electrónico', 30, (r) => r.email),
  text('WhatsApp', 16, (r) => r.phone),
  text('Usuario Instagram', 20, (r) => r.instagram_handle),
  text('Enlace Instagram', 38, (r) => r.instagram_link),
  numeric('Seguidores', 14, (r) => r.follower_count, '#,##0'),
  numeric('Engagement (%)', 15, (r) => r.engagement_rate, '0.00'),
  numeric('Views promedio', 16, (r) => r.avg_reel_views, '#,##0'),
  text('Tiempo creando contenido', 24, (r) => r.time_creating_content),
  text('Categoría principal', 20, (r) => r.primary_category),
  text('Colabora con marcas', 20, (r) => r.active_collaborations),
  text('Marcas', 30, (r) => r.collaboration_brands),
  text('Contenido representativo', 38, (r) => r.best_content_link),
  text('Motivación', 60, (r) => r.motivation),
  text('Revisado', 20, (r) => dateTime(r.reviewed_at)),
]

export async function GET(request: Request) {
  if (!(await hasValidSession())) {
    return new Response('No autorizado', { status: 401 })
  }

  const params = Object.fromEntries(new URL(request.url).searchParams)
  const rows = await fetchAllFiltered(parseFilters(params))

  const buffer = await writeXlsxFile(rows, {
    columns: COLUMNS,
    sheet: 'Registros',
    stickyRowsCount: 1,
  }).toBuffer()

  const stamp = new Date().toISOString().slice(0, 10)

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="vitanoin-registros-${stamp}.xlsx"`,
      'Cache-Control': 'no-store',
    },
  })
}
