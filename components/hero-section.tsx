import Image from "next/image"
import { Scan, Shield, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-roof.jpg"
          alt="Vue aerienne d'une toiture"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
          <Scan size={14} className="text-primary" />
          <span className="text-xs font-medium text-primary">
            Diagnostic par Intelligence Artificielle
          </span>
        </div>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Votre toiture analysee{" "}
          <span className="text-primary">en quelques secondes</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Uploadez une photo satellite ou aerienne de votre toit. Notre IA
          detecte la mousse, les tuiles cassees et les problemes d{"'"}etancheite
          avec une precision professionnelle.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#diagnostic"
            className="rounded-lg bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Lancer un diagnostic gratuit
          </a>
          <a
            href="#methode"
            className="rounded-lg border border-border bg-secondary px-8 py-3.5 text-base font-medium text-secondary-foreground transition-colors hover:bg-muted"
          >
            Decouvrir notre methode
          </a>
        </div>

        <div className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vegetal-red/15">
              <Scan size={20} className="text-vegetal-red" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              Calque Vegetal
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Detection du lichen et de la mousse sur votre couverture
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-structure-blue/15">
              <Shield size={20} className="text-structure-blue" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              Calque Structure
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Identification des tuiles deplacees ou cassees
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-etancheite-cyan/15">
              <Zap size={20} className="text-etancheite-cyan" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              Calque Etancheite
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Analyse des traces d{"'"}humidite et infiltrations
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
