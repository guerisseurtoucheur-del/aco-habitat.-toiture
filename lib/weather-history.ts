// Weather history service using Open-Meteo Archive API (free, no API key needed)

export interface WeatherEvent {
  date: string
  type: "tempete" | "grele" | "gel" | "pluie_forte" | "canicule"
  severity: "modere" | "fort" | "extreme"
  description: string
  windSpeed?: number
  precipitation?: number
  temperature?: number
}

export interface WeatherHistory {
  location: string
  latitude: number
  longitude: number
  period: {
    start: string
    end: string
  }
  events: WeatherEvent[]
  summary: string
}

// Thresholds for weather events detection
const THRESHOLDS = {
  tempete: { windSpeed: 60 }, // km/h
  tempete_forte: { windSpeed: 90 },
  tempete_extreme: { windSpeed: 120 },
  grele: { precipitation: 15, tempLow: 0, tempHigh: 15 }, // mm/h with temp suggesting hail
  pluie_forte: { precipitation: 20 }, // mm/day
  pluie_extreme: { precipitation: 50 },
  gel: { temperature: -5 },
  gel_extreme: { temperature: -10 },
  canicule: { temperature: 35 },
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

function formatFrenchDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function getSeverity(value: number, moderate: number, strong: number): "modere" | "fort" | "extreme" {
  if (value >= strong) return "extreme"
  if (value >= moderate) return "fort"
  return "modere"
}

export async function getWeatherHistory(
  latitude: number,
  longitude: number,
  days: number = 30
): Promise<WeatherHistory> {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    start_date: formatDate(startDate),
    end_date: formatDate(endDate),
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code",
    timezone: "Europe/Paris",
  })

  try {
    const response = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?${params.toString()}`
    )

    if (!response.ok) {
      console.error("Weather history API error:", response.status)
      return createEmptyHistory(latitude, longitude, startDate, endDate)
    }

    const data = await response.json()
    return processWeatherData(data, latitude, longitude, startDate, endDate)
  } catch (error) {
    console.error("Weather history fetch error:", error)
    return createEmptyHistory(latitude, longitude, startDate, endDate)
  }
}

function createEmptyHistory(
  latitude: number,
  longitude: number,
  startDate: Date,
  endDate: Date
): WeatherHistory {
  return {
    location: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
    latitude,
    longitude,
    period: {
      start: formatDate(startDate),
      end: formatDate(endDate),
    },
    events: [],
    summary: "Aucun evenement meteo significatif detecte sur cette periode.",
  }
}

function processWeatherData(
  data: any,
  latitude: number,
  longitude: number,
  startDate: Date,
  endDate: Date
): WeatherHistory {
  const events: WeatherEvent[] = []
  const daily = data.daily

  if (!daily || !daily.time) {
    return createEmptyHistory(latitude, longitude, startDate, endDate)
  }

  for (let i = 0; i < daily.time.length; i++) {
    const date = daily.time[i]
    const windSpeed = daily.wind_speed_10m_max?.[i]
    const precipitation = daily.precipitation_sum?.[i]
    const tempMax = daily.temperature_2m_max?.[i]
    const tempMin = daily.temperature_2m_min?.[i]
    const weatherCode = daily.weather_code?.[i]

    // Detect storms (tempete)
    if (windSpeed && windSpeed >= THRESHOLDS.tempete.windSpeed) {
      const severity = getSeverity(
        windSpeed,
        THRESHOLDS.tempete.windSpeed,
        THRESHOLDS.tempete_forte.windSpeed
      )
      events.push({
        date,
        type: "tempete",
        severity,
        description: `Vents violents de ${Math.round(windSpeed)} km/h`,
        windSpeed: Math.round(windSpeed),
      })
    }

    // Detect heavy rain (pluie forte)
    if (precipitation && precipitation >= THRESHOLDS.pluie_forte.precipitation) {
      const severity = getSeverity(
        precipitation,
        THRESHOLDS.pluie_forte.precipitation,
        THRESHOLDS.pluie_extreme.precipitation
      )
      events.push({
        date,
        type: "pluie_forte",
        severity,
        description: `Fortes precipitations de ${Math.round(precipitation)} mm`,
        precipitation: Math.round(precipitation),
      })
    }

    // Detect hail conditions (grele) - weather codes 96, 99 indicate hail
    if (weatherCode && (weatherCode === 96 || weatherCode === 99)) {
      events.push({
        date,
        type: "grele",
        severity: weatherCode === 99 ? "fort" : "modere",
        description: `Episode de grele detecte`,
        precipitation: precipitation ? Math.round(precipitation) : undefined,
      })
    }

    // Detect frost (gel)
    if (tempMin !== undefined && tempMin <= THRESHOLDS.gel.temperature) {
      const severity = getSeverity(
        Math.abs(tempMin),
        Math.abs(THRESHOLDS.gel.temperature),
        Math.abs(THRESHOLDS.gel_extreme.temperature)
      )
      events.push({
        date,
        type: "gel",
        severity,
        description: `Gel intense avec ${Math.round(tempMin)}°C`,
        temperature: Math.round(tempMin),
      })
    }

    // Detect heat wave (canicule)
    if (tempMax !== undefined && tempMax >= THRESHOLDS.canicule.temperature) {
      events.push({
        date,
        type: "canicule",
        severity: tempMax >= 40 ? "extreme" : tempMax >= 38 ? "fort" : "modere",
        description: `Canicule avec ${Math.round(tempMax)}°C`,
        temperature: Math.round(tempMax),
      })
    }
  }

  // Sort by date descending (most recent first)
  events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Generate summary
  const summary = generateSummary(events)

  return {
    location: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
    latitude,
    longitude,
    period: {
      start: formatDate(startDate),
      end: formatDate(endDate),
    },
    events,
    summary,
  }
}

function generateSummary(events: WeatherEvent[]): string {
  if (events.length === 0) {
    return "Aucun evenement meteo significatif detecte sur les 30 derniers jours. Conditions meteorologiques normales."
  }

  const tempetes = events.filter((e) => e.type === "tempete")
  const greles = events.filter((e) => e.type === "grele")
  const pluies = events.filter((e) => e.type === "pluie_forte")
  const gels = events.filter((e) => e.type === "gel")

  const parts: string[] = []

  if (tempetes.length > 0) {
    const maxWind = Math.max(...tempetes.map((t) => t.windSpeed || 0))
    parts.push(`${tempetes.length} episode(s) de vents violents (max ${maxWind} km/h)`)
  }

  if (greles.length > 0) {
    parts.push(`${greles.length} episode(s) de grele`)
  }

  if (pluies.length > 0) {
    const maxPrecip = Math.max(...pluies.map((p) => p.precipitation || 0))
    parts.push(`${pluies.length} jour(s) de fortes pluies (max ${maxPrecip} mm)`)
  }

  if (gels.length > 0) {
    const minTemp = Math.min(...gels.map((g) => g.temperature || 0))
    parts.push(`${gels.length} jour(s) de gel intense (min ${minTemp}°C)`)
  }

  if (parts.length === 0) {
    return "Conditions meteorologiques normales sur la periode."
  }

  const hasSignificant = events.some((e) => e.severity === "fort" || e.severity === "extreme")

  return (
    `Sur les 30 derniers jours : ${parts.join(", ")}.` +
    (hasSignificant
      ? " Ces conditions ont pu causer des dommages a votre toiture."
      : " Impact potentiel sur la toiture a verifier.")
  )
}

export function getEventIcon(type: WeatherEvent["type"]): string {
  switch (type) {
    case "tempete":
      return "wind"
    case "grele":
      return "cloud-hail"
    case "gel":
      return "snowflake"
    case "pluie_forte":
      return "cloud-rain"
    case "canicule":
      return "sun"
    default:
      return "cloud"
  }
}

export function getEventColor(severity: WeatherEvent["severity"]): string {
  switch (severity) {
    case "extreme":
      return "#dc2626" // red-600
    case "fort":
      return "#f97316" // orange-500
    case "modere":
      return "#eab308" // yellow-500
    default:
      return "#6b7280" // gray-500
  }
}

export function formatEventForPDF(event: WeatherEvent): string {
  const dateFormatted = formatFrenchDate(event.date)
  const severityLabel =
    event.severity === "extreme" ? "EXTREME" : event.severity === "fort" ? "FORT" : "Modere"

  return `${dateFormatted} - ${event.description} [${severityLabel}]`
}
