import { NextResponse } from "next/server"

// Fonction pour recuperer la date de prise de vue de la photo IGN
async function fetchIGNPhotoDate(lat: number, lon: number): Promise<string | null> {
  try {
    // Utiliser GetFeatureInfo pour recuperer les metadonnees de la photo
    const url = new URL("https://data.geopf.fr/wms-r/wms")
    url.searchParams.set("SERVICE", "WMS")
    url.searchParams.set("VERSION", "1.3.0")
    url.searchParams.set("REQUEST", "GetFeatureInfo")
    url.searchParams.set("LAYERS", "HR.ORTHOIMAGERY.ORTHOPHOTOS")
    url.searchParams.set("QUERY_LAYERS", "HR.ORTHOIMAGERY.ORTHOPHOTOS")
    url.searchParams.set("INFO_FORMAT", "application/json")
    url.searchParams.set("CRS", "EPSG:4326")
    url.searchParams.set("WIDTH", "256")
    url.searchParams.set("HEIGHT", "256")
    // Petit bbox autour du point central
    const delta = 0.001
    url.searchParams.set("BBOX", `${lat - delta},${lon - delta},${lat + delta},${lon + delta}`)
    url.searchParams.set("I", "128") // Centre de l'image
    url.searchParams.set("J", "128")
    
    const response = await fetch(url.toString())
    if (!response.ok) return null
    
    const data = await response.json()
    
    // Chercher la date dans les features
    if (data.features && data.features.length > 0) {
      const properties = data.features[0].properties
      // Les champs possibles pour la date selon l'IGN
      const dateField = properties.date_vol || properties.date || properties.annee || properties.year
      if (dateField) {
        // Formater la date si c'est une date complete
        if (typeof dateField === 'string' && dateField.includes('-')) {
          const date = new Date(dateField)
          return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
        }
        // Si c'est juste une annee
        return String(dateField)
      }
    }
    return null
  } catch (error) {
    console.error("Erreur recuperation date IGN:", error)
    return null
  }
}

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
    // Recuperer la date de la photo en parallele
    const centerLat = (south + north) / 2
    const centerLon = (west + east) / 2
    const photoDatePromise = fetchIGNPhotoDate(centerLat, centerLon)
    
    // Tentative HD
    let response = await fetch(buildWmsUrl("HR.ORTHOIMAGERY.ORTHOPHOTOS"))
    let contentType = response.headers.get("content-type") || ""
    let sourceLayer = "orthophotos-hr"

    // Fallback si HR echoue ou renvoie une erreur XML
    // ORTHOIMAGERY.ORTHOPHOTOS est un nom WMTS, pas WMS-R
    // Sur wms-r, le fallback correct est GEOGRAPHICALGRIDSYSTEMS.MAPS
    if (!response.ok || contentType.includes("xml") || contentType.includes("text")) {
      response = await fetch(buildWmsUrl("GEOGRAPHICALGRIDSYSTEMS.MAPS"))
      contentType = response.headers.get("content-type") || ""
      sourceLayer = "cartes-ign"
    }

    if (!response.ok) {
      return NextResponse.json({ error: "IGN WMS failed" }, { status: 502 })
    }

    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    const imageBase64 = `data:image/jpeg;base64,${base64}`
    
    // Attendre la date de la photo
    const photoDate = await photoDatePromise

    return NextResponse.json({ 
      imageBase64,
      photoDate,
      sourceLayer
    })

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
