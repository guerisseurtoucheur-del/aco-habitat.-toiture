"use client"

import Image from "next/image"
import { Scan, Shield, Droplets, ArrowRight, Star } from "lucide-react"
import { useEffect, useState } from "react"

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

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-roof.jpg"
          alt="Vue aerienne d'une toiture"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
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
          Votre toiture analysee
          <br />
          <span className="text-gradient">en quelques secondes</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-pretty text-center text-base leading-relaxed text-muted-foreground md:text-lg">
          Uploadez une photo satellite ou aerienne de votre toit. Notre IA
          detecte la mousse, les fissures et les problemes d{"'"}etancheite
          avec une precision professionnelle.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#diagnostic"
            className="group relative flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20"
          >
            Lancer un diagnostic gratuit
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#methode"
            className="group flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-8 py-4 text-base font-medium text-secondary-foreground transition-all hover:bg-secondary hover:border-border/80"
          >
            Decouvrir notre methode
          </a>
        </div>

        {/* Social proof */}
        <div className="animate-fade-up-delay-3 mt-12 flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-accent text-accent" />
            ))}
            <span className="ml-2">4.9/5</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span>+500 diagnostics realises</span>
        </div>

        {/* Stats bar */}
        <div className="mt-20 w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-px rounded-2xl border border-border bg-border overflow-hidden sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 bg-card px-6 py-8">
              <span className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                <AnimatedCounter target={500} suffix="+" />
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
