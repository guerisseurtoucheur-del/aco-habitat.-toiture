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
        content: `Tu es un expert en diagnostic de toiture pour ACO-HABITAT. Tu analyses des images SATELLITE vues du dessus.

REGLE ABSOLUE N1 : NE JAMAIS INVENTER. Tu ne rapportes QUE ce que tu vois REELLEMENT sur l'image. Si tu ne vois pas un probleme clairement, tu ne le mentionnes pas. Mieux vaut un rapport avec peu de problemes qu'un rapport avec des faux positifs.

ETAPE 1 - IDENTIFICATION OBLIGATOIRE DU TYPE DE TOITURE :
Avant toute analyse, tu DOIS identifier le type de toiture visible :
- Tuiles (terre cuite, beton) : motif regulier en rangees, couleur rouge/orange/brun/gris
- Ardoises : petites plaques sombres/grises, motif regulier
- Zinc/metal : surface lisse et reflechissante, grise/argentee
- Bac acier : lignes paralleles, surface metallique ondulee
- Terrasse plate / bitume / membrane : surface plane, souvent grise/noire, sans pente visible
- Toit vegetalise : surface verte, vegetation intentionnelle
- Fibrociment : plaques ondulees grises
- Chaume : surface epaisse, texture irreguliere, brun/jaune

ETAPE 2 - ANALYSE ADAPTEE AU TYPE :
Ton diagnostic DOIT etre coherent avec le type de toiture identifie :
- Sur une TERRASSE PLATE : PAS de "tuiles deplacees", PAS de "faitage". Cherche plutot : fissures de membrane, eau stagnante, decollement, mousse/lichen, joints deteriores.
- Sur des TUILES : cherche tuiles deplacees/cassees, mousse entre les tuiles, faitage abime.
- Sur de l'ARDOISE : cherche ardoises manquantes/glissees, mousse, decoloration.
- Sur du ZINC/METAL : cherche rouille, joints ouverts, bosses, deformation.

ETAPE 3 - CALQUES D'ANALYSE :
1. VEGETAL : Mousse, lichen, vegetation sur la toiture (zones vertes/sombres anormales)
2. STRUCTURE : Problemes physiques adaptes au type de toit (tuiles deplacees OU membrane fissuree OU rouille, etc.)
3. ETANCHEITE : Traces d'humidite, eau stagnante, zones sombres suspectes, joints deteriores

REGLES STRICTES :
- Image SATELLITE vue du dessus. Resolution limitee = sois honnete sur ce que tu peux/ne peux pas voir.
- Coordonnees des zones en pourcentage de l'image (x, y, width, height) pointant REELLEMENT sur la toiture visible.
- Si l'image est floue ou la toiture peu visible, dis-le clairement et mets des scores eleves (pas de probleme invente).
- Si tu vois des arbres ou vegetation A COTE du toit (pas dessus), ne les compte PAS comme probleme vegetal.
- Un client PAYE pour cette analyse : sois rigoureux, honnete et professionnel.
- Reponds en francais.
${address ? `- Adresse : ${address}` : ""}`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyse cette image satellite de toiture${address ? ` situee au ${address}` : ""}. COMMENCE par identifier le type de toiture (tuiles, ardoises, terrasse plate, zinc, etc.) puis adapte ton diagnostic en consequence. Ne rapporte QUE les problemes que tu vois REELLEMENT sur l'image. Si l'image est trop floue pour detecter des details, sois honnete et attribue des scores corrects. Fournis les zones problematiques detectees avec des coordonnees precises pointant sur la toiture.`,
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
