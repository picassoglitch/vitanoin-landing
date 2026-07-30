'use client'

import { useState } from 'react'
import { submitVitanoinForm } from './actions/submit-form'

const inputClass =
  'w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500'
const selectClass = `${inputClass} bg-white`
const labelClass = 'block text-xs font-semibold text-slate-700 mb-1'

const CONSENTS = [
  { name: 'confirmed_age', label: 'Confirmo que soy mayor de edad.' },
  {
    name: 'confirmed_public_profile',
    label: 'Confirmo que mi perfil de Instagram es público y cuenta con al menos 5,000 seguidores.',
  },
  { name: 'accepted_terms', label: 'Acepto los términos y condiciones de “The Vitanoin Collective”.' },
  { name: 'accepted_privacy', label: 'He leído y acepto el aviso de privacidad.' },
  {
    name: 'authorized_content_use',
    label:
      'En caso de ser seleccionada, autorizo a Panalab a compartir, repostear y utilizar el contenido generado conforme a los términos y condiciones.',
  },
  {
    name: 'accepted_communications',
    label: 'Acepto recibir comunicaciones relacionadas con mi participación por correo electrónico y WhatsApp.',
  },
]

const STEPS = [
  'Completa tu registro en esta landing.',
  'Nuestro equipo revisará tu perfil, comunidad, métricas y calidad de contenido.',
  'Si eres una de las 500 seleccionadas, recibirás un kit Vitanoin y un código único.',
  'Crea un Reel con tu primera impresión o rutina usando Vitanoin.',
  'Comparte el Reel en Stories e incluye el enlace al punto de venta.',
  'Registra tu contenido y participa para convertirte en la próxima Embajadora Vitanoin.',
]

const FAQS = [
  {
    q: '¿Quiénes pueden participar?',
    a: 'Creadoras mayores de edad, residentes en México, con un perfil de Instagram público y al menos 5,000 seguidores.',
  },
  {
    q: '¿Cuáles son los beneficios?',
    a: 'Las 500 seleccionadas reciben un kit Vitanoin. La Embajadora recibe $40,000 MXN en productos Panalab, $18,000 MXN de remuneración y una colaboración de seis meses.',
  },
  {
    q: '¿Cómo se seleccionan las participantes?',
    a: 'Nuestro equipo revisa perfil, comunidad, métricas y calidad de contenido. La selección es ordenada hasta completar 500 perfiles.',
  },
  {
    q: '¿Hasta cuándo puedo registrarme?',
    a: 'El registro permanece abierto hasta completar los 500 lugares. Las fechas oficiales se anunciarán en @Panalabmx.',
  },
]

const BASES = [
  'Programa exclusivo para creadoras de contenido de skincare y belleza.',
  'Publicaciones originales sobre skincare y experiencia con Vitanoin.',
  'Compromiso con la comunidad y los valores de la marca.',
  'Se seleccionarán perfiles auténticos y con impacto positivo.',
]

const NAV_LINKS = [
  { href: '#registro', label: 'Registro' },
  { href: '#como-participar', label: 'Cómo participar' },
  { href: '#faqs', label: 'FAQs' },
  { href: '#bases', label: 'Bases de participación' },
  { href: '#tyc', label: 'TyC' },
]

