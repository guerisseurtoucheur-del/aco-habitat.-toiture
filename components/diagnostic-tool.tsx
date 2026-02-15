"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import { WeatherDiagnosticWidget } from "@/components/weather-diagnostic-widget"
import {
  MapPin,
  Search,
  Loader2,
  Brain,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  FileText,
  Leaf,
  Wrench,
  Droplets,
  RotateCcw,
  Shield,
  Zap,
  Phone,
  Send,
  Download,
  ScanLine,
  ExternalLink,
  Cloud,
  Crosshair,
  Thermometer,
  Flame,
  MapPinned,
  Ruler,
  Upload,
  Camera,
  ImageIcon,
} from "lucide-react"
import type { DiagnosticResult, DiagnosticZone } from "@/lib/diagnostic-types"
import type { MapCaptureData, MapMeasurement } from "./leaflet-map"

/* Dynamic imports to avoid SSR issues */
const StripeCheckout = dynamic(() => import("./checkout"), { ssr: false })
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[450px] w-full items-center justify-center rounded-xl border border-border bg-card md:h-[500px]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={24} className="animate-spin text-primary" />
        <span className="text-xs text-muted-foreground">Chargement de la carte...</span>
      </div>
    </div>
  ),
})

type Step = "address" | "map" | "payment" | "scanning" | "analyzing" | "results"
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
        href="#couvreurs"
        className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-[10px] font-semibold text-primary-foreground transition-colors"
        style={{ backgroundColor: color }}
      >
        <Send size={10} />
        Trouver un couvreur
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
          href="mailto:aco.habitat@orange.fr?subject=Demande de bilan energetique"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-500/25"
        >
          <Flame size={12} />
          Demander un bilan energetique
        </a>
      </div>
    </div>
  )
}

