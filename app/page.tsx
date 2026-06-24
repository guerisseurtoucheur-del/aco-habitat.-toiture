import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TreatmentsSection } from "@/components/treatments-section"
import { ExpertiseSection } from "@/components/expertise-section"
import { MethodSection } from "@/components/method-section"
import { ZoneSection } from "@/components/zone-section"
import { DevisSection } from "@/components/devis-section"
import { Footer } from "@/components/footer"
import { StructuredData } from "@/components/structured-data"

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <HeroSection />
        <TreatmentsSection />
        <ExpertiseSection />
        <MethodSection />
        <ZoneSection />
        <DevisSection />
      </main>
      <Footer />
    </>
  )
}
