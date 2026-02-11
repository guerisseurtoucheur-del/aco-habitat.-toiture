import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const input = searchParams.get("input")

  if (!input || input.length < 3) {
    return NextResponse.json({ predictions: [] })
  }

  try {
    // Use the free French government address API
    const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(input)}&limit=5&type=housenumber&autocomplete=1`
    const res = await fetch(url)
    const data = await res.json()

    if (!data.features || data.features.length === 0) {
      // Fallback: try without type restriction (for cities, streets without number)
      const fallbackUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(input)}&limit=5&autocomplete=1`
      const fallbackRes = await fetch(fallbackUrl)
      const fallbackData = await fallbackRes.json()

      if (!fallbackData.features || fallbackData.features.length === 0) {
        return NextResponse.json({ predictions: [] })
      }

      return NextResponse.json({
        predictions: mapFeatures(fallbackData.features),
      })
    }

    return NextResponse.json({
      predictions: mapFeatures(data.features),
    })
  } catch (err) {
    console.error("Address API error:", err)
    return NextResponse.json({ predictions: [] })
  }
}

interface Feature {
  properties: {
    id: string
    label: string
    name: string
    city: string
    postcode: string
    context: string
    score: number
  }
  geometry: {
    coordinates: [number, number] // [lng, lat]
  }
}

function mapFeatures(features: Feature[]) {
  return features.map((f) => ({
    placeId: f.properties.id,
    description: f.properties.label,
    mainText: f.properties.name,
    secondaryText: `${f.properties.postcode} ${f.properties.city}`,
    lat: f.geometry.coordinates[1],
    lng: f.geometry.coordinates[0],
  }))
}
