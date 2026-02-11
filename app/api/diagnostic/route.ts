import { generateText, Output } from "ai"
import { diagnosticSchema } from "@/lib/diagnostic-types"

export async function POST(req: Request) {
  const { image } = await req.json()

  if (!image) {
    return Response.json({ error: "No image provided" }, { status: 400 })
  }

  const { output } = await generateText({
    model: "openai/gpt-4o",
    output: Output.object({
      schema: diagnosticSchema,
    }),
    messages: [
      {
        role: "system",
        content: `Tu es un expert en diagnostic de toiture pour ACO-HABITAT. Tu analyses des photos satellites ou aeriennes de toitures pour detecter trois types de problemes :

1. VEGETAL (Calque Vegetal) : Mousse, lichen, vegetation invasive. Le lichen epais est "severe", la mousse debutante est "modere", les traces legeres sont "faible".

2. STRUCTURE (Calque Structure) : Tuiles deplacees, cassees, faitage endommage, gouttiere deformee. Les tuiles manquantes sont "severe", deplacees "modere", usees "faible".

3. ETANCHEITE (Calque Etancheite) : Traces d'humidite, zones de stagnation d'eau, joints deteriores. Les infiltrations visibles sont "severe", traces d'humidite "modere", usure legere "faible".

Pour chaque zone detectee, donne des coordonnees en pourcentage de l'image (x, y, width, height) qui representent approximativement ou se trouve le probleme. Sois precis et realiste dans ton analyse. Si la photo n'est pas une toiture, indique-le dans le summary et donne des scores eleves.

Reponds toujours en francais.`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyse cette photo de toiture et fournis un diagnostic complet avec les zones problematiques detectees pour chaque calque (vegetal, structure, etancheite).",
          },
          {
            type: "image",
            image: image,
          },
        ],
      },
    ],
  })

  return Response.json({ diagnostic: output })
}
