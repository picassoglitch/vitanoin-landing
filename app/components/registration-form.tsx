'use client'

import { useState } from 'react'
import { submitVitanoinForm } from '../actions/submit-form'
import { CONFIRMATION, FORM_CARD } from '../content'
import { Arrow, Photo } from './ui'

const input =
  'w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100'
const label = 'mb-1 block text-[11px] font-semibold text-slate-700'

const CONSENTS = [
  { name: 'confirmed_age', text: 'Confirmo que soy mayor de edad.' },
  {
    name: 'confirmed_public_profile',
    text: 'Confirmo que mi perfil de Instagram es público y cuenta con al menos 5,000 seguidores.',
  },
  { name: 'accepted_terms', text: 'Acepto los términos y condiciones de “The Vitanoin Collective”.' },
  { name: 'accepted_privacy', text: 'He leído y acepto el aviso de privacidad.' },
  {
    name: 'authorized_content_use',
    text: 'En caso de ser seleccionada, autorizo a Panalab a compartir, repostear y utilizar el contenido generado conforme a los términos y condiciones.',
  },
  {
    name: 'accepted_communications',
    text: 'Acepto recibir comunicaciones relacionadas con mi participación por correo electrónico y WhatsApp.',
  },
]

export function RegistrationForm() {
  const [status, setStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({
    loading: false,
  })
  const [collaborates, setCollaborates] = useState('No')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ loading: true })

    const result = await submitVitanoinForm(new FormData(event.currentTarget))

    setStatus(
      result.success
        ? { loading: false, success: true }
        : { loading: false, success: false, message: result.message },
    )
  }

  return (
    <section id="registro" className="relative scroll-mt-24">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl lg:pr-16">
        <h2 className="font-hand text-2xl text-[#002B66]">{FORM_CARD.title}</h2>
        <p className="mb-4 text-[11px] text-slate-500">{FORM_CARD.subtitle}</p>

        {status.success ? (
          <div className="space-y-2 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
            <h3 className="text-base font-bold">{CONFIRMATION.title}</h3>
            <p className="text-xs leading-relaxed">{CONFIRMATION.body}</p>
            <p className="text-xs font-semibold">{CONFIRMATION.follow}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {status.message && (
              <p role="alert" className="rounded-md border border-rose-200 bg-rose-50 p-2.5 text-[11px] text-rose-700">
                {status.message}
              </p>
            )}

            <div>
              <label htmlFor="full_name" className={label}>
                Nombre completo *
              </label>
              <input id="full_name" name="full_name" type="text" required autoComplete="name" className={input} />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="birth_date" className={label}>
                  Fecha de nacimiento *
                </label>
                <input id="birth_date" name="birth_date" type="date" required className={input} />
              </div>
              <div>
                <label htmlFor="city_state" className={label}>
                  Ciudad y estado *
                </label>
                <input
                  id="city_state"
                  name="city_state"
                  type="text"
                  required
                  placeholder="CDMX, México"
                  className={input}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="email" className={label}>
                  Correo electrónico *
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={input} />
              </div>
              <div>
                <label htmlFor="phone" className={label}>
                  WhatsApp *
                </label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className={input} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="instagram_handle" className={label}>
                  Usuario de Instagram *
                </label>
                <input
                  id="instagram_handle"
                  name="instagram_handle"
                  type="text"
                  required
                  placeholder="@usuario"
                  className={input}
                />
              </div>
              <div>
                <label htmlFor="follower_count" className={label}>
                  Seguidores *
                </label>
                <input
                  id="follower_count"
                  name="follower_count"
                  type="number"
                  min="5000"
                  required
                  placeholder="Mínimo 5,000"
                  className={input}
                />
              </div>
            </div>

            <div>
              <label htmlFor="instagram_link" className={label}>
                Enlace directo a Instagram *
              </label>
              <input
                id="instagram_link"
                name="instagram_link"
                type="url"
                required
                placeholder="https://instagram.com/tuperfil"
                className={input}
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="time_creating_content" className={label}>
                  Tiempo creando contenido *
                </label>
                <select id="time_creating_content" name="time_creating_content" required defaultValue="" className={input}>
                  <option value="" disabled>
                    Selecciona
                  </option>
                  <option>Menos de 6 meses</option>
                  <option>6 a 12 meses</option>
                  <option>1 a 3 años</option>
                  <option>Más de 3 años</option>
                </select>
              </div>
              <div>
                <label htmlFor="primary_category" className={label}>
                  Categoría principal *
                </label>
                <select id="primary_category" name="primary_category" required defaultValue="" className={input}>
                  <option value="" disabled>
                    Selecciona
                  </option>
                  <option>Skincare</option>
                  <option>Belleza</option>
                  <option>Lifestyle</option>
                  <option>Bienestar</option>
                  <option>Moda</option>
                  <option>Maternidad</option>
                  <option>Otro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="is_profile_public" className={label}>
                  ¿Tu perfil es público? *
                </label>
                <select id="is_profile_public" name="is_profile_public" required defaultValue="true" className={input}>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="avg_reel_views" className={label}>
                  Promedio de views
                </label>
                <input
                  id="avg_reel_views"
                  name="avg_reel_views"
                  type="number"
                  min="0"
                  placeholder="Últimos 5 Reels"
                  className={input}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="engagement_rate" className={label}>
                  Engagement Rate (%)
                </label>
                <input
                  id="engagement_rate"
                  name="engagement_rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="Opcional"
                  className={input}
                />
              </div>
              <div>
                <label htmlFor="active_collaborations" className={label}>
                  ¿Colaboras con marcas? *
                </label>
                <select
                  id="active_collaborations"
                  name="active_collaborations"
                  required
                  value={collaborates}
                  onChange={(event) => setCollaborates(event.target.value)}
                  className={input}
                >
                  <option value="No">No</option>
                  <option value="Sí">Sí</option>
                </select>
              </div>
            </div>

            {collaborates === 'Sí' && (
              <div>
                <label htmlFor="collaboration_brands" className={label}>
                  ¿Con qué marcas? *
                </label>
                <input
                  id="collaboration_brands"
                  name="collaboration_brands"
                  type="text"
                  required
                  placeholder="Especifica las marcas"
                  className={input}
                />
              </div>
            )}

            <div>
              <label htmlFor="best_content_link" className={label}>
                Contenido representativo *
              </label>
              <input
                id="best_content_link"
                name="best_content_link"
                type="url"
                required
                placeholder="Enlace a tu mejor contenido"
                className={input}
              />
            </div>

            <div>
              <label htmlFor="motivation" className={label}>
                ¿Por qué quieres formar parte? *
              </label>
              <textarea id="motivation" name="motivation" rows={3} required className={input} />
            </div>

            <fieldset className="space-y-2 border-t border-slate-100 pt-3">
              <legend className="mb-1 text-[11px] font-semibold text-slate-700">Consentimientos</legend>
              {CONSENTS.map((consent) => (
                <label key={consent.name} className="flex cursor-pointer items-start gap-2 text-[10px] leading-snug text-slate-600">
                  <input
                    name={consent.name}
                    type="checkbox"
                    required
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded accent-sky-600"
                  />
                  <span>{consent.text}</span>
                </label>
              ))}
            </fieldset>

            <button
              type="submit"
              disabled={status.loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#002B66] py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:opacity-50"
            >
              {status.loading ? 'Guardando…' : 'Quiero formar parte del Collective'}
              {!status.loading && <Arrow className="h-4 w-4" />}
            </button>
          </form>
        )}
      </div>

      {/* Polaroid tucked against the form, as in the design comp. */}
      <figure className="pointer-events-none absolute -right-2 top-16 hidden w-28 rotate-3 rounded-sm bg-white p-1.5 pb-7 shadow-lg ring-1 ring-slate-900/5 xl:block">
        <div className="aspect-[3/4] overflow-hidden rounded-sm">
          <Photo src={FORM_CARD.polaroidSrc} alt="Creadora del Collective" label="Foto" />
        </div>
        <figcaption className="font-hand absolute inset-x-1 bottom-1 text-center text-[11px] leading-tight text-sky-700">
          {FORM_CARD.note}
        </figcaption>
      </figure>
    </section>
  )
}
