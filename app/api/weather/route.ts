import { NextResponse } from "next/server"

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

interface WeatherAlert {
  event: string
  description: string
  start: number
  end: number
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const city = searchParams.get("city")

  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 })
  }

  try {
    let latitude = lat
    let longitude = lon

    // If city is provided, geocode it first
    if (city && (!lat || !lon)) {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},FR&limit=1&appid=${OPENWEATHER_API_KEY}`
      )
      const geoData = await geoRes.json()
      if (geoData.length > 0) {
        latitude = geoData[0].lat.toString()
        longitude = geoData[0].lon.toString()
      } else {
        return NextResponse.json({ error: "City not found" }, { status: 404 })
      }
    }

    if (!latitude || !longitude) {
      return NextResponse.json({ error: "Missing coordinates" }, { status: 400 })
    }

    // Fetch current weather + alerts via One Call API 3.0
    // Fallback to 2.5 forecast API (free tier)
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${OPENWEATHER_API_KEY}`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${OPENWEATHER_API_KEY}`
      ),
    ])

    const currentData = await currentRes.json()
    const forecastData = await forecastRes.json()

    if (currentData.cod !== 200) {
      return NextResponse.json({ error: "Weather data unavailable" }, { status: 502 })
    }

    // Parse current weather
    const current = {
      temp: Math.round(currentData.main.temp),
      description: currentData.weather?.[0]?.description || "",
      icon: currentData.weather?.[0]?.icon || "01d",
      wind_speed: Math.round(currentData.wind?.speed * 3.6), // m/s to km/h
      humidity: currentData.main?.humidity,
      city_name: currentData.name,
    }

    // Detect weather alerts from current + forecast
    const alerts: WeatherAlert[] = []
    const windThreshold = 60 // km/h
    const heavyRainThreshold = 10 // mm in 3h

    // Check current wind
    if (current.wind_speed >= windThreshold) {
      alerts.push({
        event: "Vent fort",
        description: `Rafales de ${current.wind_speed} km/h detectees. Risque d'endommagement de la toiture (tuiles soulevees, faitage).`,
        start: Date.now() / 1000,
        end: Date.now() / 1000 + 3600,
      })
    }

    // Parse 5-day forecast (group by day)
    const dailyMap = new Map<string, { temps: number[]; descriptions: string[]; icons: string[]; winds: number[]; rain: number; snow: boolean }>()
    
    if (forecastData.list) {
      for (const item of forecastData.list) {
        const date = item.dt_txt.split(" ")[0]
        if (!dailyMap.has(date)) {
          dailyMap.set(date, { temps: [], descriptions: [], icons: [], winds: [], rain: 0, snow: false })
        }
        const day = dailyMap.get(date)!
        day.temps.push(item.main.temp)
        day.descriptions.push(item.weather?.[0]?.description || "")
        day.icons.push(item.weather?.[0]?.icon || "01d")
        day.winds.push(item.wind?.speed * 3.6 || 0)
        day.rain += item.rain?.["3h"] || 0
        if (item.snow?.["3h"]) day.snow = true

        // Check for severe weather in forecast
        const windKmh = (item.wind?.speed || 0) * 3.6
        if (windKmh >= windThreshold) {
          const existingWind = alerts.find(a => a.event === "Vent fort prevu")
          if (!existingWind) {
            alerts.push({
              event: "Vent fort prevu",
              description: `Rafales jusqu'a ${Math.round(windKmh)} km/h prevues le ${new Date(item.dt * 1000).toLocaleDateString("fr-FR")}. Verifiez l'etat de votre toiture.`,
              start: item.dt,
              end: item.dt + 10800,
            })
          }
        }

        const rain3h = item.rain?.["3h"] || 0
        if (rain3h >= heavyRainThreshold) {
          const existingRain = alerts.find(a => a.event === "Fortes pluies prevues")
          if (!existingRain) {
            alerts.push({
              event: "Fortes pluies prevues",
              description: `Precipitations intenses prevues (${Math.round(rain3h)} mm/3h) le ${new Date(item.dt * 1000).toLocaleDateString("fr-FR")}. Risque d'infiltration sur les toitures fragilisees.`,
              start: item.dt,
              end: item.dt + 10800,
            })
          }
        }

        // Check for thunderstorm (id 2xx = thunderstorm)
        const weatherId = item.weather?.[0]?.id || 0
        if (weatherId >= 200 && weatherId < 300) {
          const existingStorm = alerts.find(a => a.event === "Orage prevu")
          if (!existingStorm) {
            alerts.push({
              event: "Orage prevu",
              description: `Orages prevus le ${new Date(item.dt * 1000).toLocaleDateString("fr-FR")}. Risque de grele et de degats sur la couverture.`,
              start: item.dt,
              end: item.dt + 10800,
            })
          }
        }
      }
    }

    const forecast: DayForecast[] = []
    const today = new Date().toISOString().split("T")[0]
    let count = 0

    for (const [date, data] of dailyMap) {
      if (date === today) continue // skip today, we have current
      if (count >= 4) break
      forecast.push({
        date,
        temp_min: Math.round(Math.min(...data.temps)),
        temp_max: Math.round(Math.max(...data.temps)),
        description: data.descriptions[Math.floor(data.descriptions.length / 2)],
        icon: data.icons[Math.floor(data.icons.length / 2)],
        wind_speed: Math.round(Math.max(...data.winds)),
        rain: data.rain > 0.5,
        snow: data.snow,
      })
      count++
    }

    return NextResponse.json({
      current,
      forecast,
      alerts,
      coordinates: { lat: latitude, lon: longitude },
    }, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" }
    })
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 })
  }
}
