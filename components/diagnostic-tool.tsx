"use client"

import { useState, useRef, useCallback } from "react"
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
} from "lucide-react"
import type { DiagnosticResult, DiagnosticZone } from "@/lib/diagnostic-types"

type Step = "address" | "satellite" | "analyzing" | "results"
type SatelliteImage = { zoom: number; label: string; image: string }

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
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-border"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={getColor(score)}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
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

function ZoneOverlay({
  zone,
  color,
  visible,
}: {
  zone: DiagnosticZone
  color: string
  visible: boolean
}) {
  if (!visible) return null
  return (
    <div
      className="absolute rounded-sm border-2 transition-opacity duration-300"
      style={{
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: `${zone.width}%`,
        height: `${zone.height}%`,
        borderColor: color,
        backgroundColor: `${color}20`,
      }}
    >
      <span
        className="absolute -top-5 left-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
        style={{ backgroundColor: color }}
      >
        {zone.label}
      </span>
    </div>
  )
}

export function DiagnosticTool() {
  const [step, setStep] = useState<Step>("address")
  const [address, setAddress] = useState("")
  const [satelliteImages, setSatelliteImages] = useState<SatelliteImage[]>([])
  const [activeZoom, setActiveZoom] = useState(0)
  const [formattedAddress, setFormattedAddress] = useState("")
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<
    "overview" | "vegetal" | "structure" | "etancheite"
  >("overview")
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
        setError(
          satData.error ||
            "Erreur lors de la recuperation de l'image satellite."
        )
        setStep("address")
        return
      }

      setSatelliteImages(satData.images || [{ zoom: 20, label: "Standard", image: satData.primaryImage }])
      setActiveZoom(0)
      setFormattedAddress(satData.formattedAddress)
      setStep("analyzing")

      // Use the highest zoom image for analysis (best detail)
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
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 300)
    } catch {
      setError(
        "Une erreur est survenue. Verifiez votre connexion et reessayez."
      )
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
    setActiveTab("overview")
    setLayerState({ vegetal: true, structure: true, etancheite: true })
  }

  const toggleLayer = (layer: keyof typeof layerState) => {
    setLayerState((prev) => ({ ...prev, [layer]: !prev[layer] }))
  }

  const getSeverityIcon = (score: number) => {
    if (score >= 75)
      return <CheckCircle2 size={16} className="text-green-500" />
    if (score >= 50)
      return <AlertTriangle size={16} className="text-amber-500" />
    return <XCircle size={16} className="text-red-500" />
  }

  const getSeverityText = (score: number) => {
    if (score >= 75) return "Bon etat"
    if (score >= 50) return "A surveiller"
    return "Intervention requise"
  }

  const progressSteps = [
    { key: "address", label: "Adresse", icon: MapPin },
    { key: "satellite", label: "Satellite", icon: Satellite },
    { key: "analyzing", label: "Analyse IA", icon: Brain },
    { key: "results", label: "Resultats", icon: FileText },
  ]
  const stepsOrder: Step[] = ["address", "satellite", "analyzing", "results"]
  const currentIndex = stepsOrder.indexOf(step)

  return (
    <section id="diagnostic" className="relative py-24">
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
            Entrez simplement votre adresse. Notre IA analyse l{"'"}image
            satellite de votre toit et vous fournit un diagnostic complet en
            quelques secondes. Pas besoin d{"'"}echafaudage, d{"'"}echelle ou de
            drone.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mx-auto mb-12 flex max-w-2xl items-center justify-center gap-2">
          {progressSteps.map((s, i, arr) => {
            const stepIndex = stepsOrder.indexOf(s.key as Step)
            const isActive = stepIndex <= currentIndex
            return (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <s.icon size={12} />
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <ChevronRight
                    size={14}
                    className={
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground/30"
                    }
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Address Input */}
        {step !== "results" && (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Entrez votre adresse
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Nous recupererons l{"'"}image satellite de votre toiture
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      step === "address" &&
                      handleSearch()
                    }
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
                  ) : step === "analyzing" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span className="hidden sm:inline">Analyse...</span>
                    </>
                  ) : (
                    <>
                      <Satellite size={16} />
                      <span className="hidden sm:inline">Analyser</span>
                    </>
                  )}
                </button>
              </div>

              {/* Loading: fetching satellite */}
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

              {/* Loading: analyzing */}
              {step === "analyzing" && satelliteImages.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="overflow-hidden rounded-xl border border-border">
                    <img
                      src={satelliteImages[0]?.image}
                      alt="Vue satellite de la toiture"
                      className="h-64 w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <Brain size={20} className="animate-pulse text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Analyse IA en cours...
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Notre IA examine votre toiture : vegetation, structure,
                        etancheite
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                  <XCircle size={20} className="shrink-0 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Features */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Satellite,
                    label: "Vue satellite HD",
                    desc: "Image haute resolution",
                  },
                  {
                    icon: Shield,
                    label: "Sans deplacement",
                    desc: "100% a distance",
                  },
                  {
                    icon: Zap,
                    label: "Resultat en 30s",
                    desc: "Analyse instantanee",
                  },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-secondary/30 p-4 text-center"
                  >
                    <f.icon size={20} className="text-primary" />
                    <p className="text-xs font-medium text-foreground">
                      {f.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {step === "results" && diagnostic && satelliteImages.length > 0 && (
          <div ref={resultsRef} className="animate-fade-up space-y-8">
            {/* Address bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {formattedAddress}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Diagnostic satellite -{" "}
                    {new Date().toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw size={12} />
                Nouvelle analyse
              </button>
            </div>

            {/* Score global */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center gap-3">
                <Shield size={20} className="text-primary" />
                <h3
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Score global de votre toiture
                </h3>
              </div>
              <div className="grid gap-8 md:grid-cols-5">
                <div className="flex flex-col items-center justify-center gap-3 md:col-span-2">
                  <div className="relative h-36 w-36">
                    <svg
                      className="h-36 w-36 -rotate-90"
                      viewBox="0 0 120 120"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-border"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke={
                          diagnostic.scoreGlobal >= 75
                            ? "#22c55e"
                            : diagnostic.scoreGlobal >= 50
                              ? "#f59e0b"
                              : "#ef4444"
                        }
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 52}
                        strokeDashoffset={
                          2 * Math.PI * 52 -
                          (diagnostic.scoreGlobal / 100) * 2 * Math.PI * 52
                        }
                        style={{
                          transition: "stroke-dashoffset 1.5s ease-out",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-foreground">
                        {diagnostic.scoreGlobal}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        /100
                      </span>
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
                  <ScoreGauge
                    score={diagnostic.vegetal.score}
                    label="Vegetal"
                    icon={Leaf}
                    color="#22c55e"
                  />
                  <ScoreGauge
                    score={diagnostic.structure.score}
                    label="Structure"
                    icon={Wrench}
                    color="#3b82f6"
                  />
                  <ScoreGauge
                    score={diagnostic.etancheite.score}
                    label="Etancheite"
                    icon={Droplets}
                    color="#06b6d4"
                  />
                </div>
              </div>
              <p className="mt-6 rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
                {diagnostic.summary}
              </p>
            </div>

            {/* Image + Layers + Details */}
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Layers size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Vue satellite avec calques
                      </span>
                      {satelliteImages.length > 1 && (
                        <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/50 p-0.5">
                          {satelliteImages.map((img, i) => (
                            <button
                              key={img.zoom}
                              onClick={() => setActiveZoom(i)}
                              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-all ${
                                activeZoom === i
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {i === 0 ? <ZoomIn size={10} /> : i === satelliteImages.length - 1 ? <ZoomOut size={10} /> : null}
                              {img.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[
                        {
                          key: "vegetal" as const,
                          label: "Vegetal",
                          color: "#22c55e",
                        },
                        {
                          key: "structure" as const,
                          label: "Structure",
                          color: "#3b82f6",
                        },
                        {
                          key: "etancheite" as const,
                          label: "Etancheite",
                          color: "#06b6d4",
                        },
                      ].map((l) => (
                        <button
                          key={l.key}
                          onClick={() => toggleLayer(l.key)}
                          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all"
                          style={{
                            backgroundColor: layerState[l.key]
                              ? `${l.color}20`
                              : "transparent",
                            color: layerState[l.key]
                              ? l.color
                              : "var(--color-muted-foreground)",
                            border: `1px solid ${layerState[l.key] ? l.color : "var(--color-border)"}`,
                          }}
                        >
                          {layerState[l.key] ? (
                            <Eye size={10} />
                          ) : (
                            <EyeOff size={10} />
                          )}
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={satelliteImages[activeZoom]?.image || satelliteImages[0]?.image}
                      alt="Vue satellite de la toiture"
                      className="w-full"
                      crossOrigin="anonymous"
                    />
                    {diagnostic.vegetal.zones.map((z, i) => (
                      <ZoneOverlay
                        key={`v-${i}`}
                        zone={z}
                        color="#22c55e"
                        visible={layerState.vegetal}
                      />
                    ))}
                    {diagnostic.structure.zones.map((z, i) => (
                      <ZoneOverlay
                        key={`s-${i}`}
                        zone={z}
                        color="#3b82f6"
                        visible={layerState.structure}
                      />
                    ))}
                    {diagnostic.etancheite.zones.map((z, i) => (
                      <ZoneOverlay
                        key={`e-${i}`}
                        zone={z}
                        color="#06b6d4"
                        visible={layerState.etancheite}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Detail tabs */}
              <div className="space-y-4">
                <div className="flex rounded-xl border border-border bg-card p-1">
                  {(
                    [
                      { key: "overview", label: "Apercu" },
                      { key: "vegetal", label: "Vegetal" },
                      { key: "structure", label: "Structure" },
                      { key: "etancheite", label: "Etancheite" },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-all ${
                        activeTab === t.key
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {activeTab === "overview" && (
                  <div className="space-y-3">
                    <p className="rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground">
                      Recommandations prioritaires
                    </p>
                    {diagnostic.recommandations.map((r, i) => (
                      <div
                        key={i}
                        className="flex gap-3 rounded-xl border border-border bg-card p-4"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {i + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {r}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "vegetal" && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Leaf size={14} className="text-green-500" />
                        <span className="text-sm font-semibold text-foreground">
                          Diagnostic vegetal
                        </span>
                        <span
                          className="ml-auto text-xs font-medium"
                          style={{
                            color:
                              diagnostic.vegetal.score >= 75
                                ? "#22c55e"
                                : diagnostic.vegetal.score >= 50
                                  ? "#f59e0b"
                                  : "#ef4444",
                          }}
                        >
                          {diagnostic.vegetal.score}/100
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {diagnostic.vegetal.description}
                      </p>
                    </div>
                    {diagnostic.vegetal.zones.map((z, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-3"
                      >
                        <span
                          className={`mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold text-white ${z.severity === "severe" ? "bg-red-500" : z.severity === "modere" ? "bg-amber-500" : "bg-green-500"}`}
                        >
                          {z.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {z.label}
                        </span>
                      </div>
                    ))}
                    {diagnostic.vegetal.zones.length === 0 && (
                      <p className="rounded-xl bg-green-500/5 p-4 text-center text-sm text-green-500">
                        Aucun probleme vegetal detecte
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "structure" && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Wrench size={14} className="text-blue-500" />
                        <span className="text-sm font-semibold text-foreground">
                          Diagnostic structurel
                        </span>
                        <span
                          className="ml-auto text-xs font-medium"
                          style={{
                            color:
                              diagnostic.structure.score >= 75
                                ? "#22c55e"
                                : diagnostic.structure.score >= 50
                                  ? "#f59e0b"
                                  : "#ef4444",
                          }}
                        >
                          {diagnostic.structure.score}/100
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {diagnostic.structure.description}
                      </p>
                    </div>
                    {diagnostic.structure.zones.map((z, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3"
                      >
                        <span
                          className={`mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold text-white ${z.severity === "severe" ? "bg-red-500" : z.severity === "modere" ? "bg-amber-500" : "bg-blue-500"}`}
                        >
                          {z.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {z.label}
                        </span>
                      </div>
                    ))}
                    {diagnostic.structure.zones.length === 0 && (
                      <p className="rounded-xl bg-blue-500/5 p-4 text-center text-sm text-blue-500">
                        Aucun probleme structurel detecte
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "etancheite" && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Droplets size={14} className="text-cyan-500" />
                        <span className="text-sm font-semibold text-foreground">
                          Diagnostic etancheite
                        </span>
                        <span
                          className="ml-auto text-xs font-medium"
                          style={{
                            color:
                              diagnostic.etancheite.score >= 75
                                ? "#22c55e"
                                : diagnostic.etancheite.score >= 50
                                  ? "#f59e0b"
                                  : "#ef4444",
                          }}
                        >
                          {diagnostic.etancheite.score}/100
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {diagnostic.etancheite.description}
                      </p>
                    </div>
                    {diagnostic.etancheite.zones.map((z, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3"
                      >
                        <span
                          className={`mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold text-white ${z.severity === "severe" ? "bg-red-500" : z.severity === "modere" ? "bg-amber-500" : "bg-cyan-500"}`}
                        >
                          {z.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {z.label}
                        </span>
                      </div>
                    ))}
                    {diagnostic.etancheite.zones.length === 0 && (
                      <p className="rounded-xl bg-cyan-500/5 p-4 text-center text-sm text-cyan-500">
                        Aucun probleme d{"'"}etancheite detecte
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent p-8 text-center">
              <h3
                className="mb-2 text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Besoin d{"'"}une intervention ?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Nos experts peuvent intervenir sur toute la France pour reparer
                votre toiture.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:+33233311979"
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Appeler le 02 33 31 19 79
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
                >
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
