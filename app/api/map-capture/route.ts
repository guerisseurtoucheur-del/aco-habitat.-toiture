import { NextResponse } from "next/server"

// Force Node.js runtime (sharp requires native binaries, not compatible with Edge)
export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { bounds, width = 4096, height = 4096 } = await req.json()

    if (!bounds || !bounds.south || !bounds.north || !bounds.west || !bounds.east) {
      return NextResponse.json({ error: "Bounds requises (south, north, west, east)" }, { status: 400 })
    }

    const { south, north, west, east } = bounds

    // Request max resolution from IGN WMS (cap at 4096 which is their limit)
    const reqWidth = Math.min(Math.max(width, 800), 4096)
    const reqHeight = Math.min(Math.max(height, 800), 4096)

    const wmsUrl = new URL("https://data.geopf.fr/wms-r/wms")
    wmsUrl.searchParams.set("SERVICE", "WMS")
    wmsUrl.searchParams.set("VERSION", "1.3.0")
    wmsUrl.searchParams.set("REQUEST", "GetMap")
    wmsUrl.searchParams.set("LAYERS", "HR.ORTHOIMAGERY.ORTHOPHOTOS")
    wmsUrl.searchParams.set("STYLES", "")
    wmsUrl.searchParams.set("FORMAT", "image/jpeg")
    wmsUrl.searchParams.set("CRS", "EPSG:4326")
    wmsUrl.searchParams.set("WIDTH", String(reqWidth))
    wmsUrl.searchParams.set("HEIGHT", String(reqHeight))
    wmsUrl.searchParams.set("BBOX", `${south},${west},${north},${east}`)

    // Try HR layer first, fallback to standard ORTHOIMAGERY
    let response = await fetch(wmsUrl.toString(), {
      headers: {
        "Accept": "image/jpeg, image/png, image/*",
        "User-Agent": "ACO-Habitat-Diagnostic/1.0",
      },
    })

    const ct = response.headers.get("content-type") || ""
    if (!response.ok || ct.includes("xml") || ct.includes("text")) {
      wmsUrl.searchParams.set("LAYERS", "ORTHOIMAGERY.ORTHOPHOTOS")
      response = await fetch(wmsUrl.toString(), {
        headers: {
          "Accept": "image/jpeg, image/png, image/*",
          "User-Agent": "ACO-Habitat-Diagnostic/1.0",
        },
      })
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => "")
      return NextResponse.json(
        { error: `IGN WMS error: ${response.status}`, detail: errText.slice(0, 300) },
        { status: 502 }
      )
    }

    const contentType = response.headers.get("content-type") || "image/jpeg"
    if (contentType.includes("xml") || contentType.includes("text")) {
      const text = await response.text()
      return NextResponse.json(
        { error: "IGN a retourne une erreur au lieu d'une image", detail: text.slice(0, 500) },
        { status: 502 }
      )
    }

    // --- Image enhancement with sharp ---
    const rawBuffer = Buffer.from(await response.arrayBuffer())

    let finalBuffer: Buffer = rawBuffer
    try {
      const sharp = (await import("sharp")).default
      finalBuffer = await sharp(rawBuffer)
        // Boost brightness (+15%) and saturation (+20%) for richer colors
        .modulate({
          brightness: 1.15,
          saturation: 1.2,
        })
        // Increase contrast
        .linear(1.2, -(128 * 0.2))
        // Sharpen for clear detail
        .sharpen({ sigma: 1, m1: 1, m2: 2 })
        // Output as high-quality JPEG
        .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
        .toBuffer()
    } catch (sharpErr) {
      // If sharp fails (e.g. in preview), return the raw image
      console.warn("[map-capture] sharp unavailable, returning raw image:", sharpErr)
    }

    const base64 = finalBuffer.toString("base64")
    const imageBase64 = `data:image/jpeg;base64,${base64}`

    return NextResponse.json({ imageBase64 })
  } catch (err) {
    console.error("[map-capture] Error:", err)
    return NextResponse.json(
      { error: "Erreur lors de la capture de la carte" },
      { status: 500 }
    )
  }
}
