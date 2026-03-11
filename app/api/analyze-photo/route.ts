import { NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { gateway } from "@ai-sdk/gateway"

export interface DamageZone {
  id: string
  type: "trou" | "tuiles_manquantes" | "tuiles_cassees" | "faitage_endommage" | "mousse" | "infiltration" | "autre"
  label: string
  severity: "leger" | "modere" | "grave"
  description: string
  // Position relative (0-100% of image dimensions)
  position: {
    x: number // center X position (0-100)
    y: number // center Y position (0-100)
    width: number // zone width (0-100)
    height: number // zone height (0-100)
  }
}

export interface PhotoAnalysis {
  photoId: string
  damageZones: DamageZone[]
  overallCondition: "bon" | "moyen" | "mauvais" | "critique"
  summary: string
  recommendations: string[]
}

const DAMAGE_LABELS: Record<DamageZone["type"], string> = {
  trou: "Trou dans la toiture",
  tuiles_manquantes: "Tuiles manquantes",
  tuiles_cassees: "Tuiles cassees",
  faitage_endommage: "Faitage endommage",
  mousse: "Mousse/Lichen",
  infiltration: "Zone d'infiltration",
  autre: "Autre dommage",
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get("image") as File | null
    const imageUrl = formData.get("imageUrl") as string | null
    const photoId = formData.get("photoId") as string || `photo-${Date.now()}`

    if (!imageFile && !imageUrl) {
      return NextResponse.json(
        { error: "Image file or URL is required" },
        { status: 400 }
      )
    }

    let imageData: string

    if (imageFile) {
      // Convert file to base64
      const bytes = await imageFile.arrayBuffer()
      const base64 = Buffer.from(bytes).toString("base64")
      const mimeType = imageFile.type || "image/jpeg"
      imageData = `data:${mimeType};base64,${base64}`
    } else {
      imageData = imageUrl!
    }

    const analysis = await analyzeRoofPhoto(imageData, photoId)
    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Photo analysis error:", error)
    return NextResponse.json(
      { error: "Failed to analyze photo" },
      { status: 500 }
    )
  }
}

async function analyzeRoofPhoto(imageData: string, photoId: string): Promise<PhotoAnalysis> {
  const systemPrompt = `Tu es un expert en toiture qui analyse des photos pour detecter les dommages.
Tu dois identifier CHAQUE zone de dommage visible et fournir sa position approximative sur l'image.

Pour chaque dommage detecte, fournis:
- type: un des types suivants: trou, tuiles_manquantes, tuiles_cassees, faitage_endommage, mousse, infiltration, autre
- severity: leger, modere, ou grave
- description: description courte du dommage
- position: coordonnees approximatives en pourcentage (0-100) de l'image
  - x: position horizontale du centre de la zone (0 = gauche, 100 = droite)
  - y: position verticale du centre de la zone (0 = haut, 100 = bas)
  - width: largeur de la zone en % de l'image
  - height: hauteur de la zone en % de l'image

IMPORTANT: Sois precis sur les positions. Regarde bien ou se trouvent les dommages sur l'image.

Reponds UNIQUEMENT en JSON valide avec ce format exact:
{
  "damageZones": [
    {
      "type": "tuiles_cassees",
      "severity": "modere",
      "description": "Tuiles fissurees visibles",
      "position": { "x": 45, "y": 30, "width": 15, "height": 10 }
    }
  ],
  "overallCondition": "moyen",
  "summary": "Description generale de l'etat de la toiture",
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}

Si tu ne detectes aucun dommage visible, retourne un tableau damageZones vide avec overallCondition "bon".`

  try {
    const { text } = await generateText({
      model: gateway("openai/gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyse cette photo de toiture et detecte tous les dommages visibles avec leurs positions precises.",
            },
            {
              type: "image",
              image: imageData,
            },
          ],
        },
      ],
      system: systemPrompt,
      maxTokens: 2000,
    })

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response")
    }

    const parsed = JSON.parse(jsonMatch[0])

    // Add IDs and labels to damage zones
    const damageZones: DamageZone[] = (parsed.damageZones || []).map(
      (zone: any, index: number) => ({
        id: `${photoId}-zone-${index + 1}`,
        type: zone.type || "autre",
        label: DAMAGE_LABELS[zone.type as DamageZone["type"]] || "Dommage detecte",
        severity: zone.severity || "modere",
        description: zone.description || "",
        position: {
          x: Math.min(100, Math.max(0, zone.position?.x || 50)),
          y: Math.min(100, Math.max(0, zone.position?.y || 50)),
          width: Math.min(50, Math.max(5, zone.position?.width || 10)),
          height: Math.min(50, Math.max(5, zone.position?.height || 10)),
        },
      })
    )

    return {
      photoId,
      damageZones,
      overallCondition: parsed.overallCondition || "moyen",
      summary: parsed.summary || "Analyse terminee.",
      recommendations: parsed.recommendations || [],
    }
  } catch (error) {
    console.error("AI analysis error:", error)
    // Return a default analysis on error
    return {
      photoId,
      damageZones: [],
      overallCondition: "moyen",
      summary: "L'analyse automatique n'a pas pu etre completee. Une inspection visuelle manuelle est recommandee.",
      recommendations: ["Faire verifier par un professionnel"],
    }
  }
}
