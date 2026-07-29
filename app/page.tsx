'use client'

import { useState } from 'react'
import { submitVitanoinForm } from './actions/submit-form'

export default function Home() {
  const [status, setStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({ loading: false })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ loading: true })
    const formData = new FormData(event.currentTarget)
    const result = await submitVitanoinForm(formData)

    if (result.success) {
      setStatus({ 
        loading: false, 
        success: true, 
        message: '¡Tu historia ya dio el primer paso! Gracias por registrarte en The Vitanoin Collective. Nuestro equipo revisará cuidadosamente tu perfil y nos comunicaremos contigo.' 
      })
    } else {
      setStatus({ loading: false, success: false, message: result.message })
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-[#002B66]">LABORATORIOS PANALAB</span>
          <a href="#registro" className="bg-[#002B66] text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-blue-900 transition">
            ÚNETE AL COLLECTIVE
          </a>
        </div>
      </header>

      {/* Hero Body */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Copy */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-sm font-semibold text-sky-600 uppercase tracking-wider">— The Vitanoin Collective</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#002B66] leading-tight">
            Tu piel tiene una historia. <br />
            <span className="text-sky-500 italic font-normal">Queremos que seas tú quien la cuente.</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Sabemos que detrás de cada contenido hay mucho más que una cámara… hay disciplina, creatividad, constancia y horas de trabajo para construir una comunidad que confía en ti. En Collective queremos reconocer ese esfuerzo.
          </p>

          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-[#002B66] text-lg">¿Qué pueden ganar?</h3>
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
              <li>Kit Vitanoin para las 500 creadoras seleccionadas.</li>
              <li>1 Premio a la próxima Embajadora Vitanoin.</li>
              <li><strong>$40,000 MXN</strong> en productos Panalab.</li>
              <li><strong>$18,000 MXN</strong> de remuneración por sus contenidos.</li>
              <li>Colaboración oficial durante 6 meses y visibilidad en canales de Panalab.</li>
            </ul>
          </div>
        </div>

        {/* Right Form */}
        <div id="registro" className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold text-[#002B66] mb-1">Formulario de registro</h2>
          <p className="text-xs text-slate-500 mb-6">Selección ordenada de 500 perfiles.</p>

          {status.success ? (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-200 space-y-3">
              <h3 className="font-bold text-lg">¡Tu historia ya dio el primer paso!</h3>
              <p className="text-sm leading-relaxed">{status.message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status.message && (
                <div className="bg-rose-50 text-rose-700 p-3 rounded-md text-xs border border-rose-200">
                  {status.message}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre completo *</label>
                <input name="full_name" required type="text" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha nacimiento *</label>
                  <input name="birth_date" required type="date" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ciudad y Estado *</label>
                  <input name="city_state" required type="text" placeholder="CDMX, México" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Correo electrónico *</label>
                  <input name="email" required type="email" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp *</label>
                  <input name="phone" required type="tel" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Usuario Instagram *</label>
                  <input name="instagram_handle" required placeholder="@usuario" type="text" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Seguidores *</label>
                  <input name="follower_count" required type="number" min="5000" placeholder="Mínimo 5000" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Enlace directo a Instagram *</label>
                <input name="instagram_link" required type="url" placeholder="https://instagram.com/tuperfil" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tiempo creando contenido *</label>
                  <select name="time_creating_content" required className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500 bg-white">
                    <option value="Menos de 6 meses">Menos de 6 meses</option>
                    <option value="6 a 12 meses">6 a 12 meses</option>
                    <option value="1 a 3 años">1 a 3 años</option>
                    <option value="Más de 3 años">Más de 3 años</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Categoría principal *</label>
                  <select name="primary_category" required className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500 bg-white">
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">¿Perfil es público? *</label>
                  <select name="is_profile_public" required className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500 bg-white">
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Promedio views Reels</label>
                  <input name="avg_reel_views" type="number" placeholder="Ej. 10000" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Enlace a contenido representativo *</label>
                <input name="best_content_link" required type="url" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">¿Por qué quieres ser parte? *</label>
                <textarea name="motivation" required rows={2} className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500"></textarea>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-2">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input name="accepted_terms" type="checkbox" required className="mt-0.5 rounded text-sky-600" />
                  <span>Soy mayor de edad, mi perfil es público (+5k seguidores) y acepto los T&C y aviso de privacidad.</span>
                </label>
              </div>

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
    </div>
  )
}