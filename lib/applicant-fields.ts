// Pure constants, types and URL helpers. No database access, so this module is
// safe to import from client components. Queries live in ./applicants.ts.

export const TARGET_WINNERS = 500
export const PAGE_SIZE = 50

export const STATUSES = ['pendiente', 'seleccionada', 'descartada'] as const
export type Status = (typeof STATUSES)[number]

export const CATEGORIES = [
  'Skincare',
  'Belleza',
  'Lifestyle',
  'Bienestar',
  'Moda',
  'Maternidad',
  'Otro',
] as const

export const TIME_RANGES = [
  'Menos de 6 meses',
  '6 a 12 meses',
  '1 a 3 años',
  'Más de 3 años',
] as const

export const SORT_FIELDS = {
  follower_count: 'Seguidores',
  engagement_rate: 'Engagement',
  avg_reel_views: 'Views promedio',
  created_at: 'Fecha de registro',
  full_name: 'Nombre',
} as const
export type SortField = keyof typeof SORT_FIELDS

export type Applicant = {
  id: string
  created_at: string
  full_name: string
  birth_date: string
  city_state: string
  email: string
  phone: string
  instagram_handle: string
  instagram_link: string
  tiktok_handle: string | null
  tiktok_link: string | null
  follower_count: number
  time_creating_content: string
  primary_category: string
  avg_reel_views: number | null
  engagement_rate: number | null
  true_engagement_rate: number | null
  best_content_link: string
  motivation: string
  active_collaborations: string | null
  collaboration_brands: string | null
  status: Status
  reviewed_at: string | null
  admin_notes: string | null
}

export type Filters = {
  q: string
  minFollowers: number | null
  maxFollowers: number | null
  minEngagement: number | null
  minViews: number | null
  category: string
  timeCreating: string
  collabs: string
  status: string
  sort: SortField
  dir: 'asc' | 'desc'
  page: number
}

type RawParams = Record<string, string | string[] | undefined>

function readString(params: RawParams, key: string) {
  const value = params[key]
  return (Array.isArray(value) ? value[0] : value ?? '').trim()
}

function readNumber(params: RawParams, key: string) {
  const raw = readString(params, key)
  if (!raw) return null
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : null
}

/** Every value is validated against a known list, so no user input reaches the
 *  query builder unchecked. */
export function parseFilters(params: RawParams): Filters {
  const sort = readString(params, 'sort')
  const dir = readString(params, 'dir')
  const page = readNumber(params, 'page') ?? 1
  const category = readString(params, 'category')
  const timeCreating = readString(params, 'timeCreating')
  const collabs = readString(params, 'collabs')
  const status = readString(params, 'status')

  return {
    q: readString(params, 'q').slice(0, 100),
    minFollowers: readNumber(params, 'minFollowers'),
    maxFollowers: readNumber(params, 'maxFollowers'),
    minEngagement: readNumber(params, 'minEngagement'),
    minViews: readNumber(params, 'minViews'),
    category: (CATEGORIES as readonly string[]).includes(category) ? category : '',
    timeCreating: (TIME_RANGES as readonly string[]).includes(timeCreating) ? timeCreating : '',
    collabs: ['Sí', 'No'].includes(collabs) ? collabs : '',
    status: (STATUSES as readonly string[]).includes(status) ? status : '',
    sort: (sort in SORT_FIELDS ? sort : 'follower_count') as SortField,
    dir: dir === 'asc' ? 'asc' : 'desc',
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
  }
}

/** Serialise filters back into a query string, dropping empty values. */
export function filtersToQuery(filters: Partial<Filters>) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(filters)) {
    if (value === null || value === undefined || value === '') continue
    if (key === 'page' && value === 1) continue
    params.set(key, String(value))
  }
  return params.toString()
}
