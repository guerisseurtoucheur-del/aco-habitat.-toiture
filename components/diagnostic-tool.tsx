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
} from "lucide-react"
import type { DiagnosticResult, DiagnosticZone } from "@/lib/diagnostic-types"

type LayerType = "vegetal" | "structure" | "etancheite"

const layerConfig: Record<
  LayerType,
  { label: string; icon: typeof TreePine; color: string; canvasColor: string }
> = {
  vegetal: {
    label: "Vegetal",
    icon: TreePine,
    color: "text-vegetal-red",
    canvasColor: "vegetal",
  },
  structure: {
    label: "Structure",
    icon: Shield,
    color: "text-structure-blue",
    canvasColor: "structure",
  },
  etancheite: {
    label: "Etancheite",
    icon: Droplets,
    color: "text-etancheite-cyan",
    canvasColor: "etancheite",
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
    vegetal: { r: 220, g: 50, b: 50 },
    structure: { r: 60, g: 130, b: 246 },
    etancheite: { r: 20, g: 184, b: 166 },
  }
  const c = colors[layer] || colors.vegetal
  return {
    fill: `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`,
    stroke: `rgba(${c.r}, ${c.g}, ${c.b}, ${Math.min(alpha + 0.3, 0.9)})`,
  }
}

function ScoreGauge({ score, label }: { score: number; label: string }) {
  const getColor = (s: number) => {
    if (s >= 75) return "text-emerald-400"
    if (s >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className={`text-2xl font-bold ${getColor(score)}`}>{score}</span>
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
      faible:
        "bg-yellow-400/15 text-yellow-300 border-yellow-400/30",
      modere:
        "bg-orange-400/15 text-orange-300 border-orange-400/30",
      severe: "bg-red-400/15 text-red-300 border-red-400/30",
    }
    return styles[severity] || styles.faible
  }

  return (
    <section id="diagnostic" className="border-y border-border bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">
            Diagnostic IA
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Analysez votre toiture en temps reel
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Uploadez une photo satellite ou aerienne. Notre IA superpose des
            calques de diagnostic pour identifier chaque probleme.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left panel: Image + Canvas */}
          <div className="lg:col-span-2">
            {!imageData ? (
              <label
                htmlFor="roof-upload"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex min-h-[400px] cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Upload size={28} className="text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-base font-medium text-foreground">
                    Glissez votre photo ici
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    ou cliquez pour selectionner (JPG, PNG)
                  </p>
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
                <div className="flex flex-wrap items-center gap-3">
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
                        className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                          active
                            ? "border-primary/40 bg-primary/10 text-foreground"
                            : "border-border bg-muted/30 text-muted-foreground"
                        }`}
                      >
                        {active ? (
                          <Eye size={16} className={config.color} />
                        ) : (
                          <EyeOff size={16} />
                        )}
                        <config.icon size={16} className={active ? config.color : ""} />
                        {config.label}
                      </button>
                    )
                  })}

                  <label
                    htmlFor="roof-upload-change"
                    className="ml-auto cursor-pointer rounded-lg border border-border bg-muted/30 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
                  className="relative overflow-hidden rounded-xl border border-border"
                >
                  <canvas
                    ref={canvasRef}
                    className="block w-full"
                    onMouseMove={handleCanvasMouseMove}
                    onMouseLeave={() => setHoveredZone(null)}
                  />

                  {hoveredZone && (
                    <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-border bg-background/95 p-3 shadow-lg backdrop-blur-sm">
                      <p className="text-sm font-medium text-foreground">
                        {hoveredZone.zone.label}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {layerConfig[hoveredZone.layer].label}
                        </span>
                        <span
                          className={`rounded-md border px-2 py-0.5 text-xs ${getSeverityBadge(hoveredZone.zone.severity)}`}
                        >
                          {hoveredZone.zone.severity}
                        </span>
                      </div>
                    </div>
                  )}

                  {!result && !loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px]">
                      <button
                        onClick={runDiagnostic}
                        className="rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
                      >
                        Lancer le diagnostic IA
                      </button>
                    </div>
                  )}

                  {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/60 backdrop-blur-sm">
                      <Loader2 size={40} className="animate-spin text-primary" />
                      <p className="text-sm font-medium text-foreground">
                        Analyse en cours...
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Notre IA examine votre toiture
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                <AlertTriangle size={18} className="shrink-0 text-red-400" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}
          </div>

          {/* Right panel: Results */}
          <div className="flex flex-col gap-6">
            {!result ? (
              <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
                <Info size={32} className="text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Diagnostic en attente
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Uploadez une photo satellite ou aerienne de votre toiture,
                  puis lancez l{"'"}analyse pour obtenir un rapport detaille.
                </p>
              </div>
            ) : (
              <>
                {/* Global score */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Score global
                  </h3>
                  <div className="mt-4 flex items-center justify-between">
                    <ScoreGauge
                      score={result.scoreGlobal}
                      label="Global"
                    />
                    <ScoreGauge
                      score={result.vegetal.score}
                      label="Vegetal"
                    />
                    <ScoreGauge
                      score={result.structure.score}
                      label="Structure"
                    />
                    <ScoreGauge
                      score={result.etancheite.score}
                      label="Etancheite"
                    />
                  </div>
                  <div className="mt-4 rounded-lg bg-muted/50 p-3">
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
                        className="rounded-xl border border-border bg-card p-6"
                      >
                        <div className="flex items-center gap-2">
                          <config.icon size={18} className={config.color} />
                          <h3 className="text-sm font-semibold text-foreground">
                            {config.label}
                          </h3>
                          <span className="ml-auto text-xs text-muted-foreground">
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
                                className={`rounded-md border px-2 py-1 text-xs ${getSeverityBadge(zone.severity)}`}
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
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-sm font-semibold text-foreground">
                    Recommandations
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {result.recommandations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
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
                  className="block rounded-xl bg-primary py-3.5 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Demander un devis
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
