import { COLLAGE, HERO, PRODUCT_SHOT } from '../content'
import { Arrow, Heart, Photo } from './ui'

export function HeroCopy() {
  return (
    <div className="space-y-5">
      <p className="text-sm font-semibold tracking-wide text-sky-600">{HERO.eyebrow}</p>

      <h1 className="text-[2rem] font-extrabold leading-[1.12] tracking-tight text-[#002B66] sm:text-4xl xl:text-[2.9rem]">
        {HERO.titleLine1}
        <br />
        {HERO.titleLine2Before}
        <em className="font-serif italic text-sky-500">{HERO.titleEmphasis}</em>
        {HERO.titleLine2After}
        <Heart className="ml-2 inline-block h-7 w-7 align-baseline text-sky-400" />
      </h1>

      <p className="max-w-xl text-[15px] leading-relaxed text-slate-600">{HERO.body}</p>

      <a
        href="#registro"
        className="inline-flex items-center gap-3 rounded-lg bg-[#002B66] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-900"
      >
        {HERO.cta}
        <Arrow className="h-4 w-4" />
      </a>
    </div>
  )
}

/** The tilted polaroid strip. Captions are placeholder UGC until real,
 *  cleared content is supplied — see content.ts. */
export function HeroCollage() {
  return (
    <div className="relative py-6">
      <p className="font-hand absolute -top-1 right-4 z-10 max-w-[9rem] text-right text-lg leading-tight text-sky-600">
        {COLLAGE.noteTop}
      </p>

      <div className="flex items-center justify-center gap-2 pt-8 sm:gap-3">
        {COLLAGE.cards.map((card) => (
          <figure
            key={card.caption}
            style={{ transform: `rotate(${card.tilt}) translateY(${card.lift})` }}
            className="w-[23%] min-w-[86px] rounded-sm bg-white p-1.5 pb-5 shadow-lg ring-1 ring-slate-900/5 transition hover:z-10 hover:scale-[1.03]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Photo src={card.src} alt="Contenido de la comunidad Vitanoin" label="UGC" />
            </div>
            <figcaption className="mt-1.5 px-0.5 text-[8px] leading-snug text-slate-600">
              <Heart className="mr-0.5 inline-block h-2 w-2 text-rose-400" />
              {card.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="font-hand absolute -bottom-1 right-8 max-w-[7rem] text-center text-lg leading-tight text-sky-600">
        {COLLAGE.noteBottom}
      </p>
    </div>
  )
}

export function ProductShot() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl">
      <Photo src={PRODUCT_SHOT.src} alt={PRODUCT_SHOT.alt} label="Producto Vitanoin" />
    </div>
  )
}
