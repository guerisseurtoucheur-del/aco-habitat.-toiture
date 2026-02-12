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
  Download,
  ScanLine,
  Crosshair,
  Navigation,
  Thermometer,
  Flame,
} from "lucide-react"
import type { DiagnosticResult, DiagnosticZone } from "@/lib/diagnostic-types"

type Step = "address" | "satellite" | "scanning" | "analyzing" | "results"
type SatelliteImage = { zoom: number; label: string; image: string }
type PlacePrediction = {
  placeId: string
  description: string
  mainText: string
  secondaryText: string
  lat?: number
  lng?: number
}

/* ── Scanning Overlay with Radar ── */
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

      {/* Laser scan line */}
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

      {/* Radar circle overlay */}
      {phase === "analyzing" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Concentric circles */}
          {[120, 80, 40].map((size) => (
            <div
              key={size}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: "rgba(59,130,246,0.2)",
              }}
            />
          ))}
          {/* Rotating sweep */}
          <div
            className="animate-radar-sweep absolute top-1/2 left-1/2"
            style={{ width: 140, height: 140 }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: "50%",
                height: "50%",
                transformOrigin: "0% 100%",
                background: "conic-gradient(from 0deg, transparent, rgba(59,130,246,0.3))",
                borderRadius: "0 100% 0 0",
              }}
            />
          </div>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_4px_rgba(59,130,246,0.4)]" />
          </div>
        </div>
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
          {phase === "scanning" ? "SCAN LIDAR EN COURS..." : "ANALYSE MULTI-SPECTRALE..."}
        </span>
      </div>

      {/* Top-right HUD */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
        <div className="rounded-md bg-background/80 px-3 py-1.5 backdrop-blur-sm">
          <span className="font-mono text-[10px] text-muted-foreground">
            SAT-VIEW HD / {phase === "scanning" ? "LIDAR-SIM" : "AI-NEURAL"}
          </span>
        </div>
        <div className="rounded-md bg-background/80 px-3 py-1 backdrop-blur-sm">
          <span className="font-mono text-[9px] text-cyan-400">
            {phase === "scanning" ? "RES: 5cm/px" : "LAYERS: VEG / STR / ETA"}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Hotspot Blinking Icon ── */
function Hotspot({
  x,
  y,
  color,
  severity,
  delay = 0,
}: {
  x: number
  y: number
  color: string
  severity: string
  delay?: number
}) {
  return (
    <div
      className="animate-zone-reveal absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}ms` }}
    >
      {/* Expanding ring */}
      <div
        className="animate-hotspot-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 20, height: 20, backgroundColor: `${color}30`, border: `1px solid ${color}40` }}
      />
      {/* Core blinking dot */}
      <div
        className="animate-hotspot-ping relative flex h-6 w-6 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}20`, border: `2px solid ${color}`, boxShadow: `0 0 12px 3px ${color}50` }}
      >
        <span className="text-[8px] font-bold" style={{ color }}>
          {severity === "severe" ? "!" : severity === "modere" ? "?" : "~"}
        </span>
      </div>
    </div>
  )
}

/* ── Zone Polygon Overlay (clickable bounding box) ── */
function ZonePolygon({
  zone,
  color,
  visible,
  label,
  delay = 0,
  icon: Icon,
  categoryLabel,
  onClick,
  isSelected,
}: {
  zone: DiagnosticZone
  color: string
  visible: boolean
  label: string
  delay?: number
  icon?: React.ElementType
  categoryLabel?: string
  onClick?: () => void
  isSelected?: boolean
}) {
  if (!visible) return null

  const severityLabel =
    zone.severity === "severe" ? "Critique" : zone.severity === "modere" ? "Modere" : "Faible"

  return (
    <div
      className="animate-zone-reveal absolute z-20 cursor-pointer"
      style={{
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: `${zone.width}%`,
        height: `${zone.height}%`,
        animationDelay: `${delay}ms`,
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {/* Transparent fill */}
      <div
        className="absolute inset-0 rounded-md transition-colors duration-200"
        style={{
          backgroundColor: isSelected ? `${color}30` : `${color}12`,
        }}
      />

      {/* Border with rounded corners (2px) */}
      <div
        className="absolute inset-0 rounded-md border-2 transition-all duration-200"
        style={{
          borderColor: color,
          boxShadow: isSelected ? `0 0 12px 2px ${color}50` : "none",
        }}
      />

      {/* Label tag above the rectangle */}
      <div
        className="absolute -top-7 left-0 flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 shadow-md"
        style={{
          backgroundColor: color,
          boxShadow: `0 2px 8px ${color}40`,
        }}
      >
        {Icon && <Icon size={9} className="text-white" />}
        <span className="text-[9px] font-bold tracking-wide text-white uppercase">
          {categoryLabel || label}
        </span>
      </div>

      {/* Info popup on click */}
      {isSelected && (
        <div
          className="absolute left-1/2 z-30 w-52 -translate-x-1/2 rounded-xl border border-border bg-card p-3 shadow-xl"
          style={{
            top: "calc(100% + 8px)",
            borderColor: `${color}40`,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            {Icon && (
              <div className="flex h-5 w-5 items-center justify-center rounded" style={{ backgroundColor: `${color}20` }}>
                <Icon size={10} style={{ color }} />
              </div>
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>
              {categoryLabel}
            </span>
            <span
              className="ml-auto rounded px-1.5 py-0.5 text-[8px] font-bold text-white"
              style={{
                backgroundColor:
                  zone.severity === "severe" ? "#ef4444" : zone.severity === "modere" ? "#f59e0b" : "#22c55e",
              }}
            >
              {severityLabel}
            </span>
          </div>
          <p className="mb-2 text-[11px] leading-relaxed text-foreground/90">{zone.label}</p>
          <a
            href="#contact"
            className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[10px] font-semibold text-white transition-colors"
            style={{ backgroundColor: color }}
          >
            <Send size={8} />
            Demander un devis
          </a>
        </div>
      )}
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

/* ── Thermal Overlay ── */
function ThermalOverlay({
  zones,
  visible,
  selectedZoneId,
  onSelectZone,
}: {
  zones: { x: number; y: number; width: number; height: number; intensite: number; label: string }[]
  visible: boolean
  selectedZoneId: string | null
  onSelectZone: (id: string | null) => void
}) {
  if (!visible) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Full image thermal tint: blue-to-red gradient */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(139,92,246,0.2) 30%, rgba(249,115,22,0.25) 60%, rgba(239,68,68,0.35) 100%)",
        }}
      />
      {/* Cool zones = blue tinted areas */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at 30% 30%, rgba(59,130,246,0.15), transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(59,130,246,0.1), transparent 50%)",
        }}
      />

      {/* Hot zones with labels -- clickable */}
      {zones.map((zone, i) => {
        const zoneId = `t-${i}`
        const isSelected = selectedZoneId === zoneId
        return (
          <div
            key={i}
            className="animate-zone-reveal pointer-events-auto absolute z-20 cursor-pointer"
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.width}%`,
              height: `${zone.height}%`,
              animationDelay: `${i * 300}ms`,
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectZone(isSelected ? null : zoneId)
            }}
          >
            {/* Transparent orange fill */}
            <div
              className="absolute inset-0 rounded-md transition-colors duration-200"
              style={{
                backgroundColor: isSelected ? "rgba(249,115,22,0.3)" : `rgba(249,115,22,${0.1 + zone.intensite / 200})`,
              }}
            />
            {/* Border (2px) */}
            <div
              className="absolute inset-0 rounded-md border-2 transition-all duration-200"
              style={{
                borderColor: "#f97316",
                boxShadow: isSelected ? "0 0 12px 2px rgba(249,115,22,0.5)" : "none",
              }}
            />

            {/* Label */}
            <div className="absolute -top-7 left-0 flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 shadow-md" style={{ backgroundColor: "#f97316", boxShadow: "0 2px 8px rgba(249,115,22,0.4)" }}>
              <Flame size={9} className="text-white" />
              <span className="text-[9px] font-bold tracking-wide text-white uppercase">
                Thermique : +{zone.intensite}%
              </span>
            </div>

            {/* Info popup on click */}
            {isSelected && (
              <div
                className="absolute left-1/2 z-30 w-52 -translate-x-1/2 rounded-xl border bg-card p-3 shadow-xl"
                style={{
                  top: "calc(100% + 8px)",
                  borderColor: "rgba(249,115,22,0.4)",
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded" style={{ backgroundColor: "rgba(249,115,22,0.2)" }}>
                    <Thermometer size={10} className="text-orange-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                    Thermique
                  </span>
                  <span className="ml-auto rounded bg-orange-500 px-1.5 py-0.5 text-[8px] font-bold text-white">
                    +{zone.intensite}%
                  </span>
                </div>
                <p className="mb-2 text-[11px] leading-relaxed text-foreground/90">{zone.label}</p>
                <a
                  href="#contact"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-orange-500 py-1.5 text-[10px] font-semibold text-white transition-colors"
                >
                  <Send size={8} />
                  Bilan energetique
                </a>
              </div>
            )}
          </div>
        )
      })}

      {/* Thermal scale legend */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-background/90 px-3 py-2 backdrop-blur-md">
        <span className="text-[9px] font-semibold text-blue-400">Froid</span>
        <div
          className="h-2 w-20 rounded-full"
          style={{ background: "linear-gradient(to right, #3b82f6, #8b5cf6, #f97316, #ef4444)" }}
        />
        <span className="text-[9px] font-semibold text-red-400">Chaud</span>
      </div>
    </div>
  )
}

/* ── Thermal Score Card ── */
function ThermalScoreCard({
  scoreIsolation,
  economieEstimee,
  commentaire,
  surface,
}: {
  scoreIsolation: number
  economieEstimee: number
  commentaire: string
  surface: number
}) {
  const scoreColor = scoreIsolation >= 70 ? "#22c55e" : scoreIsolation >= 40 ? "#f59e0b" : "#ef4444"
  const scoreLabel = scoreIsolation >= 70 ? "Bonne isolation" : scoreIsolation >= 40 ? "Isolation moyenne" : "Isolation insuffisante"

  return (
    <div className="overflow-hidden rounded-xl border border-orange-500/30 bg-card">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border bg-gradient-to-r from-orange-500/10 to-red-500/10 px-4 py-3">
        <Thermometer size={14} className="text-orange-400" />
        <span className="text-sm font-bold text-foreground">Analyse Thermique</span>
      </div>

      <div className="space-y-4 p-4">
        {/* Isolation Score */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <svg className="h-16 w-16 -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="5" className="text-border" />
              <circle
                cx="30" cy="30" r="24" fill="none"
                stroke={scoreColor}
                strokeWidth="5" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 24}
                strokeDashoffset={2 * Math.PI * 24 - (scoreIsolation / 100) * 2 * Math.PI * 24}
                style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-foreground">{scoreIsolation}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Score d{"'"}isolation</p>
            <p className="text-sm font-semibold" style={{ color: scoreColor }}>{scoreLabel}</p>
          </div>
        </div>

        {/* Estimated savings */}
        <div className="rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-3">
          <p className="text-[10px] font-medium text-muted-foreground">Economie annuelle estimee avec renovation</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-green-500">{economieEstimee.toLocaleString("fr-FR")}</span>
            <span className="text-sm font-semibold text-green-500">{"\u20AC/an"}</span>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Base sur {surface} m{"\u00B2"} de toiture
          </p>
        </div>

        {/* Comment */}
        <p className="text-xs leading-relaxed text-muted-foreground">{commentaire}</p>

        {/* CTA */}
        <a
          href="#contact"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-500/25"
        >
          <Flame size={12} />
          Demander un bilan energetique
        </a>
      </div>
    </div>
  )
}

/* ── Main Component ── */
export function DiagnosticTool() {
  const [step, setStep] = useState<Step>("address")
  const [address, setAddress] = useState("")
  const [predictions, setPredictions] = useState<PlacePrediction[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [geolocating, setGeolocating] = useState(false)
  const autocompleteTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [satelliteImages, setSatelliteImages] = useState<SatelliteImage[]>([])
  const [activeZoom, setActiveZoom] = useState(0)
  const [thermalMode, setThermalMode] = useState(false)
  const [formattedAddress, setFormattedAddress] = useState("")
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [layerState, setLayerState] = useState({
    vegetal: true,
    structure: true,
    etancheite: true,
  })
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const handleSearchRef = useRef<() => void>(() => {})

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch autocomplete predictions from adresse.data.gouv.fr
  const fetchPredictions = useCallback((input: string) => {
    if (autocompleteTimer.current) clearTimeout(autocompleteTimer.current)
    if (input.length < 3) {
      setPredictions([])
      setShowDropdown(false)
      return
    }
    autocompleteTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?input=${encodeURIComponent(input)}`)
        const data = await res.json()
        if (data.predictions?.length > 0) {
          setPredictions(data.predictions)
          setShowDropdown(true)
        } else {
          setPredictions([])
          setShowDropdown(false)
        }
      } catch {
        setPredictions([])
      }
    }, 250)
  }, [])

  // Handle address input change
  const handleAddressChange = useCallback(
    (value: string) => {
      setAddress(value)
      fetchPredictions(value)
    },
    [fetchPredictions]
  )

  // Select a prediction => set address and auto-launch scan
  const handleSelectPrediction = useCallback((prediction: PlacePrediction) => {
    setAddress(prediction.description)
    setShowDropdown(false)
    setPredictions([])
    // Auto-launch analysis after a brief delay for UI feedback
    setTimeout(() => {
      handleSearchRef.current()
    }, 100)
  }, [])

  // Geolocation via adresse.data.gouv.fr reverse geocoding
  const handleGeolocate = useCallback(async () => {
    if (!navigator.geolocation) {
      setError("La geolocalisation n'est pas supportee par votre navigateur.")
      return
    }
    setGeolocating(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const res = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`)
          const data = await res.json()
          if (data.address) {
            setAddress(data.address)
            // Auto-launch analysis
            setTimeout(() => {
              handleSearchRef.current()
            }, 100)
          } else {
            setError("Impossible de trouver votre adresse. Verifiez que vous etes en France.")
          }
        } catch {
          setError("Erreur lors de la geolocalisation.")
        } finally {
          setGeolocating(false)
        }
      },
      (geoErr) => {
        const msg = geoErr.code === 1
          ? "Geolocalisation refusee. Autorisez l'acces dans les parametres de votre navigateur."
          : "Impossible d'obtenir votre position. Reessayez."
        setError(msg)
        setGeolocating(false)
      },
      { enableHighAccuracy: true, timeout: 15000 }
    )
  }, [])

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

  // Keep ref in sync so auto-launch works from selection/geolocation
  useEffect(() => {
    handleSearchRef.current = handleSearch
  }, [handleSearch])

  const handleReset = () => {
  setStep("address")
  setAddress("")
  setPredictions([])
  setShowDropdown(false)
  setSatelliteImages([])
  setActiveZoom(0)
  setThermalMode(false)
  setDiagnostic(null)
    setError(null)
    setLayerState({ vegetal: true, structure: true, etancheite: true })
    setSelectedZoneId(null)
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

  if (diagnostic) {
    console.log("[v0] Diagnostic zones:", {
      vegetal: diagnostic.vegetal.zones.length,
      structure: diagnostic.structure.zones.length,
      etancheite: diagnostic.etancheite.zones.length,
      thermique: diagnostic.thermique?.pertesChaleur?.length ?? 0,
      layerState,
    })
  }

  const allZones = diagnostic
    ? [
        ...diagnostic.vegetal.zones.map((z) => ({ ...z, category: "Vegetal" as const, color: "#84cc16", icon: Leaf })),
        ...diagnostic.structure.zones.map((z) => ({ ...z, category: "Structure" as const, color: "#ef4444", icon: Wrench })),
        ...diagnostic.etancheite.zones.map((z) => ({ ...z, category: "Etancheite" as const, color: "#22c55e", icon: Droplets })),
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

              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="relative flex-1" ref={dropdownRef}>
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && step === "address") {
                          setShowDropdown(false)
                          handleSearch()
                        }
                      }}
                      onFocus={() => predictions.length > 0 && setShowDropdown(true)}
                      placeholder="12 rue de la Paix, 75002 Paris"
                      disabled={step !== "address"}
                      className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    />

                    {/* Autocomplete dropdown */}
                    {showDropdown && predictions.length > 0 && (
                      <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-background/50">
                        {predictions.map((p, i) => (
                          <button
                            key={p.placeId}
                            type="button"
                            onClick={() => handleSelectPrediction(p)}
                            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/60 ${
                              i !== 0 ? "border-t border-border/50" : ""
                            }`}
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <MapPin size={14} className="text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-foreground">
                                {p.mainText}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                {p.secondaryText}
                              </p>
                            </div>
                          </button>
                        ))}
                        <div className="border-t border-border/50 px-4 py-2">
                          <p className="text-[10px] text-muted-foreground/60">
                            Donnees adresse.data.gouv.fr
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setShowDropdown(false)
                      handleSearch()
                    }}
                    disabled={step !== "address" || !address.trim()}
                    className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                  >
                    {step === "satellite" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span className="hidden sm:inline">Analyse...</span>
                      </>
                    ) : (
                      <>
                        <Satellite size={16} />
                        <span className="hidden sm:inline">Analyser ma toiture</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Geolocation button */}
                <button
                  type="button"
                  onClick={handleGeolocate}
                  disabled={step !== "address" || geolocating}
                  className="flex items-center gap-2 self-start rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary disabled:opacity-50"
                >
                  {geolocating ? (
                    <Loader2 size={14} className="animate-spin text-primary" />
                  ) : (
                    <Crosshair size={14} />
                  )}
                  {geolocating ? "Localisation en cours..." : "Ma position actuelle"}
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
                  <ScoreGauge score={diagnostic.vegetal.score} label="Vegetal" icon={Leaf} color="#84cc16" />
                  <ScoreGauge score={diagnostic.structure.score} label="Structure" icon={Wrench} color="#ef4444" />
                  <ScoreGauge score={diagnostic.etancheite.score} label="Etancheite" icon={Droplets} color="#22c55e" />
                </div>
              </div>
              {/* Surface estimation */}
              {diagnostic.surfaceEstimeeM2 && (
                <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-primary">
                        <rect x="2" y="2" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                        <path d="M5 9h8M9 5v8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Surface estimee</p>
                      <p className="text-lg font-bold text-foreground">
                        {diagnostic.surfaceEstimeeM2} m<sup>2</sup>
                      </p>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="text-xs text-muted-foreground">Precision</p>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            diagnostic.surfacePrecision === "haute"
                              ? "#22c55e"
                              : diagnostic.surfacePrecision === "moyenne"
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      />
                      <span className="text-sm font-medium capitalize text-foreground">
                        {diagnostic.surfacePrecision}
                      </span>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium text-foreground">{diagnostic.toitureType}</p>
                  </div>
                </div>
              )}

              <p className="mt-4 rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
                {diagnostic.summary}
              </p>
            </div>

            {/* Image + Zones + Sidebar */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Satellite image with overlay zones */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-border bg-card">
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
                        { key: "vegetal" as const, label: "Vegetal", color: "#84cc16" },
                        { key: "structure" as const, label: "Structure", color: "#ef4444" },
                        { key: "etancheite" as const, label: "Etancheite", color: "#22c55e" },
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
                      <div className="mx-1 h-4 w-px bg-border" />
                      <button
                        onClick={() => setThermalMode(!thermalMode)}
                        className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-all ${
                          thermalMode
                            ? "border border-orange-500 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400"
                            : "border border-border text-muted-foreground hover:border-orange-500/30 hover:text-orange-400"
                        }`}
                      >
                        <Thermometer size={10} />
                        Thermique
                      </button>
                    </div>
                  </div>

                  {/* Image with polygon overlays */}
                  <div className="pb-0 pt-8" onClick={() => setSelectedZoneId(null)}>
                    <div className="relative overflow-visible">
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

                    {/* Zone overlays - clickable bounding boxes */}
                    {diagnostic.vegetal.zones.map((z, i) => (
                      <ZonePolygon
                        key={`v-${i}`}
                        zone={z}
                        color="#84cc16"
                        visible={layerState.vegetal}
                        label={z.label}
                        delay={i * 200}
                        icon={Leaf}
                        categoryLabel="Vegetal"
                        onClick={() => setSelectedZoneId(selectedZoneId === `v-${i}` ? null : `v-${i}`)}
                        isSelected={selectedZoneId === `v-${i}`}
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
                        icon={Wrench}
                        categoryLabel="Structure"
                        onClick={() => setSelectedZoneId(selectedZoneId === `s-${i}` ? null : `s-${i}`)}
                        isSelected={selectedZoneId === `s-${i}`}
                      />
                    ))}
                    {diagnostic.etancheite.zones.map((z, i) => (
                      <ZonePolygon
                        key={`e-${i}`}
                        zone={z}
                        color="#22c55e"
                        visible={layerState.etancheite}
                        label={z.label}
                        delay={(diagnostic.vegetal.zones.length + diagnostic.structure.zones.length + i) * 200}
                        icon={Droplets}
                        categoryLabel="Etancheite"
                        onClick={() => setSelectedZoneId(selectedZoneId === `e-${i}` ? null : `e-${i}`)}
                        isSelected={selectedZoneId === `e-${i}`}
                      />
                    ))}

                    {/* Thermal overlay */}
                    {diagnostic.thermique && (
                      <ThermalOverlay
                        zones={diagnostic.thermique.pertesChaleur}
                        visible={thermalMode}
                        selectedZoneId={selectedZoneId}
                        onSelectZone={setSelectedZoneId}
                      />
                    )}

                    {/* Confidence Badge - bottom of image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div
                        className="animate-badge-shine flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-background/85 px-3 py-1.5 backdrop-blur-md"
                        style={{
                          backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.08) 50%, transparent 100%)",
                          backgroundSize: "200% 100%",
                        }}
                      >
                        <ScanLine size={12} className="text-cyan-400" />
                        <span className="font-mono text-[10px] font-semibold tracking-wide text-cyan-400">
                          Resolution optimisee par IA - Precision 5cm/pixel
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg bg-background/85 px-2.5 py-1.5 backdrop-blur-md">
                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                        <span className="font-mono text-[9px] text-green-400">LIVE ANALYSIS</span>
                      </div>
                    </div>
                  </div>
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

                {/* Thermal Score Card */}
                {diagnostic.thermique && (
                  <ThermalScoreCard
                    scoreIsolation={diagnostic.thermique.scoreIsolation}
                    economieEstimee={diagnostic.thermique.economieEstimee}
                    commentaire={diagnostic.thermique.commentaire}
                    surface={diagnostic.surfaceEstimeeM2 || 80}
                  />
                )}
              </div>
            </div>

            {/* PDF Report Button */}
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-card p-8 text-center">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400">
                  <FileText size={12} />
                  RAPPORT COMPLET
                </div>
                <h3 className="mb-2 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  {"Generer mon rapport d'entretien PDF complet"}
                </h3>
                <p className="mx-auto mb-6 max-w-lg text-sm text-muted-foreground">
                  Recevez un document professionnel detaille avec photos satellite annotees,
                  scores de diagnostic, zones detectees et recommandations d{"'"}intervention.
                </p>
                <button
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = "#contact"
                    link.click()
                  }}
                  className="group relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/30"
                >
                  <Download size={20} />
                  Generer mon rapport PDF complet
                  <span className="ml-1 rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-semibold">GRATUIT</span>
                </button>
                <p className="mt-3 text-[10px] text-muted-foreground">
                  Le rapport sera envoye par email apres verification par nos experts.
                </p>
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
