import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { bounds, width = 1200, height = 1200 } = await req.json()

  if (!bounds || !bounds.south || !bounds.north || !bounds.west || !bounds.east) {
    return NextResponse.json({ error: "Bounds requises (south, north, west, east)" }, { status: 400 })
  }

  const { south, north, west, east } = bounds

  const buildWmsUrl = (layer: string) => {
    const url = new URL("https://data.geopf.fr/wms-r/wms")
    url.searchParams.set("SERVICE", "WMS")
    url.searchParams.set("VERSION", "1.3.0")
    url.searchParams.set("REQUEST", "GetMap")
    url.searchParams.set("LAYERS", layer)
    url.searchParams.set("STYLES", "")
    url.searchParams.set("FORMAT", "image/jpeg")
    url.searchParams.set("CRS", "EPSG:4326")
    url.searchParams.set("WIDTH", String(width))
    url.searchParams.set("HEIGHT", String(height))
    // WMS 1.3.0 + EPSG:4326 = ordre lat/lon : south,west,north,east
    url.searchParams.set("BBOX", `${south},${west},${north},${east}`)
    return url.toString()
  }

  try {
    // Tentative HD
    let response = await fetch(buildWmsUrl("HR.ORTHOIMAGERY.ORTHOPHOTOS"))
    let contentType = response.headers.get("content-type") || ""

    // Fallback si HR echoue ou renvoie une erreur XML
    if (!response.ok || contentType.includes("xml") || contentType.includes("text")) {
      response = await fetch(buildWmsUrl("ORTHOIMAGERY.ORTHOPHOTOS"))
      contentType = response.headers.get("content-type") || ""
    }

    if (!response.ok) {
      return NextResponse.json({ error: "IGN WMS failed" }, { status: 502 })
    }

    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    const imageBase64 = `data:image/jpeg;base64,${base64}`

    return NextResponse.json({ imageBase64 })

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
