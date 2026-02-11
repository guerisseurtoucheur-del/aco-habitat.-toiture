import { Navbar } from "@/components/navbar"
import { DiagnosticForm } from "@/components/diagnostic-form"

export default function Home() {
  console.log("[v0] Home page rendering")
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto max-w-2xl pt-12 px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-balance">
            Diagnostic Toiture IA
          </h2>
          <p className="text-muted-foreground">
            Importez une vue satellite pour une analyse immediate.
          </p>
        </div>
        <DiagnosticForm />
      </main>
    </div>
  )
}
