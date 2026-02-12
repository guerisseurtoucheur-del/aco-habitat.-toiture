import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { bounds, width = 1200, height = 1200 } = await req.json()

    if (!bounds || !bounds.south || !bounds.north || !bounds.west || !bounds.east) {
      return NextResponse.json({ error: "Bounds requises (south, north, west, east)" }, { status: 400 })
    }

    const { south, north, west, east } = bounds

    // Build IGN WMS GetMap URL
    // WMS 1.3.0 + CRS=EPSG:4326: BBOX = minLat,minLon,maxLat,maxLon
    const wmsUrl = new URL("https://data.geopf.fr/wms-r/wms")
    wmsUrl.searchParams.set("SERVICE", "WMS")
    wmsUrl.searchParams.set("VERSION", "1.3.0")
    wmsUrl.searchParams.set("REQUEST", "GetMap")
    wmsUrl.searchParams.set("LAYERS", "ORTHOIMAGERY.ORTHOPHOTOS")
    wmsUrl.searchParams.set("STYLES", "")
    wmsUrl.searchParams.set("FORMAT", "image/jpeg")
    wmsUrl.searchParams.set("CRS", "EPSG:4326")
    wmsUrl.searchParams.set("WIDTH", String(Math.min(width, 2048)))
    wmsUrl.searchParams.set("HEIGHT", String(Math.min(height, 2048)))
    wmsUrl.searchParams.set("BBOX", `${south},${west},${north},${east}`)

    console.log("[map-capture] WMS URL:", wmsUrl.toString())

    // Fetch the WMS image from IGN server-side (no CORS issues)
    const response = await fetch(wmsUrl.toString(), {
      headers: {
        "Accept": "image/jpeg, image/png, image/*",
        "User-Agent": "ACO-Habitat-Diagnostic/1.0",
      },
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => "")
      console.error("[map-capture] IGN error:", response.status, errText.slice(0, 300))
      return NextResponse.json(
        { error: `IGN WMS error: ${response.status}`, detail: errText.slice(0, 300) },
        { status: 502 }
      )
    }

    const contentType = response.headers.get("content-type") || "image/jpeg"

    // Check if response is actually an image (IGN sometimes returns XML errors)
    if (contentType.includes("xml") || contentType.includes("text")) {
      const text = await response.text()
      console.error("[map-capture] IGN returned non-image:", text.slice(0, 500))
      return NextResponse.json(
        { error: "IGN a retourne une erreur XML au lieu d'une image", detail: text.slice(0, 500) },
        { status: 502 }
      )
    }

    // Convert to base64
    const arrayBuffer = await response.arrayBuffer()
    const sizeKb = Math.round(arrayBuffer.byteLength / 1024)
    console.log("[map-capture] Image received:", sizeKb, "KB, type:", contentType)

    const base64 = Buffer.from(arrayBuffer).toString("base64")
    const mimeType = contentType.startsWith("image/") ? contentType : "image/jpeg"
    const imageBase64 = `data:${mimeType};base64,${base64}`

    return NextResponse.json({ imageBase64 })
  } catch (err) {
    console.error("[map-capture] Error:", err)
    return NextResponse.json(
      { error: "Erreur lors de la capture de la carte" },
      { status: 500 }
    )
  }
}
