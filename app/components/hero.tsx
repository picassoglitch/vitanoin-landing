import { HERO } from '../content'
import { Arrow } from './ui'

// Softens the edges where the silk ribbon is cut off, so the banner melts into
// the page background (#F7F6F1, sampled from the image).
const EDGE_FADE =
  'linear-gradient(to right, transparent, #000 3%, #000 97%, transparent), linear-gradient(to bottom, transparent, #000 4%, #000 96%, transparent)'

/** The approved banner, shown as delivered. The headline and copy are baked
 *  into the image, so they are repeated for screen readers and search. */
export function HeroBanner() {
  return (
    <section>
      <h1 className="sr-only">{HERO.title}</h1>
      <img
        src={HERO.src}
        alt={HERO.alt}
        width={2400}
        height={1178}
        className="h-auto w-full"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
      />
      <div className="mt-6 flex justify-center">
        <a
          href="#registro"
          className="inline-flex items-center gap-3 rounded-lg bg-[#5E4430] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5E4430]/15 transition hover:bg-[#4A3524]"
        >
          {HERO.cta}
          <Arrow className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
