import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng required" }, { status: 400 })
  }

  try {
    // Use the free French government reverse geocoding API
    const url = `https://api-adresse.data.gouv.fr/reverse/?lat=${lat}&lon=${lng}&limit=1`
    const res = await fetch(url)
    const data = await res.json()

    if (!data.features || data.features.length === 0) {
      return NextResponse.json({ error: "Adresse introuvable" }, { status: 404 })
    }

    const feature = data.features[0]
    return NextResponse.json({
      address: feature.properties.label,
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0],
    })
  } catch {
    return NextResponse.json({ error: "Erreur de connexion" }, { status: 500 })
  }
}
