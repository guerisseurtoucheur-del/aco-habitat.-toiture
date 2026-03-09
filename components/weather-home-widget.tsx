"use client"

import { useEffect, useState } from "react"
import { Cloud, CloudRain, Sun, Wind, Snowflake, CloudLightning, Thermometer, Droplets, AlertTriangle, CheckCircle } from "lucide-react"

interface WeatherData {
  temperature: number
  description: string
  icon: string
  windSpeed: number
  humidity: number
  city: string
  alerts: {
    type: string
    message: string
    severity: "low" | "medium" | "high"
  }[]
  forecast: {
    date: string
    tempMax: number
    tempMin: number
    icon: string
    description: string
  }[]
}

const weatherIcons: Record<string, React.ReactNode> = {
  "01d": <Sun className="h-8 w-8 text-yellow-400" />,
  "01n": <Sun className="h-8 w-8 text-yellow-200" />,
  "02d": <Cloud className="h-8 w-8 text-gray-300" />,
  "02n": <Cloud className="h-8 w-8 text-gray-400" />,
  "03d": <Cloud className="h-8 w-8 text-gray-400" />,
  "03n": <Cloud className="h-8 w-8 text-gray-500" />,
  "04d": <Cloud className="h-8 w-8 text-gray-500" />,
  "04n": <Cloud className="h-8 w-8 text-gray-600" />,
  "09d": <CloudRain className="h-8 w-8 text-blue-400" />,
  "09n": <CloudRain className="h-8 w-8 text-blue-500" />,
  "10d": <CloudRain className="h-8 w-8 text-blue-400" />,
  "10n": <CloudRain className="h-8 w-8 text-blue-500" />,
  "11d": <CloudLightning className="h-8 w-8 text-yellow-500" />,
  "11n": <CloudLightning className="h-8 w-8 text-yellow-600" />,
  "13d": <Snowflake className="h-8 w-8 text-blue-200" />,
  "13n": <Snowflake className="h-8 w-8 text-blue-300" />,
  "50d": <Cloud className="h-8 w-8 text-gray-400" />,
  "50n": <Cloud className="h-8 w-8 text-gray-500" />,
}

const smallWeatherIcons: Record<string, React.ReactNode> = {
  "01d": <Sun className="h-5 w-5 text-yellow-400" />,
  "01n": <Sun className="h-5 w-5 text-yellow-200" />,
  "02d": <Cloud className="h-5 w-5 text-gray-300" />,
  "02n": <Cloud className="h-5 w-5 text-gray-400" />,
  "03d": <Cloud className="h-5 w-5 text-gray-400" />,
  "03n": <Cloud className="h-5 w-5 text-gray-500" />,
  "04d": <Cloud className="h-5 w-5 text-gray-500" />,
  "04n": <Cloud className="h-5 w-5 text-gray-600" />,
  "09d": <CloudRain className="h-5 w-5 text-blue-400" />,
  "09n": <CloudRain className="h-5 w-5 text-blue-500" />,
  "10d": <CloudRain className="h-5 w-5 text-blue-400" />,
  "10n": <CloudRain className="h-5 w-5 text-blue-500" />,
  "11d": <CloudLightning className="h-5 w-5 text-yellow-500" />,
  "11n": <CloudLightning className="h-5 w-5 text-yellow-600" />,
  "13d": <Snowflake className="h-5 w-5 text-blue-200" />,
  "13n": <Snowflake className="h-5 w-5 text-blue-300" />,
  "50d": <Cloud className="h-5 w-5 text-gray-400" />,
  "50n": <Cloud className="h-5 w-5 text-gray-500" />,
}

function getRoofRisk(weather: WeatherData): { level: "low" | "medium" | "high"; message: string } {
  if (weather.alerts.some(a => a.severity === "high")) {
    return { level: "high", message: "Risque eleve pour votre toiture" }
  }
  if (weather.windSpeed > 50) {
    return { level: "high", message: "Vent fort : risque de tuiles envolees" }
  }
  if (weather.alerts.some(a => a.type === "storm" || a.type === "hail")) {
    return { level: "high", message: "Orage/grele : surveillez votre toiture" }
  }
  if (weather.windSpeed > 30 || weather.humidity > 85) {
    return { level: "medium", message: "Conditions a surveiller" }
  }
  return { level: "low", message: "Conditions favorables" }
}

export function WeatherHomeWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [userCity, setUserCity] = useState<string | null>(null)

  useEffect(() => {
    // Try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude)
        },
        () => {
          // Default to Paris if geolocation denied
          fetchWeather(48.8566, 2.3522)
        },
        { timeout: 5000 }
      )
    } else {
      fetchWeather(48.8566, 2.3522)
    }
  }, [])

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      if (res.ok) {
        const data = await res.json()
        setWeather(data)
        setUserCity(data.city)
      }
    } catch (e) {
      console.error("Weather fetch error:", e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 animate-pulse">
        <div className="h-24 bg-muted rounded-lg"></div>
      </div>
    )
  }

  if (!weather) {
    return null
  }

  const risk = getRoofRisk(weather)

  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      {/* Header with risk indicator */}
      <div className={`px-4 py-2 flex items-center justify-between ${
        risk.level === "high" ? "bg-red-500/10 border-b border-red-500/20" :
        risk.level === "medium" ? "bg-amber-500/10 border-b border-amber-500/20" :
        "bg-green-500/10 border-b border-green-500/20"
      }`}>
        <div className="flex items-center gap-2">
          {risk.level === "low" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <AlertTriangle className={`h-4 w-4 ${risk.level === "high" ? "text-red-500" : "text-amber-500"}`} />
          )}
          <span className={`text-xs font-medium ${
            risk.level === "high" ? "text-red-600" :
            risk.level === "medium" ? "text-amber-600" :
            "text-green-600"
          }`}>
            {risk.message}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{userCity || weather.city}</span>
      </div>

      <div className="p-4">
        {/* Current weather */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {weatherIcons[weather.icon] || <Cloud className="h-8 w-8 text-gray-400" />}
            <div>
              <div className="text-2xl font-bold text-foreground">{Math.round(weather.temperature)}°C</div>
              <div className="text-xs text-muted-foreground capitalize">{weather.description}</div>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Wind className="h-3 w-3" />
              <span>{Math.round(weather.windSpeed)} km/h</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="h-3 w-3" />
              <span>{weather.humidity}%</span>
            </div>
          </div>
        </div>

        {/* 4-day forecast */}
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border/50">
          {weather.forecast.slice(0, 4).map((day, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="text-[10px] text-muted-foreground mb-1">
                {new Date(day.date).toLocaleDateString("fr-FR", { weekday: "short" })}
              </span>
              {smallWeatherIcons[day.icon] || <Cloud className="h-5 w-5 text-gray-400" />}
              <span className="text-xs font-medium text-foreground mt-1">{Math.round(day.tempMax)}°</span>
              <span className="text-[10px] text-muted-foreground">{Math.round(day.tempMin)}°</span>
            </div>
          ))}
        </div>

        {/* Alerts if any */}
        {weather.alerts.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            {weather.alerts.slice(0, 2).map((alert, i) => (
              <div key={i} className={`text-xs px-2 py-1 rounded mb-1 ${
                alert.severity === "high" ? "bg-red-500/10 text-red-600" :
                alert.severity === "medium" ? "bg-amber-500/10 text-amber-600" :
                "bg-blue-500/10 text-blue-600"
              }`}>
                {alert.message}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
