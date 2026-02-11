"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import {
  Upload,
  Loader2,
  TreePine,
  Shield,
  Droplets,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
} from "lucide-react"
import type { DiagnosticResult, DiagnosticZone } from "@/lib/diagnostic-types"

type LayerType = "vegetal" | "structure" | "etancheite"

const layerConfig: Record<
  LayerType,
  { label: string; icon: typeof TreePine; color: string; canvasColor: string; borderColor: string }
> = {
  vegetal: {
    label: "Vegetal",
    icon: TreePine,
    color: "text-vegetal-red",
    canvasColor: "vegetal",
    borderColor: "border-vegetal-red/40",
  },
  structure: {
    label: "Structure",
    icon: Shield,
    color: "text-structure-blue",
    canvasColor: "structure",
    borderColor: "border-structure-blue/40",
  },
  etancheite: {
    label: "Etancheite",
    icon: Droplets,
    color: "text-etancheite-cyan",
    canvasColor: "etancheite",
    borderColor: "border-etancheite-cyan/40",
  },
}

function getCanvasColor(
  layer: string,
  severity: string
): { fill: string; stroke: string } {
  const alphaMap: Record<string, number> = {
    faible: 0.2,
    modere: 0.35,
    severe: 0.55,
  }
  const alpha = alphaMap[severity] || 0.3

  const colors: Record<string, { r: number; g: number; b: number }> = {
    vegetal: { r: 239, g: 68, b: 68 },
    structure: { r: 59, g: 130, b: 246 },
    etancheite: { r: 6, g: 182, b: 212 },
  }
  const c = colors[layer] || colors.vegetal
  return {
    fill: `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`,
    stroke: `rgba(${c.r}, ${c.g}, ${c.b}, ${Math.min(alpha + 0.3, 0.9)})`,
  }
}

