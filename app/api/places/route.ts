import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const input = searchParams.get("input")

  if (!input || input.length < 3) {
    return NextResponse.json({ predictions: [] })
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Google Maps API key not configured", predictions: [] }, { status: 500 })
  }

  // Try Places Autocomplete API first
  try {
    const placesUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=address&components=country:fr&language=fr&key=${apiKey}`
    const placesRes = await fetch(placesUrl)
    const placesData = await placesRes.json()

    console.log("[v0] Places API status:", placesData.status, placesData.error_message || "")

    if (placesData.status === "OK" && placesData.predictions?.length > 0) {
      const predictions = placesData.predictions.map(
        (p: { place_id: string; description: string; structured_formatting: { main_text: string; secondary_text: string } }) => ({
          placeId: p.place_id,
          description: p.description,
          mainText: p.structured_formatting?.main_text || "",
          secondaryText: p.structured_formatting?.secondary_text || "",
        })
      )
      return NextResponse.json({ predictions })
    }

    // If Places API is not enabled, fallback to Geocoding API
    if (placesData.status === "REQUEST_DENIED") {
      console.log("[v0] Places API denied, falling back to Geocoding API")
      return fallbackGeocode(input, apiKey)
    }

    // ZERO_RESULTS from Places
    if (placesData.status === "ZERO_RESULTS") {
      return fallbackGeocode(input, apiKey)
    }

    return NextResponse.json({ predictions: [] })
  } catch (err) {
    console.log("[v0] Places API error, trying Geocoding fallback:", err)
    return fallbackGeocode(input, apiKey)
  }
}

// Fallback: use Geocoding API to simulate autocomplete
async function fallbackGeocode(input: string, apiKey: string) {
  try {
    const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(input)}&region=fr&language=fr&key=${apiKey}`
    const geoRes = await fetch(geoUrl)
    const geoData = await geoRes.json()

    if (geoData.status === "OK" && geoData.results?.length > 0) {
      const predictions = geoData.results.slice(0, 5).map(
        (r: { place_id: string; formatted_address: string; address_components: { long_name: string; types: string[] }[] }) => {
          // Extract street and city from components
          const street = r.address_components?.find((c: { types: string[] }) =>
            c.types.includes("route")
          )?.long_name || ""
          const number = r.address_components?.find((c: { types: string[] }) =>
            c.types.includes("street_number")
          )?.long_name || ""
          const city = r.address_components?.find((c: { types: string[] }) =>
            c.types.includes("locality")
          )?.long_name || ""

          const mainText = number ? `${number} ${street}` : street || r.formatted_address.split(",")[0]
          const secondaryText = city || r.formatted_address.split(",").slice(1).join(",").trim()

          return {
            placeId: r.place_id,
            description: r.formatted_address,
            mainText,
            secondaryText,
          }
        }
      )
      return NextResponse.json({ predictions })
    }

    return NextResponse.json({ predictions: [] })
  } catch {
    return NextResponse.json({ predictions: [] })
  }
}
