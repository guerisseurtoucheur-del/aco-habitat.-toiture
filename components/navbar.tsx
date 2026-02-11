import { Satellite } from "lucide-react"

export function Navbar() {
  return (
    <nav className="p-6 border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter text-primary">
          ACO<span className="text-foreground">-HABITAT</span>
        </h1>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20 flex items-center gap-1.5">
          <Satellite className="h-3 w-3" />
          <span className="sr-only">Statut:</span>
          MODE SATELLITE ACTIF
        </div>
      </div>
    </nav>
  )
}
