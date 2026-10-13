import { PRODUCT_SHOT, SITE, SOCIALS } from '../content'
import { Heart, Logo, SocialIcon } from '../components/ui'

export const metadata = {
  title: 'Muy pronto | The Vitanoin Collective',
  description: 'Estamos preparando algo especial para creadoras de contenido de skincare. Muy pronto.',
}

export default async function ProximamentePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const { error, next } = await searchParams

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#F8FAFC] text-slate-800">
      {/* Soft brand glow behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-sky-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-blue-200/40 blur-3xl"
      />

      <header className="relative mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <span className="hidden text-xs font-semibold tracking-widest text-slate-400 sm:inline">
          {SITE.tagline}
        </span>
      </header>

      <main className="relative mx-auto grid w-full max-w-[1200px] flex-1 items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-6">
          <p className="text-sm font-semibold tracking-wide text-sky-600">— {SITE.program}</p>

          <h1 className="text-[2.2rem] font-extrabold leading-[1.1] tracking-tight text-[#002B66] sm:text-5xl xl:text-[3.4rem]">
            Estamos construyendo
            <br />
            algo hecho para <em className="font-serif italic text-sky-500">ti</em>
            <Heart className="ml-2 inline-block h-8 w-8 align-baseline text-sky-400 sm:h-10 sm:w-10" />
          </h1>

          <p className="max-w-xl text-[15px] leading-relaxed text-slate-600">
            Un programa exclusivo para creadoras de contenido que inspiran, educan y construyen
            confianza en el cuidado de la piel. Estamos dando los últimos toques — muy pronto
            podrás registrarte.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-slate-500">
              MIENTRAS TANTO, SÍGUENOS
            </span>
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#002B66] text-white transition hover:bg-blue-900"
              >
                <SocialIcon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>

          <form method="post" action="/proximamente/entrar" className="max-w-sm space-y-3 rounded-xl border border-slate-100 bg-white p-4 shadow-lg shadow-blue-900/5">
            <input type="hidden" name="next" value={next ?? '/'} />
            <label htmlFor="code" className="block text-xs font-semibold text-slate-700">
              Código de acceso
            </label>
            <div className="flex gap-2">
              <input
                id="code"
                name="code"
                type="password"
                required
                autoComplete="off"
                autoCapitalize="none"
                className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-[#002B66] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-900"
              >
                Entrar
              </button>
            </div>
            {error && (
              <p role="alert" className="text-xs text-rose-600">
                Ese código no es válido.
              </p>
            )}
          </form>
        </div>

        {/* Polaroid, matching the collage on the main landing */}
        <div className="relative mx-auto w-full max-w-sm py-8">
          <p className="font-hand absolute -top-2 right-0 z-10 rotate-[4deg] text-2xl leading-tight text-sky-600">
            muy pronto ♡
          </p>
          <figure className="rotate-[-3deg] rounded-sm bg-white p-3 pb-10 shadow-2xl ring-1 ring-slate-900/5">
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PRODUCT_SHOT.src ?? ''}
                alt={PRODUCT_SHOT.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="font-hand mt-3 text-center text-xl text-slate-600">
              Tu piel tiene una historia.
            </figcaption>
          </figure>
          <p className="font-hand absolute -bottom-4 left-2 -rotate-[3deg] text-xl text-sky-600">
            500 creadoras · 1 collective
          </p>
        </div>
      </main>

      <footer className="relative bg-[#002B66] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} Laboratorios Panalab. Todos los derechos reservados.
          </p>
          <span className="text-xs font-semibold tracking-wider text-white/80">{SITE.country}</span>
        </div>
      </footer>
    </div>
  )
}
