import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { DiagnosticTool } from "@/components/diagnostic-tool"
import { MethodSection } from "@/components/method-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <DiagnosticTool />
      <MethodSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
