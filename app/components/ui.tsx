// Shared primitives: brand mark, icons and the image placeholder used until
// real photography is supplied.

export const NAVY = '#002B66'
export const SKY = '#00A3E0'

/** Official Panalab mark. Source artwork: public/images/panalab-logo-source.ai
 *  Always use these assets rather than setting the name in type. */
export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={light ? '/images/panalab-logo-white.png' : '/images/panalab-logo.png'}
      alt="Laboratorios Panalab México"
      width={1224}
      height={395}
      className={`h-9 w-auto shrink-0 sm:h-11 ${className}`}
    />
  )
}

/** Renders a photo when one is configured, otherwise a branded placeholder so
 *  the layout is complete before the real assets arrive. */
export function Photo({
  src,
  alt = '',
  className = '',
  label,
}: {
  src?: string | null
  alt?: string
  className?: string
  label?: string
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />
  }
  return (
    <div
      role="img"
      aria-label={alt || 'Imagen pendiente'}
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-100 via-slate-100 to-sky-50 ${className}`}
    >
      <span className="px-2 text-center text-[9px] font-semibold uppercase tracking-wider text-sky-700/50">
        {label ?? 'Imagen'}
      </span>
    </div>
  )
}

export function Heart({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 20s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 4.65-7 9-7 9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14m-5-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Check({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="m8.5 12.2 2.4 2.4 4.6-4.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const BENEFIT_PATHS: Record<string, React.ReactNode> = {
  community: (
    <>
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 19c.6-3 2.9-4.5 5.5-4.5S13.9 16 14.5 19M16 14.6c2 .3 3.6 1.6 4 4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 4.65-7 9-7 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  ),
  people: (
    <>
      <circle cx="12" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 19c.5-2.4 2.3-3.6 4.5-3.6S16 16.6 16.5 19M2 18c.4-1.9 1.5-2.9 3.2-3M22 18c-.4-1.9-1.5-2.9-3.2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  play: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 9.8v4.4l4-2.2-4-2.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v4.5a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 5.5H4.5v1a3 3 0 0 0 3 3M17 5.5h2.5v1a3 3 0 0 1-3 3M12 13.5V17m-3 3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.7 9.4a2.4 2.4 0 1 1 3.1 2.3c-.6.2-.9.7-.9 1.3v.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16.4" r="0.9" fill="currentColor" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3.5h7.5L18 8v12.5H6V3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13.5 3.5V8H18M8.8 12h6.4M8.8 15.2h6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
}

export function BenefitIcon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {BENEFIT_PATHS[name] ?? BENEFIT_PATHS.heart}
    </svg>
  )
}

const SOCIAL_PATHS: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.9" cy="7.1" r="1" fill="currentColor" />
    </>
  ),
  tiktok: (
    <path
      d="M13.5 3.5v10.9a2.9 2.9 0 1 1-2.4-2.85M13.5 3.5c.4 2.2 1.9 3.6 4.2 3.8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  youtube: (
    <>
      <rect x="2.8" y="6" width="18.4" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.4 9.6v4.8l4.2-2.4-4.2-2.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </>
  ),
  facebook: (
    <path
      d="M14.8 8.2h1.9V5.4h-2.3c-2 0-3.2 1.2-3.2 3.3v1.6H9v2.8h2.2v6.4h2.9v-6.4h2.2l.4-2.8h-2.6V9.1c0-.6.3-.9.7-.9Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
}

export function SocialIcon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {SOCIAL_PATHS[name] ?? SOCIAL_PATHS.instagram}
    </svg>
  )
}
