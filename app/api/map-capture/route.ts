import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL requise" }, { status: 400 })
    }

    // Only allow requests to IGN servers
    if (!url.startsWith("https://data.geopf.fr/")) {
      return NextResponse.json({ error: "Domaine non autorise" }, { status: 403 })
    }

    // Fetch the WMS image from IGN server-side (no CORS issues)
    const response = await fetch(url, {
      headers: {
        "Accept": "image/jpeg, image/png, image/*",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `IGN WMS error: ${response.status} ${response.statusText}` },
        { status: 502 }
      )
    }

    const contentType = response.headers.get("content-type") || "image/jpeg"

    // Check if response is actually an image
    if (!contentType.startsWith("image/")) {
      const text = await response.text()
      return NextResponse.json(
        { error: `IGN returned non-image: ${contentType}`, detail: text.slice(0, 500) },
        { status: 502 }
      )
    }

    // Convert to base64
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")
    const imageBase64 = `data:${contentType};base64,${base64}`

    return NextResponse.json({ imageBase64 })
  } catch (err) {
    console.error("Map capture error:", err)
    return NextResponse.json(
      { error: "Erreur lors de la capture" },
      { status: 500 }
    )
  }
}
