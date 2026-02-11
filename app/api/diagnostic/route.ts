import { generateText, Output } from "ai"
import { diagnosticSchema } from "@/lib/diagnostic-types"

export async function POST(req: Request) {
  const { image, address } = await req.json()

  if (!image) {
    return Response.json({ error: "Aucune image fournie" }, { status: 400 })
  }

  // Step 1: First pass - ask the AI to describe what it ACTUALLY sees (no structured output)
  // This forces honest observation before diagnosis
  const { text: observation } = await generateText({
    model: "openai/gpt-4o",
    messages: [
      {
        role: "system",
        content: `Tu es un observateur expert en batiment. Ton UNIQUE travail est de DECRIRE factuellement ce que tu vois sur cette image satellite vue du dessus. Tu ne fais AUCUN diagnostic, AUCUNE supposition.

Reponds EXACTEMENT dans ce format :
FORME DU TOIT : [plat / en pente / multi-pans / arrondi / autre]
SURFACE : [ce que tu vois : lisse et uniforme / avec des rangees regulieres / ondulee / etc.]
COULEUR DOMINANTE : [gris fonce / rouge-orange / gris clair / noir / etc.]
MATERIAU PROBABLE : [terrasse plate bitume-membrane / tuiles terre cuite / ardoises / zinc / bac acier / fibrociment / indetermine]
ELEMENTS VISIBLES : [liste de ce que tu vois reellement : antennes, cheminees, bouches d'aeration, panneaux solaires, etc.]
ANOMALIES VISIBLES : [liste de ce que tu vois d'anormal, ou "aucune anomalie visible a cette resolution"]
VEGETATION SUR LE TOIT : [oui avec description / non / impossible a determiner]
TAILLE ESTIMEE DU BATIMENT : [estime la longueur x largeur approximative du batiment en metres, basee sur la proportion dans l'image satellite. Un pixel au zoom 20 fait environ 15cm. Donne ton estimation.]
QUALITE IMAGE : [bonne / moyenne / faible - la resolution permet-elle de voir des details ?]`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Decris FACTUELLEMENT ce que tu vois sur cette image satellite. Ne suppose rien, ne diagnostique rien. Decris seulement.",
          },
          {
            type: "image",
            image: image,
          },
        ],
      },
    ],
  })

  // Step 2: Use the factual observation to produce an accurate diagnostic
  const { output } = await generateText({
    model: "openai/gpt-4o",
    output: Output.object({
      schema: diagnosticSchema,
    }),
    messages: [
      {
        role: "system",
        content: `Tu es un expert en diagnostic de toiture pour ACO-HABITAT.

VOICI L'OBSERVATION FACTUELLE DE L'IMAGE (faite par un observateur independant) :
---
${observation}
---

REGLES ABSOLUES :
1. Ton diagnostic DOIT etre 100% coherent avec l'observation ci-dessus.
2. Si l'observation dit "FORME DU TOIT : plat" -> c'est une TERRASSE PLATE. INTERDIT de parler de tuiles, ardoises, ou faitage.
3. Si l'observation dit "MATERIAU PROBABLE : tuiles" -> c'est un toit en TUILES. Adapte ton vocabulaire.
4. NE JAMAIS INVENTER de problemes non mentionnes dans l'observation.
5. Si "ANOMALIES VISIBLES : aucune" -> mets des scores eleves (80-100) et dis que le toit semble en bon etat.
6. Si "QUALITE IMAGE : faible" -> sois prudent, mets des scores moyens-hauts et precise que la resolution limite l'analyse.

ADAPTATION PAR TYPE :
- TERRASSE PLATE : problemes possibles = fissures membrane, eau stagnante, decollement, mousse. JAMAIS "tuiles deplacees" ou "faitage".
- TUILES : problemes possibles = tuiles deplacees/cassees, mousse entre tuiles, faitage abime.
- ARDOISES : problemes possibles = ardoises glissees, mousse, decoloration.
- ZINC/METAL : problemes possibles = rouille, joints ouverts, bosses.

SURFACE :
- Estime la surface totale de la toiture en m2 a partir de la taille du batiment visible.
- Pour un toit en pente, ajoute 15 a 30% a l'emprise au sol (selon l'inclinaison).
- Pour une terrasse plate, la surface = emprise au sol.
- Utilise l'observation "TAILLE ESTIMEE DU BATIMENT" comme base.
- Indique la precision : "haute" si bien visible, "moyenne" si partiellement cache, "faible" si difficile.

CALQUES :
1. VEGETAL : mousse, lichen, vegetation parasite SUR le toit (pas les arbres a cote)
2. STRUCTURE : problemes physiques adaptes au type identifie
3. ETANCHEITE : humidite, eau stagnante, joints deteriores

Les coordonnees (x, y, width, height) doivent pointer sur des zones REELLES de la toiture.
Le champ "toitureType" doit reprendre exactement le type identifie dans l'observation.
Reponds en francais.
${address ? `Adresse : ${address}` : ""}`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Produis le diagnostic structure base UNIQUEMENT sur l'observation factuelle fournie. Ne contredis jamais l'observation. Adapte ton vocabulaire au type de toiture identifie.`,
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