export default function Home() {
  const [status, setStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({
    loading: false,
  })
  const [hasCollaborations, setHasCollaborations] = useState('No')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ loading: true })
    const formData = new FormData(event.currentTarget)
    const result = await submitVitanoinForm(formData)

    if (result.success) {
      setStatus({
        loading: false,
        success: true,
        message:
          'Gracias por registrarte en The Vitanoin Collective. Nuestro equipo revisará cuidadosamente tu perfil y contenido. En caso de ser seleccionada, nos comunicaremos contigo a través del correo electrónico o teléfono registrado.',
      })
    } else {
      setStatus({ loading: false, success: false, message: result.message })
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <span className="text-xl font-bold text-[#002B66] shrink-0">LABORATORIOS PANALAB</span>
          <nav className="hidden lg:flex items-center gap-7 text-sm text-slate-600">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-[#002B66] transition">
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#registro"
            className="bg-[#002B66] text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-blue-900 transition shrink-0"
          >
            ÚNETE AL COLLECTIVE
          </a>
        </div>
      </header>

      {/* Hero Body */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Copy */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-sm font-semibold text-sky-600 uppercase tracking-wider">
            — The Vitanoin Collective
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#002B66] leading-tight">
            Tu piel tiene una historia. <br />
            <span className="text-sky-500 italic font-normal">Queremos que seas tú quien la cuente.</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Sabemos que detrás de cada contenido hay mucho más que una cámara… hay disciplina, creatividad,
            constancia y horas de trabajo para construir una comunidad que confía en ti. Hay días en los que las
            ideas fluyen y otros en los que tienes que volver a intentarlo. En Collective queremos reconocer ese
            esfuerzo.
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            Estamos buscando a 500 creadoras que quieran vivir la experiencia Vitanoin, conocer nuestros productos
            y compartir con su comunidad una historia auténtica sobre el cuidado de su piel. Entre todas las
            participantes elegiremos a la próxima Embajadora Vitanoin: una creadora que represente la constancia,
            autenticidad y confianza que queremos construir como comunidad.
          </p>

          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-[#002B66] text-lg">¿Qué pueden ganar?</h3>
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
              <li>Kit Vitanoin para las 500 creadoras seleccionadas.</li>
              <li>1 Premio a la próxima Embajadora Vitanoin.</li>
              <li>
                <strong>$40,000 MXN</strong> en productos Panalab.
              </li>
              <li>
                <strong>$18,000 MXN</strong> de remuneración por sus contenidos.
              </li>
              <li>Colaboración oficial durante 6 meses y visibilidad en canales de Panalab.</li>
            </ul>
          </div>

          <div id="como-participar" className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4 scroll-mt-24">
            <h3 className="font-bold text-[#002B66] text-lg">¿Cómo participar?</h3>
            <ol className="text-sm text-slate-600 space-y-3">
              {STEPS.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-sky-50 text-sky-600 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right Form */}
        <div
          id="registro"
          className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 lg:sticky lg:top-24 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-[#002B66] mb-1">Formulario de registro</h2>
          <p className="text-xs text-slate-500 mb-6">Selección ordenada de 500 perfiles.</p>

          {status.success ? (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-200 space-y-3">
              <h3 className="font-bold text-lg">Tu historia ya dio el primer paso.</h3>
              <p className="text-sm leading-relaxed">{status.message}</p>
              <p className="text-sm leading-relaxed">
                Sigue a <strong>@Panalabmx</strong> para conocer las próximas noticias de la convocatoria.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status.message && (
                <div className="bg-rose-50 text-rose-700 p-3 rounded-md text-xs border border-rose-200">
                  {status.message}
                </div>
              )}

              <div>
                <label htmlFor="full_name" className={labelClass}>Nombre completo *</label>
                <input id="full_name" name="full_name" required type="text" className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="birth_date" className={labelClass}>Fecha nacimiento *</label>
                  <input id="birth_date" name="birth_date" required type="date" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="city_state" className={labelClass}>Ciudad y Estado *</label>
                  <input id="city_state" name="city_state" required type="text" placeholder="CDMX, México" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className={labelClass}>Correo electrónico *</label>
                  <input id="email" name="email" required type="email" autoComplete="email" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>WhatsApp *</label>
                  <input id="phone" name="phone" required type="tel" autoComplete="tel" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="instagram_handle" className={labelClass}>Usuario Instagram *</label>
                  <input
                    id="instagram_handle"
                    name="instagram_handle"
                    required
                    placeholder="@usuario"
                    type="text"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="follower_count" className={labelClass}>Seguidores *</label>
                  <input
                    id="follower_count"
                    name="follower_count"
                    required
                    type="number"
                    min="5000"
                    placeholder="Mínimo 5000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="instagram_link" className={labelClass}>Enlace directo a Instagram *</label>
                <input
                  id="instagram_link"
                  name="instagram_link"
                  required
                  type="url"
                  placeholder="https://instagram.com/tuperfil"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="time_creating_content" className={labelClass}>Tiempo creando contenido *</label>
                  <select id="time_creating_content" name="time_creating_content" required defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Selecciona
                    </option>
                    <option value="Menos de 6 meses">Menos de 6 meses</option>
                    <option value="6 a 12 meses">6 a 12 meses</option>
                    <option value="1 a 3 años">1 a 3 años</option>
                    <option value="Más de 3 años">Más de 3 años</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="primary_category" className={labelClass}>Categoría principal *</label>
                  <select id="primary_category" name="primary_category" required defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Selecciona
                    </option>
                    <option value="Skincare">Skincare</option>
                    <option value="Belleza">Belleza</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Bienestar">Bienestar</option>
                    <option value="Moda">Moda</option>
                    <option value="Maternidad">Maternidad</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="is_profile_public" className={labelClass}>¿Perfil es público? *</label>
                  <select id="is_profile_public" name="is_profile_public" required defaultValue="true" className={selectClass}>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="avg_reel_views" className={labelClass}>Promedio views Reels</label>
                  <input id="avg_reel_views" name="avg_reel_views" type="number" min="0" placeholder="Últimos 5 Reels" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="engagement_rate" className={labelClass}>Engagement Rate (%)</label>
                  <input
                    id="engagement_rate"
                    name="engagement_rate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="Opcional. Ej. 4.5"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="active_collaborations" className={labelClass}>¿Colaboras con marcas? *</label>
                  <select
                    id="active_collaborations"
                    name="active_collaborations"
                    required
                    value={hasCollaborations}
                    onChange={(event) => setHasCollaborations(event.target.value)}
                    className={selectClass}
                  >
                    <option value="No">No</option>
                    <option value="Sí">Sí</option>
                  </select>
                </div>
              </div>

              {hasCollaborations === 'Sí' && (
                <div>
                  <label htmlFor="collaboration_brands" className={labelClass}>¿Con qué marcas? *</label>
                  <input
                    id="collaboration_brands"
                    name="collaboration_brands"
                    required
                    type="text"
                    placeholder="Separa las marcas con comas"
                    className={inputClass}
                  />
                </div>
              )}

              <div>
                <label htmlFor="best_content_link" className={labelClass}>Enlace a contenido representativo *</label>
                <input id="best_content_link" name="best_content_link" required type="url" className={inputClass} />
              </div>

              <div>
                <label htmlFor="motivation" className={labelClass}>¿Por qué quieres ser parte? *</label>
                <textarea id="motivation" name="motivation" required rows={3} className={inputClass}></textarea>
              </div>

              <fieldset className="space-y-2 text-xs text-slate-600 pt-2">
                <legend className="text-xs font-semibold text-slate-700 mb-2">Consentimientos</legend>
                {CONSENTS.map((consent) => (
                  <label key={consent.name} className="flex items-start space-x-2 cursor-pointer">
                    <input
                      name={consent.name}
                      type="checkbox"
                      required
                      className="mt-0.5 rounded text-sky-600 shrink-0"
                    />
                    <span>{consent.label}</span>
                  </label>
                ))}
              </fieldset>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-[#002B66] text-white font-semibold py-3 rounded-md hover:bg-blue-900 transition disabled:opacity-50 mt-4"
              >
                {status.loading ? 'Guardando...' : 'QUIERO FORMAR PARTE DEL COLLECTIVE'}
              </button>
            </form>
          )}
        </div>
      </main>

      {/* FAQs / Bases / TyC */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div id="faqs" className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm scroll-mt-24">
          <h3 className="font-bold text-[#002B66] text-lg mb-1">FAQs</h3>
          <p className="text-xs text-slate-500 mb-4">Resolvemos tus dudas</p>
          <div className="space-y-2">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group border border-slate-100 rounded-md">
                <summary className="cursor-pointer list-none px-3 py-2 text-sm font-medium text-slate-700 flex items-center justify-between gap-2">
                  {faq.q}
                  <span className="text-sky-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="px-3 pb-3 text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div id="bases" className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm scroll-mt-24">
          <h3 className="font-bold text-[#002B66] text-lg mb-1">Bases de participación</h3>
          <p className="text-xs text-slate-500 mb-4">Todo lo que necesitas saber</p>
          <ul className="space-y-3 text-xs text-slate-600">
            {BASES.map((base) => (
              <li key={base} className="flex gap-2">
                <span className="text-sky-500 shrink-0">✓</span>
                <span>{base}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="tyc" className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm scroll-mt-24">
          <h3 className="font-bold text-[#002B66] text-lg mb-1">TyC</h3>
          <p className="text-xs text-slate-500 mb-4">Términos y condiciones</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Al participar aceptas nuestros Términos y Condiciones y la Política de Privacidad de Laboratorios
            Panalab. La participación es personal e intransferible y está sujeta a la verificación de los datos
            registrados.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002B66] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold">LABORATORIOS PANALAB</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-blue-100">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition">
                {link.label}
              </a>
            ))}
          </nav>
          <span className="text-xs text-blue-200">Síguenos: @Panalabmx</span>
        </div>
        <div className="border-t border-white/10">
          <p className="max-w-7xl mx-auto px-6 py-4 text-xs text-blue-200">
            © 2026 Laboratorios Panalab. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
