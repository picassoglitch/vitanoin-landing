'use client'

import { CATEGORIES, SORT_FIELDS, STATUSES, TIME_RANGES, type Filters } from '@/lib/applicant-fields'

const field =
  'w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500 bg-white'
const label = 'block text-xs font-semibold text-slate-700 mb-1'

export function FiltersForm({ filters }: { filters: Filters }) {
  return (
    <form
      method="GET"
      className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm grid gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      <div className="md:col-span-3 lg:col-span-2">
        <label className={label} htmlFor="q">
          Buscar
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={filters.q}
          placeholder="Nombre, correo, usuario o ciudad"
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="minFollowers">
          Seguidores mínimo
        </label>
        <input
          id="minFollowers"
          name="minFollowers"
          type="number"
          min="0"
          defaultValue={filters.minFollowers ?? ''}
          placeholder="5000"
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="maxFollowers">
          Seguidores máximo
        </label>
        <input
          id="maxFollowers"
          name="maxFollowers"
          type="number"
          min="0"
          defaultValue={filters.maxFollowers ?? ''}
          placeholder="Sin límite"
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="minEngagement">
          Engagement mínimo (%)
        </label>
        <input
          id="minEngagement"
          name="minEngagement"
          type="number"
          min="0"
          step="0.1"
          defaultValue={filters.minEngagement ?? ''}
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="minViews">
          Views promedio mínimo
        </label>
        <input
          id="minViews"
          name="minViews"
          type="number"
          min="0"
          defaultValue={filters.minViews ?? ''}
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="category">
          Categoría
        </label>
        <select id="category" name="category" defaultValue={filters.category} className={field}>
          <option value="">Todas</option>
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="timeCreating">
          Tiempo creando contenido
        </label>
        <select id="timeCreating" name="timeCreating" defaultValue={filters.timeCreating} className={field}>
          <option value="">Todos</option>
          {TIME_RANGES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="collabs">
          Colabora con marcas
        </label>
        <select id="collabs" name="collabs" defaultValue={filters.collabs} className={field}>
          <option value="">Todas</option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label className={label} htmlFor="status">
          Estado
        </label>
        <select id="status" name="status" defaultValue={filters.status} className={field}>
          <option value="">Todos</option>
          {STATUSES.map((option) => (
            <option key={option} value={option}>
              {option[0].toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="sort">
          Ordenar por
        </label>
        <select id="sort" name="sort" defaultValue={filters.sort} className={field}>
          {Object.entries(SORT_FIELDS).map(([value, text]) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="dir">
          Dirección
        </label>
        <select id="dir" name="dir" defaultValue={filters.dir} className={field}>
          <option value="desc">Mayor a menor</option>
          <option value="asc">Menor a mayor</option>
        </select>
      </div>

      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="flex-1 bg-[#002B66] text-white text-sm font-semibold py-2 rounded-md hover:bg-blue-900 transition"
        >
          Aplicar filtros
        </button>
        <a
          href="/admin"
          className="px-3 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 transition"
        >
          Limpiar
        </a>
      </div>
    </form>
  )
}
