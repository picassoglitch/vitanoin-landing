import { BasesCard, BenefitsStrip, FaqsCard, ProductsCard, StepsCard, TycCard } from './components/cards'
import { HeroCollage, HeroCopy, ProductShot } from './components/hero'
import { RegistrationForm } from './components/registration-form'
import { SiteFooter, SiteHeader } from './components/site-chrome'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] overflow-x-hidden px-4 py-8 sm:px-6">
        {/* Hero: copy, photo collage, product shot */}
        <section className="grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <HeroCopy />
          </div>
          <div className="lg:col-span-4">
            <HeroCollage />
          </div>
          <div className="lg:col-span-4">
            <ProductShot />
          </div>
        </section>

        {/* Everything below sits in a main column with the form in a right rail,
            matching the approved layout. */}
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <BenefitsStrip />

            <div className="grid gap-6 md:grid-cols-2">
              <FaqsCard />
              <BasesCard />
            </div>

            <StepsCard />

            <ProductsCard />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <RegistrationForm />
            <TycCard />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
