"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"

const navLinks = [
  { href: "/#traitements", label: "Nos traitements" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#methode", label: "Notre methode" },
  { href: "/#zone", label: "Zone d'intervention" },
  { href: "/blog", label: "Conseils" },
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
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-border transition-transform group-hover:scale-105">
            <Image
              src="/images/logo-aco-habitat.png"
              alt="Logo ACO-HABITAT"
              width={44}
              height={44}
              className="object-cover"
              priority
              sizes="44px"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground leading-tight">
              ACO-HABITAT
            </span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-[0.15em] uppercase">
              Traitement du bois & charpente
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-secondary-foreground transition-colors hover:text-foreground hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+33233311979"
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <Phone size={14} className="text-primary" />
            02 33 31 19 79
          </a>
          <a
            href="/#devis"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Devis gratuit
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
        <div className="border-t border-border bg-background/98 backdrop-blur-xl px-4 pb-6 lg:hidden">
          <div className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-secondary-foreground transition-colors hover:text-foreground hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="tel:+33233311979"
                className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-foreground"
              >
                <Phone size={15} className="text-primary" />
                02 33 31 19 79
              </a>
              <a
                href="/#devis"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Demander un devis gratuit
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
