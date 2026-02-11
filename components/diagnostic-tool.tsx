"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import {
  MapPin,
  Search,
  Loader2,
  Satellite,
  Brain,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  FileText,
  Layers,
  Leaf,
  Wrench,
  Droplets,
  RotateCcw,
  Eye,
  EyeOff,
  Shield,
  Zap,
  ZoomIn,
  ZoomOut,
  Phone,
  Send,
} from "lucide-react"
import type { DiagnosticResult, DiagnosticZone } from "@/lib/diagnostic-types"

type Step = "address" | "satellite" | "scanning" | "analyzing" | "results"
type SatelliteImage = { zoom: number; label: string; image: string }

/* ── Scanning Overlay ── */
function ScannerOverlay({ phase }: { phase: "scanning" | "analyzing" }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Tech grid */}
      <div
        className="absolute inset-0 animate-grid-pulse"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Laser line */}
      {phase === "scanning" && (
        <>
          <div
            className="absolute left-0 right-0 h-[2px] animate-scan-line"
            style={{
              background:
                "linear-gradient(90deg, transparent, #3b82f6, #06b6d4, #3b82f6, transparent)",
              boxShadow: "0 0 20px 4px rgba(59,130,246,0.6), 0 0 60px 10px rgba(59,130,246,0.3)",
            }}
          />
          <div
            className="absolute left-0 right-0 h-[40px] animate-scan-glow"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(59,130,246,0.15), transparent)",
            }}
          />
        </>
      )}

      {/* Corner brackets */}
      <div className="animate-corner-blink">
        {[
          "top-2 left-2",
          "top-2 right-2 rotate-90",
          "bottom-2 left-2 -rotate-90",
          "bottom-2 right-2 rotate-180",
        ].map((pos) => (
          <div key={pos} className={`absolute ${pos}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 8V2h6" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </div>

      {/* Status HUD */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-background/80 px-3 py-1.5 backdrop-blur-sm">
        <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        <span className="font-mono text-[10px] font-medium text-primary">
          {phase === "scanning" ? "SCAN EN COURS..." : "ANALYSE IA..."}
        </span>
      </div>

      {/* Coordinates HUD */}
      <div className="absolute top-3 right-3 rounded-md bg-background/80 px-3 py-1.5 backdrop-blur-sm">
        <span className="font-mono text-[10px] text-muted-foreground">
          SAT-VIEW HD / {phase === "scanning" ? "LIDAR-SIM" : "AI-PROC"}
        </span>
      </div>
    </div>
  )
}

/* ── Zone Polygon Overlay ── */
function ZonePolygon({
  zone,
  color,
  visible,
  label,
  delay = 0,
}: {
  zone: DiagnosticZone
  color: string
  visible: boolean
  label: string
  delay?: number
}) {
  if (!visible) return null

  const severityColor =
    zone.severity === "severe"
      ? "#ef4444"
      : zone.severity === "modere"
        ? "#f59e0b"
        : color

  return (
    <div
      className="animate-zone-reveal absolute"
      style={{
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: `${zone.width}%`,
        height: `${zone.height}%`,
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Border with glow */}
      <div
        className="absolute inset-0 rounded-sm border-2"
        style={{
          borderColor: severityColor,
          boxShadow: `0 0 12px 2px ${severityColor}40, inset 0 0 12px 2px ${severityColor}15`,
          backgroundColor: `${severityColor}10`,
        }}
      />

      {/* Pulsing corner dots */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos) => (
        <div
          key={pos}
          className={`absolute ${pos} -translate-x-1/2 -translate-y-1/2`}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: severityColor,
            boxShadow: `0 0 6px 2px ${severityColor}60`,
          }}
        />
      ))}

      {/* Animated pulse ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="animate-pulse-ring h-3 w-3 rounded-full"
          style={{ backgroundColor: `${severityColor}30`, border: `1px solid ${severityColor}50` }}
        />
      </div>

      {/* Label tag */}
      <div
        className="absolute -top-7 left-0 flex items-center gap-1.5 whitespace-nowrap rounded px-2 py-1"
        style={{
          backgroundColor: severityColor,
          boxShadow: `0 2px 8px ${severityColor}50`,
        }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
        <span className="text-[9px] font-bold tracking-wide text-white uppercase">
          {label}
        </span>
      </div>
    </div>
  )
}

/* ── Score Gauge ── */
function ScoreGauge({
  score,
  label,
  icon: Icon,
  color,
}: {
  score: number
  label: string
  icon: React.ElementType
  color: string
}) {
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (score / 100) * circumference
  const getColor = (s: number) => {
    if (s >= 75) return "#22c55e"
    if (s >= 50) return "#f59e0b"
    return "#ef4444"
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="6" className="text-border" />
          <circle
            cx="40" cy="40" r="36" fill="none"
            stroke={getColor(score)} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-foreground">{score}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <Icon size={14} style={{ color }} />
        {label}
      </div>
    </div>
  )
}

/* ── Anomaly Card (sidebar) ── */
function AnomalyCard({
  zone,
  color,
  category,
  icon: Icon,
}: {
  zone: DiagnosticZone
  color: string
  category: string
  icon: React.ElementType
}) {
  const severityLabel =
    zone.severity === "severe" ? "Critique" : zone.severity === "modere" ? "Modere" : "Faible"
  const severityColor =
    zone.severity === "severe" ? "#ef4444" : zone.severity === "modere" ? "#f59e0b" : "#22c55e"

  return (
    <div className="rounded-xl border border-border bg-card/80 p-3 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ backgroundColor: `${color}20` }}>
          <Icon size={12} style={{ color }} />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{category}</span>
        <span
          className="ml-auto rounded px-1.5 py-0.5 text-[9px] font-bold text-white"
          style={{ backgroundColor: severityColor }}
        >
          {severityLabel}
        </span>
      </div>
      <p className="mb-3 text-xs leading-relaxed text-foreground/80">{zone.label}</p>
      <a
        href="#contact"
        className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-[10px] font-semibold text-primary-foreground transition-colors"
        style={{ backgroundColor: color }}
      >
        <Send size={10} />
        Demander un devis
      </a>
    </div>
  )
}

/* ── Material Badge ── */
function MaterialBadge({ type }: { type: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 backdrop-blur-sm">
      <div className="relative flex h-2 w-2 items-center justify-center">
        <div className="absolute h-full w-full animate-pulse rounded-full bg-primary" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
      </div>
      <span className="font-mono text-[11px] font-semibold tracking-wide text-primary uppercase">
        Materiau detecte : {type}
      </span>
    </div>
  )
}

/* ── Main Component ── */
export function DiagnosticTool() {
  const [step, setStep] = useState<Step>("address")
  const [address, setAddress] = useState("")
  const [satelliteImages, setSatelliteImages] = useState<SatelliteImage[]>([])
  const [activeZoom, setActiveZoom] = useState(0)
  const [formattedAddress, setFormattedAddress] = useState("")
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [layerState, setLayerState] = useState({
    vegetal: true,
    structure: true,
    etancheite: true,
  })
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSearch = useCallback(async () => {
    if (!address.trim()) return
    setError(null)
    setStep("satellite")

    try {
      const satRes = await fetch("/api/satellite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      })
      const satData = await satRes.json()

      if (!satRes.ok) {
        setError(satData.error || "Erreur lors de la recuperation de l'image satellite.")
        setStep("address")
        return
      }

      setSatelliteImages(satData.images || [{ zoom: 20, label: "Standard", image: satData.primaryImage }])
      setActiveZoom(0)
      setFormattedAddress(satData.formattedAddress)

      // Show scanning animation for 3 seconds
      setStep("scanning")
      await new Promise((r) => setTimeout(r, 3000))

      setStep("analyzing")

      const analysisImage = satData.images?.[0]?.image || satData.primaryImage
      const diagRes = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: analysisImage,
          address: satData.formattedAddress,
        }),
      })
      const diagData = await diagRes.json()

      if (!diagRes.ok) {
        setError(diagData.error || "Erreur lors de l'analyse IA.")
        setStep("address")
        return
      }

      setDiagnostic(diagData.diagnostic)
      setStep("results")

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 300)
    } catch {
      setError("Une erreur est survenue. Verifiez votre connexion et reessayez.")
      setStep("address")
    }
  }, [address])

  const handleReset = () => {
    setStep("address")
    setAddress("")
    setSatelliteImages([])
    setActiveZoom(0)
    setDiagnostic(null)
    setError(null)
    setLayerState({ vegetal: true, structure: true, etancheite: true })
  }

  const toggleLayer = (layer: keyof typeof layerState) => {
    setLayerState((prev) => ({ ...prev, [layer]: !prev[layer] }))
  }

  const getSeverityIcon = (score: number) => {
    if (score >= 75) return <CheckCircle2 size={16} className="text-green-500" />
    if (score >= 50) return <AlertTriangle size={16} className="text-amber-500" />
    return <XCircle size={16} className="text-red-500" />
  }

  const getSeverityText = (score: number) => {
    if (score >= 75) return "Bon etat"
    if (score >= 50) return "A surveiller"
    return "Intervention requise"
  }

  const allZones = diagnostic
    ? [
        ...diagnostic.vegetal.zones.map((z) => ({ ...z, category: "Vegetal" as const, color: "#22c55e", icon: Leaf })),
        ...diagnostic.structure.zones.map((z) => ({ ...z, category: "Structure" as const, color: "#ef4444", icon: Wrench })),
        ...diagnostic.etancheite.zones.map((z) => ({ ...z, category: "Etancheite" as const, color: "#3b82f6", icon: Droplets })),
      ]
    : []

  const progressSteps = [
    { key: "address", label: "Adresse", icon: MapPin },
    { key: "satellite", label: "Satellite", icon: Satellite },
    { key: "scanning", label: "Scan", icon: Zap },
    { key: "analyzing", label: "Analyse IA", icon: Brain },
    { key: "results", label: "Resultats", icon: FileText },
  ]
  const stepsOrder: Step[] = ["address", "satellite", "scanning", "analyzing", "results"]
  const currentIndex = stepsOrder.indexOf(step)

  return (
    <section id="diagnostic" className="relative py-24">
      {/* SVG sharpening filter for satellite images */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="sharpen">
            <feConvolveMatrix
              order="3"
              kernelMatrix="0 -0.5 0  -0.5 3 -0.5  0 -0.5 0"
              preserveAlpha="true"
            />
          </filter>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--color-glow-blue),_transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Satellite size={14} />
            Diagnostic par Satellite
          </div>
          <h2
            className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Analysez votre toiture{" "}
            <span className="text-gradient">par satellite</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Entrez simplement votre adresse. Notre IA analyse l{"'"}image satellite
            de votre toit et vous fournit un diagnostic complet en quelques secondes.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mx-auto mb-12 flex max-w-3xl items-center justify-center gap-1">
          {progressSteps.map((s, i, arr) => {
            const stepIndex = stepsOrder.indexOf(s.key as Step)
            const isActive = stepIndex <= currentIndex
            return (
              <div key={s.key} className="flex items-center gap-1">
                <div
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium transition-all ${
                    isActive ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <s.icon size={10} />
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <ChevronRight size={12} className={isActive ? "text-primary" : "text-muted-foreground/30"} />
                )}
              </div>
            )
          })}
        </div>

        {/* Address Input */}
        {(step === "address" || step === "satellite") && (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    Entrez votre adresse
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Nous recupererons l{"'"}image satellite de votre toiture
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && step === "address" && handleSearch()}
                    placeholder="12 rue de la Paix, 75002 Paris"
                    disabled={step !== "address"}
                    className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={step !== "address" || !address.trim()}
                  className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  {step === "satellite" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span className="hidden sm:inline">Satellite...</span>
                    </>
                  ) : (
                    <>
                      <Satellite size={16} />
                      <span className="hidden sm:inline">Analyser</span>
                    </>
                  )}
                </button>
              </div>

              {step === "satellite" && (
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <Loader2 size={20} className="animate-spin text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Recuperation de l{"'"}image satellite...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Connexion aux serveurs satellite en cours
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                  <XCircle size={20} className="shrink-0 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: Satellite, label: "Vue satellite HD", desc: "Resolution x2 doublee" },
                  { icon: Shield, label: "Sans deplacement", desc: "100% a distance" },
                  { icon: Zap, label: "Resultat en 30s", desc: "Analyse instantanee" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-secondary/30 p-4 text-center">
                    <f.icon size={20} className="text-primary" />
                    <p className="text-xs font-medium text-foreground">{f.label}</p>
                    <p className="text-[10px] text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scanning / Analyzing View */}
        {(step === "scanning" || step === "analyzing") && satelliteImages.length > 0 && (
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-primary/30 bg-card">
              {/* Top HUD bar */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span className="font-mono text-xs font-medium text-primary">
                    {step === "scanning" ? "SCAN TOITURE EN COURS" : "ANALYSE IA EN COURS"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">{formattedAddress}</span>
                </div>
              </div>

              {/* Image with scanner */}
              <div className="relative">
                <img
                    src={satelliteImages[0]?.image}
                    alt="Vue satellite"
                    className="w-full"
                    style={{ filter: "url(#sharpen) contrast(1.15) saturate(1.1) brightness(1.05)" }}
                />
                <ScannerOverlay phase={step} />
              </div>

              {/* Bottom status bar */}
              <div className="flex items-center gap-4 border-t border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Brain size={14} className="animate-pulse text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {step === "scanning"
                      ? "Scan lidar simule... Detection des contours de la toiture"
                      : "Analyse IA multi-calques : vegetation, structure, etancheite"}
                  </span>
                </div>
                <div className="ml-auto">
                  <Loader2 size={14} className="animate-spin text-primary" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {step === "results" && diagnostic && satelliteImages.length > 0 && (
          <div ref={resultsRef} className="animate-fade-up space-y-8">
            {/* Address bar + Material detection */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{formattedAddress}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Diagnostic satellite - {new Date().toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {diagnostic.toitureType && <MaterialBadge type={diagnostic.toitureType} />}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw size={12} />
                  Nouvelle analyse
                </button>
              </div>
            </div>

            {/* Material description */}
            {diagnostic.toitureDescription && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm leading-relaxed text-foreground/80">
                  {diagnostic.toitureDescription}
                </p>
              </div>
            )}

            {/* Score global */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center gap-3">
                <Shield size={20} className="text-primary" />
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  Score global de votre toiture
                </h3>
              </div>
              <div className="grid gap-8 md:grid-cols-5">
                <div className="flex flex-col items-center justify-center gap-3 md:col-span-2">
                  <div className="relative h-36 w-36">
                    <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />
                      <circle
                        cx="60" cy="60" r="52" fill="none"
                        stroke={diagnostic.scoreGlobal >= 75 ? "#22c55e" : diagnostic.scoreGlobal >= 50 ? "#f59e0b" : "#ef4444"}
                        strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 52}
                        strokeDashoffset={2 * Math.PI * 52 - (diagnostic.scoreGlobal / 100) * 2 * Math.PI * 52}
                        style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-foreground">{diagnostic.scoreGlobal}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(diagnostic.scoreGlobal)}
                    <span className="text-sm font-medium text-foreground">
                      {getSeverityText(diagnostic.scoreGlobal)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-8 md:col-span-3">
                  <ScoreGauge score={diagnostic.vegetal.score} label="Vegetal" icon={Leaf} color="#22c55e" />
                  <ScoreGauge score={diagnostic.structure.score} label="Structure" icon={Wrench} color="#ef4444" />
                  <ScoreGauge score={diagnostic.etancheite.score} label="Etancheite" icon={Droplets} color="#3b82f6" />
                </div>
              </div>
              <p className="mt-6 rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
                {diagnostic.summary}
              </p>
            </div>

            {/* Image + Zones + Sidebar */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Satellite image with overlay zones */}
              <div className="lg:col-span-2">
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Layers size={14} className="text-primary" />
                      <span className="text-xs font-medium text-foreground">Vue satellite avec calques</span>
                      {satelliteImages.length > 1 && (
                        <div className="flex items-center gap-0.5 rounded-lg border border-border bg-secondary/50 p-0.5">
                          {satelliteImages.map((img, i) => (
                            <button
                              key={img.zoom}
                              onClick={() => setActiveZoom(i)}
                              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-medium transition-all ${
                                activeZoom === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {i === 0 ? <ZoomIn size={8} /> : i === satelliteImages.length - 1 ? <ZoomOut size={8} /> : null}
                              {img.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[
                        { key: "vegetal" as const, label: "Vegetal", color: "#22c55e" },
                        { key: "structure" as const, label: "Structure", color: "#ef4444" },
                        { key: "etancheite" as const, label: "Etancheite", color: "#3b82f6" },
                      ].map((l) => (
                        <button
                          key={l.key}
                          onClick={() => toggleLayer(l.key)}
                          className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-all"
                          style={{
                            backgroundColor: layerState[l.key] ? `${l.color}20` : "transparent",
                            color: layerState[l.key] ? l.color : "var(--color-muted-foreground)",
                            border: `1px solid ${layerState[l.key] ? l.color : "var(--color-border)"}`,
                          }}
                        >
                          {layerState[l.key] ? <Eye size={10} /> : <EyeOff size={10} />}
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image with polygon overlays */}
                  <div className="relative">
                    <img
                    src={satelliteImages[activeZoom]?.image || satelliteImages[0]?.image}
                    alt="Vue satellite de la toiture"
                    className="w-full"
                    crossOrigin="anonymous"
                    style={{ filter: "url(#sharpen) contrast(1.15) saturate(1.1) brightness(1.05)" }}
                    />
                    {/* Tech grid overlay */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />

                    {/* Zone overlays with colored borders */}
                    {diagnostic.vegetal.zones.map((z, i) => (
                      <ZonePolygon
                        key={`v-${i}`}
                        zone={z}
                        color="#22c55e"
                        visible={layerState.vegetal}
                        label={z.label}
                        delay={i * 200}
                      />
                    ))}
                    {diagnostic.structure.zones.map((z, i) => (
                      <ZonePolygon
                        key={`s-${i}`}
                        zone={z}
                        color="#ef4444"
                        visible={layerState.structure}
                        label={z.label}
                        delay={(diagnostic.vegetal.zones.length + i) * 200}
                      />
                    ))}
                    {diagnostic.etancheite.zones.map((z, i) => (
                      <ZonePolygon
                        key={`e-${i}`}
                        zone={z}
                        color="#3b82f6"
                        visible={layerState.etancheite}
                        label={z.label}
                        delay={(diagnostic.vegetal.zones.length + diagnostic.structure.zones.length + i) * 200}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Anomaly list with quote buttons */}
              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-accent" />
                    <span className="text-sm font-bold text-foreground">
                      Anomalies detectees ({allZones.length})
                    </span>
                  </div>
                  {allZones.length === 0 && (
                    <div className="flex flex-col items-center gap-2 py-6">
                      <CheckCircle2 size={24} className="text-green-500" />
                      <p className="text-center text-sm text-green-500">Aucune anomalie detectee</p>
                      <p className="text-center text-[10px] text-muted-foreground">
                        Votre toiture semble en bon etat
                      </p>
                    </div>
                  )}
                </div>

                {allZones.map((z, i) => (
                  <AnomalyCard
                    key={i}
                    zone={z}
                    color={z.color}
                    category={z.category}
                    icon={z.icon}
                  />
                ))}

                {/* Recommendations */}
                {diagnostic.recommandations.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="mb-3 text-sm font-bold text-foreground">Recommandations</p>
                    {diagnostic.recommandations.map((r, i) => (
                      <div key={i} className="mb-2 flex gap-2 last:mb-0">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {i + 1}
                        </span>
                        <p className="text-xs leading-relaxed text-muted-foreground">{r}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent p-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                Besoin d{"'"}une intervention ?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Nos experts peuvent intervenir sur toute la France pour reparer votre toiture.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:+33233311979"
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <Phone size={16} />
                  Appeler le 02 33 31 19 79
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
                >
                  <Send size={16} />
                  Demander un devis
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
