"use client"

import { Check, Zap, FileText, Brain, Scan, Shield, Droplets, Thermometer } from "lucide-react"

const features = [
  { icon: Brain, label: "Analyse IA multi-calques" },
  { icon: Scan, label: "Detection mousse et lichen" },
  { icon: Shield, label: "Detection fissures et tuiles" },
  { icon: Droplets, label: "Analyse etancheite" },
  { icon: Thermometer, label: "Analyse thermique" },
  { icon: FileText, label: "Rapport PDF complet" },
]

export function PricingSection() {
  return (
    <section id="tarifs" className="relative py-16 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-glow-blue),_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary tracking-wide">
            Tarif simple
          </span>
          <h2
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Un diagnostic complet pour{" "}
            <span className="text-gradient">19,90 EUR</span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Pas d{"'"}abonnement, pas de frais caches. Payez uniquement quand vous en avez besoin.
          </p>
        </div>

        {/* Pricing card */}
        <div className="mx-auto mt-10 max-w-lg sm:mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card/80 p-6 backdrop-blur-sm sm:rounded-3xl sm:p-10">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
            <div className="relative">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-4xl font-bold text-foreground sm:text-6xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  19,90
                </span>
                <span className="text-lg text-muted-foreground sm:text-xl">EUR</span>
                <span className="ml-2 text-xs text-muted-foreground sm:text-sm">/ diagnostic</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Analyse complete de votre toiture par intelligence artificielle
                avec rapport PDF telechareable instantanement.
              </p>

              <a
                href="#diagnostic"
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <Zap size={18} className="transition-transform group-hover:scale-110" />
                Analyser ma toiture
              </a>

              <ul className="mt-8 flex flex-col gap-3">
                {features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check size={13} className="text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature.label}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={async () => {
                  const { generateDiagnosticPDF } = await import("@/lib/generate-pdf")

                  // Generate a realistic satellite-style roof image via canvas
                  const canvas = document.createElement("canvas")
                  canvas.width = 800
                  canvas.height = 600
                  const ctx = canvas.getContext("2d")!

                  // Background: grass/garden with realistic texture
                  const grassGrad = ctx.createRadialGradient(400, 300, 50, 400, 300, 500)
                  grassGrad.addColorStop(0, "#3d6b2e")
                  grassGrad.addColorStop(0.5, "#2d5a20")
                  grassGrad.addColorStop(1, "#1e4a15")
                  ctx.fillStyle = grassGrad
                  ctx.fillRect(0, 0, 800, 600)

                  // Grass texture noise
                  for (let i = 0; i < 3000; i++) {
                    const gx = Math.random() * 800
                    const gy = Math.random() * 600
                    ctx.fillStyle = `rgba(${30 + Math.random() * 40}, ${60 + Math.random() * 50}, ${15 + Math.random() * 30}, 0.4)`
                    ctx.fillRect(gx, gy, 2, 2)
                  }

                  // Driveway / path
                  ctx.fillStyle = "#6b6b6b"
                  ctx.fillRect(620, 0, 120, 600)
                  ctx.fillStyle = "#5e5e5e"
                  for (let py = 0; py < 600; py += 8) {
                    ctx.fillRect(620, py, 120, 4)
                  }

                  // Terrace next to house
                  ctx.fillStyle = "#8a7a6a"
                  ctx.fillRect(140, 410, 480, 70)
                  ctx.fillStyle = "#7d6d5d"
                  for (let tx = 140; tx < 620; tx += 25) {
                    ctx.strokeStyle = "rgba(0,0,0,0.15)"
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(tx, 410)
                    ctx.lineTo(tx, 480)
                    ctx.stroke()
                  }

                  // House shadow (south-east)
                  ctx.fillStyle = "rgba(0,0,0,0.25)"
                  ctx.fillRect(170, 395, 460, 25)
                  ctx.fillRect(610, 115, 25, 290)

                  // Main roof body
                  ctx.fillStyle = "#9B5523"
                  ctx.fillRect(155, 100, 470, 300)

                  // Roof gradient for depth (south side lighter)
                  const roofGrad = ctx.createLinearGradient(155, 100, 155, 400)
                  roofGrad.addColorStop(0, "rgba(0,0,0,0.15)")
                  roofGrad.addColorStop(0.48, "rgba(0,0,0,0.05)")
                  roofGrad.addColorStop(0.52, "rgba(255,255,255,0.08)")
                  roofGrad.addColorStop(1, "rgba(0,0,0,0.1)")
                  ctx.fillStyle = roofGrad
                  ctx.fillRect(155, 100, 470, 300)

                  // Individual tile rows
                  for (let row = 0; row < 20; row++) {
                    const y = 100 + row * 15
                    const isNorthSide = row < 10
                    for (let col = 0; col < 32; col++) {
                      const x = 155 + col * 14.7
                      const offset = row % 2 === 0 ? 7 : 0
                      // Vary tile color
                      const r = 140 + Math.random() * 30
                      const g = 70 + Math.random() * 20
                      const b = 30 + Math.random() * 15
                      ctx.fillStyle = `rgb(${r},${g},${b})`
                      ctx.fillRect(x + offset, y, 13.5, 14)
                      // Tile edge shadow
                      ctx.strokeStyle = "rgba(0,0,0,0.2)"
                      ctx.lineWidth = 0.5
                      ctx.strokeRect(x + offset, y, 13.5, 14)

                      // Moss on north side (top rows)
                      if (isNorthSide && Math.random() > 0.6) {
                        ctx.fillStyle = `rgba(${50 + Math.random() * 30}, ${90 + Math.random() * 40}, ${30 + Math.random() * 20}, ${0.3 + Math.random() * 0.4})`
                        ctx.fillRect(x + offset + 2, y + 2, 9, 10)
                      }
                    }
                  }

                  // Ridge line (faitage)
                  ctx.strokeStyle = "#6B4010"
                  ctx.lineWidth = 6
                  ctx.beginPath()
                  ctx.moveTo(155, 250)
                  ctx.lineTo(625, 250)
                  ctx.stroke()
                  // Ridge highlight
                  ctx.strokeStyle = "rgba(255,220,180,0.3)"
                  ctx.lineWidth = 2
                  ctx.beginPath()
                  ctx.moveTo(155, 249)
                  ctx.lineTo(625, 249)
                  ctx.stroke()

                  // Chimney
                  ctx.fillStyle = "#7a6a5a"
                  ctx.fillRect(480, 140, 35, 40)
                  ctx.fillStyle = "#5a4a3a"
                  ctx.fillRect(480, 140, 35, 4)
                  ctx.fillStyle = "#333"
                  ctx.fillRect(488, 148, 8, 8)
                  ctx.fillRect(504, 148, 8, 8)
                  // Chimney shadow
                  ctx.fillStyle = "rgba(0,0,0,0.2)"
                  ctx.fillRect(515, 145, 8, 35)

                  // Gutters (gouttieres)
                  ctx.strokeStyle = "#999"
                  ctx.lineWidth = 3
                  ctx.beginPath()
                  ctx.moveTo(155, 100)
                  ctx.lineTo(155, 400)
                  ctx.stroke()
                  ctx.beginPath()
                  ctx.moveTo(625, 100)
                  ctx.lineTo(625, 400)
                  ctx.stroke()

                  // Small extension / garage roof
                  ctx.fillStyle = "#8a5020"
                  ctx.fillRect(520, 400, 100, 80)
                  for (let row = 0; row < 5; row++) {
                    for (let col = 0; col < 7; col++) {
                      const r = 125 + Math.random() * 25
                      const g = 65 + Math.random() * 15
                      const b = 25 + Math.random() * 10
                      ctx.fillStyle = `rgb(${r},${g},${b})`
                      ctx.fillRect(520 + col * 14.3 + (row % 2 === 0 ? 7 : 0), 400 + row * 16, 13, 15)
                    }
                  }

                  // Trees (circular canopy)
                  const trees = [[70, 200, 35], [80, 500, 28], [700, 80, 30], [720, 520, 25]]
                  for (const [tx, ty, tr] of trees) {
                    ctx.fillStyle = "rgba(0,0,0,0.15)"
                    ctx.beginPath()
                    ctx.arc(tx + 5, ty + 5, tr, 0, Math.PI * 2)
                    ctx.fill()
                    const treeGrad = ctx.createRadialGradient(tx - 5, ty - 5, 2, tx, ty, tr)
                    treeGrad.addColorStop(0, "#4a8a30")
                    treeGrad.addColorStop(0.7, "#2a6a18")
                    treeGrad.addColorStop(1, "#1a5010")
                    ctx.fillStyle = treeGrad
                    ctx.beginPath()
                    ctx.arc(tx, ty, tr, 0, Math.PI * 2)
                    ctx.fill()
                  }

                  // "EXEMPLE" watermark
                  ctx.save()
                  ctx.translate(400, 300)
                  ctx.rotate(-0.3)
                  ctx.font = "bold 60px sans-serif"
                  ctx.fillStyle = "rgba(255,255,255,0.15)"
                  ctx.textAlign = "center"
                  ctx.fillText("EXEMPLE", 0, 0)
                  ctx.restore()

                  const roofImage = canvas.toDataURL("image/jpeg", 0.9)

                  await generateDiagnosticPDF(
                    {
                      toitureType: "tuiles",
                      toitureDescription: "Toiture en tuiles terre cuite de type canal, orientation sud/nord, surface estimee a 85m2. Presence de mousse visible sur le versant nord.",
                      surfaceEstimeeM2: 85,
                      surfacePrecision: "moyenne",
                      scoreGlobal: 68,
                      summary: "Toiture en etat correct necessitant un entretien preventif. Mousse a traiter sur le versant nord, faitage a surveiller. Pas d'urgence mais des travaux d'entretien sont recommandes dans les 12 prochains mois.",
                      vegetal: {
                        description: "Mousse presente sur environ 30% de la surface du versant nord, concentration au niveau des joints entre tuiles. Lichen visible sur les rives.",
                        zones: [
                          { x: 20, y: 15, width: 30, height: 20, severity: "modere" as const, label: "Mousse versant nord" },
                          { x: 60, y: 10, width: 15, height: 10, severity: "faible" as const, label: "Lichen sur rive" },
                        ],
                        score: 55,
                      },
                      structure: {
                        description: "Legere usure du mortier de faitage sur 2 metres lineaires. Ensemble de la charpente en bon etat apparent.",
                        zones: [
                          { x: 30, y: 5, width: 25, height: 8, severity: "faible" as const, label: "Usure faitage" },
                        ],
                        score: 72,
                      },
                      etancheite: {
                        description: "Traces d'humidite anciennes au niveau de la noue gauche. Joint de raccord a verifier. Gouttieres en bon etat.",
                        zones: [
                          { x: 5, y: 40, width: 12, height: 15, severity: "modere" as const, label: "Noue a verifier" },
                        ],
                        score: 65,
                      },
                      recommandations: [
                        "Nettoyage anti-mousse du versant nord dans les 6 mois",
                        "Surveillance annuelle du faitage, refection a envisager sous 2-3 ans",
                        "Inspection rapprochee de la noue par un couvreur",
                        "Verifier l'isolation des combles et le raccord mur pignon",
                      ],
                      thermique: {
                        scoreIsolation: 78,
                        pertesChaleur: [
                          { x: 40, y: 30, width: 20, height: 15, intensite: 12, label: "Jonction mur pignon" },
                        ],
                        economieEstimee: 680,
                        commentaire: "Isolation correcte dans l'ensemble. Deperdition detectee au niveau de la jonction toiture-mur pignon.",
                      },
                    } as never,
                    roofImage,
                    "12 Rue des Lilas, 78000 Versailles (EXEMPLE)",
                    [{ type: "area", value: 85 }, { type: "perimeter", value: 42 }, { type: "ridge", value: 9 }]
                  )
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary"
              >
                <FileText size={16} />
                Voir un exemple de rapport PDF
              </button>

              <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Paiement securise par Stripe.</span>{" "}
                  Vous ne payez que lorsque vous lancez un diagnostic. Aucun abonnement, aucun engagement.
                  Le rapport PDF est genere instantanement apres l{"'"}analyse.
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
