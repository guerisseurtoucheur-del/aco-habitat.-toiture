import { generateText, Output } from "ai"
import { diagnosticSchema } from "@/lib/diagnostic-types"
import { fetchGeorisques, getCodeInseeFromAddress, type GeorisquesData } from "@/lib/georisques"

export const maxDuration = 60

export async function POST(req: Request) {
  const { image, address, measurements, bounds, zoom } = await req.json()

  // Fetch Georisques data in parallel if address is provided
  let georisquesData: GeorisquesData | null = null
  if (address) {
    try {
      const { codeInsee, lat, lon } = await getCodeInseeFromAddress(address)
      if (lat && lon) {
        georisquesData = await fetchGeorisques(lat, lon, codeInsee || undefined)
      }
    } catch (e) {
      console.error("Erreur recuperation Georisques:", e)
    }
  } else if (bounds) {
    // Use center of bounds if no address
    const lat = (bounds.north + bounds.south) / 2
    const lon = (bounds.east + bounds.west) / 2
    try {
      georisquesData = await fetchGeorisques(lat, lon)
    } catch (e) {
      console.error("Erreur recuperation Georisques:", e)
    }
  }

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
        content: `Tu es un MAITRE COUVREUR-ZINGUEUR avec 30 ans d'experience sur le terrain et une expertise reconnue en diagnostic de toiture. Tu connais parfaitement les DTU (40.11 ardoises, 40.21 tuiles canal, 40.22 tuiles mecaniques, 43.1 terrasses). Tu as inspecte des milliers de toitures en France.

CONTEXTE ANALYSE :
- Type d'image : ortho-photo IGN, satellite Google Maps, photo drone, ou photo smartphone depuis le sol
- Adapte ton analyse a l'angle de vue et a la resolution disponible
${measurementContext}${boundsContext}

## GRILLE D'ANALYSE PROFESSIONNELLE

### 1. IDENTIFICATION DU TYPE DE COUVERTURE
Identifie avec precision - IMPORTANT : ne confonds JAMAIS tuiles et ardoises :

**ARDOISES** (rectangulaires, plates, pose a clous/crochets) :
- Ardoise naturelle : couleur bleu-gris fonce a noir, surface lisse mate, rectangulaire, bords nets
- Ardoise fibrociment : grise, peut etre ondulee (ATTENTION amiante si avant 1997)
- Pose caracteristique : recouvrement en ecailles, rangees horizontales regulieres

**TUILES** (forme bombee ou ondulee, pose a emboitement) :
- Tuiles canal : forme demi-cylindre, typique du sud, couleur ocre/rouge
- Tuiles romanes : bombees avec nervure, rouges/orangees
- Tuiles mecaniques : emboitement visible, forme ondulee reguliere
- Tuiles plates : petites, carrees, typique nord de la France - NE PAS CONFONDRE avec ardoises (les tuiles plates sont terre cuite, couleur rouge/brun)

**Metal** : zinc (joint debout, tasseaux), bac acier (nervure trapezoidale), cuivre, acier galvanise
**Membrane** : EPDM (noir), PVC (gris), bitume (noir granuleux) - toits plats
**Autres** : chaume, shingle/bardeau bitume, tuiles beton, lauzes

CRITERES DE DISTINCTION ARDOISE vs TUILE :
- Couleur : ardoise = bleu-gris-noir | tuile = rouge-ocre-brun
- Forme : ardoise = plate rectangulaire | tuile = bombee ou ondulee
- Texture : ardoise = lisse mate | tuile = granuleuse ou vernie

Indique ton niveau de certitude (certain / probable / difficile a determiner)

### 2. ETAT STRUCTUREL (score /100)
Examine :
- **Alignement general** : tuiles/ardoises alignees ou deplacees ?
- **Faitage** : intact, mortier fissure, tuiles faitieres deplacees ?
- **Noues** (si visibles) : propres ou encombrees, zinguerie en bon etat ?
- **Aretiers** : tuiles d'aretier presentes et scellees ?
- **Deformation** : affaissement, ondulation, flambement (signe de probleme de charpente)
- **Elements manquants** : tuiles/ardoises absentes creant des jours

### 3. VEGETATION & COLONISATION (score /100)
Examine :
- **Mousse** : localisation (versant nord, zones ombragees), densite (legere/moyenne/importante)
- **Lichen** : taches rondes blanches/grises, signe d'humidite chronique
- **Algues** : traces verdatres ou noirâtres, indique exposition humidite
- **Debris vegetaux** : feuilles, branches accumulees (risque retention d'eau)
- **Surface colonisee** : estime le % de surface touchee

### 4. ETANCHEITE & POINTS SENSIBLES (score /100)
Examine :
- **Solins** (jonction toit/mur, cheminee) : mastic intact ou fissure, plomb/zinc en bon etat ?
- **Penetrations** : velux, cheminees, aerations - joints perimetriques
- **Gouttieres** (si visibles) : pente correcte, fixations, debris
- **Zones de stagnation** : cuvettes visibles sur toits plats
- **Traces d'humidite** : taches sombres irregulieres, auréoles

### 5. ANALYSE THERMIQUE (score /100)
Evalue :
- **Age apparent du batiment** : ancien (<1950), intermediaire (1950-1980), recent (>1980)
- **Signes de renovation** : velux recents, zinguerie neuve
- **Isolation probable** : maison ancienne = souvent mal isolee, combles amenages = isolation rampants
- **Points de deperdition** : rives, faitage, penetrations, jonctions

### 6. ESTIMATION DIMENSIONNELLE
${measurements?.length > 0 ? "MESURES FOURNIES PAR L'UTILISATEUR - utilise-les comme reference prioritaire." : "Estime les dimensions (L x l) du batiment en metres. Pour la surface de toiture, ajoute 15-30% a l'emprise au sol selon la pente."}

### 7. EVALUATION QUALITE IMAGE
- Resolution : permet de distinguer tuiles individuelles ? fissures ? mousse fine ?
- Angle : aerien (ideal pour surface), oblique (bon pour etat materiau), sol (limite)
- Note la fiabilite de ton analyse (haute/moyenne/basse) selon la qualite image

## FORMAT ATTENDU
Produis une analyse structuree, point par point. Sois FACTUEL - decris uniquement ce que tu VOIS reellement. Si un element n'est pas visible ou si tu n'es pas sur, dis-le clairement. Un bon diagnostic sait reconnaitre ses limites.`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyse cette image de toiture comme si tu etais sur le terrain avec ton carnet de diagnostic. Je veux ton expertise de maitre couvreur : type de couverture, etat, problemes detectes, points de vigilance. Sois precis et professionnel.",
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
        content: `Tu es le systeme expert de diagnostic toiture d'ACO-HABITAT, base sur l'expertise de maitres couvreurs avec 30 ans d'experience.

## OBSERVATION TERRAIN (par notre expert couvreur) :
---
${observation}
---

## REGLES DE COHERENCE ABSOLUE

1. **FIDELITE A L'OBSERVATION** : Ton diagnostic DOIT etre 100% coherent avec l'observation ci-dessus. Ne JAMAIS inventer de problemes non mentionnes.

2. **ADAPTATION AU TYPE DE TOITURE** :
   - TUILES TERRE CUITE : mousse entre tuiles, tuiles cassees/deplacees/eclatees (gelivure), faitage descelle, noues encrassees
   - ARDOISES : ardoises glissees/cassees, clous rouilles, delaminage, mousse
   - ZINC/METAL : oxydation, soudures fissurees, dilatation, bosses, rouille
   - MEMBRANE (toit plat) : cloquage, fissures, decollement, eau stagnante, joints defaillants
   - FIBROCIMENT : ATTENTION AMIANTE si batiment <1997, fissures, friabilite

3. **SCORING PROFESSIONNEL** :
   - Score 85-100 : Excellent etat, entretien courant suffisant
   - Score 70-84 : Bon etat, surveillance et entretien preventif recommandes
   - Score 50-69 : Etat moyen, travaux a prevoir dans les 2-3 ans
   - Score 30-49 : Etat preoccupant, intervention necessaire dans l'annee
   - Score 0-29 : Etat critique, urgence - risque d'infiltration ou degradation rapide

4. **SI OBSERVATION POSITIVE** : Si l'observation note "bon etat" ou "pas d'anomalie visible", scores eleves (75-95). Ne pas chercher des problemes inexistants.

5. **SI QUALITE IMAGE LIMITEE** : Scores moyens-hauts (60-80) avec mention explicite de la limite de l'analyse visuelle.

## CALCUL DE SURFACE
${measurements?.length > 0 ? "MESURES UTILISATEUR DISPONIBLES - utilise-les comme reference principale." : "Estime la surface depuis les dimensions du batiment visible."}
- Toit en pente faible (<15 degres) : +10% sur emprise au sol
- Toit en pente moyenne (15-35 degres) : +20% sur emprise au sol  
- Toit en pente forte (>35 degres) : +30% sur emprise au sol
- Terrasse plate : surface = emprise au sol
- Precision : "haute" si mesures manuelles, "moyenne" si batiment bien visible, "basse" si difficile a evaluer
${measurementContext}

## ANALYSE THERMIQUE INTELLIGENTE

Evalue selon :
- **Age du batiment** : <1970 = isolation quasi inexistante (score 20-40), 1970-2000 = isolation basique (score 40-60), >2000 = normes RT (score 60-80)
- **Type de toiture** : tuiles sans ecran = deperditions importantes, zinc = ponts thermiques, terrasse non isolee = critique
- **Signes de renovation** : velux recents, zinguerie neuve = bonus +10-15 points
- **Zones de deperdition** : identifies 2-4 zones (faitage, rives, penetrations, jonctions mur/toit)

Formule economie annuelle : (100 - scoreIsolation) * surfaceM2 * 0.8 EUR

## RECOMMANDATIONS PROFESSIONNELLES

Genere des recommandations ADAPTEES au type de toiture et aux problemes reels observes :
- Priorite 1 (URGENT) : risque d'infiltration, element manquant, structure compromise
- Priorite 2 (IMPORTANT) : mousses importantes, joints deteriores, isolation defaillante
- Priorite 3 (ENTRETIEN) : nettoyage preventif, traitement hydrofuge, verification periodique

## SORTIE ATTENDUE

Le champ "toitureType" DOIT correspondre exactement au type identifie dans l'observation.
Les coordonnees des zones (x, y, width, height) doivent pointer sur des zones REELLES visibles dans l'image.
Langue : francais
${address ? `Adresse du bien : ${address}` : ""}`,
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

  return Response.json({ 
    diagnostic: output,
    georisques: georisquesData
  })
}
