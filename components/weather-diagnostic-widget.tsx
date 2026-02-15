"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, CloudLightning, Wind, Sun, Snowflake, AlertTriangle, Droplets, Thermometer } from "lucide-react"

interface WeatherCurrent {
  temp: number
  description: string
  icon: string
  wind_speed: number
  humidity: number
  city_name: string
}

interface DayForecast {
  date: string
  temp_min: number
  temp_max: number
  description: string
  icon: string
  wind_speed: number
  rain: boolean
  snow: boolean
}

interface WeatherAlert {
  event: string
  description: string
}

interface WeatherData {
  current: WeatherCurrent
  forecast: DayForecast[]
  alerts: WeatherAlert[]
}

function getWeatherIcon(icon: string, size: number = 16) {
  if (icon.startsWith("01")) return <Sun size={size} className="text-amber-400" />
  if (icon.startsWith("02") || icon.startsWith("03") || icon.startsWith("04")) return <Cloud size={size} className="text-muted-foreground" />
  if (icon.startsWith("09") || icon.startsWith("10")) return <CloudRain size={size} className="text-blue-400" />
  if (icon.startsWith("11")) return <CloudLightning size={size} className="text-amber-400" />
  if (icon.startsWith("13")) return <Snowflake size={size} className="text-blue-300" />
  return <Cloud size={size} className="text-muted-foreground" />
}

function formatDay(dateStr: string): string {
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
  const date = new Date(dateStr + "T12:00:00")
  return days[date.getDay()]
}

