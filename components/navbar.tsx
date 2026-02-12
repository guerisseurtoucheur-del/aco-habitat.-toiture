"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Zap, Phone, Mail } from "lucide-react"

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#diagnostic", label: "Diagnostic IA" },
  { href: "#methode", label: "Methode" },
  { href: "#temoignages", label: "Temoignages" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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
          <span className="hidden text-xs text-muted-foreground sm:block">
            Intervention sur toute la France
          </span>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary transition-transform group-hover:scale-105">
            <span className="text-sm font-bold text-primary-foreground font-sans tracking-wide">A</span>
            <div className="absolute inset-0 rounded-xl bg-primary/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground font-sans leading-tight">
              ACO-HABITAT
            </span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
              Expert Couverture & Charpente
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
            href="tel:+33233311979"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            02 33 31 19 79
          </a>
          <a
            href="#diagnostic"
            className="group relative flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            <Zap size={14} className="transition-transform group-hover:scale-110" />
            Diagnostic gratuit
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
                href="tel:+33233311979"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-border px-4 py-3 text-center text-sm font-medium text-foreground"
              >
                02 33 31 19 79
              </a>
              <a
                href="#diagnostic"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                <Zap size={14} />
                Diagnostic gratuit
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
