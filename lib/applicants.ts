import 'server-only'
import { getAdminClient } from './supabase-admin'
import { PAGE_SIZE, type Applicant, type Filters, type Status } from './applicant-fields'

// PostgREST's or() takes a comma-separated filter list, so a comma, parenthesis
// or wildcard in user input would change the meaning of the query. Strip them.
function sanitiseSearch(term: string) {
  return term.replace(/[,()%*\\]/g, ' ').trim()
}

function applyFilters<T>(query: T, filters: Filters): T {
  let q = query as any
  const term = sanitiseSearch(filters.q)

  if (term) {
    q = q.or(
      [
        `full_name.ilike.%${term}%`,
        `email.ilike.%${term}%`,
        `instagram_handle.ilike.%${term}%`,
        `city_state.ilike.%${term}%`,
      ].join(','),
    )
  }
  if (filters.minFollowers !== null) q = q.gte('follower_count', filters.minFollowers)
  if (filters.maxFollowers !== null) q = q.lte('follower_count', filters.maxFollowers)
  if (filters.minEngagement !== null) q = q.gte('engagement_rate', filters.minEngagement)
  if (filters.minViews !== null) q = q.gte('avg_reel_views', filters.minViews)
  if (filters.category) q = q.eq('primary_category', filters.category)
  if (filters.timeCreating) q = q.eq('time_creating_content', filters.timeCreating)
  if (filters.collabs) q = q.eq('active_collaborations', filters.collabs)
  if (filters.status) q = q.eq('status', filters.status)

  return q as T
}

export type ApplicantsResult = {
  rows: Applicant[]
  total: number
  page: number
  pageCount: number
  error: string | null
}

export async function fetchApplicants(filters: Filters): Promise<ApplicantsResult> {
  const supabase = getAdminClient()
  const empty = { rows: [], total: 0, page: 1, pageCount: 1 }

  if (!supabase) {
    return { ...empty, error: 'Falta configurar SUPABASE_SERVICE_ROLE_KEY en el servidor.' }
  }

  const from = (filters.page - 1) * PAGE_SIZE
  const query = supabase
    .from('vitanoin_applicants')
    .select('*', { count: 'exact' })
    .order(filters.sort, { ascending: filters.dir === 'asc', nullsFirst: false })
    .range(from, from + PAGE_SIZE - 1)

  const { data, error, count } = await applyFilters(query, filters)

  if (error) {
    console.error('Failed to load applicants:', error)
    return { ...empty, error: 'No pudimos cargar los registros.' }
  }

  const total = count ?? 0
  return {
    rows: (data ?? []) as Applicant[],
    total,
    page: filters.page,
    pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    error: null,
  }
}

/** Every row matching the filters, for export and bulk actions. Paged through
 *  in chunks because PostgREST caps a single response at 1000 rows. */
export async function fetchAllFiltered(filters: Filters): Promise<Applicant[]> {
  const supabase = getAdminClient()
  if (!supabase) return []

  const all: Applicant[] = []
  const chunk = 1000

  for (let offset = 0; ; offset += chunk) {
    const query = supabase
      .from('vitanoin_applicants')
      .select('*')
      .order(filters.sort, { ascending: filters.dir === 'asc', nullsFirst: false })
      .range(offset, offset + chunk - 1)

    const { data, error } = await applyFilters(query, filters)
    if (error) {
      console.error('Failed to read applicants for export:', error)
      break
    }

    all.push(...((data ?? []) as Applicant[]))
    if (!data || data.length < chunk) break
  }

  return all
}

export async function fetchCounts() {
  const supabase = getAdminClient()
  if (!supabase) return { total: 0, seleccionada: 0, pendiente: 0, descartada: 0 }

  const countFor = async (status?: Status) => {
    let query = supabase.from('vitanoin_applicants').select('id', { count: 'exact', head: true })
    if (status) query = query.eq('status', status)
    const { count } = await query
    return count ?? 0
  }

  const [total, seleccionada, pendiente, descartada] = await Promise.all([
    countFor(),
    countFor('seleccionada'),
    countFor('pendiente'),
    countFor('descartada'),
  ])

  return { total, seleccionada, pendiente, descartada }
}
