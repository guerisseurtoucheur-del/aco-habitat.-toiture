import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MethodSection } from "@/components/method-section"
import { DiagnosticTool } from "@/components/diagnostic-tool"
import { Footer } from "@/components/footer"
import { StructuredData } from "@/components/structured-data"

// Lazy load below-the-fold sections for better LCP
const PricingSection = dynamic(() => import("@/components/pricing-section").then(mod => ({ default: mod.PricingSection })), {
  loading: () => <div className="min-h-[400px]" />,
})
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="min-h-[400px]" />,
})
const ImmobilierSection = dynamic(() => import("@/components/immobilier-section").then(mod => ({ default: mod.ImmobilierSection })), {
  loading: () => <div className="min-h-[400px]" />,
})
const FaqSection = dynamic(() => import("@/components/faq-section").then(mod => ({ default: mod.FaqSection })), {
  loading: () => <div className="min-h-[400px]" />,
})
const CouvreurSection = dynamic(() => import("@/components/couvreur-section").then(mod => ({ default: mod.CouvreurSection })), {
  loading: () => <div className="min-h-[300px]" />,
})

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
