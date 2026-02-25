/* Page d'accueil ACO-HABITAT */
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PricingSection } from "@/components/pricing-section"
import { MethodSection } from "@/components/method-section"
import { DiagnosticTool } from "@/components/diagnostic-tool"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ImmobilierSection } from "@/components/immobilier-section"
import { FaqSection } from "@/components/faq-section"
import { CouvreurSection } from "@/components/couvreur-section"
import { Footer } from "@/components/footer"
import { StructuredData } from "@/components/structured-data"

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <HeroSection />
        <MethodSection />
        <DiagnosticTool />
        <PricingSection />
        <TestimonialsSection />
        <ImmobilierSection />
        <FaqSection />
        <CouvreurSection />
      </main>
      <Footer />
    </>
  )
}
