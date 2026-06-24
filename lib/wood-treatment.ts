// Logique metier "traitement du bois" pour ACO-HABITAT
// Derive le contenu (risque merule, insectes, discours) a partir des donnees
// climat / age du bati deja presentes dans departments-data / cities-data.

// Departements ou ACO-HABITAT intervient directement (artisan local)
export const ZONE_DEPARTMENTS = ["61", "72", "53", "27", "28"] as const

export const ZONE_LABEL = "Orne, Sarthe, Mayenne, Eure et Eure-et-Loir"

// Coordonnees entreprise
export const COMPANY = {
  name: "ACO-HABITAT",
  phone: "02 33 31 19 79",
  phoneHref: "+33233311979",
  email: "aco.habitat@orange.fr",
  since: 2006,
  addressCity: "Alençon",
}

export type Climate =
  | "oceanique"
  | "continental"
  | "mediterraneen"
  | "montagnard"
  | "semi-oceanique"

export interface WoodProfile {
  // Niveau de risque merule / champignons lignivores (lie a l'humidite)
  meruleRisk: "eleve" | "modere" | "faible"
  meruleLabel: string
  // Texte explicatif du contexte climatique pour le bois
  climateContext: string
  // Insectes xylophages dominants selon le contexte
  dominantPests: string[]
  // Recommandation principale
  recommendation: string
}

// Determine si un departement (par code) est dans la zone d'intervention directe
export function isInZone(code: string): boolean {
  return ZONE_DEPARTMENTS.includes(code as (typeof ZONE_DEPARTMENTS)[number])
}

// Profil "bois" derive du climat
export function getWoodProfile(climate: Climate, roofAge?: number): WoodProfile {
  const oldBuilding = (roofAge ?? 40) >= 45

  switch (climate) {
    case "oceanique":
      return {
        meruleRisk: "eleve",
        meruleLabel: "Risque mérule élevé",
        climateContext:
          "Le climat océanique, doux et très humide, maintient les charpentes et planchers dans une ambiance favorable au développement de la mérule et des champignons lignivores. L'humidité constante fragilise les bois et attire les insectes.",
        dominantPests: ["Vrillette", "Capricorne des maisons", "Mérule"],
        recommendation:
          "Dans cette région humide, un contrôle régulier de la charpente et un traitement préventif sont vivement recommandés pour prévenir la mérule.",
      }
    case "semi-oceanique":
      return {
        meruleRisk: "modere",
        meruleLabel: "Risque mérule modéré",
        climateContext:
          "Le climat semi-océanique alterne périodes humides et plus sèches. Les bois anciens et les zones mal ventilées restent exposés aux champignons et aux insectes xylophages.",
        dominantPests: ["Capricorne des maisons", "Vrillette", "Lyctus"],
        recommendation:
          "Une inspection de la charpente permet de détecter à temps insectes et amorces de champignons, surtout dans les combles peu ventilés.",
      }
    case "continental":
      return {
        meruleRisk: oldBuilding ? "modere" : "faible",
        meruleLabel: oldBuilding ? "Risque mérule modéré" : "Risque mérule faible",
        climateContext:
          "Le climat continental, plus sec, limite les champignons mais les écarts de température et le bâti ancien favorisent l'installation durable des insectes xylophages dans les charpentes.",
        dominantPests: ["Capricorne des maisons", "Vrillette", "Grosse vrillette"],
        recommendation:
          "Les charpentes anciennes de la région méritent un sondage des bois pour détecter capricornes et vrillettes avant que la structure ne soit fragilisée.",
      }
    case "mediterraneen":
      return {
        meruleRisk: "faible",
        meruleLabel: "Risque mérule faible",
        climateContext:
          "Le climat méditerranéen, chaud et sec, est peu propice à la mérule mais très favorable aux insectes des bois secs comme le capricorne et le lyctus, qui prospèrent dans les charpentes résineuses.",
        dominantPests: ["Capricorne des maisons", "Lyctus", "Vrillette"],
        recommendation:
          "Le traitement curatif et préventif contre les insectes xylophages est la priorité dans cette région où le bois reste sec.",
      }
    case "montagnard":
      return {
        meruleRisk: "modere",
        meruleLabel: "Risque mérule modéré",
        climateContext:
          "En zone montagnarde, les charpentes en résineux subissent l'humidité de la fonte des neiges et de fortes amplitudes. Insectes xylophages et champignons peuvent s'y développer dans les parties mal ventilées.",
        dominantPests: ["Capricorne des maisons", "Vrillette", "Champignons lignivores"],
        recommendation:
          "La surveillance des bois exposés à l'humidité (bas de charpente, planchers) est essentielle pour prévenir insectes et pourritures.",
      }
    default:
      return {
        meruleRisk: "modere",
        meruleLabel: "Risque mérule modéré",
        climateContext:
          "Les conditions locales exposent les charpentes aux insectes xylophages et, dans les zones humides ou mal ventilées, aux champignons lignivores.",
        dominantPests: ["Capricorne des maisons", "Vrillette", "Mérule"],
        recommendation:
          "Une inspection de la charpente permet d'identifier le bon traitement, curatif ou préventif.",
      }
  }
}

