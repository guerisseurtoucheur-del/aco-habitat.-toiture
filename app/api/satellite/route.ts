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

    // Step 2: Get satellite images at multiple zoom levels
    // scale=2 = 1280x1280 effective pixels (max allowed by Static Maps API)
    // size=640x640 is the max free-tier size, scale=2 doubles it
    // maptype=satellite (NOT hybrid) avoids street labels that blur the image
    // style=feature:all|element:labels|visibility:off removes any remaining labels
    const size = "640x640"
    const scale = 2
    const mapType = "satellite"

    // Zoom levels: try 20 first (best detail), fallback to 19 and 18
    const zoomLevels = [
      { zoom: 20, label: "Haute resolution (toiture)" },
      { zoom: 19, label: "Standard (batiment)" },
      { zoom: 18, label: "Vue large (quartier)" },
    ]

    // Google returns a tiny "no imagery" placeholder for unavailable zoom levels
    const isValidImagery = (buffer: ArrayBuffer) => buffer.byteLength > 15000

    const images = await Promise.all(
      zoomLevels.map(async ({ zoom, label }) => {
        // style removes all map labels for a cleaner satellite-only image
        const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&scale=${scale}&maptype=${mapType}&style=feature:all|element:labels|visibility:off&key=${apiKey}`
        const res = await fetch(url)
        if (!res.ok) return null
        const buffer = await res.arrayBuffer()
        if (!isValidImagery(buffer)) return null
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
        { error: "Aucune imagerie satellite disponible pour cette adresse. Essayez une adresse plus precise." },
        { status: 404 }
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
