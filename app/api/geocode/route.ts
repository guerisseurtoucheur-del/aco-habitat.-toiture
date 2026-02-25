import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const address = searchParams.get("address")

  try {
    // Forward geocoding: address -> lat/lng
    if (address) {
      const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`
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
    }

    // Reverse geocoding: lat/lng -> address
    if (lat && lng) {
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
    }

    return NextResponse.json({ error: "Fournir 'address' ou 'lat'+'lng'" }, { status: 400 })
  } catch {
    return NextResponse.json({ error: "Erreur de connexion" }, { status: 500 })
  }
}