// --- Gestion des articles pour les noms de departements ---
// Departements feminins commencant par une consonne (la / de la / dans la)
const FEMININE_DEPARTMENTS = new Set([
  "Charente",
  "Charente-Maritime",
  "Corrèze",
  "Corse-du-Sud",
  "Côte-d'Or",
  "Creuse",
  "Dordogne",
  "Drôme",
  "Gironde",
  "Haute-Corse",
  "Haute-Garonne",
  "Haute-Loire",
  "Haute-Marne",
  "Haute-Saône",
  "Haute-Savoie",
  "Haute-Vienne",
  "Loire",
  "Loire-Atlantique",
  "Lozère",
  "Manche",
  "Marne",
  "Mayenne",
  "Meurthe-et-Moselle",
  "Meuse",
  "Moselle",
  "Nièvre",
  "Saône-et-Loire",
  "Sarthe",
  "Savoie",
  "Seine-Maritime",
  "Seine-et-Marne",
  "Vendée",
  "Vienne",
])

// Departements pluriels (les / des / dans les)
const PLURAL_DEPARTMENTS = new Set([
  "Alpes-de-Haute-Provence",
  "Alpes-Maritimes",
  "Hautes-Alpes",
  "Ardennes",
  "Bouches-du-Rhône",
  "Côtes-d'Armor",
  "Landes",
  "Hauts-de-Seine",
  "Pyrénées-Atlantiques",
  "Pyrénées-Orientales",
  "Hautes-Pyrénées",
  "Deux-Sèvres",
  "Vosges",
  "Yvelines",
  "Hauts-de-France",
])

function startsWithVowel(name: string): boolean {
  return /^[aàâeéèêiîoôuûyh]/i.test(name)
}

// Retourne les formes correctes : "dans l'Orne", "dans la Sarthe", "dans le Calvados", "dans les Landes"
export function deptLabels(name: string) {
  if (PLURAL_DEPARTMENTS.has(name)) {
    return { def: `les ${name}`, dans: `dans les ${name}`, de: `des ${name}` }
  }
  if (startsWithVowel(name)) {
    return { def: `l'${name}`, dans: `dans l'${name}`, de: `de l'${name}` }
  }
  if (FEMININE_DEPARTMENTS.has(name)) {
    return { def: `la ${name}`, dans: `dans la ${name}`, de: `de la ${name}` }
  }
  return { def: `le ${name}`, dans: `dans le ${name}`, de: `du ${name}` }
}

// Deduit le climat (enum) a partir d'un texte libre (donnees regions)
export function climateFromText(text: string): Climate {
  const t = text.toLowerCase()
  if (t.includes("méditerran") || t.includes("mediterran")) return "mediterraneen"
  if (t.includes("montagn")) return "montagnard"
  if (t.includes("continental")) return "continental"
  if (t.includes("océan") || t.includes("ocean")) return "oceanique"
  return "semi-oceanique"
}

// Deduit le profil bois a partir des donnees climatiques chiffrees d'une ville
export function getWoodProfileFromRainfall(annualRainfall: number, frostDays = 0): WoodProfile {
  let climate: Climate
  if (annualRainfall >= 850) climate = "oceanique"
  else if (annualRainfall >= 650) climate = "semi-oceanique"
  else if (frostDays >= 40) climate = "continental"
  else climate = "mediterraneen"
  return getWoodProfile(climate)
}

// Forme "a {ville}" correcte : "à Paris", "au Mans", "aux Sables-d'Olonne"
export function cityAt(name: string): string {
  if (name.startsWith("Le ")) return `au ${name.slice(3)}`
  if (name.startsWith("Les ")) return `aux ${name.slice(4)}`
  return `à ${name}`
}

// Couleur d'accent selon le niveau de risque (tokens du theme)
export function riskColor(risk: WoodProfile["meruleRisk"]): string {
  switch (risk) {
    case "eleve":
      return "#b04a25" // terracotta
    case "modere":
      return "#c8912f" // miel
    case "faible":
      return "#3c5a4a" // vert pin
  }
}