function ScoreGauge({ score, label, color }: { score: number; label: string; color?: string }) {
  const getColor = (s: number) => {
    if (color) return color
    if (s >= 75) return "text-emerald-400"
    if (s >= 50) return "text-accent"
    return "text-vegetal-red"
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <span className={`text-3xl font-bold ${getColor(score)}`} style={{ fontFamily: "var(--font-heading)" }}>
        {score}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

export function DiagnosticTool() {
  const [imageData, setImageData] = useState<string | null>(null)
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeLayers, setActiveLayers] = useState<Set<LayerType>>(
    new Set(["vegetal", "structure", "etancheite"])
  )
  const [hoveredZone, setHoveredZone] = useState<{
    zone: DiagnosticZone
    layer: LayerType
  } | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleLayer = (layer: LayerType) => {
    setActiveLayers((prev) => {
      const next = new Set(prev)
      if (next.has(layer)) {
        next.delete(layer)
      } else {
        next.add(layer)
      }
      return next
    })
  }

  const drawOverlays = useCallback(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img || !result) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const container = containerRef.current
    if (!container) return

    const containerWidth = container.clientWidth
    const aspectRatio = img.naturalHeight / img.naturalWidth
    const displayWidth = containerWidth
    const displayHeight = containerWidth * aspectRatio

    canvas.width = displayWidth
    canvas.height = displayHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, displayWidth, displayHeight)

    const layerEntries: { layer: LayerType; zones: DiagnosticZone[] }[] = [
      { layer: "vegetal", zones: result.vegetal.zones },
      { layer: "structure", zones: result.structure.zones },
      { layer: "etancheite", zones: result.etancheite.zones },
    ]

    for (const entry of layerEntries) {
      if (!activeLayers.has(entry.layer)) continue
      for (const zone of entry.zones) {
        const x = (zone.x / 100) * displayWidth
        const y = (zone.y / 100) * displayHeight
        const w = (zone.width / 100) * displayWidth
        const h = (zone.height / 100) * displayHeight

        const { fill, stroke } = getCanvasColor(entry.layer, zone.severity)

        ctx.fillStyle = fill
        ctx.beginPath()
        ctx.roundRect(x, y, w, h, 6)
        ctx.fill()

        ctx.strokeStyle = stroke
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.roundRect(x, y, w, h, 6)
        ctx.stroke()

        ctx.fillStyle = stroke
        ctx.font = "bold 11px Inter, sans-serif"
        const labelWidth = ctx.measureText(zone.label).width + 12
        const labelHeight = 20
        const labelX = x
        const labelY = y - labelHeight - 4

        ctx.beginPath()
        ctx.roundRect(labelX, labelY, labelWidth, labelHeight, 4)
        ctx.fill()

        ctx.fillStyle = "#ffffff"
        ctx.fillText(zone.label, labelX + 6, labelY + 14)
      }
    }
  }, [result, activeLayers])

  useEffect(() => {
    drawOverlays()
  }, [drawOverlays])

  useEffect(() => {
    const handleResize = () => drawOverlays()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [drawOverlays])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setImageData(dataUrl)
      setResult(null)
      setError(null)

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        imageRef.current = img
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith("image/")) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setImageData(dataUrl)
      setResult(null)
      setError(null)

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        imageRef.current = img
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }

  const runDiagnostic = async () => {
    if (!imageData) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      })

      if (!res.ok) {
        throw new Error("Erreur lors de l'analyse")
      }

      const data = await res.json()
      setResult(data.diagnostic)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue"
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!result || !canvasRef.current) return
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100

    const allZones: { zone: DiagnosticZone; layer: LayerType }[] = []
    if (activeLayers.has("vegetal")) {
      result.vegetal.zones.forEach((z) =>
        allZones.push({ zone: z, layer: "vegetal" })
      )
    }
    if (activeLayers.has("structure")) {
      result.structure.zones.forEach((z) =>
        allZones.push({ zone: z, layer: "structure" })
      )
    }
    if (activeLayers.has("etancheite")) {
      result.etancheite.zones.forEach((z) =>
        allZones.push({ zone: z, layer: "etancheite" })
      )
    }

    const found = allZones.find(
      ({ zone }) =>
        mouseX >= zone.x &&
        mouseX <= zone.x + zone.width &&
        mouseY >= zone.y &&
        mouseY <= zone.y + zone.height
    )

    setHoveredZone(found || null)
  }

  const getSeverityBadge = (severity: string) => {
    const styles: Record<string, string> = {
      faible: "bg-accent/15 text-accent border-accent/30",
      modere: "bg-vegetal-orange/15 text-vegetal-orange border-vegetal-orange/30",
      severe: "bg-vegetal-red/15 text-vegetal-red border-vegetal-red/30",
    }
    return styles[severity] || styles.faible
  }

  return (
    <section id="diagnostic" className="relative border-y border-border bg-card/20 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-glow-blue),_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary tracking-wide">
            Diagnostic IA
          </span>
          <h2
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Analysez votre toiture{" "}
            <span className="text-gradient">en temps reel</span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Uploadez une photo satellite ou aerienne. Notre IA superpose des
            calques de diagnostic pour identifier chaque probleme.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left panel: Image + Canvas */}
          <div className="lg:col-span-2">
            {!imageData ? (
              <label
                htmlFor="roof-upload"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex min-h-[420px] cursor-pointer flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed border-border bg-card/30 transition-all hover:border-primary/40 hover:bg-card/50"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 glow-blue">
                  <Upload size={32} className="text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">
                    Glissez votre photo ici
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    ou cliquez pour selectionner (JPG, PNG)
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-xs text-muted-foreground">
                  <Zap size={12} className="text-accent" />
                  Analyse gratuite en moins de 30 secondes
                </div>
                <input
                  id="roof-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Layer toggles */}
                <div className="flex flex-wrap items-center gap-2">
                  {(
                    Object.entries(layerConfig) as [
                      LayerType,
                      (typeof layerConfig)[LayerType]
                    ][]
                  ).map(([key, config]) => {
                    const active = activeLayers.has(key)
                    return (
                      <button
                        key={key}
                        onClick={() => toggleLayer(key)}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                          active
                            ? `${config.borderColor} bg-card/80 text-foreground`
                            : "border-border bg-muted/30 text-muted-foreground"
                        }`}
                      >
                        {active ? (
                          <Eye size={15} className={config.color} />
                        ) : (
                          <EyeOff size={15} />
                        )}
                        <config.icon size={15} className={active ? config.color : ""} />
                        {config.label}
                      </button>
                    )
                  })}

                  <label
                    htmlFor="roof-upload-change"
                    className="ml-auto cursor-pointer rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
                  >
                    Changer l{"'"}image
                    <input
                      id="roof-upload-change"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                {/* Canvas */}
                <div
                  ref={containerRef}
                  className="relative overflow-hidden rounded-2xl border border-border"
                >
                  <canvas
                    ref={canvasRef}
                    className="block w-full"
                    onMouseMove={handleCanvasMouseMove}
                    onMouseLeave={() => setHoveredZone(null)}
                  />

                  {hoveredZone && (
                    <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-sm">
                      <p className="text-sm font-semibold text-foreground">
                        {hoveredZone.zone.label}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {layerConfig[hoveredZone.layer].label}
                        </span>
                        <span
                          className={`rounded-lg border px-2.5 py-0.5 text-xs font-medium ${getSeverityBadge(hoveredZone.zone.severity)}`}
                        >
                          {hoveredZone.zone.severity}
                        </span>
                      </div>
                    </div>
                  )}

                  {!result && !loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[3px]">
                      <button
                        onClick={runDiagnostic}
                        className="group flex items-center gap-2 rounded-2xl bg-primary px-10 py-5 text-base font-semibold text-primary-foreground shadow-2xl shadow-primary/20 transition-all hover:shadow-primary/30 hover:scale-[1.02]"
                      >
                        <Zap size={18} className="transition-transform group-hover:scale-110" />
                        Lancer le diagnostic IA
                      </button>
                    </div>
                  )}

                  {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-background/70 backdrop-blur-sm">
                      <div className="relative">
                        <Loader2 size={48} className="animate-spin text-primary" />
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
                      </div>
                      <div className="text-center">
                        <p className="text-base font-semibold text-foreground">
                          Analyse en cours...
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Notre IA examine votre toiture
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-vegetal-red/30 bg-vegetal-red/10 p-4">
                <AlertTriangle size={18} className="shrink-0 text-vegetal-red" />
                <p className="text-sm text-vegetal-red">{error}</p>
              </div>
            )}
          </div>

          {/* Right panel: Results */}
          <div className="flex flex-col gap-5">
            {!result ? (
              <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card/50 p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                  <Info size={28} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Diagnostic en attente
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Uploadez une photo satellite ou aerienne de votre toiture,
                  puis lancez l{"'"}analyse pour obtenir un rapport detaille.
                </p>
                <div className="w-full rounded-xl bg-secondary/50 p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Astuce : utilisez Google Maps en vue satellite pour capturer une image de votre toiture.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Global score */}
                <div className="rounded-2xl border border-border bg-card/50 p-6">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Score global
                  </h3>
                  <div className="mt-5 flex items-center justify-between">
                    <ScoreGauge score={result.scoreGlobal} label="Global" />
                    <ScoreGauge score={result.vegetal.score} label="Vegetal" color="text-vegetal-red" />
                    <ScoreGauge score={result.structure.score} label="Structure" color="text-structure-blue" />
                    <ScoreGauge score={result.etancheite.score} label="Etancheite" color="text-etancheite-cyan" />
                  </div>
                  <div className="mt-5 rounded-xl bg-secondary/50 p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {result.summary}
                    </p>
                  </div>
                </div>

                {/* Layer details */}
                {(["vegetal", "structure", "etancheite"] as LayerType[]).map(
                  (layer) => {
                    const data = result[layer]
                    const config = layerConfig[layer]
                    return (
                      <div
                        key={layer}
                        className="rounded-2xl border border-border bg-card/50 p-6"
                      >
                        <div className="flex items-center gap-2">
                          <config.icon size={18} className={config.color} />
                          <h3 className="text-sm font-semibold text-foreground">
                            {config.label}
                          </h3>
                          <span className="ml-auto rounded-lg bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                            {data.zones.length} zone(s)
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {data.description}
                        </p>
                        {data.zones.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {data.zones.map((zone, i) => (
                              <span
                                key={i}
                                className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${getSeverityBadge(zone.severity)}`}
                              >
                                {zone.label} - {zone.severity}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }
                )}

                {/* Recommendations */}
                <div className="rounded-2xl border border-border bg-card/50 p-6">
                  <h3 className="text-sm font-semibold text-foreground">
                    Recommandations
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {result.recommandations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle
                          size={14}
                          className="mt-0.5 shrink-0 text-primary"
                        />
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {rec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-center text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  <Zap size={16} />
                  Demander un devis gratuit
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
