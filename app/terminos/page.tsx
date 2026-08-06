import Link from 'next/link'
import { SiteFooter, SiteHeader } from '../components/site-chrome'
import { STEPS, TYC } from '../content'

export const metadata = {
  title: 'Términos y Condiciones | The Vitanoin Collective',
  description: 'Términos y condiciones y aviso de privacidad de The Vitanoin Collective.',
}

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-100 pt-7">
      <h2 className="mb-3 text-lg font-bold text-[#002B66]">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  )
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-sm font-semibold tracking-wide text-sky-600">— The Vitanoin Collective</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#002B66]">
          Términos y Condiciones
        </h1>

        {TYC.pending && (
          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            <strong className="font-semibold">Documento en revisión.</strong> El texto legal definitivo
            de los Términos y Condiciones y del Aviso de Privacidad se encuentra pendiente de
            aprobación. Lo siguiente resume las condiciones de la convocatoria y se sustituirá por la
            versión aprobada antes del cierre del registro.
          </p>
        )}

        <div className="mt-8 space-y-7">
          <Section title="1. Quién puede participar">
            <p>
              La convocatoria está dirigida a creadoras de contenido mayores de edad, con residencia en
              México, cuyos perfiles de Instagram y TikTok sean públicos y que cuenten con al menos
              5,000 seguidores.
            </p>
            <p>
              El registro es personal y gratuito. Se acepta una sola solicitud por persona y por correo
              electrónico. La información proporcionada debe ser veraz; cualquier dato falso o perfil
              que no cumpla los requisitos podrá ser descartado sin necesidad de aviso.
            </p>
          </Section>

          <Section title="2. Mecánica de participación">
            <ol className="list-decimal space-y-1.5 pl-5">
              {STEPS.items.map((step) => (
                <li key={step.text}>
                  {step.text}
                  {'ideas' in step && step.ideas && (
                    <ul className="mt-1.5 list-disc space-y-1 pl-5">
                      {step.ideas.map((idea) => (
                        <li key={idea.title}>
                          <strong className="font-semibold text-slate-700">{idea.title}:</strong> {idea.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </Section>

          <Section title="3. Selección de participantes">
            <p>
              Se seleccionarán 500 creadoras. La selección la realiza el equipo de Laboratorios Panalab
              considerando el perfil, la comunidad, las métricas y la calidad del contenido de cada
              solicitante. El resultado de la evaluación es inapelable.
            </p>
            <p>
              Las participantes seleccionadas serán contactadas por correo electrónico o por teléfono a
              los datos registrados en el formulario.
            </p>
          </Section>

          <Section title="4. Premios">
            <p>Las 500 creadoras seleccionadas recibirán un kit Vitanoin para crear y compartir su contenido.</p>
            <p>
              Entre todas las participantes se elegirá a una ganadora, quien se convertirá en la próxima
              Embajadora Panalab y recibirá:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>$40,000 MXN en productos Panalab.</li>
              <li>$18,000 MXN de remuneración por sus contenidos.</li>
              <li>Una colaboración con Vitanoin durante seis meses.</li>
              <li>Visibilidad en los canales oficiales de Panalab.</li>
            </ul>
            <p>Los premios son personales e intransferibles y no son canjeables por efectivo.</p>
          </Section>

          <Section title="5. Uso del contenido">
            <p>
              En caso de ser seleccionada, la participante autoriza a Laboratorios Panalab a compartir,
              repostear y utilizar el contenido generado en el marco de la convocatoria, en sus canales
              oficiales y conforme a estos términos.
            </p>
            <p>
              El contenido debe ser original de la participante y no infringir derechos de terceros. La
              autoría se mantiene siempre de la creadora.
            </p>
          </Section>

          <Section title="6. Vigencia">
            <p>
              El registro cierra el 6 de septiembre de 2026 a las 23:59 horas del Centro de México.
              Laboratorios Panalab podrá modificar o dar por terminada la convocatoria por causas
              justificadas, informándolo en sus canales oficiales.
            </p>
          </Section>

          <Section id="privacidad" title="7. Aviso de Privacidad">
            <p>
              Laboratorios Panalab es responsable del tratamiento de los datos personales recabados a
              través de este formulario.
            </p>
            <p>
              <strong className="font-semibold text-slate-700">Datos que recabamos.</strong> Nombre
              completo, fecha de nacimiento, ciudad y estado, correo electrónico, teléfono, usuario y
              enlace de Instagram y de TikTok, número de seguidores, métricas de contenido y la
              información que la participante decida compartir en el formulario.
            </p>
            <p>
              <strong className="font-semibold text-slate-700">Finalidad.</strong> Evaluar las
              solicitudes, seleccionar a las participantes, contactarlas y dar seguimiento a la
              convocatoria. Con su consentimiento, enviarle comunicaciones relacionadas con su
              participación por correo electrónico y WhatsApp.
            </p>
            <p>
              <strong className="font-semibold text-slate-700">Transferencias.</strong> Los datos no se
              comercializan ni se comparten con terceros ajenos a la operación de la convocatoria.
            </p>
            <p>
              <strong className="font-semibold text-slate-700">Derechos ARCO.</strong> La participante
              puede solicitar en cualquier momento el acceso, rectificación, cancelación u oposición al
              tratamiento de sus datos, así como revocar su consentimiento, escribiendo a los canales
              de contacto oficiales de Laboratorios Panalab.
            </p>
          </Section>

          <Section title="8. Contacto">
            <p>
              Para cualquier duda sobre la convocatoria puedes escribirnos por mensaje directo a{' '}
              <a
                href="https://instagram.com/panalabmx"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#002B66] underline decoration-sky-300 underline-offset-2"
              >
                @Panalabmx
              </a>
              .
            </p>
          </Section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
          <Link
            href="/#registro"
            className="rounded-lg bg-[#002B66] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
          >
            Volver al registro
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-[#002B66] transition hover:bg-slate-50"
          >
            Ir al inicio
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
