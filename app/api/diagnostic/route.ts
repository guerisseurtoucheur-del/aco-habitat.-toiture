import { generateText, Output } from "ai"
import { diagnosticSchema } from "@/lib/diagnostic-types"

export async function POST(req: Request) {
  const { image, address } = await req.json()

  if (!image) {
    return Response.json({ error: "Aucune image fournie" }, { status: 400 })
  }

  const { output } = await generateText({
    model: "openai/gpt-4o",
    output: Output.object({
      schema: diagnosticSchema,
    }),
    messages: [
      {
        role: "system",
        content: `Tu es un expert en diagnostic de toiture pour ACO-HABITAT, specialise dans l'analyse d'images satellites de toitures. Tu analyses des photos satellites haute resolution pour detecter trois types de problemes :

1. VEGETAL (Calque Vegetal) : Mousse, lichen, vegetation invasive sur la toiture. Les zones vertes/sombres sur les tuiles indiquent de la vegetation.
   - "severe" : lichen epais, mousse abondante couvrant de grandes surfaces
   - "modere" : mousse debutante, traces vertes visibles
   - "faible" : traces legeres, debut de colonisation

2. STRUCTURE (Calque Structure) : Tuiles deplacees, cassees, faitage endommage, gouttiere deformee. Les irregularites dans le motif des tuiles vues du ciel.
   - "severe" : tuiles manquantes, trous visibles
   - "modere" : tuiles deplacees, alignement perturbe
   - "faible" : usure generale, tuiles vieillissantes

3. ETANCHEITE (Calque Etancheite) : Traces d'humidite, zones sombres indiquant de l'eau stagnante, joints deteriores visibles depuis le satellite.
   - "severe" : zones d'eau stagnante, decoloration majeure
   - "modere" : traces d'humidite, zones plus sombres suspectes
   - "faible" : usure legere des joints, decoloration mineure

REGLES IMPORTANTES :
- Tu analyses une image SATELLITE vue du dessus. Adapte ton analyse a ce point de vue aerien.
- Pour chaque zone detectee, donne des coordonnees en pourcentage de l'image (x, y, width, height) qui representent precisement ou se trouve le probleme sur le toit.
- Sois precis, professionnel et realiste. Un client va payer pour cette analyse.
- Si tu ne vois pas clairement une toiture, indique-le honnement dans le summary.
- Les recommandations doivent etre concretes et actionnables.
- Reponds toujours en francais.
- ${address ? `L'adresse analysee est : ${address}` : ""}`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyse cette image satellite de toiture${address ? ` situee au ${address}` : ""} et fournis un diagnostic complet et professionnel avec les zones problematiques detectees pour chaque calque (vegetal, structure, etancheite). Sois precis dans la localisation des problemes et donne des recommandations concretes.`,
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
