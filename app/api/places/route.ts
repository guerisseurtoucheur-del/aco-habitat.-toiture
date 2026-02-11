import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const input = searchParams.get("input")

  if (!input || input.length < 3) {
    return NextResponse.json({ predictions: [] })
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 })
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=address&components=country:fr&language=fr&key=${apiKey}`
    const res = await fetch(url)
    const data = await res.json()

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      return NextResponse.json(
        { error: data.error_message || "Places API error", predictions: [] },
        { status: 400 }
      )
    }

    const predictions = (data.predictions || []).map(
      (p: { place_id: string; description: string; structured_formatting: { main_text: string; secondary_text: string } }) => ({
        placeId: p.place_id,
        description: p.description,
        mainText: p.structured_formatting?.main_text || "",
        secondaryText: p.structured_formatting?.secondary_text || "",
      })
    )

    return NextResponse.json({ predictions })
  } catch {
    return NextResponse.json({ error: "Erreur de connexion", predictions: [] }, { status: 500 })
  }
}
