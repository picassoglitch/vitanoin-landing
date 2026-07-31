import { NAV, SITE, SOCIALS } from '../content'
import { Logo, SocialIcon } from './ui'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-[#002B66]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#registro"
          className="shrink-0 rounded-md bg-[#002B66] px-3 py-2 text-[10px] font-bold tracking-wide text-white transition hover:bg-blue-900 sm:px-5 sm:py-2.5 sm:text-xs"
        >
          <span className="sm:hidden">ÚNETE</span>
          <span className="hidden sm:inline">ÚNETE AL COLLECTIVE</span>
        </a>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-[#002B66] text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Logo light />

          <nav aria-label="Pie de página" className="flex flex-wrap items-center gap-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/90 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-white/70">SÍGUENOS</span>
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <SocialIcon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} Laboratorios Panalab. Todos los derechos reservados.
          </p>
          <span className="text-xs font-semibold tracking-wider text-white/80">{SITE.country}</span>
        </div>
      </div>
    </footer>
  )
}
