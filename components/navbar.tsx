"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Zap, Phone, Mail, Satellite } from "lucide-react"

const navLinks = [
  { href: "#diagnostic", label: "Diagnostic IA" },
  { href: "#methode", label: "Comment ca marche" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#immobilier", label: "Immobilier" },
  { href: "#faq", label: "FAQ" },
  { href: "#couvreurs", label: "Trouver un couvreur" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Paris",
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/90 backdrop-blur-xl shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className={`border-b border-border/40 transition-all duration-300 ${scrolled ? "hidden" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6">
            <a
              href="tel:+33233311979"
              className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone size={12} className="text-primary" />
              <span className="font-medium">02 33 31 19 79</span>
            </a>
            <a
              href="mailto:aco.habitat@orange.fr"
              className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={12} className="text-primary" />
              <span className="font-medium">aco.habitat@orange.fr</span>
            </a>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-xs text-muted-foreground">
              Analyse par satellite disponible partout en France
            </span>
            {currentTime && (
              <>
                <span className="h-3 w-px bg-border" />
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Satellite size={11} className="text-primary" />
                  <span className="font-mono text-[11px] tracking-wider tabular-nums text-primary/80">
                    {currentTime}
                  </span>
                  <span className="text-[9px] text-muted-foreground/60 uppercase tracking-widest">UTC+1</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full transition-transform group-hover:scale-105">
            <Image
              src="/images/logo-aco-habitat.png"
              alt="Logo ACO-HABITAT"
              width={44}
              height={44}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-primary/20 group-hover:ring-primary/40 transition-all" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground font-sans leading-tight">
              ACO-HABITAT
            </span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
              Diagnostic Toiture par IA
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#tarifs"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Voir les tarifs
          </a>
          <a
            href="#diagnostic"
            className="group relative flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            <Zap size={14} className="transition-transform group-hover:scale-110" />
            Analyser ma toiture - 19,90 EUR
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background/98 backdrop-blur-xl px-6 pb-6 lg:hidden">
          <div className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#tarifs"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-border px-4 py-3 text-center text-sm font-medium text-foreground"
              >
                Voir les tarifs
              </a>
              <a
                href="#diagnostic"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                <Zap size={14} />
                Analyser ma toiture - 19,90 EUR
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
