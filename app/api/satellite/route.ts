export async function POST(req: Request) {
  const { address } = await req.json()

  if (!address) {
    return Response.json({ error: "Adresse manquante" }, { status: 400 })
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: "Configuration Google Maps manquante" },
      { status: 500 }
    )
  }

  try {
    // Step 1: Geocode the address to get lat/lng
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}&region=fr&language=fr`
    const geocodeRes = await fetch(geocodeUrl)
    const geocodeData = await geocodeRes.json()

    if (geocodeData.status !== "OK" || !geocodeData.results?.[0]) {
      return Response.json(
        { error: `Adresse introuvable (${geocodeData.status}). ${geocodeData.error_message || "Verifiez l'adresse et reessayez."}` },
        { status: 404 }
      )
    }

    const { lat, lng } = geocodeData.results[0].geometry.location
    const formattedAddress = geocodeData.results[0].formatted_address

    // Step 2: Get multiple satellite images at different zoom levels
    // scale=2 doubles resolution (1280x1280 effective pixels)
    // Zoom 20 = close view, Zoom 21 = max zoom (best detail on rooftop)
    const size = "640x640"
    const scale = 2
    const mapType = "satellite"

    const zoomLevels = [
      { zoom: 21, label: "Max (tuiles visibles)" },
      { zoom: 20, label: "Rapproche (toiture complete)" },
      { zoom: 19, label: "Vue large (batiment + environs)" },
    ]

    const images = await Promise.all(
      zoomLevels.map(async ({ zoom, label }) => {
        const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&scale=${scale}&maptype=${mapType}&key=${apiKey}`
        const res = await fetch(url)
        if (!res.ok) return null
        const buffer = await res.arrayBuffer()
        return {
          zoom,
          label,
          image: `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`,
        }
      })
    )

    const validImages = images.filter(Boolean)
    if (validImages.length === 0) {
      return Response.json(
        { error: "Impossible de recuperer les images satellite." },
        { status: 500 }
      )
    }

    return Response.json({
      images: validImages,
      primaryImage: validImages[0]?.image,
      lat,
      lng,
      formattedAddress,
    })
  } catch (error) {
    console.error("Satellite API error:", error)
    return Response.json(
      { error: "Erreur lors de la recuperation de l'image satellite." },
      { status: 500 }
    )
  }
}