/* ── Post-process diagnostic: ensure thermal data exists ── */
function ensureRealisticZones(diag: DiagnosticResult): DiagnosticResult {
  const r = structuredClone(diag)

  // Ensure thermique pertesChaleur array exists (IA sometimes omits it)
  if (!r.thermique.pertesChaleur) {
    r.thermique.pertesChaleur = []
  }

  return r
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
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [mapMeasurements, setMapMeasurements] = useState<MapMeasurement[]>([])
  const [formattedAddress, setFormattedAddress] = useState("")
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadMode, setUploadMode] = useState(false)
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const handleSearchRef = useRef<() => void>(() => {})
  const hasSavedRef = useRef(false)

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

  // Select a prediction => set address and auto-launch map
  const handleSelectPrediction = useCallback((prediction: PlacePrediction) => {
    setAddress(prediction.description)
    setShowDropdown(false)
    setPredictions([])
    // If prediction has coords, go straight to map
    if (prediction.lat && prediction.lng) {
      setFormattedAddress(prediction.description)
      setMapCenter({ lat: prediction.lat, lng: prediction.lng })
      setStep("map")
    } else {
      // Fallback: geocode
      setTimeout(() => {
        handleSearchRef.current()
      }, 100)
    }
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
          if (data.address && data.lat && data.lng) {
            setAddress(data.address)
            setFormattedAddress(data.address)
            setMapCenter({ lat: data.lat, lng: data.lng })
            setStep("map")
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

  // Geocode the address and show the interactive map
  const handleSearch = useCallback(async () => {
    if (!address.trim()) return
    setError(null)
    setStep("map")

    try {
      // Geocode the address to get coordinates
      const geoRes = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`)
      const geoData = await geoRes.json()

      if (geoData.lat && geoData.lng) {
        setMapCenter({ lat: geoData.lat, lng: geoData.lng })
        setFormattedAddress(geoData.address || address)
      } else {
        // Fallback: try to get coords from the address via adresse.data.gouv.fr directly
        const fallbackRes = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`)
        const fallbackData = await fallbackRes.json()
        if (fallbackData.features?.length > 0) {
          const [lng, lat] = fallbackData.features[0].geometry.coordinates
          setMapCenter({ lat, lng })
          setFormattedAddress(fallbackData.features[0].properties.label || address)
        } else {
          setError("Impossible de localiser cette adresse. Verifiez et reessayez.")
          setStep("address")
          return
        }
      }
    } catch {
      setError("Erreur lors de la localisation. Verifiez votre connexion.")
      setStep("address")
    }
  }, [address])

  // Pending capture data stored while user pays
  const pendingCaptureRef = useRef<MapCaptureData | null>(null)

  // Handle map capture -> go to payment
  const handleMapCapture = useCallback((data: MapCaptureData) => {
    setCapturedImage(data.imageBase64)
    setMapMeasurements(data.measurements)
    pendingCaptureRef.current = data
    setStep("payment")
  }, [])

  // Run the actual AI diagnostic (called after successful payment)
  const runDiagnostic = useCallback(async () => {
    console.log("[v0] runDiagnostic called, capturedImage:", !!capturedImage, "address:", formattedAddress, "step:", step)
    setStep("scanning")

    try {
      await new Promise((r) => setTimeout(r, 3000))
      setStep("analyzing")

      const capture = pendingCaptureRef.current
      console.log("[v0] Sending to /api/diagnostic, image length:", capturedImage?.length || 0, "address:", formattedAddress)
      const diagRes = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: capturedImage,
          address: formattedAddress,
          measurements: capture?.measurements || mapMeasurements,
          bounds: capture?.bounds || null,
          zoom: capture?.zoom || null,
        }),
      })
      const diagData = await diagRes.json()
      console.log("[v0] Diagnostic API response:", diagRes.ok, diagRes.status, JSON.stringify(diagData).substring(0, 200))

      if (!diagRes.ok) {
        console.log("[v0] Diagnostic API error:", diagData.error)
        setError(diagData.error || "Erreur lors de l'analyse IA.")
        setStep("address")
        return
      }

      const finalDiag = ensureRealisticZones(diagData.diagnostic)
      setDiagnostic(finalDiag)
      setStep("results")
      console.log("[v0] Diagnostic complete, score:", finalDiag.scoreGlobal)

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 300)

      // Save to DB + generate PDF + send email (non-blocking, after render)
      if (!hasSavedRef.current) {
        hasSavedRef.current = true
        
        // 1. Save to database
        fetch("/api/diagnostics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: clientName,
            phone: clientPhone,
            email: clientEmail,
            address: formattedAddress,
            globalScore: finalDiag.scoreGlobal || 0,
            structureScore: finalDiag.structure?.score || 0,
            vegetalScore: finalDiag.vegetal?.score || 0,
            etancheiteScore: finalDiag.etancheite?.score || 0,
            thermalScore: finalDiag.thermique?.scoreIsolation || 0,
            stripeSessionId: "",
          }),
        }).then(async (r) => {
          const t = await r.text()
          console.log("[v0] DB save:", r.status, t)
        }).catch((e) => console.log("[v0] DB save error:", e))

        // 2. Auto-download PDF
        import("@/lib/generate-pdf").then(async ({ generateDiagnosticPDF, generateDiagnosticPDFBase64 }) => {
          const clientInfo = { name: clientName, phone: clientPhone, email: clientEmail }
          try {
            await generateDiagnosticPDF(finalDiag, capturedImage || "", formattedAddress, mapMeasurements, clientInfo)
            console.log("[v0] PDF downloaded")
          } catch (e) { console.log("[v0] PDF download error:", e) }
          
          // 3. Send email with PDF
          if (clientEmail) {
            setSendingEmail(true)
            try {
              console.log("[v0] Generating PDF base64 for email...")
              const pdfBase64 = await generateDiagnosticPDFBase64(finalDiag, capturedImage || "", formattedAddress, mapMeasurements, clientInfo)
              const pdfLength = pdfBase64?.length || 0
              console.log("[v0] PDF base64 ready, length:", pdfLength, "chars (~" + Math.round(pdfLength / 1024) + "KB), sending to:", clientEmail)
              
              // If PDF is too large (>4MB), skip email attachment
              if (pdfLength > 4 * 1024 * 1024) {
                console.log("[v0] PDF too large for email, sending without attachment")
                const emailRes = await fetch("/api/send-report", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: clientEmail,
                    name: clientName,
                    address: formattedAddress,
                    globalScore: finalDiag.scoreGlobal || 0,
                    pdfBase64: "",
                  }),
                })
                console.log("[v0] Email (no attachment) result:", emailRes.status)
              } else {
                const emailRes = await fetch("/api/send-report", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: clientEmail,
                    name: clientName,
                    address: formattedAddress,
                    globalScore: finalDiag.scoreGlobal || 0,
                    pdfBase64,
                  }),
                })
                const emailData = await emailRes.json()
                console.log("[v0] Email result:", emailRes.status, JSON.stringify(emailData))
              }
              setEmailSent(true)
            } catch (e) { console.log("[v0] Email error:", String(e)) }
            finally { setSendingEmail(false) }
          }
        }).catch((e) => console.log("[v0] PDF import error:", String(e)))
      }
    } catch {
      setError("Une erreur est survenue. Verifiez votre connexion et reessayez.")
      setStep("address")
    }
  }, [capturedImage, formattedAddress, mapMeasurements, clientName, clientPhone, clientEmail])

  // Compress image to max 1600px and JPEG quality 0.85 to stay under API body limits
  const compressImage = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const MAX_SIZE = 1600
        let w = img.width
        let h = img.height
        if (w > MAX_SIZE || h > MAX_SIZE) {
          const ratio = Math.min(MAX_SIZE / w, MAX_SIZE / h)
          w = Math.round(w * ratio)
          h = Math.round(h * ratio)
        }
        const canvas = document.createElement("canvas")
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        if (!ctx) return reject(new Error("Canvas non supporte"))
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL("image/jpeg", 0.85))
      }
      img.onerror = () => reject(new Error("Impossible de charger l'image"))
      img.src = URL.createObjectURL(file)
    })
  }, [])

  // Handle photo upload -> compress + run AI analysis directly
  const handlePhotoUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Veuillez selectionner une image (JPG, PNG, WEBP).")
      return
    }

    // Validate file size (max 20MB raw, will be compressed)
    if (file.size > 20 * 1024 * 1024) {
      setError("L'image est trop volumineuse. Maximum 20 Mo.")
      return
    }

    try {
      // Compress image to avoid exceeding API body size limits
      const imageBase64 = await compressImage(file)
      setCapturedImage(imageBase64)
      setFormattedAddress("Photo uploadee par l'utilisateur")
      pendingCaptureRef.current = null
      setStep("payment")
    } catch {
      setError("Une erreur est survenue. Verifiez votre connexion et reessayez.")
      setStep("address")
    }

    // Reset input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [compressImage])

  // Keep ref in sync so auto-launch works from selection/geolocation
  useEffect(() => {
    handleSearchRef.current = handleSearch
  }, [handleSearch])

  const handleReset = () => {
    setStep("address")
    setAddress("")
    setPredictions([])
    setShowDropdown(false)
    setMapCenter(null)
    setCapturedImage(null)
    setMapMeasurements([])
    setDiagnostic(null)
    setError(null)
    setUploadMode(false)
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
        ...diagnostic.vegetal.zones.map((z) => ({ ...z, category: "Vegetal" as const, color: "#84cc16", icon: Leaf })),
        ...diagnostic.structure.zones.map((z) => ({ ...z, category: "Structure" as const, color: "#ef4444", icon: Wrench })),
        ...diagnostic.etancheite.zones.map((z) => ({ ...z, category: "Etancheite" as const, color: "#22c55e", icon: Droplets })),
      ]
    : []

  const progressSteps = [
    { key: "address", label: "Adresse", icon: MapPin },
    { key: "map", label: "Carte IGN", icon: MapPinned },
    { key: "payment", label: "Paiement", icon: Shield },
    { key: "scanning", label: "Scan", icon: Zap },
    { key: "results", label: "Resultats", icon: FileText },
  ]
  const stepsOrder: Step[] = ["address", "map", "payment", "scanning", "analyzing", "results"]
  const currentIndex = stepsOrder.indexOf(step)

  return (
    <section id="diagnostic" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--color-glow-blue),_transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <MapPinned size={14} />
              Diagnostic par carte IGN
          </div>
          <h2
            className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Analysez votre toiture{" "}
            <span className="text-gradient">par satellite</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Entrez votre adresse ou uploadez une photo (drone, smartphone).
            Analyse complete par IA en 30 secondes. Rapport PDF inclus. 19,90 EUR.
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
        {step === "address" && (
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
                    disabled={!address.trim()}
                    className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                  >
                    <MapPinned size={16} />
                    <span className="hidden sm:inline">Localiser ma toiture</span>
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

              {/* Separator */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    ou analysez votre propre photo
                  </span>
                </div>
              </div>

              {/* Photo Upload Zone */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="group flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed border-border bg-secondary/20 p-8 transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                  <Camera size={24} className="text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Deposez une photo de votre toiture
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Photo drone, photo depuis le sol, capture Google Maps...
                  </p>
                  <p className="mt-2 text-[10px] text-muted-foreground/60">
                    JPG, PNG ou WEBP - Max 10 Mo
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors group-hover:bg-primary/20">
                  <Upload size={14} />
                  Choisir une photo
                </div>
              </label>

              {error && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                  <XCircle size={20} className="shrink-0 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
                {[
                  { icon: MapPinned, label: "Carte IGN HD", desc: "Ortho-photo 20cm/pixel" },
                  { icon: Camera, label: "Photo perso", desc: "Drone, smartphone, etc." },
                  { icon: Shield, label: "Sans deplacement", desc: "100% a distance" },
                  { icon: Zap, label: "Resultat en 30s", desc: "Analyse IA instantanee" },
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

        {/* Interactive Map Step */}
        {step === "map" && mapCenter && (
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-border bg-card">
              {/* Map header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <div className="flex items-center gap-3">
                  <MapPinned size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Carte interactive IGN</p>
                    <p className="text-[10px] text-muted-foreground">{formattedAddress}</p>
                  </div>
                </div>
                <button
                  onClick={() => setStep("address")}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw size={10} />
                  Changer adresse
                </button>
              </div>

              {/* Instructions */}
              <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-5 py-2.5">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <p className="text-xs text-foreground/70">
                  Un rectangle de selection de 20x20m est place sur votre adresse. Ajustez-le si besoin pour couvrir exactement votre toiture, puis cliquez sur{" "}
                  <span className="font-semibold text-primary">Capturer et analyser</span>.
                  Vous pouvez aussi utiliser les outils de mesure.
                </p>
              </div>

              {/* Leaflet Map */}
              <LeafletMap
                center={mapCenter}
                zoom={19}
                onCapture={handleMapCapture}
                onMeasurementsChange={(m) => setMapMeasurements(m)}
                className="h-[450px] md:h-[550px]"
              />

              {/* Measurements display */}
              {mapMeasurements.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 border-t border-border px-5 py-3">
                  <Ruler size={12} className="text-primary" />
                  <span className="text-xs font-medium text-foreground">Mesures :</span>
                  {mapMeasurements.map((m, i) => (
                    <span key={i} className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                      {m.type === "area"
                        ? `${m.value.toFixed(1)} m\u00B2`
                        : `${m.value.toFixed(1)} m`}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === "payment" && (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-border bg-card p-8">
              {/* Header */}
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Shield size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  Finalisez votre diagnostic
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Paiement securise par Stripe. Rapport PDF complet inclus.
                </p>
              </div>

              {/* Preview of captured image */}
              {capturedImage && (
                <div className="mb-6 overflow-hidden rounded-xl border border-border">
                  <img
                    src={capturedImage}
                    alt="Apercu de la toiture"
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}

              {/* What you get */}
              <div className="mb-6 rounded-xl bg-secondary/30 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Inclus dans votre diagnostic
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Analyse vegetale (mousse, lichen)",
                    "Analyse structurelle (tuiles, faitage)",
                    "Analyse etancheite (infiltrations)",
                    "Analyse thermique (deperditions)",
                    "Scores detailles par zone",
                    "Rapport PDF telechareable",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 size={12} className="shrink-0 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Client info form */}
              <div className="mb-5 space-y-3 rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-xs font-semibold text-foreground">Vos coordonnees</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="client-name" className="mb-1 block text-[11px] font-medium text-muted-foreground">
                      Nom complet *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="client-phone" className="mb-1 block text-[11px] font-medium text-muted-foreground">
                      Telephone *
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="client-email" className="mb-1 block text-[11px] font-medium text-muted-foreground">
                    Adresse email *
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Le rapport PDF sera envoye a cette adresse. Vos coordonnees restent confidentielles.
                </p>
              </div>

              {/* Disclaimer checkbox */}
              <div className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptedDisclaimer}
                    onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-primary"
                  />
                  <span className="text-xs leading-relaxed text-foreground">
                    {"J'accepte que ce diagnostic est une "}
                    <strong>estimation indicative generee par intelligence artificielle</strong>
                    {" a partir d'une photo. Il "}
                    <strong>ne remplace en aucun cas</strong>
                    {" l'inspection physique d'un couvreur ou d'un expert qualifie. ACO-HABITAT decline toute responsabilite en cas de decisions prises sur la seule base de ce rapport. "}
                    <a href="/mentions-legales" target="_blank" className="text-primary underline">
                      Mentions legales
                    </a>
                  </span>
                </label>
              </div>

              {/* Stripe Embedded Checkout */}
              {acceptedDisclaimer ? (
                <div className="rounded-xl border border-border bg-background p-1">
                  <StripeCheckout
                    productId="diagnostic-toiture"
                    onComplete={() => {
                      console.log("[v0] Stripe onComplete triggered, capturedImage:", !!capturedImage, "address:", formattedAddress)
                      runDiagnostic()
                    }}
                  />
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-secondary/50 p-6 text-center">
                  <Shield size={20} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Veuillez accepter les conditions ci-dessus pour acceder au paiement
                  </p>
                </div>
              )}

              <p className="mt-4 text-center text-[10px] text-muted-foreground">
                Paiement securise 256-bit SSL. Vos donnees bancaires ne transitent jamais par nos serveurs.
              </p>
            </div>
          </div>
        )}

        {/* Scanning / Analyzing View */}
        {(step === "scanning" || step === "analyzing") && capturedImage && (
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
                    src={capturedImage || ""}
                    alt="Capture IGN de la toiture"
                    className="w-full"
                    style={{
                      objectFit: "cover",
                      imageRendering: "crisp-edges",
                      filter: "contrast(1.1) saturate(1.05) brightness(1.02)",
                    }}
                />
                <ScannerOverlay phase={step} />
              </div>

              {/* Bottom status bar */}
              <div className="flex items-center gap-4 border-t border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Brain size={14} className="animate-pulse text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {step === "scanning"
                      ? "Scan de la capture IGN... Detection des contours de la toiture"
                      : "Analyse IA multi-calques : vegetation, structure, etancheite, thermique"}
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
        {step === "results" && diagnostic && capturedImage && (
          <div ref={resultsRef} className="animate-fade-up space-y-8">
            {/* Address bar + Material detection */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{formattedAddress}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Diagnostic IGN - {new Date().toLocaleDateString("fr-FR")}
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

              {/* User-drawn measurements from map */}
              {mapMeasurements.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <Ruler size={16} className="text-primary" />
                  <span className="text-xs font-semibold text-foreground">Mesures manuelles :</span>
                  {mapMeasurements.map((m, i) => (
                    <span key={i} className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                      {m.type === "area"
                        ? `Surface : ${m.value.toFixed(1)} m\u00B2`
                        : `Longueur : ${m.value.toFixed(1)} m`}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-4 rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
                {diagnostic.summary}
              </p>
            </div>

            {/* Image + Zones + Sidebar */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* IGN aerial image with overlay zones */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-border bg-card">
                  {/* Toolbar - single roof view */}
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Crosshair size={14} className="text-primary" />
                      <span className="text-xs font-medium text-foreground">Vue aerienne IGN - Toiture analysee</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-green-500/10 px-2.5 py-1 border border-green-500/30">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                      <span className="text-[10px] font-semibold text-green-400">Analyse terminee</span>
                    </div>
                  </div>

                  {/* Clean image of the single roof */}
                  <div className="relative">
                    <img
                      src={capturedImage || ""}
                      alt="Vue aerienne IGN de la toiture analysee"
                      className="w-full"
                      style={{
                        objectFit: "cover",
                        imageRendering: "crisp-edges",
                        filter: "contrast(1.1) saturate(1.05) brightness(1.02)",
                      }}
                    />
                    {/* Subtle tech grid overlay */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />

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
                          Ortho-photo IGN - Analyse IA haute resolution
                        </span>
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

            {/* Resume du diagnostic */}
            {(() => {
              const hasStructure = diagnostic.structure.zones.some(z => z.severity === "severe" || z.severity === "modere")
              const hasThermique = diagnostic.thermique?.pertesChaleur?.some(z => z.intensite > 10)
              const hasEtancheite = diagnostic.etancheite.zones.some(z => z.severity === "severe" || z.severity === "modere")
              const hasVegetal = diagnostic.vegetal.zones.some(z => z.severity === "severe" || z.severity === "modere")
              const totalIssues = [hasStructure, hasThermique, hasEtancheite, hasVegetal].filter(Boolean).length

              return (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                      <AlertTriangle size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                        Resume du diagnostic
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {totalIssues} point{totalIssues > 1 ? "s" : ""} de vigilance detecte{totalIssues > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Structure */}
                    <div
                      className="flex items-start gap-3 rounded-xl border-2 p-4"
                      style={{
                        borderColor: hasStructure ? "#ef4444" : "var(--color-border)",
                        backgroundColor: hasStructure ? "rgba(239,68,68,0.05)" : "transparent",
                      }}
                    >
                      <div
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: hasStructure ? "rgba(239,68,68,0.15)" : "var(--color-secondary)" }}
                      >
                        <Wrench size={14} style={{ color: hasStructure ? "#ef4444" : "var(--color-muted-foreground)" }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: hasStructure ? "#ef4444" : "var(--color-foreground)" }}>
                          {hasStructure ? "Attention, probleme structurel critique !" : "Structure conforme"}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {hasStructure ? diagnostic.structure.description : "Aucun defaut structurel majeur detecte."}
                        </p>
                        {hasStructure && (
                          <a href="mailto:aco.habitat@orange.fr?subject=Demande intervention toiture" className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-red-500 hover:underline">
                            <Send size={8} />
                            Demander une intervention
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Thermique */}
                    <div
                      className="flex items-start gap-3 rounded-xl border-2 p-4"
                      style={{
                        borderColor: hasThermique ? "#f97316" : "var(--color-border)",
                        backgroundColor: hasThermique ? "rgba(249,115,22,0.05)" : "transparent",
                      }}
                    >
                      <div
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: hasThermique ? "rgba(249,115,22,0.15)" : "var(--color-secondary)" }}
                      >
                        <Flame size={14} style={{ color: hasThermique ? "#f97316" : "var(--color-muted-foreground)" }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: hasThermique ? "#f97316" : "var(--color-foreground)" }}>
                          {hasThermique ? "Alerte thermique : isolation a verifier" : "Isolation correcte"}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {hasThermique ? diagnostic.thermique.commentaire : "Pas de deperdition thermique significative."}
                        </p>
                        {hasThermique && (
                          <a href="#couvreurs" className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-orange-500 hover:underline">
                            <Send size={8} />
                            Trouver un couvreur specialise
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Etancheite */}
                    <div
                      className="flex items-start gap-3 rounded-xl border-2 p-4"
                      style={{
                        borderColor: hasEtancheite ? "#f59e0b" : "#22c55e",
                        backgroundColor: hasEtancheite ? "rgba(245,158,11,0.05)" : "rgba(34,197,94,0.05)",
                      }}
                    >
                      <div
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: hasEtancheite ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)" }}
                      >
                        <Droplets size={14} style={{ color: hasEtancheite ? "#f59e0b" : "#22c55e" }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: hasEtancheite ? "#f59e0b" : "#22c55e" }}>
                          {hasEtancheite ? "Etancheite a surveiller" : "Etancheite conforme"}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {hasEtancheite ? diagnostic.etancheite.description : "L'etancheite de votre toiture est en bon etat."}
                        </p>
                        {hasEtancheite && (
                          <a href="#couvreurs" className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-500 hover:underline">
                            <Send size={8} />
                            Trouver un couvreur
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Vegetal */}
                    <div
                      className="flex items-start gap-3 rounded-xl border-2 p-4"
                      style={{
                        borderColor: hasVegetal ? "#84cc16" : "var(--color-border)",
                        backgroundColor: hasVegetal ? "rgba(132,204,22,0.05)" : "transparent",
                      }}
                    >
                      <div
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: hasVegetal ? "rgba(132,204,22,0.15)" : "var(--color-secondary)" }}
                      >
                        <Leaf size={14} style={{ color: hasVegetal ? "#84cc16" : "var(--color-muted-foreground)" }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: hasVegetal ? "#84cc16" : "var(--color-foreground)" }}>
                          {hasVegetal ? "Vegetation parasite detectee" : "Pas de vegetation parasite"}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {hasVegetal ? diagnostic.vegetal.description : "Aucune mousse ou lichen problematique detecte."}
                        </p>
                        {hasVegetal && (
                          <a href="mailto:aco.habitat@orange.fr?subject=Demande nettoyage toiture" className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold hover:underline" style={{ color: "#84cc16" }}>
                            <Send size={8} />
                            Demander un nettoyage
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Global alert banner if critical issues */}
                  {(hasStructure || hasThermique) && (
                    <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                      <XCircle size={18} className="shrink-0 text-red-500" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-red-500">
                          Intervention recommandee
                        </p>
                        <p className="text-xs text-red-400/80">
                          Des points critiques ont ete detectes sur votre toiture. Nous vous recommandons de faire intervenir un professionnel.
                        </p>
                      </div>
                      <a
                        href="tel:+33233311979"
                        className="flex shrink-0 items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-red-600"
                      >
                        <Phone size={12} />
                        Appeler
                      </a>
                    </div>
                  )}
                </div>
              )
            })()}

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
                  {"Telecharger mon rapport PDF complet"}
                </h3>
                <p className="mx-auto mb-6 max-w-lg text-sm text-muted-foreground">
                  Document professionnel detaille avec photo satellite, scores de diagnostic,
                  zones detectees, analyse thermique et recommandations d{"'"}intervention.
                </p>
                <button
                  onClick={async () => {
                    const { generateDiagnosticPDF } = await import("@/lib/generate-pdf")
                    await generateDiagnosticPDF(
                      diagnostic,
                      capturedImage || "",
                      formattedAddress,
                      mapMeasurements,
                      { name: clientName, phone: clientPhone, email: clientEmail }
                    )
                  }}
                  className="group relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/30"
                >
                  <Download size={20} />
                  Re-telecharger le rapport PDF
                  <span className="ml-1 rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-semibold">INCLUS</span>
                </button>
                {emailSent ? (
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-green-400">
                    <CheckCircle2 size={12} />
                    Rapport PDF telecharge et envoye a {clientEmail}
                  </p>
                ) : sendingEmail ? (
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <Loader2 size={12} className="animate-spin" />
                    Envoi du rapport par email en cours...
                  </p>
                ) : (
                  <p className="mt-3 text-[10px] text-muted-foreground">
                    Le rapport PDF a ete telecharge automatiquement.
                  </p>
                )}
              </div>
            </div>

            {/* Weather widget */}
            <WeatherDiagnosticWidget address={formattedAddress} score={diagnostic.scoreGlobal} />

            {/* Cross-selling charpente - si score structure bas */}
            {diagnostic.structure && diagnostic.structure.score < 60 && (
              <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-8">
                <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                    <path d="M3 21h18" />
                    <path d="M3 7v1a3 3 0 0 0 6 0V7" />
                    <path d="M9 7v1a3 3 0 0 0 6 0V7" />
                    <path d="M15 7v1a3 3 0 0 0 6 0V7" />
                    <path d="M12 2L2 7h20L12 2z" />
                    <path d="M6 12v7" />
                    <path d="M10 12v7" />
                    <path d="M14 12v7" />
                    <path d="M18 12v7" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Recommandation
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  Votre charpente semble fragilisee
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Notre analyse detecte un <strong className="text-amber-400">score structure de {diagnostic.structure.score}/100</strong>. 
                  Cela peut indiquer des problemes au niveau de la charpente (bois affaibli, deformation, humidite).
                  Completez votre diagnostic avec une <strong className="text-foreground">analyse charpente par IA</strong> pour 
                  avoir une vision complete de votre toiture.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href="https://aco-habitat.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
                  >
                    Diagnostic charpente par IA
                    <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <span className="text-xs text-muted-foreground">sur aco-habitat.fr</span>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent p-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                Prochaine etape : trouver un couvreur
              </h3>
              <p className="mb-6 text-muted-foreground">
                Transmettez votre rapport PDF a un professionnel qualifie pour obtenir un devis precis.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#couvreurs"
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <Search size={16} />
                  Trouver un couvreur pres de chez moi
                </a>
              </div>
            </div>

            {/* Legal disclaimer */}
            <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-[10px] leading-relaxed text-amber-200/70">
                <strong className="text-amber-200/90">Avertissement :</strong> Ce diagnostic est une aide a la decision basee sur
                l{"'"}analyse automatisee d{"'"}images par intelligence artificielle. Il ne remplace pas une inspection physique par un
                professionnel qualifie. Les scores et zones detectees sont indicatifs. ACO-HABITAT est une plateforme independante
                non affiliee a des prestataires de travaux.{" "}
                <a href="/mentions-legales" className="underline hover:text-amber-200">Mentions legales et CGV</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
