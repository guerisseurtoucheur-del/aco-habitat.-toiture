import { generateText, Output } from "ai"
import { diagnosticSchema } from "@/lib/diagnostic-types"

export const maxDuration = 60

export async function POST(req: Request) {
  const { image, address, measurements, bounds, zoom } = await req.json()

  if (!image) {
    return Response.json({ error: "Aucune image fournie" }, { status: 400 })
  }

  // Build measurement context string for the AI
  let measurementContext = ""
  if (measurements && measurements.length > 0) {
    const parts = measurements.map((m: { type: string; value: number; unit: string }) =>
      m.type === "area"
        ? `Surface mesuree par l'utilisateur : ${m.value.toFixed(1)} m2`
        : `Longueur mesuree par l'utilisateur : ${m.value.toFixed(1)} m`
    )
    measurementContext = `\nMESURES MANUELLES DE L'UTILISATEUR :\n${parts.join("\n")}\n`
  }

  // Build bounds context
  let boundsContext = ""
  if (bounds) {
    boundsContext = `\nCOORDONNEES DE LA ZONE : Nord ${bounds.north?.toFixed(6)}, Sud ${bounds.south?.toFixed(6)}, Est ${bounds.east?.toFixed(6)}, Ouest ${bounds.west?.toFixed(6)}`
    if (zoom) boundsContext += ` | Zoom : ${zoom}`
    boundsContext += "\n"
  }

  // Step 1: First pass - ask the AI to describe what it ACTUALLY sees (no structured output)
  const { text: observation } = await generateText({
    model: "openai/gpt-4o",
    messages: [
      {
        role: "system",
        content: `Tu es un expert couvreur-charpentier avec 20 ans d'experience.
Analyse cette image de toiture avec la rigueur d'un diagnostic professionnel.
L'image peut etre : une ortho-photo IGN vue du dessus, une photo drone, une photo prise depuis le sol avec un smartphone, ou une capture Google Maps. Adapte ton analyse a l'angle de vue disponible.
${measurementContext}${boundsContext}

Examine et commente CHACUN de ces points si visible :

**MATERIAUX**
- Type de couverture (tuiles canal, romanes, ardoises, zinc, bac acier, membrane bitumineuse...)
- Couleur et homogeneite (decoloration = vieillissement, mousse = humidite)
- Etat apparent (fissures, tuiles cassees/manquantes, soulevement)

**STRUCTURE**
- Pente estimee (faible <15 degres, moyenne 15-35 degres, forte >35 degres)
- Presence de noues, faitage, aretiers visibles
- Deformation visible (affaissement, ondulation = charpente fragilisee)

**VEGETATION & HUMIDITE**
- Presence de mousse, lichen, algues (zones sombres verdatres)
- Zones d'humidite suspectes (taches sombres asymetriques)

**POINTS SENSIBLES**
- Etat des raccordements (cheminees, lucarnes, fenetres de toit)
- Gouttieres visibles et leur etat
- Presence de debris ou accumulations

**ESTIMATION DIMENSIONS**
- ${measurements?.length > 0 ? "L'utilisateur a fourni des mesures manuelles, utilise-les comme reference." : "Estime la longueur x largeur approximative du batiment en metres a partir de l'echelle de l'image."}

**QUALITE IMAGE**
- La resolution permet-elle de voir des details fins (tuiles individuelles, fissures) ou non ?

Sois precis, technique et professionnel. Si un element n'est pas visible, indique-le clairement.`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyse cette image de toiture avec ton expertise de couvreur-charpentier. Decris avec precision et rigueur professionnelle chaque element que tu observes. Adapte-toi a l'angle de vue (aerien, drone, sol).",
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
- ${measurements?.length > 0 ? "L'utilisateur a dessine des mesures sur la carte IGN. Utilise ces mesures comme reference principale pour la surface." : "Estime la surface totale de la toiture en m2 a partir de la taille du batiment visible."}
- Pour un toit en pente, ajoute 15 a 30% a l'emprise au sol (selon l'inclinaison).
- Pour une terrasse plate, la surface = emprise au sol.
- Utilise l'observation "TAILLE ESTIMEE DU BATIMENT" comme base.
- Indique la precision : "haute" si mesures manuelles disponibles, "moyenne" si bien visible, "faible" si difficile.
${measurementContext}

CALQUES :
1. VEGETAL : mousse, lichen, vegetation parasite SUR le toit (pas les arbres a cote)
2. STRUCTURE : problemes physiques adaptes au type identifie
3. ETANCHEITE : humidite, eau stagnante, joints deteriores

ANALYSE THERMIQUE :
- Evalue le score d'isolation (0-100) selon le type de toiture et son etat apparent :
  * Tuiles anciennes sans renovation = 30-50
  * Terrasse plate non isolee = 20-40
  * Toiture recente ou bien entretenue = 60-85
  * Batiment ancien visible = penalise le score
- Identifie 1-4 zones de perte de chaleur (jonctions, zones deteriorees, rives, points faibles)
- Chaque zone a une intensite de perte en % (5-30%)
- Calcule l'economie annuelle estimee : (100 - scoreIsolation) * surfaceM2 * 0.8 euros environ
- Donne un commentaire adapte au type de toiture

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
