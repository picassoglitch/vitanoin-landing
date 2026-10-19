import { Fraunces, Roboto_Condensed } from 'next/font/google'
import { HERO, SITE, SOCIALS } from '../content'
import { Logo, SocialIcon } from '../components/ui'

// Type and palette taken from the landing banner (public/images/hero-banner.jpg).
const display = Fraunces({ subsets: ['latin'], weight: ['800'] })
const condensed = Roboto_Condensed({ subsets: ['latin'], weight: ['300'] })

// Fades the crop's cut edges into the page so the polaroids sit on the site itself.
const EDGE_FADE =
  'linear-gradient(to right, transparent, #000 8%, #000 97%, transparent), linear-gradient(to bottom, transparent, #000 4%, #000 96%, transparent)'

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
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#F7F6F1] text-[#1F1B17]">
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <span className="hidden text-xs font-semibold tracking-widest text-[#8A7D72] sm:inline">
          {SITE.tagline}
        </span>
      </header>

      <main className="mx-auto grid w-full max-w-[1200px] flex-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="space-y-6">
          <h1
            className={`${display.className} text-[2.4rem] uppercase leading-[0.98] tracking-tight text-[#5E4430] sm:text-5xl xl:text-[3.6rem]`}
          >
            Estamos construyendo algo para ti.
          </h1>

          <p className={`${condensed.className} text-3xl leading-tight text-[#5A4A3C] sm:text-4xl`}>
            Muy pronto podrás
            <br />
            contar tu historia.
          </p>

          <p className="max-w-md text-justify text-[15px] leading-relaxed">
            Un programa exclusivo para creadoras de contenido que{' '}
            <strong className="italic">inspiran, educan y construyen</strong> confianza en el
            cuidado de la piel. Estamos dando los últimos toques.
          </p>

          <p className="max-w-md text-right italic text-[#8A7D72]">{SITE.program}</p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-[#8A7D72]">
              MIENTRAS TANTO, SÍGUENOS
            </span>
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#5E4430] text-white transition hover:bg-[#4A3524]"
              >
                <SocialIcon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>

          <form
            method="post"
            action="/proximamente/entrar"
            className="max-w-sm space-y-3 rounded-sm bg-white p-4 pb-5 shadow-lg shadow-[#5E4430]/10 ring-1 ring-[#5E4430]/5"
          >
            <input type="hidden" name="next" value={next ?? '/'} />
            <label htmlFor="code" className="block text-xs font-semibold text-[#5A4A3C]">
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
                className="min-w-0 flex-1 rounded-sm border border-[#E4DED4] bg-[#FBFAF7] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#927847]"
              />
              <button
                type="submit"
                className="shrink-0 rounded-sm bg-[#5E4430] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4A3524]"
              >
                Entrar
              </button>
            </div>
            {error && (
              <p role="alert" className="text-xs text-rose-700">
                Ese código no es válido.
              </p>
            )}
          </form>
        </div>

        {/* The polaroid half of the banner, so the wall matches the landing. */}
        <div className="relative mx-auto aspect-[1460/1178] w-full max-w-[640px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO.src}
            alt="Polaroids de creadoras y Vitanoin CS Serum"
            className="absolute inset-y-0 right-0 h-full w-auto max-w-none"
            style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
          />
        </div>
      </main>

      <footer className="border-t border-[#E4DED4]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <p className="text-xs text-[#8A7D72]">
            © {new Date().getFullYear()} Laboratorios Panalab. Todos los derechos reservados.
          </p>
          <span className="text-xs font-semibold tracking-wider text-[#8A7D72]">{SITE.country}</span>
        </div>
      </footer>
    </div>
  )
}
