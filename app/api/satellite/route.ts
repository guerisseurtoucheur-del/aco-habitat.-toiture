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
        { error: "Adresse introuvable. Verifiez l'adresse et reessayez." },
        { status: 404 }
      )
    }

    const { lat, lng } = geocodeData.results[0].geometry.location
    const formattedAddress = geocodeData.results[0].formatted_address

    // Step 2: Get satellite image from Google Maps Static API
    // Zoom 20 = very close (individual building rooftops visible)
    const zoom = 20
    const size = "640x640"
    const mapType = "satellite"
    const satelliteUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&maptype=${mapType}&key=${apiKey}`

    // Fetch the image and convert to base64
    const imageRes = await fetch(satelliteUrl)
    if (!imageRes.ok) {
      return Response.json(
        { error: "Impossible de recuperer l'image satellite." },
        { status: 500 }
      )
    }

    const imageBuffer = await imageRes.arrayBuffer()
    const base64Image = `data:image/png;base64,${Buffer.from(imageBuffer).toString("base64")}`

    return Response.json({
      image: base64Image,
      lat,
      lng,
      formattedAddress,
      satelliteUrl,
    })
  } catch (error) {
    console.error("Satellite API error:", error)
    return Response.json(
      { error: "Erreur lors de la recuperation de l'image satellite." },
      { status: 500 }
    )
  }
}