export function WeatherDiagnosticWidget({ address, score }: { address: string; score: number }) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Extract city from address
        const parts = address.split(",")
        const city = parts.length > 1 ? parts[parts.length - 2].trim() : parts[0].trim()
        
        const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
        if (!res.ok) return
        const data = await res.json()
        setWeather(data)
      } catch {
        // Silent fail
      } finally {
        setLoading(false)
      }
    }

    if (address) {
      fetchWeather()
    } else {
      setLoading(false)
    }
  }, [address])

  if (loading) {
    return (
      <div className="animate-pulse rounded-2xl border border-border bg-card p-6">
        <div className="h-4 w-32 rounded-lg bg-secondary" />
        <div className="mt-3 h-10 w-20 rounded-lg bg-secondary" />
        <div className="mt-4 flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 flex-1 rounded-lg bg-secondary" />
          ))}
        </div>
      </div>
    )
  }

  if (!weather) return null

  const hasAlerts = weather.alerts.length > 0
  const hasDangerousWeather = weather.alerts.some(
    (a) => a.event.includes("Orage") || a.event.includes("Vent fort")
  )

  // Generate weather-aware recommendation based on score - always show one
  function getWeatherRecommendation(): { text: string; level: "urgent" | "warning" | "info" } {
    if (hasDangerousWeather && score < 50) {
      return { text: "URGENT : Votre toiture est fragilisee et des conditions meteorologiques severes sont prevues. Faites intervenir un couvreur rapidement pour eviter des degats supplementaires.", level: "urgent" }
    }
    if (hasDangerousWeather && score < 70) {
      return { text: "Attention : des intemperies sont prevues dans votre zone et votre toiture presente des faiblesses. Surveillez les infiltrations apres le passage de la perturbation.", level: "warning" }
    }
    if (hasAlerts && score < 50) {
      return { text: "Votre toiture est en mauvais etat. Les conditions meteo a venir pourraient aggraver les problemes existants. Contactez un couvreur pour un devis.", level: "warning" }
    }
    if (weather.current.wind_speed > 40 && score < 60) {
      return { text: "Vent soutenu detecte dans votre zone. Sur une toiture fragilisee, le vent peut soulever des tuiles et endommager le faitage.", level: "warning" }
    }
    if (hasDangerousWeather) {
      return { text: "Des intemperies sont prevues dans votre zone. Meme si votre toiture est en bon etat, restez vigilant et verifiez apres le passage de la perturbation.", level: "warning" }
    }
    if (score < 50) {
      return { text: `Conditions meteo actuelles : ${weather.current.description} avec un vent de ${weather.current.wind_speed} km/h. Votre toiture fragilisee (score ${score}/100) est plus vulnerable aux intemperies. Planifiez des reparations.`, level: "warning" }
    }
    if (score < 70) {
      return { text: `Conditions meteo actuelles : ${weather.current.description}. Votre toiture presente quelques faiblesses (score ${score}/100). Surveillez l'apparition de mousses et verifiez l'etancheite apres chaque episode pluvieux.`, level: "info" }
    }
    return { text: `Conditions meteo actuelles : ${weather.current.description} a ${weather.current.temp}°C. Votre toiture est en bon etat (score ${score}/100). Continuez a surveiller regulierement, surtout apres les periodes de gel ou de forte chaleur.`, level: "info" }
  }

  const recommendation = getWeatherRecommendation()

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <Cloud size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Meteo {weather.current.city_name}
          </span>
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">
          {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>

      <div className="p-5">
        {/* Current weather */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.current.icon, 32)}
            <div>
              <p className="text-3xl font-bold text-foreground">{weather.current.temp}°C</p>
              <p className="text-xs capitalize text-muted-foreground">{weather.current.description}</p>
            </div>
          </div>
          <div className="ml-auto flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Wind size={12} />
              <span>{weather.current.wind_speed} km/h</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets size={12} />
              <span>{weather.current.humidity}%</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {hasAlerts && (
          <div className="mt-4 space-y-2">
            {weather.alerts.map((alert, i) => (
              <div
                key={i}
                className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 ${
                  alert.event.includes("Orage")
                    ? "border-red-500/30 bg-red-500/10"
                    : alert.event.includes("Vent")
                    ? "border-orange-500/30 bg-orange-500/10"
                    : "border-blue-500/30 bg-blue-500/10"
                }`}
              >
                <AlertTriangle size={14} className={
                  alert.event.includes("Orage")
                    ? "mt-0.5 shrink-0 text-red-400"
                    : alert.event.includes("Vent")
                    ? "mt-0.5 shrink-0 text-orange-400"
                    : "mt-0.5 shrink-0 text-blue-400"
                } />
                <div>
                  <p className="text-xs font-semibold text-foreground">{alert.event}</p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">{alert.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendation - toujours affichee */}
        <div className={`mt-4 flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 ${
          recommendation.level === "urgent"
            ? "border-red-500/30 bg-red-500/10"
            : recommendation.level === "warning"
            ? "border-orange-500/30 bg-orange-500/10"
            : "border-primary/30 bg-primary/5"
        }`}>
          <Thermometer size={14} className={`mt-0.5 shrink-0 ${
            recommendation.level === "urgent"
              ? "text-red-400"
              : recommendation.level === "warning"
              ? "text-orange-400"
              : "text-primary"
          }`} />
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${
              recommendation.level === "urgent"
                ? "text-red-400"
                : recommendation.level === "warning"
                ? "text-orange-400"
                : "text-primary"
            }`}>
              {recommendation.level === "urgent" ? "Alerte toiture" : recommendation.level === "warning" ? "Surveillance recommandee" : "Impact meteo sur votre toiture"}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-foreground">{recommendation.text}</p>
          </div>
        </div>

        {/* 4-day forecast */}
        {weather.forecast.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {weather.forecast.map((day) => (
              <div
                key={day.date}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-secondary/30 px-2 py-3"
              >
                <span className="text-[11px] font-semibold text-muted-foreground">{formatDay(day.date)}</span>
                {getWeatherIcon(day.icon, 20)}
                <div className="flex items-center gap-1 text-xs">
                  <span className="font-bold text-foreground">{day.temp_max}°</span>
                  <span className="text-muted-foreground">{day.temp_min}°</span>
                </div>
                {day.wind_speed > 40 && (
                  <span className="text-[9px] font-medium text-orange-400">{day.wind_speed} km/h</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
