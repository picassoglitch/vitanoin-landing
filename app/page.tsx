import { BasesCard, BenefitsStrip, FaqsCard, StepsCard, TycCard } from './components/cards'
import { HeroBanner } from './components/hero'
import { RegistrationForm } from './components/registration-form'
import { SiteFooter, SiteHeader } from './components/site-chrome'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F6F1] text-[#1F1B17]">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] overflow-x-hidden px-4 py-8 sm:px-6">
        <HeroBanner />

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
