import { HERO } from '../content'
import { Arrow } from './ui'

/** The approved banner, shown as delivered. The headline and copy are baked
 *  into the image, so they are repeated for screen readers and search. */
export function HeroBanner() {
  return (
    <section>
      <h1 className="sr-only">{HERO.title}</h1>
      <img
        src={HERO.src}
        alt={HERO.alt}
        width={1200}
        height={593}
        className="h-auto w-full rounded-xl"
      />
      <div className="mt-6 flex justify-center">
        <a
          href="#registro"
          className="inline-flex items-center gap-3 rounded-lg bg-[#002B66] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-900"
        >
          {HERO.cta}
          <Arrow className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
