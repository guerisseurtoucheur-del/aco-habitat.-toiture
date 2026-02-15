"use client"

import Image from "next/image"
import { Scan, Shield, Droplets, ArrowRight, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { WeatherAlertBanner } from "@/components/weather-alert-banner"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target])

  return (
    <span>
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  )
}

function useDiagnosticCount() {
  const [count, setCount] = useState(147) // fallback
  useEffect(() => {
    fetch("/api/diagnostics")
      .then(r => r.json())
      .then(d => { if (d.count > 0) setCount(d.count) })
      .catch(() => {})
  }, [])
  return count
}

export function HeroSection() {
  const diagCount = useDiagnosticCount()
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/toiture-aerienne.png"
          alt="Vue aerienne d'une toiture en pierre analysee par drone"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-glow-blue),_transparent_60%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-32 pb-20">
        {/* Weather Alert Banner */}
        <div className="mb-6 w-full max-w-3xl">
          <WeatherAlertBanner />
        </div>

        {/* Badge */}
        <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
            <Scan size={10} className="text-primary" />
          </div>
          <span className="text-xs font-medium text-primary tracking-wide">
            Technologie IA de derniere generation
          </span>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-up-delay-1 max-w-5xl text-balance text-center text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Diagnostic toiture par IA
          <br />
          <span className="text-gradient">en 30 secondes</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-pretty text-center text-base leading-relaxed text-muted-foreground md:text-lg">
          Uploadez une photo satellite, drone ou smartphone. Notre IA analyse
          mousse, fissures, etancheite et deperditions thermiques.
          Recevez un rapport PDF complet instantanement.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#diagnostic"
            className="group relative flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20"
          >
            Analyser ma toiture - 19,90 EUR
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#methode"
            className="group flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-8 py-4 text-base font-medium text-secondary-foreground transition-all hover:bg-secondary hover:border-border/80"
          >
            Comment ca marche
          </a>
        </div>

        {/* Price highlight */}
        <div className="animate-fade-up-delay-3 mt-12 flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <Zap size={14} className="text-primary" />
            <span className="font-semibold text-foreground">19,90 EUR</span>
            <span>par diagnostic</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span>Rapport PDF inclus</span>
        </div>

        {/* Stats bar */}
        <div className="mt-20 w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-px rounded-2xl border border-border bg-border overflow-hidden sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 bg-card px-6 py-8">
              <span className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                <AnimatedCounter target={diagCount} suffix="+" />
              </span>
              <span className="text-sm text-muted-foreground">Diagnostics realises</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-card px-6 py-8">
              <span className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                <AnimatedCounter target={98} suffix="%" />
              </span>
              <span className="text-sm text-muted-foreground">Precision de detection</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-card px-6 py-8">
              <span className="text-3xl font-bold text-accent" style={{ fontFamily: "var(--font-heading)" }}>
                {"<"}30s
              </span>
              <span className="text-sm text-muted-foreground">Temps d{"'"}analyse</span>
            </div>
          </div>
        </div>

        {/* Photo toiture */}
        <div className="mt-12 w-full max-w-4xl overflow-hidden rounded-2xl border border-border shadow-2xl shadow-primary/5">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/images/toiture-aerienne.png"
              alt="Vue aerienne d'une toiture en pierre analysee par IA - diagnostic ACO-HABITAT"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg border border-border/50 bg-background/80 px-3 py-1.5 backdrop-blur-sm">
              <Scan size={12} className="text-primary" />
              <span className="text-[11px] font-medium text-foreground">Analyse aerienne par IA</span>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-vegetal-red/30 hover:bg-card/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vegetal-red/10 transition-colors group-hover:bg-vegetal-red/15">
              <Scan size={22} className="text-vegetal-red" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              Calque Vegetal
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Detection du lichen et de la mousse sur l{"'"}ensemble de votre couverture
            </p>
          </div>

          <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-structure-blue/30 hover:bg-card/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-structure-blue/10 transition-colors group-hover:bg-structure-blue/15">
              <Shield size={22} className="text-structure-blue" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              Calque Structure
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Identification des tuiles deplacees, cassees ou manquantes
            </p>
          </div>

          <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-etancheite-cyan/30 hover:bg-card/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-etancheite-cyan/10 transition-colors group-hover:bg-etancheite-cyan/15">
              <Droplets size={22} className="text-etancheite-cyan" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              Calque Etancheite
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Analyse des traces d{"'"}humidite et risques d{"'"}infiltration
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
