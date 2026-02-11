export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-xs font-bold text-primary-foreground font-sans">A</span>
          </div>
          <span className="font-bold text-foreground">ACO-HABITAT</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <a href="#services" className="transition-colors hover:text-foreground">
            Services
          </a>
          <a href="#diagnostic" className="transition-colors hover:text-foreground">
            Diagnostic IA
          </a>
          <a href="#methode" className="transition-colors hover:text-foreground">
            Notre methode
          </a>
          <a href="#contact" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          {"2025 ACO-HABITAT. Tous droits reserves."}
        </p>
      </div>
    </footer>
  )
}
