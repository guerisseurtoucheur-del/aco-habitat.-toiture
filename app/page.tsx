import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { MethodSection } from "@/components/method-section"
import { DiagnosticTool } from "@/components/diagnostic-tool"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <MethodSection />
        <DiagnosticTool />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
