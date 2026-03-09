// Georisques API integration - Risques naturels et technologiques
// Documentation: https://api.gouv.fr/documentation/api-georisques

export interface GeorisquesData {
  inondation: {
    present: boolean
    niveau: "faible" | "moyen" | "fort" | "tres_fort" | "inconnu"
    type?: string[]
    ppr?: boolean // Plan de Prevention des Risques
  }
  argiles: {
    present: boolean
    niveau: "faible" | "moyen" | "fort" | "inconnu"
  }
  seisme: {
    zone: 1 | 2 | 3 | 4 | 5 | null // 1=tres faible, 5=fort
  }
  radon: {
    niveau: 1 | 2 | 3 | null // 1=faible, 3=significatif
  }
  catnat: {
    count: number
    recents: string[]
  }
  erreur?: string
}

interface GeorisquesRisquesResponse {
  results?: Array<{
    code_national_risque?: string
    libelle_risque?: string
  }>
}

interface GeorisquesAZIResponse {
  results?: Array<{
    libelle?: string
    type_azi?: string
  }>
}

interface GeorisquesArgilesResponse {
  results?: Array<{
    niveau_alea?: string
    exposition?: string
  }>
}

interface GeorisquesCatnatResponse {
  results?: Array<{
    libelle_risque?: string
    date_debut?: string
    date_fin?: string
  }>
}

interface GeorisquesRadonResponse {
  results?: Array<{
    classe_potentiel?: number
  }>
}

interface GeorisquesSismesResponse {
  results?: Array<{
    zone_sismicite?: number
  }>
}

export async function fetchGeorisques(lat: number, lon: number, codeInsee?: string): Promise<GeorisquesData> {
  const result: GeorisquesData = {
    inondation: { present: false, niveau: "inconnu" },
    argiles: { present: false, niveau: "inconnu" },
    seisme: { zone: null },
    radon: { niveau: null },
    catnat: { count: 0, recents: [] }
  }

  try {
    // Appels paralleles aux differentes APIs Georisques
    const [risquesRes, aziRes, argilesRes, catnatRes, radonRes, seismesRes] = await Promise.allSettled([
      // Risques generaux par coordonnees
      fetch(`https://georisques.gouv.fr/api/v1/gaspar/risques?latlon=${lon},${lat}&rayon=1000`),
      // Atlas zones inondables
      fetch(`https://georisques.gouv.fr/api/v1/gaspar/azi?latlon=${lon},${lat}&rayon=1000`),
      // Argiles (retrait-gonflement)
      fetch(`https://georisques.gouv.fr/api/v1/rga?latlon=${lon},${lat}`),
      // Catastrophes naturelles (si code INSEE disponible)
      codeInsee ? fetch(`https://georisques.gouv.fr/api/v1/gaspar/catnat?code_insee=${codeInsee}`) : Promise.resolve(null),
      // Radon
      codeInsee ? fetch(`https://georisques.gouv.fr/api/v1/radon?code_insee=${codeInsee}`) : Promise.resolve(null),
      // Zone sismique
      codeInsee ? fetch(`https://georisques.gouv.fr/api/v1/zonage_sismique?code_insee=${codeInsee}`) : Promise.resolve(null),
    ])

    // Traitement risques generaux
    if (risquesRes.status === "fulfilled" && risquesRes.value?.ok) {
      const data = await risquesRes.value.json() as GeorisquesRisquesResponse
      if (data.results && data.results.length > 0) {
        const risquesInondation = data.results.filter(r => 
          r.libelle_risque?.toLowerCase().includes("inondation")
        )
        if (risquesInondation.length > 0) {
          result.inondation.present = true
          result.inondation.ppr = data.results.some(r => 
            r.code_national_risque?.includes("PPR")
          )
        }
      }
    }

    // Traitement Atlas Zones Inondables
    if (aziRes.status === "fulfilled" && aziRes.value?.ok) {
      const data = await aziRes.value.json() as GeorisquesAZIResponse
      if (data.results && data.results.length > 0) {
        result.inondation.present = true
        result.inondation.type = data.results.map(r => r.type_azi || r.libelle || "Zone inondable").slice(0, 3)
        
        // Determiner le niveau selon le type
        const hasDebordement = data.results.some(r => 
          r.libelle?.toLowerCase().includes("debordement") || 
          r.type_azi?.toLowerCase().includes("debordement")
        )
        const hasSubmersion = data.results.some(r => 
          r.libelle?.toLowerCase().includes("submersion")
        )
        
        if (hasSubmersion) result.inondation.niveau = "tres_fort"
        else if (hasDebordement) result.inondation.niveau = "fort"
        else result.inondation.niveau = "moyen"
      }
    }

    // Traitement Argiles
    if (argilesRes.status === "fulfilled" && argilesRes.value?.ok) {
      const data = await argilesRes.value.json() as GeorisquesArgilesResponse
      if (data.results && data.results.length > 0) {
        const alea = data.results[0]
        result.argiles.present = true
        const niveau = alea.niveau_alea?.toLowerCase() || alea.exposition?.toLowerCase() || ""
        if (niveau.includes("fort")) result.argiles.niveau = "fort"
        else if (niveau.includes("moyen")) result.argiles.niveau = "moyen"
        else result.argiles.niveau = "faible"
      }
    }

    // Traitement CATNAT
    if (catnatRes.status === "fulfilled" && catnatRes.value && "ok" in catnatRes.value && catnatRes.value.ok) {
      const data = await catnatRes.value.json() as GeorisquesCatnatResponse
      if (data.results) {
        result.catnat.count = data.results.length
        // Garder les 5 plus recents
        const sorted = data.results
          .filter(r => r.date_debut)
          .sort((a, b) => new Date(b.date_debut!).getTime() - new Date(a.date_debut!).getTime())
          .slice(0, 5)
        result.catnat.recents = sorted.map(r => 
          `${r.libelle_risque || "Catastrophe"} (${r.date_debut?.slice(0, 4) || "?"})`
        )
      }
    }

    // Traitement Radon
    if (radonRes.status === "fulfilled" && radonRes.value && "ok" in radonRes.value && radonRes.value.ok) {
      const data = await radonRes.value.json() as GeorisquesRadonResponse
      if (data.results && data.results.length > 0) {
        result.radon.niveau = (data.results[0].classe_potentiel as 1 | 2 | 3) || null
      }
    }

    // Traitement Zone Sismique
    if (seismesRes.status === "fulfilled" && seismesRes.value && "ok" in seismesRes.value && seismesRes.value.ok) {
      const data = await seismesRes.value.json() as GeorisquesSismesResponse
      if (data.results && data.results.length > 0) {
        result.seisme.zone = (data.results[0].zone_sismicite as 1 | 2 | 3 | 4 | 5) || null
      }
    }

  } catch (error) {
    console.error("Erreur API Georisques:", error)
    result.erreur = "Impossible de recuperer les donnees Georisques"
  }

  return result
}

