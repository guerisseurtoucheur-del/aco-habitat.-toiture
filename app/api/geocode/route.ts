import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng required" }, { status: 400 })
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 })
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=fr&key=${apiKey}`
    const res = await fetch(url)
    const data = await res.json()

    if (data.status !== "OK" || !data.results?.[0]) {
      return NextResponse.json({ error: "Adresse introuvable" }, { status: 404 })
    }

    return NextResponse.json({
      address: data.results[0].formatted_address,
    })
  } catch {
    return NextResponse.json({ error: "Erreur de connexion" }, { status: 500 })
  }
}
