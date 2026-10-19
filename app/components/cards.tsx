import { BASES, BENEFITS, FAQS, STEPS, TYC } from '../content'
import { Arrow, BenefitIcon, Check } from './ui'

const CARD = 'rounded-2xl border border-[#EDE8E0] bg-white shadow-sm'

function CardHead({ icon, eyebrow, title }: { icon: string; eyebrow: string; title: string }) {
  return (
    <div className="border-b border-[#EDE8E0] px-5 py-4">
      <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-[#5E4430]">
        <BenefitIcon name={icon} className="h-4 w-4 text-[#A88B57]" />
        {eyebrow}
      </p>
      <p className="mt-0.5 text-xs text-[#8A7D72]">{title}</p>
    </div>
  )
}

function CardLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="mt-auto flex items-center justify-center gap-2 border-t border-[#EDE8E0] px-5 py-3 text-xs font-semibold text-[#5E4430] transition hover:bg-[#FBFAF7]"
    >
      {label}
      <Arrow className="h-3.5 w-3.5" />
    </a>
  )
}

export function BenefitsStrip() {
  return (
    <div className={`${CARD} grid grid-cols-2 divide-[#EDE8E0] px-2 py-4 sm:grid-cols-4 sm:divide-x`}>
      {BENEFITS.map((benefit) => (
        <div key={benefit.text} className="flex items-start gap-2.5 px-3 py-2">
          <BenefitIcon name={benefit.icon} className="mt-0.5 h-7 w-7 shrink-0 text-[#5E4430]" />
          <p className="text-xs leading-snug text-[#5A4A3C]">
            {benefit.title && <span className="block text-sm font-bold text-[#5E4430]">{benefit.title}</span>}
            {benefit.text}
          </p>
        </div>
      ))}
    </div>
  )
}

export function FaqsCard() {
  return (
    <section id="faqs" className={`${CARD} flex flex-col scroll-mt-24`}>
      <CardHead icon="question" eyebrow={FAQS.eyebrow} title={FAQS.title} />
      <div className="space-y-2 p-5">
        {FAQS.items.map((item) => (
          <details key={item.q} className="group rounded-lg border border-[#E4DED4] open:bg-[#FBFAF7]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-xs font-medium text-[#3D332B] marker:hidden">
              {item.q}
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-[#A99D92] transition group-open:rotate-180" aria-hidden>
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <p className="px-3 pb-3 text-[11px] leading-relaxed text-[#5A4A3C]">{item.a}</p>
          </details>
        ))}
      </div>
      <CardLink label={FAQS.linkLabel} href="#faqs" />
    </section>
  )
}

export function BasesCard() {
  return (
    <section id="bases" className={`${CARD} flex flex-col scroll-mt-24`}>
      <CardHead icon="doc" eyebrow={BASES.eyebrow} title={BASES.title} />
      <ul className="space-y-3 p-5">
        {BASES.items.map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-snug text-[#5A4A3C]">
            <Check className="mt-px h-4 w-4 shrink-0 text-[#927847]" />
            {item}
          </li>
        ))}
      </ul>
      <CardLink label={BASES.linkLabel} href="#bases" />
    </section>
  )
}

export function TycCard() {
  return (
    <section id="tyc" className={`${CARD} scroll-mt-24 p-5`}>
      <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-[#5E4430]">
        <BenefitIcon name="doc" className="h-4 w-4 text-[#A88B57]" />
        {TYC.eyebrow}
      </p>
      <p className="mt-0.5 border-b border-[#EDE8E0] pb-3 text-xs text-[#8A7D72]">{TYC.title}</p>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-[11px] leading-relaxed text-[#5A4A3C]">
            Al participar aceptas nuestros{' '}
            <a href={TYC.termsHref} className="font-semibold text-[#5E4430] underline decoration-[#C9B48A] underline-offset-2">
              Términos y Condiciones
            </a>{' '}
            y la{' '}
            <a href={TYC.privacyHref} className="font-semibold text-[#5E4430] underline decoration-[#C9B48A] underline-offset-2">
              Política de Privacidad
            </a>
            .
          </p>
          <a
            href={TYC.termsHref}
            className="mt-3 inline-block rounded-md border border-[#E4DED4] px-4 py-2 text-xs font-semibold text-[#5E4430] transition hover:bg-[#FBFAF7]"
          >
            {TYC.cta}
          </a>
        </div>
        <BenefitIcon name="doc" className="h-14 w-14 shrink-0 text-[#D9C9A8]" />
      </div>
    </section>
  )
}

export function StepsCard() {
  return (
    <section id="como-participar" className={`${CARD} scroll-mt-24 p-5`}>
      <p className="text-sm font-bold tracking-wide text-[#5E4430]">{STEPS.eyebrow}</p>
      <p className="mt-0.5 text-xs text-[#8A7D72]">{STEPS.title}</p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {STEPS.items.map((step, index) => (
          <li
            key={step.text}
            className={`flex gap-2.5 text-xs leading-snug text-[#5A4A3C] ${'ideas' in step ? 'sm:col-span-2' : ''}`}
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#F3EEE6] text-[10px] font-bold text-[#927847]">
              {index + 1}
            </span>
            <div>
              {step.text}
              {'ideas' in step && step.ideas && (
                <ul className="mt-2 space-y-1.5">
                  {step.ideas.map((idea) => (
                    <li key={idea.title} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#927847]" />
                      <span>
                        <span className="font-semibold text-[#5E4430]">{idea.title}:</span> {idea.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