// Fonction pour obtenir le code INSEE depuis une adresse via l'API BAN
export async function getCodeInseeFromAddress(address: string): Promise<{ codeInsee: string | null; lat: number | null; lon: number | null }> {
  try {
    const encodedAddress = encodeURIComponent(address)
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodedAddress}&limit=1`)
    
    if (!response.ok) {
      return { codeInsee: null, lat: null, lon: null }
    }

    const data = await response.json() as {
      features?: Array<{
        properties?: { citycode?: string }
        geometry?: { coordinates?: [number, number] }
      }>
    }
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0]
      return {
        codeInsee: feature.properties?.citycode || null,
        lat: feature.geometry?.coordinates?.[1] || null,
        lon: feature.geometry?.coordinates?.[0] || null
      }
    }
    
    return { codeInsee: null, lat: null, lon: null }
  } catch {
    return { codeInsee: null, lat: null, lon: null }
  }
}

// Labels pour l'affichage
export function getInondationLabel(niveau: GeorisquesData["inondation"]["niveau"]): string {
  switch (niveau) {
    case "faible": return "Risque faible"
    case "moyen": return "Risque moyen"
    case "fort": return "Risque eleve"
    case "tres_fort": return "Risque tres eleve"
    default: return "Non evalue"
  }
}

export function getArgilesLabel(niveau: GeorisquesData["argiles"]["niveau"]): string {
  switch (niveau) {
    case "faible": return "Exposition faible"
    case "moyen": return "Exposition moyenne"
    case "fort": return "Exposition forte"
    default: return "Non evalue"
  }
}

export function getSeismeLabel(zone: number | null): string {
  switch (zone) {
    case 1: return "Zone 1 - Tres faible"
    case 2: return "Zone 2 - Faible"
    case 3: return "Zone 3 - Modere"
    case 4: return "Zone 4 - Moyen"
    case 5: return "Zone 5 - Fort"
    default: return "Non evalue"
  }
}

export function getRadonLabel(niveau: number | null): string {
  switch (niveau) {
    case 1: return "Potentiel faible"
    case 2: return "Potentiel moyen"
    case 3: return "Potentiel significatif"
    default: return "Non evalue"
  }
}

// Couleurs pour les niveaux de risque
export function getRiskColor(level: "faible" | "moyen" | "fort" | "tres_fort" | "inconnu" | null): [number, number, number] {
  switch (level) {
    case "faible": return [34, 197, 94]     // vert
    case "moyen": return [245, 158, 11]    // orange
    case "fort": return [239, 68, 68]       // rouge
    case "tres_fort": return [139, 0, 0]    // rouge fonce
    default: return [150, 150, 150]         // gris
  }
}
