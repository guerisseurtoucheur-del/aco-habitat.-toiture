"use client"

import { useState, useEffect } from "react"
import { CloudRain, Wind, CloudLightning, X, AlertTriangle, Shield } from "lucide-react"

interface WeatherAlert {
  event: string
  description: string
  start: number
  end: number
}

const alertIcons: Record<string, typeof CloudRain> = {
  "Vent fort": Wind,
  "Vent fort prevu": Wind,
  "Fortes pluies prevues": CloudRain,
  "Orage prevu": CloudLightning,
}

const alertColors: Record<string, string> = {
  "Vent fort": "border-orange-500/40 bg-orange-500/10",
  "Vent fort prevu": "border-amber-500/40 bg-amber-500/10",
  "Fortes pluies prevues": "border-blue-500/40 bg-blue-500/10",
  "Orage prevu": "border-red-500/40 bg-red-500/10",
}

const alertIconColors: Record<string, string> = {
  "Vent fort": "text-orange-400",
  "Vent fort prevu": "text-amber-400",
  "Fortes pluies prevues": "text-blue-400",
  "Orage prevu": "text-red-400",
}

export function WeatherAlertBanner() {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([])
  const [dismissed, setDismissed] = useState(false)
  const [cityName, setCityName] = useState("")

  useEffect(() => {
    // Default to Normandie area if geolocation fails
    const defaultLat = 49.44
    const defaultLon = 1.09

    async function fetchAlerts(lat: number, lon: number) {
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
        if (!res.ok) return
        const data = await res.json()
        if (data.alerts && data.alerts.length > 0) {
          setAlerts(data.alerts)
        }
        if (data.current?.city_name) {
          setCityName(data.current.city_name)
        }
      } catch {
        // Silent fail - no weather banner
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchAlerts(pos.coords.latitude, pos.coords.longitude),
        () => fetchAlerts(defaultLat, defaultLon),
        { timeout: 5000 }
      )
    } else {
      fetchAlerts(defaultLat, defaultLon)
    }
  }, [])

  if (dismissed || alerts.length === 0) return null

  const mainAlert = alerts[0]
  const Icon = alertIcons[mainAlert.event] || AlertTriangle
  const borderColor = alertColors[mainAlert.event] || "border-amber-500/40 bg-amber-500/10"
  const iconColor = alertIconColors[mainAlert.event] || "text-amber-400"

  return (
    <div className={`relative rounded-xl ${borderColor}`}>
      <div className="flex items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/50 ${iconColor}`}>
          <Icon size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-foreground sm:text-sm">
            <span className={iconColor}>{mainAlert.event}</span>
            {cityName && <span className="text-muted-foreground"> - {cityName}</span>}
          </p>
          <p className="truncate text-[11px] leading-snug text-muted-foreground sm:text-xs">
            {mainAlert.description}
          </p>
        </div>
        <a
          href="#diagnostic"
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:text-xs"
        >
          <Shield size={12} />
          <span className="hidden sm:inline">Verifier ma toiture</span>
          <span className="sm:hidden">Diagnostic</span>
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Fermer l'alerte"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
