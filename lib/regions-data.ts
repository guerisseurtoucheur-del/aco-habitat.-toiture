// Donnees SEO pour les regions de France - Diagnostic Toiture IA

export interface RegionData {
  slug: string
  name: string
  departments: string[]
  climate: string
  mainRoofTypes: string[]
  mainProblems: string[]
  seoContent: {
    metaTitle: string
    metaDescription: string
    h1: string
    introText: string
  }
}

export const regionsData: Record<string, RegionData> = {
  "ile-de-france": {
    slug: "ile-de-france",
    name: "Ile-de-France",
    departments: ["Paris (75)", "Seine-et-Marne (77)", "Yvelines (78)", "Essonne (91)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)", "Val-d'Oise (95)"],
    climate: "Oceanique degrade avec hivers frais et etes doux",
    mainRoofTypes: ["Zinc", "Ardoise", "Tuiles plates"],
    mainProblems: ["Mousse", "Pollution", "Infiltrations zinc"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Ile-de-France | Paris & Region | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Ile-de-France. Specialiste zinc parisien, ardoise, tuiles. Analyse mousse, infiltrations. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture en Ile-de-France par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures d'Ile-de-France : zinc haussmannien parisien, ardoises des maisons de banlieue, tuiles des pavillons. Detection precise des problemes lies au climat francilien et a la pollution urbaine."
    }
  },
  "auvergne-rhone-alpes": {
    slug: "auvergne-rhone-alpes",
    name: "Auvergne-Rhone-Alpes",
    departments: ["Ain (01)", "Allier (03)", "Ardeche (07)", "Cantal (15)", "Drome (26)", "Isere (38)", "Loire (42)", "Haute-Loire (43)", "Puy-de-Dome (63)", "Rhone (69)", "Savoie (73)", "Haute-Savoie (74)"],
    climate: "Continental en plaine, montagnard en altitude",
    mainRoofTypes: ["Tuiles canal", "Ardoise", "Lauzes", "Tuiles mecaniques"],
    mainProblems: ["Grele", "Neige", "Gel intense"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Auvergne-Rhone-Alpes | Lyon, Grenoble | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Auvergne-Rhone-Alpes. Expert grele, neige, gel alpin. Tuiles, ardoises, lauzes. Rapport PDF instantane.",
      h1: "Diagnostic Toiture en Auvergne-Rhone-Alpes par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures de la region Auvergne-Rhone-Alpes, des tuiles canal lyonnaises aux lauzes auvergnates. Specialiste des contraintes alpines : neige, gel intense, orages de grele du couloir rhodanien."
    }
  },
  "provence-alpes-cote-azur": {
    slug: "provence-alpes-cote-azur",
    name: "Provence-Alpes-Cote d'Azur",
    departments: ["Alpes-de-Haute-Provence (04)", "Hautes-Alpes (05)", "Alpes-Maritimes (06)", "Bouches-du-Rhone (13)", "Var (83)", "Vaucluse (84)"],
    climate: "Mediterraneen avec mistral et ensoleillement intense",
    mainRoofTypes: ["Tuiles canal", "Tuiles romanes", "Toiture-terrasse"],
    mainProblems: ["Mistral", "Degradation UV", "Sel marin"],
    seoContent: {
      metaTitle: "Diagnostic Toiture PACA | Marseille, Nice, Toulon | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en PACA. Expert mistral, UV mediterraneen, sel marin. Tuiles provencales. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture en PACA par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures provencales et de la Cote d'Azur. Specialiste des tuiles canal mediterraneennes, resistance au mistral, degradation UV et impact du sel marin sur les toitures du littoral."
    }
  },
  "occitanie": {
    slug: "occitanie",
    name: "Occitanie",
    departments: ["Ariege (09)", "Aude (11)", "Aveyron (12)", "Gard (30)", "Haute-Garonne (31)", "Gers (32)", "Herault (34)", "Lot (46)", "Lozere (48)", "Hautes-Pyrenees (65)", "Pyrenees-Orientales (66)", "Tarn (81)", "Tarn-et-Garonne (82)"],
    climate: "Mediterraneen a l'est, oceanique a l'ouest, montagnard au sud",
    mainRoofTypes: ["Tuiles canal", "Tuiles romanes", "Ardoise (Pyrenees)"],
    mainProblems: ["Grele", "Episodes cevenols", "Tramontane/Vent d'autan"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Occitanie | Toulouse, Montpellier | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Occitanie. Expert grele, episodes cevenols, vent d'autan. Tuiles canal. Rapport PDF instantane.",
      h1: "Diagnostic Toiture en Occitanie par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures d'Occitanie, de la Ville Rose toulousaine aux rivieres mediterraneennes. Specialiste des risques locaux : couloir de grele, episodes cevenols, vent d'autan et tramontane."
    }
  },
  "nouvelle-aquitaine": {
    slug: "nouvelle-aquitaine",
    name: "Nouvelle-Aquitaine",
    departments: ["Charente (16)", "Charente-Maritime (17)", "Correze (19)", "Creuse (23)", "Dordogne (24)", "Gironde (33)", "Landes (40)", "Lot-et-Garonne (47)", "Pyrenees-Atlantiques (64)", "Deux-Sevres (79)", "Vienne (86)", "Haute-Vienne (87)"],
    climate: "Oceanique avec precipitations abondantes",
    mainRoofTypes: ["Tuiles canal", "Ardoise", "Tuiles mecaniques"],
    mainProblems: ["Tempetes atlantiques", "Mousse", "Humidite"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Nouvelle-Aquitaine | Bordeaux | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Nouvelle-Aquitaine. Expert tempetes atlantiques, mousse, humidite. Tuiles et ardoises. Rapport PDF instantane.",
      h1: "Diagnostic Toiture en Nouvelle-Aquitaine par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures de Nouvelle-Aquitaine, de Bordeaux au Pays Basque. Specialiste de la resistance aux tempetes atlantiques, detection de la mousse et des infiltrations liees au climat oceanique humide."
    }
  },
  "pays-de-la-loire": {
    slug: "pays-de-la-loire",
    name: "Pays de la Loire",
    departments: ["Loire-Atlantique (44)", "Maine-et-Loire (49)", "Mayenne (53)", "Sarthe (72)", "Vendee (85)"],
    climate: "Oceanique doux et humide",
    mainRoofTypes: ["Ardoise", "Zinc", "Tuiles"],
    mainProblems: ["Mousse", "Humidite", "Vents d'ouest"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Pays de la Loire | Nantes, Angers | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Pays de la Loire. Specialiste ardoise d'Anjou, mousse, humidite. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture en Pays de la Loire par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures des Pays de la Loire, region de l'ardoise d'Anjou. Specialiste de la detection de mousse, des infiltrations liees a l'humidite oceanique et de la resistance aux vents d'ouest."
    }
  },
  "bretagne": {
    slug: "bretagne",
    name: "Bretagne",
    departments: ["Cotes-d'Armor (22)", "Finistere (29)", "Ille-et-Vilaine (35)", "Morbihan (56)"],
    climate: "Oceanique avec precipitations frequentes et vents",
    mainRoofTypes: ["Ardoise", "Zinc", "Chaume (traditionnel)"],
    mainProblems: ["Mousse intense", "Tempetes", "Sel marin"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Bretagne | Rennes, Brest | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Bretagne. Expert ardoise, mousse, tempetes atlantiques. Patrimoine breton. Rapport PDF instantane.",
      h1: "Diagnostic Toiture en Bretagne par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures bretonnes en ardoise et zinc. Specialiste de la mousse omnipresente, des degats de tempetes atlantiques et de l'impact du sel marin sur les toitures du littoral."
    }
  },
  "normandie": {
    slug: "normandie",
    name: "Normandie",
    departments: ["Calvados (14)", "Eure (27)", "Manche (50)", "Orne (61)", "Seine-Maritime (76)"],
    climate: "Oceanique humide avec vents frequents",
    mainRoofTypes: ["Ardoise", "Chaume", "Zinc", "Tuiles"],
    mainProblems: ["Humidite permanente", "Mousse", "Tempetes"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Normandie | Rouen, Caen, Le Havre | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Normandie. Expert ardoise, colombages, humidite. Patrimoine Perret (Le Havre). Rapport PDF instantane.",
      h1: "Diagnostic Toiture en Normandie par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures normandes : ardoise, maisons a colombages, patrimoine Perret du Havre. Specialiste de l'humidite permanente, de la mousse et des tempetes de la Manche."
    }
  },
  "hauts-de-france": {
    slug: "hauts-de-france",
    name: "Hauts-de-France",
    departments: ["Aisne (02)", "Nord (59)", "Oise (60)", "Pas-de-Calais (62)", "Somme (80)"],
    climate: "Oceanique frais avec gel et neige",
    mainRoofTypes: ["Tuiles plates", "Ardoise", "Zinc"],
    mainProblems: ["Gel/degel", "Neige", "Mousse", "Pollution"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Hauts-de-France | Lille, Amiens | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Hauts-de-France. Expert gel, neige, architecture flamande. Tuiles et ardoises. Rapport PDF instantane.",
      h1: "Diagnostic Toiture dans les Hauts-de-France par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures des Hauts-de-France, de l'architecture flamande lilloise aux maisons picardes. Specialiste de la resistance au gel, a la neige et a la pollution residuelle du bassin minier."
    }
  },
  "grand-est": {
    slug: "grand-est",
    name: "Grand Est",
    departments: ["Ardennes (08)", "Aube (10)", "Marne (51)", "Haute-Marne (52)", "Meurthe-et-Moselle (54)", "Meuse (55)", "Moselle (57)", "Bas-Rhin (67)", "Haut-Rhin (68)", "Vosges (88)"],
    climate: "Continental avec hivers froids et neige",
    mainRoofTypes: ["Tuiles queue de castor", "Ardoise", "Tuiles plates"],
    mainProblems: ["Gel severe", "Neige", "Humidite"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Grand Est | Strasbourg, Reims, Metz | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA dans le Grand Est. Expert tuiles alsaciennes, gel, neige. Patrimoine colombages. Rapport PDF instantane.",
      h1: "Diagnostic Toiture dans le Grand Est par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures du Grand Est, des tuiles queue de castor alsaciennes aux ardoises champenoises. Specialiste des hivers rigoureux : gel severe, neige abondante, cycles de temperature extremes."
    }
  },
  "bourgogne-franche-comte": {
    slug: "bourgogne-franche-comte",
    name: "Bourgogne-Franche-Comte",
    departments: ["Cote-d'Or (21)", "Doubs (25)", "Jura (39)", "Nievre (58)", "Haute-Saone (70)", "Saone-et-Loire (71)", "Yonne (89)", "Territoire de Belfort (90)"],
    climate: "Continental avec hivers froids et orages de grele",
    mainRoofTypes: ["Tuiles vernissees", "Tuiles plates", "Ardoise", "Lauzes"],
    mainProblems: ["Grele (vignoble)", "Gel", "Mousse"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Bourgogne-Franche-Comte | Dijon, Besancon | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Bourgogne. Expert tuiles vernissees polychromes, grele, gel. Patrimoine viticole. Rapport PDF instantane.",
      h1: "Diagnostic Toiture en Bourgogne-Franche-Comte par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures bourguignonnes et comtoises : celebres tuiles vernissees polychromes, ardoise, lauzes du Jura. Specialiste de la grele du couloir viticole et des hivers continentaux."
    }
  },
  "centre-val-de-loire": {
    slug: "centre-val-de-loire",
    name: "Centre-Val de Loire",
    departments: ["Cher (18)", "Eure-et-Loir (28)", "Indre (36)", "Indre-et-Loire (37)", "Loir-et-Cher (41)", "Loiret (45)"],
    climate: "Oceanique degrade, doux et modere",
    mainRoofTypes: ["Ardoise", "Tuiles plates", "Tuiles mecaniques"],
    mainProblems: ["Mousse", "Humidite", "Orages"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Centre-Val de Loire | Tours, Orleans | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Centre-Val de Loire. Expert ardoise, chateaux de la Loire, mousse. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture en Centre-Val de Loire par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures du Centre-Val de Loire, region des chateaux de la Loire. Specialiste de l'ardoise ligérienne, detection de la mousse et des problemes lies au climat doux et humide."
    }
  },
  "corse": {
    slug: "corse",
    name: "Corse",
    departments: ["Corse-du-Sud (2A)", "Haute-Corse (2B)"],
    climate: "Mediterraneen avec vents violents et secheresse",
    mainRoofTypes: ["Lauzes", "Tuiles canal", "Toiture-terrasse"],
    mainProblems: ["Vents violents", "Secheresse", "Sel marin"],
    seoContent: {
      metaTitle: "Diagnostic Toiture Corse | Ajaccio, Bastia | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA en Corse. Expert lauzes, tuiles, vents violents, sel marin. Patrimoine insulaire. Rapport PDF instantane.",
      h1: "Diagnostic Toiture en Corse par Intelligence Artificielle",
      introText: "Notre IA analyse les toitures corses traditionnelles en lauzes et tuiles. Specialiste des contraintes insulaires : vents violents, secheresse estivale, impact du sel marin sur le littoral."
    }
  }
}

export const regionList = Object.values(regionsData).map(region => ({
  slug: region.slug,
  name: region.name,
  departmentCount: region.departments.length
}))

export function getRegionBySlug(slug: string): RegionData | undefined {
  return regionsData[slug]
}

export function getAllRegions(): RegionData[] {
  return Object.values(regionsData)
}
