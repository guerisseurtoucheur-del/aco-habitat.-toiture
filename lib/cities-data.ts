// Donnees SEO pour les grandes villes de France - Diagnostic Toiture IA
// Chaque ville a des donnees uniques pour un contenu SEO optimal

export interface CityData {
  slug: string
  name: string
  department: string
  departmentCode: string
  region: string
  regionSlug: string
  population: number
  
  // Donnees climatiques specifiques
  climate: {
    annualRainfall: number // mm/an
    rainyDays: number // jours/an
    frostDays: number // jours de gel/an
    snowDays: number // jours de neige/an
    windExposure: "faible" | "modere" | "fort" | "tres_fort"
    sunHours: number // heures/an
    hailRisk: "faible" | "modere" | "eleve"
  }
  
  // Types de toitures dominants dans la ville
  roofTypes: {
    type: string
    percentage: number
    description: string
  }[]
  
  // Problemes de toiture specifiques a la region
  commonProblems: {
    problem: string
    frequency: "frequent" | "modere" | "occasionnel"
    description: string
    cause: string
  }[]
  
  // Prix moyens dans la ville
  pricing: {
    inspectionAverage: number
    repairSmall: [number, number]
    repairMedium: [number, number]
    renovation: [number, number]
  }
  
  // Patrimoine architectural local
  architecture: {
    style: string
    period: string
    characteristics: string[]
  }[]
  
  // Artisans locaux partenaires (pour SEO local)
  localInfo: {
    zipCodes: string[]
    neighborhoods: string[]
    nearbyCommunes: string[]
  }
  
  // FAQ specifique a la ville
  faq: {
    question: string
    answer: string
  }[]
  
  // Contenu SEO unique
  seoContent: {
    metaTitle: string
    metaDescription: string
    h1: string
    introText: string
    climateText: string
    roofTypesText: string
    problemsText: string
    ctaText: string
  }
}

export const citiesData: Record<string, CityData> = {
  // ═══════════════════════════════════════════════════════════════
  // PARIS ET ILE-DE-FRANCE
  // ═══════════════════════════════════════════════════════════════
  "paris": {
    slug: "paris",
    name: "Paris",
    department: "Paris",
    departmentCode: "75",
    region: "Ile-de-France",
    regionSlug: "ile-de-france",
    population: 2165423,
    climate: {
      annualRainfall: 637,
      rainyDays: 111,
      frostDays: 29,
      snowDays: 11,
      windExposure: "modere",
      sunHours: 1662,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Zinc", percentage: 45, description: "Toitures en zinc typiques des immeubles haussmanniens" },
      { type: "Ardoise", percentage: 30, description: "Ardoise naturelle sur batiments historiques" },
      { type: "Tuiles plates", percentage: 15, description: "Tuiles plates de Bourgogne sur maisons anciennes" },
      { type: "Toiture-terrasse", percentage: 10, description: "Toitures plates sur batiments modernes" }
    ],
    commonProblems: [
      { problem: "Infiltrations zinc", frequency: "frequent", description: "Joints de zinc defaillants apres 30-40 ans", cause: "Dilatation thermique et pollution" },
      { problem: "Mousse et lichen", frequency: "frequent", description: "Developpement vegetal sur versants nord", cause: "Humidite et ombre des batiments mitoyens" },
      { problem: "Gouttiere bouchee", frequency: "frequent", description: "Accumulation de feuilles et debris", cause: "Arbres d'alignement parisiens" },
      { problem: "Ardoises cassees", frequency: "modere", description: "Fractures dues au gel", cause: "Cycles gel/degel hivernaux" }
    ],
    pricing: {
      inspectionAverage: 250,
      repairSmall: [500, 1500],
      repairMedium: [2000, 5000],
      renovation: [15000, 45000]
    },
    architecture: [
      { style: "Haussmannien", period: "1850-1914", characteristics: ["Toiture zinc a pente douce", "Lucarnes ouvragees", "Cheneaux en zinc"] },
      { style: "Art Deco", period: "1920-1940", characteristics: ["Terrasses accessibles", "Garde-corps decoratifs", "Verrieres"] },
      { style: "Faubourien", period: "XVIIe-XIXe", characteristics: ["Toitures en ardoise", "Pentes fortes", "Chatiere de ventilation"] }
    ],
    localInfo: {
      zipCodes: ["75001", "75002", "75003", "75004", "75005", "75006", "75007", "75008", "75009", "75010", "75011", "75012", "75013", "75014", "75015", "75016", "75017", "75018", "75019", "75020"],
      neighborhoods: ["Marais", "Montmartre", "Saint-Germain", "Bastille", "Belleville", "Batignolles", "Passy", "Auteuil"],
      nearbyCommunes: ["Boulogne-Billancourt", "Neuilly-sur-Seine", "Levallois-Perret", "Vincennes", "Saint-Denis", "Montreuil"]
    },
    faq: [
      { question: "Quel est le cout moyen d'une renovation de toiture a Paris ?", answer: "A Paris, le cout moyen d'une renovation complete de toiture varie entre 15 000 et 45 000 euros selon la superficie et le type de couverture (zinc, ardoise). Les toitures en zinc haussmanniennes coutent en moyenne 180-250 euros/m2 pose comprise." },
      { question: "Quelle est la duree de vie d'une toiture en zinc a Paris ?", answer: "Une toiture en zinc bien entretenue a Paris dure entre 50 et 80 ans. Cependant, la pollution urbaine et les variations thermiques peuvent reduire cette duree. Un diagnostic IA permet de detecter les premiers signes d'usure." },
      { question: "Faut-il un permis pour refaire sa toiture a Paris ?", answer: "A Paris, une declaration prealable de travaux est obligatoire pour tout changement d'aspect de la toiture. Dans certains secteurs proteges (Marais, Montmartre), l'avis des Architectes des Batiments de France est requis." },
      { question: "Comment detecter une infiltration sur une toiture parisienne ?", answer: "Les signes d'infiltration incluent : taches d'humidite au plafond, peinture qui cloque, odeur de moisi dans les combles. Notre diagnostic IA par photo satellite detecte les zones a risque avant l'apparition des degats interieurs." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Paris | Analyse IA en 30s | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Paris. Analyse des toitures zinc, ardoise et tuiles. Detection mousse, fissures, infiltrations. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Paris par Intelligence Artificielle",
      introText: "Obtenez un diagnostic complet de votre toiture parisienne en 30 secondes. Notre IA analyse les specificites des toitures de la capitale : zinc haussmannien, ardoises historiques, tuiles de Bourgogne. Detection precise des problemes lies au climat parisien et a la pollution urbaine.",
      climateText: "Paris connait un climat oceanique degrade avec 637mm de precipitations annuelles et 29 jours de gel. Ces conditions mettent a rude epreuve les toitures, notamment les joints de zinc soumis aux cycles de dilatation/contraction. La pollution urbaine accelere egalement la degradation des materiaux.",
      roofTypesText: "Les toitures parisiennes sont caracterisees par la predominance du zinc (45%), heritage de l'architecture haussmannienne. L'ardoise naturelle couvre 30% des toits, principalement sur les batiments historiques. Les tuiles plates et toitures-terrasses completent le paysage.",
      problemsText: "Les problemes les plus frequents a Paris concernent les infiltrations au niveau des joints de zinc (40% des cas), la mousse sur les versants nord peu exposes au soleil, et les gouttieres bouchees par les feuilles des arbres d'alignement.",
      ctaText: "Analysez votre toiture parisienne maintenant"
    }
  },

  "lyon": {
    slug: "lyon",
    name: "Lyon",
    department: "Rhone",
    departmentCode: "69",
    region: "Auvergne-Rhone-Alpes",
    regionSlug: "auvergne-rhone-alpes",
    population: 522250,
    climate: {
      annualRainfall: 831,
      rainyDays: 104,
      frostDays: 35,
      snowDays: 8,
      windExposure: "modere",
      sunHours: 2010,
      hailRisk: "eleve"
    },
    roofTypes: [
      { type: "Tuiles canal", percentage: 40, description: "Tuiles rondes typiques du Sud de la France" },
      { type: "Tuiles mecaniques", percentage: 35, description: "Tuiles terre cuite modernes" },
      { type: "Ardoise", percentage: 15, description: "Ardoise sur le patrimoine ancien" },
      { type: "Zinc", percentage: 10, description: "Zinc sur immeubles du XIXe" }
    ],
    commonProblems: [
      { problem: "Degats de grele", frequency: "frequent", description: "Impacts sur tuiles et gouttieres", cause: "Orages violents en ete (couloir rhodanien)" },
      { problem: "Tuiles deplacees", frequency: "frequent", description: "Decalage des tuiles canal", cause: "Vent du sud (mistral attenue)" },
      { problem: "Mousse importante", frequency: "modere", description: "Colonisation vegetale", cause: "Humidite et precipitations abondantes" },
      { problem: "Infiltrations faitage", frequency: "modere", description: "Joints de faitage deteriores", cause: "Variations thermiques importantes" }
    ],
    pricing: {
      inspectionAverage: 180,
      repairSmall: [400, 1200],
      repairMedium: [1500, 4000],
      renovation: [12000, 35000]
    },
    architecture: [
      { style: "Lyonnais Renaissance", period: "XVe-XVIe siecle", characteristics: ["Toits a forte pente", "Tuiles plates vernissees", "Traboules couvertes"] },
      { style: "Canut", period: "XIXe siecle", characteristics: ["Grandes fenetres", "Toitures en tuiles", "Combles amenages"] },
      { style: "Contemporain", period: "XXe-XXIe", characteristics: ["Toits plats", "Toitures vegetalisees", "Panneaux solaires"] }
    ],
    localInfo: {
      zipCodes: ["69001", "69002", "69003", "69004", "69005", "69006", "69007", "69008", "69009"],
      neighborhoods: ["Vieux Lyon", "Presqu'ile", "Croix-Rousse", "Part-Dieu", "Confluence", "Monplaisir", "Gerland"],
      nearbyCommunes: ["Villeurbanne", "Vaulx-en-Velin", "Venissieux", "Bron", "Caluire-et-Cuire", "Oullins"]
    },
    faq: [
      { question: "Les orages de grele sont-ils frequents a Lyon ?", answer: "Lyon se situe dans le couloir rhodanien, zone a risque eleve de grele entre mai et septembre. En moyenne, 2-3 episodes de grele significatifs touchent la region chaque annee, causant des degats aux toitures en tuiles." },
      { question: "Quel type de tuile choisir a Lyon ?", answer: "A Lyon, les tuiles canal (romanes) sont traditionnelles mais les tuiles mecaniques a emboitement offrent une meilleure resistance au vent et a la grele. Pour le Vieux Lyon classe UNESCO, les tuiles canal restent obligatoires." },
      { question: "Comment proteger ma toiture de la grele a Lyon ?", answer: "Optez pour des tuiles classees grelon (resistance aux impacts), verifiez l'etat des fixations chaque annee, et souscrivez une assurance multirisque habitation avec garantie grele. Notre diagnostic IA detecte les tuiles fragilisees." },
      { question: "Faut-il deneiger sa toiture a Lyon ?", answer: "Avec seulement 8 jours de neige par an en moyenne, le deneigement est rarement necessaire a Lyon. En cas de forte accumulation, verifiez la resistance de votre charpente (charge maximale : 100-150 kg/m2 selon les toitures)." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Lyon | Analyse IA Grele & Tuiles | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Lyon. Specialiste tuiles canal, detection degats de grele, mousse. Analyse rapide pour le Rhone. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture a Lyon par Intelligence Artificielle",
      introText: "Analysez votre toiture lyonnaise en 30 secondes avec notre IA specialisee. Detection des degats de grele, evaluation de l'etat des tuiles canal et mecaniques, reperage de la mousse et des infiltrations specifiques au climat rhodanien.",
      climateText: "Lyon beneficie d'un climat semi-continental avec 831mm de pluie annuelle et des orages de grele frequents en ete (couloir rhodanien). Les hivers comptent 35 jours de gel, testant la resistance des materiaux. L'ensoleillement genereux (2010h/an) favorise neanmoins le sechage rapide des toitures.",
      roofTypesText: "Les toitures lyonnaises sont dominees par les tuiles canal (40%), heritage mediterraneen, et les tuiles mecaniques (35%) plus recentes. L'ardoise et le zinc equipent les immeubles du centre historique. Le Vieux Lyon, classe UNESCO, impose des tuiles traditionnelles.",
      problemsText: "La grele constitue le risque majeur pour les toitures lyonnaises, avec des impacts pouvant fissurer les tuiles. Les tuiles canal sont egalement sujettes aux deplacements par le vent. La mousse se developpe sur les versants nord en raison des precipitations abondantes.",
      ctaText: "Verifiez l'etat de votre toiture lyonnaise"
    }
  },

  "marseille": {
    slug: "marseille",
    name: "Marseille",
    department: "Bouches-du-Rhone",
    departmentCode: "13",
    region: "Provence-Alpes-Cote d'Azur",
    regionSlug: "provence-alpes-cote-azur",
    population: 873076,
    climate: {
      annualRainfall: 515,
      rainyDays: 56,
      frostDays: 7,
      snowDays: 1,
      windExposure: "tres_fort",
      sunHours: 2858,
      hailRisk: "faible"
    },
    roofTypes: [
      { type: "Tuiles canal", percentage: 55, description: "Tuiles romanes traditionnelles provencales" },
      { type: "Tuiles romanes", percentage: 30, description: "Tuiles a emboitement couleur terre cuite" },
      { type: "Toiture-terrasse", percentage: 12, description: "Toits plats sur constructions modernes" },
      { type: "Autres", percentage: 3, description: "Ardoise, zinc sur batiments specifiques" }
    ],
    commonProblems: [
      { problem: "Tuiles soulevees par le mistral", frequency: "frequent", description: "Decrochage et envol de tuiles", cause: "Mistral violent (rafales 100+ km/h)" },
      { problem: "Decoloration UV", frequency: "frequent", description: "Tuiles blanchies par le soleil", cause: "2858 heures d'ensoleillement annuel" },
      { problem: "Sel marin", frequency: "modere", description: "Corrosion des elements metalliques", cause: "Proximite de la Mediterranee" },
      { problem: "Secheresse des joints", frequency: "modere", description: "Fissuration du mortier de faitage", cause: "Climat aride et variations thermiques" }
    ],
    pricing: {
      inspectionAverage: 160,
      repairSmall: [350, 1000],
      repairMedium: [1200, 3500],
      renovation: [10000, 30000]
    },
    architecture: [
      { style: "Provencal traditionnel", period: "XVIIe-XIXe", characteristics: ["Genoise a 2-3 rangs", "Tuiles canal vieillies", "Faible pente (25-35%)"] },
      { style: "Bastide", period: "XVIIIe-XIXe", characteristics: ["Toiture a 4 pans", "Tuiles rondes patinees", "Avant-toits larges"] },
      { style: "Calanques", period: "XXe siecle", characteristics: ["Integration au paysage", "Terrasses", "Couleurs ocre et blanc"] }
    ],
    localInfo: {
      zipCodes: ["13001", "13002", "13003", "13004", "13005", "13006", "13007", "13008", "13009", "13010", "13011", "13012", "13013", "13014", "13015", "13016"],
      neighborhoods: ["Vieux-Port", "Panier", "Belsunce", "Castellane", "Prado", "Endoume", "Mazargues", "Calanques"],
      nearbyCommunes: ["Aix-en-Provence", "Aubagne", "Martigues", "La Ciotat", "Cassis", "Vitrolles"]
    },
    faq: [
      { question: "Comment proteger ma toiture du mistral a Marseille ?", answer: "A Marseille, les tuiles doivent etre fixees (clouees ou collees) et non simplement posees. Prevoyez des fixations tous les 5 rangs minimum. Les tuiles a emboitement resistent mieux au vent que les tuiles canal traditionnelles." },
      { question: "Le sel marin abime-t-il les toitures a Marseille ?", answer: "Oui, l'air salin accelere la corrosion des elements metalliques (gouttieres, noues, fixations). Privilegiez l'aluminium laque ou l'inox dans les quartiers proches de la mer. Un rinçage annuel a l'eau claire est recommande." },
      { question: "Pourquoi mes tuiles blanchissent-elles a Marseille ?", answer: "Avec 2858 heures de soleil par an, les UV decolorent progressivement les tuiles terre cuite. C'est un phenomene esthetique normal qui n'affecte pas l'etancheite. Les tuiles vieillies artificiellement resistent mieux." },
      { question: "Quelle pente de toit pour une maison a Marseille ?", answer: "En region marseillaise, une pente de 25 a 35% est traditionnelle pour les tuiles canal. Cette faible pente limite la prise au vent du mistral. Les toitures-terrasses sont egalement adaptees au climat sec." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Marseille | Expert Mistral & Tuiles | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Marseille. Analyse tuiles canal, resistance au mistral, detection degradations UV et sel marin. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture a Marseille par Intelligence Artificielle",
      introText: "Analysez votre toiture marseillaise en 30 secondes avec notre IA. Specialiste des toitures provencales exposees au mistral et au soleil mediterraneen. Detection des tuiles soulevees, de la degradation UV et de l'impact du sel marin.",
      climateText: "Marseille jouit d'un climat mediterraneen avec 2858 heures de soleil annuel et seulement 515mm de pluie. Le mistral, vent violent soufflant jusqu'a 100 km/h, est le principal ennemi des toitures. L'air salin et les UV intenses accelerent le vieillissement des materiaux.",
      roofTypesText: "Les toitures marseillaises sont couvertes a 85% de tuiles terre cuite : tuiles canal traditionnelles (55%) et tuiles romanes (30%). Les toitures-terrasses gagnent du terrain dans les constructions modernes. La genoise, corniche en tuiles superposees, est emblematique de l'architecture provencale.",
      problemsText: "Le mistral est responsable de la majorite des degats : tuiles soulevees, cassees ou envolees. L'ensoleillement intense decolore les tuiles. Pres de la mer, le sel corrode les elements metalliques. La secheresse fissure les joints de faitage.",
      ctaText: "Analysez votre toiture marseillaise maintenant"
    }
  },

  "toulouse": {
    slug: "toulouse",
    name: "Toulouse",
    department: "Haute-Garonne",
    departmentCode: "31",
    region: "Occitanie",
    regionSlug: "occitanie",
    population: 498003,
    climate: {
      annualRainfall: 638,
      rainyDays: 95,
      frostDays: 24,
      snowDays: 4,
      windExposure: "fort",
      sunHours: 2047,
      hailRisk: "eleve"
    },
    roofTypes: [
      { type: "Tuiles canal", percentage: 50, description: "Tuiles romanes terre cuite rose" },
      { type: "Tuiles mecaniques", percentage: 35, description: "Tuiles a emboitement modernes" },
      { type: "Ardoise", percentage: 10, description: "Ardoise sur batiments historiques" },
      { type: "Zinc/Terrasse", percentage: 5, description: "Toitures modernes" }
    ],
    commonProblems: [
      { problem: "Grele severe", frequency: "frequent", description: "Impacts importants sur tuiles", cause: "Couloir de grele du Sud-Ouest" },
      { problem: "Vent d'autan", frequency: "frequent", description: "Tuiles deplacees ou cassees", cause: "Vent violent du Sud-Est" },
      { problem: "Mousse et algues", frequency: "modere", description: "Developpement vegetal", cause: "Climat humide et doux" },
      { problem: "Vieillissement tuiles", frequency: "modere", description: "Gelivures et porosite", cause: "Cycles gel/degel et pluies" }
    ],
    pricing: {
      inspectionAverage: 170,
      repairSmall: [400, 1100],
      repairMedium: [1400, 3800],
      renovation: [11000, 32000]
    },
    architecture: [
      { style: "Toulousain brique", period: "XIXe siecle", characteristics: ["Brique rose", "Tuiles canal", "Pente moyenne", "Genoise simple"] },
      { style: "Maison de ville", period: "XVIIe-XVIIIe", characteristics: ["Facade etroite", "Toiture a 2 pans", "Lucarnes"] },
      { style: "Pavilionnaire", period: "XXe siecle", characteristics: ["Toiture 4 pans", "Tuiles mecaniques", "Debords genereux"] }
    ],
    localInfo: {
      zipCodes: ["31000", "31100", "31200", "31300", "31400", "31500"],
      neighborhoods: ["Capitole", "Saint-Cyprien", "Minimes", "Compans-Caffarelli", "Rangueil", "Purpan", "Cote Pavee"],
      nearbyCommunes: ["Blagnac", "Colomiers", "Tournefeuille", "Balma", "L'Union", "Ramonville"]
    },
    faq: [
      { question: "Toulouse est-elle exposee a la grele ?", answer: "Oui, Toulouse se situe dans le couloir de grele du Sud-Ouest, l'une des zones les plus touchees de France. Entre mai et septembre, les orages violents peuvent generer des grelons de plusieurs centimetres. Des protections renforcees sont recommandees." },
      { question: "Qu'est-ce que le vent d'autan et quel impact sur les toitures ?", answer: "Le vent d'autan est un vent chaud et sec soufflant du Sud-Est, pouvant depasser 100 km/h. Il souleve les tuiles mal fixees et desseche les joints. Les toitures toulousaines doivent etre concues pour resister a ce vent specifique." },
      { question: "Pourquoi les toitures sont-elles roses a Toulouse ?", answer: "Les tuiles toulousaines traditionnelles sont fabriquees avec l'argile locale, naturellement rose-orange. Cette couleur caracteristique vaut a Toulouse son surnom de 'Ville Rose'. Les reglements d'urbanisme imposent souvent cette teinte." },
      { question: "Comment choisir des tuiles resistantes a la grele a Toulouse ?", answer: "Optez pour des tuiles certifiees 'grelon' (norme NF EN 1304) avec une resistance aux chocs d'au moins 1,5 joule. Les tuiles epaisses (15-20mm) et les tuiles beton sont plus resistantes que les tuiles terre cuite fines." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Toulouse | Expert Grele & Vent d'Autan | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Toulouse. Detection degats de grele, resistance au vent d'autan, analyse tuiles canal. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture a Toulouse par Intelligence Artificielle",
      introText: "Obtenez un diagnostic complet de votre toiture toulousaine en 30 secondes. Notre IA est specialisee dans l'analyse des toitures de la Ville Rose : tuiles canal terre cuite, resistance a la grele et au vent d'autan, detection des infiltrations.",
      climateText: "Toulouse subit un climat oceanique altere avec des orages de grele frequents entre mai et septembre (couloir de grele du Sud-Ouest). Le vent d'autan, chaud et violent, peut depasser 100 km/h. Ces conditions mettent a rude epreuve les toitures en tuiles.",
      roofTypesText: "Les toitures toulousaines sont dominées par les tuiles canal en terre cuite rose (50%), couleur caracteristique de la 'Ville Rose'. Les tuiles mecaniques (35%) equipent les constructions recentes. L'ardoise reste presente sur le patrimoine historique.",
      problemsText: "La grele cause les degats les plus severes sur les toitures toulousaines, avec parfois des remplacements complets necessaires. Le vent d'autan souleve et casse les tuiles mal fixees. L'humidite favorise la mousse sur les versants nord.",
      ctaText: "Verifiez votre toiture face a la grele"
    }
  },

  "nice": {
    slug: "nice",
    name: "Nice",
    department: "Alpes-Maritimes",
    departmentCode: "06",
    region: "Provence-Alpes-Cote d'Azur",
    regionSlug: "provence-alpes-cote-azur",
    population: 342669,
    climate: {
      annualRainfall: 767,
      rainyDays: 63,
      frostDays: 3,
      snowDays: 0,
      windExposure: "modere",
      sunHours: 2724,
      hailRisk: "faible"
    },
    roofTypes: [
      { type: "Tuiles canal", percentage: 50, description: "Tuiles romanes traditionnelles" },
      { type: "Tuiles plates", percentage: 25, description: "Tuiles nissartes anciennes" },
      { type: "Toiture-terrasse", percentage: 20, description: "Toits plats modernes" },
      { type: "Lauzes", percentage: 5, description: "Pierres plates sur arriere-pays" }
    ],
    commonProblems: [
      { problem: "Degradation UV", frequency: "frequent", description: "Vieillissement accelere des materiaux", cause: "Ensoleillement exceptionnel (2724h/an)" },
      { problem: "Sel et embruns", frequency: "frequent", description: "Corrosion des fixations et gouttieres", cause: "Proximite immediate de la mer" },
      { problem: "Infiltrations terrasses", frequency: "modere", description: "Etancheite defaillante", cause: "Pluies intenses malgre leur rarete" },
      { problem: "Thermique", frequency: "modere", description: "Dilatation excessive", cause: "Ecarts de temperature jour/nuit" }
    ],
    pricing: {
      inspectionAverage: 200,
      repairSmall: [450, 1300],
      repairMedium: [1600, 4200],
      renovation: [12000, 38000]
    },
    architecture: [
      { style: "Belle Epoque", period: "1860-1914", characteristics: ["Toits complexes", "Tourelles", "Tuiles vernissees colorees"] },
      { style: "Nissart traditionnel", period: "XVIIe-XIXe", characteristics: ["Tuiles canal patinees", "Genoise", "Faible pente"] },
      { style: "Contemporain Riviera", period: "XXe-XXIe", characteristics: ["Toits-terrasses", "Piscines sur toit", "Panneaux solaires"] }
    ],
    localInfo: {
      zipCodes: ["06000", "06100", "06200", "06300"],
      neighborhoods: ["Vieux-Nice", "Carre d'Or", "Cimiez", "Port", "Liberation", "Riquier", "Fabron", "Saint-Roch"],
      nearbyCommunes: ["Cannes", "Antibes", "Cagnes-sur-Mer", "Saint-Laurent-du-Var", "Villefranche-sur-Mer", "Monaco"]
    },
    faq: [
      { question: "Le sel marin endommage-t-il les toitures a Nice ?", answer: "Oui, l'air marin charge en sel corrode les elements metalliques des toitures nicoises. Les gouttieres, cheneaux et fixations en acier s'oxydent rapidement. Privilegiez l'aluminium, l'inox ou le cuivre pour les pieces exposees." },
      { question: "Les toitures-terrasses sont-elles adaptees au climat nicois ?", answer: "Oui, les toits plats sont ideaux a Nice grace au faible nombre de jours de pluie. Ils permettent de creer des espaces de vie exterieurs. Attention cependant a l'etancheite, les pluies rares sont souvent intenses." },
      { question: "Comment proteger ma toiture du soleil a Nice ?", answer: "A Nice, les UV degradent les materiaux. Optez pour des tuiles claires reflechissantes, des membranes d'etancheite resistantes aux UV, et une ventilation suffisante des combles pour limiter la chaleur (jusqu'a 70C sous les toits en ete)." },
      { question: "Quelles sont les contraintes architecturales a Nice ?", answer: "Dans le Vieux-Nice et les secteurs proteges, les tuiles canal traditionnelles sont obligatoires. Les couleurs doivent respecter la palette locale (ocre, terre cuite). Le Plan Local d'Urbanisme definit les regles par quartier." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Nice | Expert Mediterranee & UV | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Nice. Analyse tuiles canal, degradation UV, impact sel marin. Specialiste Cote d'Azur. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Nice par Intelligence Artificielle",
      introText: "Analysez votre toiture niçoise en 30 secondes avec notre IA. Specialiste des toitures de la Cote d'Azur exposees au soleil mediterraneen et a l'air marin. Detection des degradations UV, de la corrosion saline et des infiltrations.",
      climateText: "Nice beneficie d'un climat mediterraneen exceptionnel avec 2724 heures de soleil par an, le record de France metropolitaine. Les pluies sont rares (63 jours/an) mais intenses. L'absence de gel (3 jours/an) preserve les materiaux du gel, mais les UV et le sel marin sont agressifs.",
      roofTypesText: "Les toitures nicoises melent tradition et modernite : tuiles canal (50%), tuiles plates anciennes (25%) et toitures-terrasses (20%). L'architecture Belle Epoque presente des toits complexes avec tourelles et tuiles vernissees colorees.",
      problemsText: "L'ensoleillement exceptionnel accelere le vieillissement des materiaux (decoloration, fragilisation). Le sel marin corrode les elements metalliques a proximite de la mer. Les toitures-terrasses souffrent lors des pluies intenses malgre leur rarete.",
      ctaText: "Analysez votre toiture sur la Cote d'Azur"
    }
  },

  "nantes": {
    slug: "nantes",
    name: "Nantes",
    department: "Loire-Atlantique",
    departmentCode: "44",
    region: "Pays de la Loire",
    regionSlug: "pays-de-la-loire",
    population: 320732,
    climate: {
      annualRainfall: 819,
      rainyDays: 118,
      frostDays: 18,
      snowDays: 3,
      windExposure: "fort",
      sunHours: 1790,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Ardoise", percentage: 55, description: "Ardoise naturelle d'Anjou" },
      { type: "Zinc", percentage: 25, description: "Zinc sur immeubles XIXe" },
      { type: "Tuiles", percentage: 15, description: "Tuiles mecaniques" },
      { type: "Autres", percentage: 5, description: "Bac acier, terrasse" }
    ],
    commonProblems: [
      { problem: "Mousse et lichen", frequency: "frequent", description: "Vegetation abondante sur ardoises", cause: "Climat humide oceanique" },
      { problem: "Ardoises soulevees", frequency: "frequent", description: "Decrochage par le vent", cause: "Vents d'ouest frequents" },
      { problem: "Infiltrations", frequency: "modere", description: "Penetration d'eau par les fixations", cause: "Precipitations abondantes" },
      { problem: "Zinc verdi", frequency: "modere", description: "Patine verte sur zinc", cause: "Humidite et pollution" }
    ],
    pricing: {
      inspectionAverage: 175,
      repairSmall: [420, 1150],
      repairMedium: [1400, 3800],
      renovation: [11000, 33000]
    },
    architecture: [
      { style: "Nantais XVIIIe", period: "1700-1800", characteristics: ["Ardoise d'Anjou", "Lucarnes a fronton", "Pentes fortes"] },
      { style: "Maison de pecheur", period: "XIXe siecle", characteristics: ["Petite echelle", "Ardoise grise", "Simplicite"] },
      { style: "Ile de Nantes", period: "XXIe siecle", characteristics: ["Architecture contemporaine", "Toits vegetalises", "Bois et metal"] }
    ],
    localInfo: {
      zipCodes: ["44000", "44100", "44200", "44300"],
      neighborhoods: ["Centre-ville", "Ile de Nantes", "Doulon", "Chantenay", "Erdre", "Zola", "Talensac"],
      nearbyCommunes: ["Saint-Herblain", "Reze", "Saint-Sebastien", "Orvault", "Vertou", "Carquefou"]
    },
    faq: [
      { question: "Pourquoi les toitures nantaises sont-elles en ardoise ?", answer: "Nantes est proche des carrieres d'ardoise d'Anjou (Trélazé), materiaux d'excellence depuis des siecles. L'ardoise resiste parfaitement au climat humide et venté de la region. Elle confère aux toitures nantaises leur caractère typique." },
      { question: "Comment lutter contre la mousse sur les toitures a Nantes ?", answer: "Le climat oceanique favorise la mousse. Un traitement anti-mousse tous les 3-5 ans est recommande. Evitez le nettoyage haute pression qui abime les ardoises. Notre diagnostic IA detecte les zones envahies." },
      { question: "Les toitures nantaises resistent-elles au vent ?", answer: "Les vents d'ouest sont frequents a Nantes. Les ardoises doivent etre correctement fixees (crochets inox). Verifiez les fixations apres chaque tempete. Les toitures a forte pente (45%+) offrent une meilleure resistance." },
      { question: "Quelle est la duree de vie d'une toiture en ardoise a Nantes ?", answer: "Une toiture en ardoise naturelle d'Anjou dure 80 a 100 ans a Nantes. L'ardoise synthetique (fibro-ciment) dure 30-40 ans. L'entretien regulier (demoussage, verification des crochets) prolonge la duree de vie." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Nantes | Expert Ardoise & Climat Oceanique | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Nantes. Specialiste ardoise d'Anjou, detection mousse, analyse resistance au vent. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture a Nantes par Intelligence Artificielle",
      introText: "Obtenez un diagnostic complet de votre toiture nantaise en 30 secondes. Notre IA est experte des toitures en ardoise typiques de la region : detection de la mousse, verification des fixations face au vent, reperage des infiltrations.",
      climateText: "Nantes connait un climat oceanique avec 819mm de pluie repartis sur 118 jours, favorisant le developpement de la mousse. Les vents d'ouest frequents testent la solidite des fixations. L'humidite constante accelere le vieillissement des materiaux.",
      roofTypesText: "L'ardoise domine le paysage nantais (55%), heritage de la proximite des carrieres d'Anjou. Le zinc equipe les immeubles du XIXe siecle (25%). Les tuiles et materiaux modernes completent le parc de toitures.",
      problemsText: "La mousse et le lichen sont les ennemis numero un des toitures nantaises, favorises par l'humidite constante. Les vents d'ouest soulevent les ardoises mal fixees. Les infiltrations surviennent souvent au niveau des fixations vieillissantes.",
      ctaText: "Analysez votre toiture nantaise maintenant"
    }
  },

  "bordeaux": {
    slug: "bordeaux",
    name: "Bordeaux",
    department: "Gironde",
    departmentCode: "33",
    region: "Nouvelle-Aquitaine",
    regionSlug: "nouvelle-aquitaine",
    population: 260958,
    climate: {
      annualRainfall: 944,
      rainyDays: 124,
      frostDays: 14,
      snowDays: 2,
      windExposure: "fort",
      sunHours: 2035,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Tuiles canal", percentage: 45, description: "Tuiles romanes terre cuite" },
      { type: "Tuiles mecaniques", percentage: 30, description: "Tuiles a emboitement" },
      { type: "Ardoise", percentage: 15, description: "Ardoise sur patrimoine XVIIIe" },
      { type: "Zinc", percentage: 10, description: "Zinc sur immeubles bourgeois" }
    ],
    commonProblems: [
      { problem: "Mousse abondante", frequency: "frequent", description: "Colonisation vegetale importante", cause: "Climat humide et doux" },
      { problem: "Tempetes atlantiques", frequency: "frequent", description: "Degats lors des tempetes hivernales", cause: "Exposition aux depressions atlantiques" },
      { problem: "Gouttieres saturees", frequency: "modere", description: "Debordement lors des fortes pluies", cause: "124 jours de pluie par an" },
      { problem: "Vieillissement tuiles", frequency: "modere", description: "Porosite et gelivures", cause: "Humidite permanente" }
    ],
    pricing: {
      inspectionAverage: 175,
      repairSmall: [400, 1150],
      repairMedium: [1350, 3700],
      renovation: [10500, 31000]
    },
    architecture: [
      { style: "Bordelais XVIIIe", period: "1700-1800", characteristics: ["Pierre blonde", "Toiture ardoise", "Mascarons", "Lucarnes oeil-de-boeuf"] },
      { style: "Echoppe", period: "XIXe siecle", characteristics: ["Plain-pied", "Toiture tuiles", "Petite cour", "Facade etroite"] },
      { style: "Chartrons", period: "XVIIIe-XIXe", characteristics: ["Immeubles de negociants", "Zinc", "Balcons fer forge"] }
    ],
    localInfo: {
      zipCodes: ["33000", "33100", "33200", "33300", "33800"],
      neighborhoods: ["Saint-Pierre", "Chartrons", "Saint-Michel", "Bastide", "Caudéran", "Meriadeck", "Nansouty"],
      nearbyCommunes: ["Merignac", "Pessac", "Talence", "Begles", "Le Bouscat", "Villenave-d'Ornon"]
    },
    faq: [
      { question: "Bordeaux est-il expose aux tempetes ?", answer: "Oui, Bordeaux subit regulierement les tempetes atlantiques (Klaus 2009, Martin 1999). Les vents peuvent depasser 150 km/h. Les toitures doivent etre concues pour resister a des vents de 130 km/h minimum (zone 3)." },
      { question: "Comment traiter la mousse sur une toiture bordelaise ?", answer: "Le climat doux et humide favorise la mousse. Appliquez un traitement anti-mousse biodegradable au printemps ou a l'automne. Evitez le karcher qui abime les tuiles. Un demoussage tous les 3-5 ans est recommande." },
      { question: "Quelles tuiles pour une echoppe bordelaise ?", answer: "Les echoppes traditionnelles utilisent des tuiles canal en terre cuite. Pour les renovations, les tuiles mecaniques romanes offrent un bon compromis esthetique/performance. Dans les secteurs proteges, les tuiles traditionnelles sont obligatoires." },
      { question: "Faut-il renforcer les gouttieres a Bordeaux ?", answer: "Oui, avec 944mm de pluie annuelle (record des grandes villes), les gouttieres doivent etre surdimensionnees. Prevoyez des descentes de 100mm minimum et un nettoyage bisannuel. Les gardes-feuilles evitent les bouchons." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Bordeaux | Expert Tempetes & Humidite | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Bordeaux. Detection mousse, analyse resistance tempetes, tuiles et ardoises. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture a Bordeaux par Intelligence Artificielle",
      introText: "Analysez votre toiture bordelaise en 30 secondes avec notre IA. Specialiste des toitures exposees au climat oceanique : detection de la mousse, evaluation de la resistance aux tempetes atlantiques, analyse des tuiles et ardoises.",
      climateText: "Bordeaux connait un climat oceanique avec 944mm de precipitations annuelles, le plus eleve des grandes villes francaises. Les tempetes hivernales peuvent generer des vents superieurs a 150 km/h. L'humidite favorise le developpement de la mousse.",
      roofTypesText: "Les toitures bordelaises associent tuiles canal (45%) sur les echoppes et maisons, ardoise (15%) sur le patrimoine XVIIIe classe UNESCO, et zinc (10%) sur les immeubles des Chartrons. Les tuiles mecaniques equipent les constructions recentes.",
      problemsText: "La mousse envahit rapidement les toitures bordelaises en raison de l'humidite constante. Les tempetes atlantiques causent regulierement des degats (tuiles arrachees, ardoises cassees). Les gouttieres debordent lors des pluies intenses.",
      ctaText: "Protegez votre toiture des intemperies"
    }
  },

  "lille": {
    slug: "lille",
    name: "Lille",
    department: "Nord",
    departmentCode: "59",
    region: "Hauts-de-France",
    regionSlug: "hauts-de-france",
    population: 236234,
    climate: {
      annualRainfall: 721,
      rainyDays: 128,
      frostDays: 42,
      snowDays: 14,
      windExposure: "fort",
      sunHours: 1617,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Tuiles plates", percentage: 40, description: "Tuiles du Nord en terre cuite" },
      { type: "Ardoise", percentage: 30, description: "Ardoise sur maisons bourgeoises" },
      { type: "Zinc", percentage: 20, description: "Zinc sur immeubles XIXe-XXe" },
      { type: "Panneaux", percentage: 10, description: "Bac acier sur batiments industriels" }
    ],
    commonProblems: [
      { problem: "Gel et degel", frequency: "frequent", description: "Fissures par cycle gel/degel", cause: "42 jours de gel par an" },
      { problem: "Mousse et humidite", frequency: "frequent", description: "Vegetation et infiltrations", cause: "Climat humide, peu d'ensoleillement" },
      { problem: "Neige accumulee", frequency: "modere", description: "Surcharge et infiltrations", cause: "14 jours de neige par an" },
      { problem: "Pollution", frequency: "modere", description: "Noircissement et degradation", cause: "Heritage industriel" }
    ],
    pricing: {
      inspectionAverage: 170,
      repairSmall: [400, 1100],
      repairMedium: [1300, 3600],
      renovation: [10000, 30000]
    },
    architecture: [
      { style: "Flamand", period: "XVIIe-XVIIIe", characteristics: ["Pignons a redents", "Toiture ardoise", "Briques colorees"] },
      { style: "Mineur", period: "XIXe-XXe", characteristics: ["Maisons en bande", "Tuiles mecaniques", "Simplicite"] },
      { style: "Art Deco lillois", period: "1920-1940", characteristics: ["Motifs geometriques", "Toitures complexes", "Tuiles vernissees"] }
    ],
    localInfo: {
      zipCodes: ["59000", "59160", "59260", "59777", "59800"],
      neighborhoods: ["Vieux-Lille", "Centre", "Wazemmes", "Vauban", "Saint-Maurice", "Fives", "Moulins"],
      nearbyCommunes: ["Roubaix", "Tourcoing", "Villeneuve-d'Ascq", "Marcq-en-Baroeul", "Lambersart", "La Madeleine"]
    },
    faq: [
      { question: "Comment proteger ma toiture du gel a Lille ?", answer: "Avec 42 jours de gel par an, choisissez des materiaux resistants au gel (tuiles haute densite, ardoise naturelle). Assurez une bonne ventilation des combles pour eviter la condensation. Verifiez l'etancheite avant l'hiver." },
      { question: "Faut-il deneiger sa toiture a Lille ?", answer: "Avec 14 jours de neige par an, le deneigement est parfois necessaire. Au-dela de 30cm d'accumulation, verifiez la charge supportable (100-150 kg/m2 selon charpente). Utilisez une raclette souple, jamais de sel qui corrode." },
      { question: "Les toitures lilloises resistent-elles a la pollution ?", answer: "L'heritage industriel a laisse des traces. La pollution noircit les toitures et accelere leur degradation. Un nettoyage regulier et des traitements hydrofuges protegent les materiaux. Privilegiez les materiaux non poreux." },
      { question: "Quelles sont les particularites des toitures flamandes ?", answer: "L'architecture flamande du Vieux-Lille presente des pignons a redents (en escalier) couverts d'ardoise. Ces toitures complexes necessitent un entretien expert. Les reglements imposent la conservation de ce patrimoine." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Lille | Expert Gel & Climat Nordique | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Lille. Analyse resistance gel/neige, detection mousse, tuiles et ardoises du Nord. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture a Lille par Intelligence Artificielle",
      introText: "Obtenez un diagnostic complet de votre toiture lilloise en 30 secondes. Notre IA est specialisee dans les toitures du Nord exposees au gel, a la neige et a l'humidite : detection des fissures, evaluation de l'etat des tuiles et ardoises.",
      climateText: "Lille connait un climat oceanique frais avec 42 jours de gel et 14 jours de neige par an. Les precipitations (721mm) sont reparties sur 128 jours. Le faible ensoleillement (1617h) favorise l'humidite et la mousse.",
      roofTypesText: "Les toitures lilloises melent tuiles plates du Nord (40%), ardoise sur les maisons bourgeoises et le Vieux-Lille flamand (30%), et zinc sur les immeubles (20%). L'architecture flamande presente des pignons a redents caracteristiques.",
      problemsText: "Le gel/degel cause des fissures dans les materiaux poreux. L'humidite permanente et le manque de soleil favorisent la mousse. La neige peut s'accumuler dangereusement. La pollution residuelle de l'ere industrielle noircit les toitures.",
      ctaText: "Analysez votre toiture face au climat du Nord"
    }
  },

  "strasbourg": {
    slug: "strasbourg",
    name: "Strasbourg",
    department: "Bas-Rhin",
    departmentCode: "67",
    region: "Grand Est",
    regionSlug: "grand-est",
    population: 290576,
    climate: {
      annualRainfall: 665,
      rainyDays: 109,
      frostDays: 58,
      snowDays: 18,
      windExposure: "faible",
      sunHours: 1693,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Tuiles plates alsaciennes", percentage: 45, description: "Tuiles plates a queue de castor" },
      { type: "Tuiles mecaniques", percentage: 30, description: "Tuiles a emboitement modernes" },
      { type: "Ardoise", percentage: 15, description: "Ardoise sur batiments officiels" },
      { type: "Zinc/cuivre", percentage: 10, description: "Metal sur patrimoine historique" }
    ],
    commonProblems: [
      { problem: "Gel severe", frequency: "frequent", description: "Eclatement et fissures", cause: "58 jours de gel, hivers rigoureux" },
      { problem: "Neige abondante", frequency: "frequent", description: "Surcharge et infiltrations", cause: "18 jours de neige par an" },
      { problem: "Humidite des combles", frequency: "modere", description: "Condensation et moisissures", cause: "Amplitude thermique importante" },
      { problem: "Vieillissement tuiles", frequency: "modere", description: "Porosite et gelivures", cause: "Cycles gel/degel repetes" }
    ],
    pricing: {
      inspectionAverage: 180,
      repairSmall: [420, 1200],
      repairMedium: [1400, 3900],
      renovation: [11000, 34000]
    },
    architecture: [
      { style: "Alsacien a colombages", period: "XVe-XVIIIe", characteristics: ["Pans de bois", "Toiture forte pente", "Tuiles queue de castor", "Lucarnes"] },
      { style: "Allemand imperial", period: "1871-1918", characteristics: ["Monumentalite", "Ardoise", "Tourelles", "Decors elabores"] },
      { style: "Contemporain europeen", period: "XXe-XXIe", characteristics: ["Quartier europeen", "Toits plats et vegetalises", "Architecture durable"] }
    ],
    localInfo: {
      zipCodes: ["67000", "67100", "67200"],
      neighborhoods: ["Grande Ile", "Petite France", "Krutenau", "Orangerie", "Neudorf", "Koenigshoffen", "Robertsau"],
      nearbyCommunes: ["Schiltigheim", "Illkirch-Graffenstaden", "Lingolsheim", "Bischheim", "Hoenheim", "Ostwald"]
    },
    faq: [
      { question: "Les hivers strasbourgeois sont-ils durs pour les toitures ?", answer: "Oui, Strasbourg connait des hivers rigoureux avec 58 jours de gel et 18 jours de neige. Les materiaux doivent resister aux cycles gel/degel repetes. Les tuiles alsaciennes traditionnelles sont concues pour ce climat." },
      { question: "Qu'est-ce qu'une tuile queue de castor ?", answer: "La tuile queue de castor (Biberschwanz) est une tuile plate arrondie typique d'Alsace. Son nom vient de sa forme evoquant une queue de castor. Elle est posee en ecaille et resiste bien au gel grace a sa forte epaisseur." },
      { question: "Faut-il isoler sa toiture a Strasbourg ?", answer: "Absolument. Avec des hivers froids et des etes chauds, l'isolation de toiture est essentielle a Strasbourg. Elle evite aussi la condensation dans les combles. La reglementation thermique impose R>6 pour les combles." },
      { question: "Les toitures a colombages necessitent-elles un entretien special ?", answer: "Oui, les maisons a colombages ont des toitures complexes avec de nombreuses pénétrations. Les jonctions bois/toiture sont sensibles aux infiltrations. Un controle annuel et le traitement du bois sont recommandes." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Strasbourg | Expert Gel & Tuiles Alsaciennes | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Strasbourg. Specialiste tuiles queue de castor, resistance gel/neige, maisons a colombages. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Strasbourg par Intelligence Artificielle",
      introText: "Analysez votre toiture strasbourgeoise en 30 secondes avec notre IA. Specialiste des toitures alsaciennes exposees aux hivers rigoureux : tuiles queue de castor, maisons a colombages, resistance au gel et a la neige.",
      climateText: "Strasbourg connait un climat semi-continental avec des hivers froids (58 jours de gel, 18 jours de neige) et des etes chauds. Cette amplitude thermique met les materiaux a rude epreuve. Les precipitations (665mm) sont bien reparties.",
      roofTypesText: "Les toitures strasbourgeoises sont caracterisees par les tuiles plates alsaciennes dites 'queue de castor' (45%), posees en ecaille sur les maisons traditionnelles a colombages. Les tuiles mecaniques et l'ardoise completent le paysage.",
      problemsText: "Le gel severe (58 jours/an) cause l'eclatement des materiaux poreux. La neige peut s'accumuler dangereusement sur les fortes pentes. L'amplitude thermique genere de la condensation dans les combles mal ventiles.",
      ctaText: "Protegez votre toiture alsacienne"
    }
  },

  "montpellier": {
    slug: "montpellier",
    name: "Montpellier",
    department: "Herault",
    departmentCode: "34",
    region: "Occitanie",
    regionSlug: "occitanie",
    population: 299096,
    climate: {
      annualRainfall: 629,
      rainyDays: 56,
      frostDays: 7,
      snowDays: 1,
      windExposure: "fort",
      sunHours: 2668,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Tuiles canal", percentage: 55, description: "Tuiles romanes mediterraneennes" },
      { type: "Tuiles romanes", percentage: 30, description: "Tuiles a emboitement terre cuite" },
      { type: "Toiture-terrasse", percentage: 12, description: "Toits plats modernes" },
      { type: "Autres", percentage: 3, description: "Ardoise, zinc" }
    ],
    commonProblems: [
      { problem: "Episodes cevenols", frequency: "frequent", description: "Pluies diluviennes et infiltrations", cause: "Precipitations intenses (100mm en quelques heures)" },
      { problem: "Vent tramontane", frequency: "frequent", description: "Tuiles soulevees ou cassees", cause: "Vent violent du Nord-Ouest" },
      { problem: "Degradation UV", frequency: "modere", description: "Vieillissement accelere", cause: "Ensoleillement intense (2668h/an)" },
      { problem: "Secheresse mortier", frequency: "modere", description: "Fissuration des joints", cause: "Climat sec et variations thermiques" }
    ],
    pricing: {
      inspectionAverage: 165,
      repairSmall: [380, 1050],
      repairMedium: [1300, 3600],
      renovation: [10000, 30000]
    },
    architecture: [
      { style: "Languedocien", period: "XVIIe-XIXe", characteristics: ["Genoise", "Tuiles canal", "Faible pente", "Couleurs chaudes"] },
      { style: "Hotel particulier", period: "XVIIIe siecle", characteristics: ["Pierre calcaire", "Toiture tuiles patinees", "Cours interieures"] },
      { style: "Antigone/Port Marianne", period: "XXe-XXIe", characteristics: ["Neo-classique", "Terrasses", "Architecture Ricardo Bofill"] }
    ],
    localInfo: {
      zipCodes: ["34000", "34070", "34080", "34090"],
      neighborhoods: ["Ecusson", "Antigone", "Port Marianne", "Comedie", "Beaux-Arts", "Aiguelongue", "Hopitaux-Facultes"],
      nearbyCommunes: ["Castelnau-le-Lez", "Lattes", "Perols", "Mauguio", "Grabels", "Saint-Jean-de-Vedas"]
    },
    faq: [
      { question: "Qu'est-ce qu'un episode cevenol ?", answer: "Un episode cevenol est un phenomene meteorologique mediterraneen provoquant des pluies diluviennes (parfois 200mm en 24h). Montpellier est regulierement touchee entre septembre et novembre. Les toitures doivent evacuer rapidement ces volumes d'eau exceptionnels." },
      { question: "La tramontane endommage-t-elle les toitures a Montpellier ?", answer: "Oui, la tramontane (vent du Nord-Ouest) peut souffler a plus de 100 km/h. Elle souleve les tuiles mal fixees et assèche les joints de mortier. Les fixations renforcees sont recommandees dans la region." },
      { question: "Quelle pente de toit pour Montpellier ?", answer: "En region montpellieraine, une pente de 25 a 33% est traditionnelle pour les tuiles canal. Cette faible pente limite la prise au vent. Les toitures-terrasses sont egalement adaptees au climat sec (attention aux episodes cevenols)." },
      { question: "Comment preparer sa toiture aux episodes cevenols ?", answer: "Verifiez l'etat des gouttieres et descentes (dimensionnement genereux), nettoyez regulierement les debris, assurez-vous que l'etancheite est parfaite. Notre diagnostic IA detecte les points faibles avant les intemperies." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Montpellier | Expert Cevenol & Tramontane | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Montpellier. Analyse resistance episodes cevenols, tramontane, tuiles canal mediterraneennes. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Montpellier par Intelligence Artificielle",
      introText: "Obtenez un diagnostic complet de votre toiture montpellieraine en 30 secondes. Notre IA analyse les specificites mediterraneennes : resistance aux episodes cevenols, tenue face a la tramontane, etat des tuiles canal.",
      climateText: "Montpellier jouit d'un climat mediterraneen avec 2668 heures de soleil par an. Mais attention aux episodes cevenols (pluies diluviennes en automne) et a la tramontane (vent violent). Les pluies rares sont souvent torrentielles.",
      roofTypesText: "Les toitures montpellieraines sont couvertes a 85% de tuiles terre cuite : tuiles canal traditionnelles (55%) et tuiles romanes (30%). La genoise (corniche en tuiles) est typique de l'architecture languedocienne. Les terrasses se developpent.",
      problemsText: "Les episodes cevenols sont le risque majeur : des pluies de 100mm en quelques heures peuvent saturer les evacuations. La tramontane souleve les tuiles. L'ensoleillement intense accelere le vieillissement des materiaux.",
      ctaText: "Preparez votre toiture aux intemperies mediterraneennes"
    }
  },

  "rennes": {
    slug: "rennes",
    name: "Rennes",
    department: "Ille-et-Vilaine",
    departmentCode: "35",
    region: "Bretagne",
    regionSlug: "bretagne",
    population: 222485,
    climate: {
      annualRainfall: 694,
      rainyDays: 115,
      frostDays: 22,
      snowDays: 5,
      windExposure: "modere",
      sunHours: 1771,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Ardoise", percentage: 60, description: "Ardoise naturelle bretonne" },
      { type: "Zinc", percentage: 20, description: "Zinc sur immeubles XIXe-XXe" },
      { type: "Tuiles", percentage: 15, description: "Tuiles mecaniques" },
      { type: "Autres", percentage: 5, description: "Bac acier, terrasse" }
    ],
    commonProblems: [
      { problem: "Mousse et lichen", frequency: "frequent", description: "Colonisation vegetale intense", cause: "Climat humide breton (115 jours de pluie)" },
      { problem: "Ardoises glissantes", frequency: "frequent", description: "Decrochage des crochets", cause: "Humidite et dilatation" },
      { problem: "Infiltrations", frequency: "modere", description: "Penetration d'eau", cause: "Pluies frequentes et vent" },
      { problem: "Tempetes", frequency: "modere", description: "Degats lors des depressions", cause: "Exposition atlantique" }
    ],
    pricing: {
      inspectionAverage: 170,
      repairSmall: [400, 1100],
      repairMedium: [1350, 3700],
      renovation: [10500, 32000]
    },
    architecture: [
      { style: "Breton traditionnel", period: "XVIe-XVIIIe", characteristics: ["Granite", "Ardoise", "Pignons", "Lucarnes a fronton"] },
      { style: "A pans de bois", period: "XVe-XVIIe", characteristics: ["Colombages", "Encorbellements", "Toiture ardoise"] },
      { style: "Rennais XIXe", period: "1800-1900", characteristics: ["Pierre et ardoise", "Immeubles de rapport", "Zinc"] }
    ],
    localInfo: {
      zipCodes: ["35000", "35200", "35700"],
      neighborhoods: ["Centre historique", "Thabor", "Villejean", "Beauregard", "Sud-Gare", "Cleunay", "Sainte-Therese"],
      nearbyCommunes: ["Cesson-Sevigne", "Saint-Gregoire", "Bruz", "Chantepie", "Pace", "Betton"]
    },
    faq: [
      { question: "Pourquoi tant de mousse sur les toitures rennaises ?", answer: "Rennes connait 115 jours de pluie par an et un ensoleillement modere (1771h), conditions ideales pour la mousse et le lichen. Un traitement anti-mousse tous les 3-5 ans est indispensable pour preserver l'etancheite et l'esthetique." },
      { question: "L'ardoise est-elle obligatoire a Rennes ?", answer: "Dans le centre historique et les secteurs proteges, l'ardoise naturelle est souvent imposee par le PLU. Elle fait partie du patrimoine breton. Ailleurs, d'autres materiaux sont autorises sous conditions." },
      { question: "Les tempetes sont-elles frequentes a Rennes ?", answer: "Rennes est moins exposee que le littoral breton, mais subit regulierement les depressions atlantiques. Des rafales de 80-100 km/h surviennent plusieurs fois par an. Les ardoises doivent etre solidement fixees." },
      { question: "Quelle est la duree de vie d'une toiture ardoise a Rennes ?", answer: "Une toiture en ardoise naturelle bien entretenue dure 70 a 100 ans en Bretagne. L'ardoise synthetique dure 30-40 ans. L'entretien regulier (demoussage, verification des crochets) est essentiel face au climat humide." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Rennes | Expert Ardoise & Climat Breton | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Rennes. Specialiste ardoise bretonne, detection mousse, analyse resistance humidite. Rapport PDF en 30 secondes.",
      h1: "Diagnostic Toiture a Rennes par Intelligence Artificielle",
      introText: "Analysez votre toiture rennaise en 30 secondes avec notre IA. Specialiste des toitures en ardoise typiques de Bretagne : detection de la mousse et du lichen, verification des fixations, evaluation de l'etancheite.",
      climateText: "Rennes connait un climat oceanique avec des precipitations reparties sur 115 jours (694mm/an). L'humidite constante et l'ensoleillement modere (1771h) favorisent la mousse. Les tempetes atlantiques testent la solidite des toitures.",
      roofTypesText: "L'ardoise domine le paysage rennais (60%), materiau emblematique de la Bretagne. Le centre historique avec ses maisons a pans de bois et ses immeubles en granite arbore des toitures ardoise caracteristiques. Le zinc et les tuiles completent le parc.",
      problemsText: "La mousse et le lichen sont omniprésents sur les toitures rennaises en raison de l'humidite permanente. Les ardoises peuvent se decrocher sous l'effet des variations d'humidite. Les tempetes atlantiques causent regulierement des degats.",
      ctaText: "Protegez votre toiture bretonne de l'humidite"
    }
  },

  "grenoble": {
    slug: "grenoble",
    name: "Grenoble",
    department: "Isere",
    departmentCode: "38",
    region: "Auvergne-Rhone-Alpes",
    regionSlug: "auvergne-rhone-alpes",
    population: 158454,
    climate: {
      annualRainfall: 934,
      rainyDays: 108,
      frostDays: 55,
      snowDays: 17,
      windExposure: "faible",
      sunHours: 2066,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Tuiles plates", percentage: 35, description: "Tuiles plates des Alpes" },
      { type: "Tuiles mecaniques", percentage: 30, description: "Tuiles a emboitement" },
      { type: "Ardoise", percentage: 20, description: "Ardoise sur batiments anciens" },
      { type: "Lauzes/Zinc", percentage: 15, description: "Pierres plates ou zinc moderne" }
    ],
    commonProblems: [
      { problem: "Neige abondante", frequency: "frequent", description: "Accumulation et surcharge", cause: "17 jours de neige, proximite montagnes" },
      { problem: "Gel intense", frequency: "frequent", description: "Eclatement des materiaux", cause: "55 jours de gel par an" },
      { problem: "Grele orages", frequency: "modere", description: "Impacts sur toiture", cause: "Orages de montagne violents" },
      { problem: "Condensation", frequency: "modere", description: "Humidite dans les combles", cause: "Amplitude thermique jour/nuit" }
    ],
    pricing: {
      inspectionAverage: 185,
      repairSmall: [450, 1200],
      repairMedium: [1500, 4000],
      renovation: [12000, 36000]
    },
    architecture: [
      { style: "Dauphinois", period: "XVIIe-XIXe", characteristics: ["Toits a forte pente", "Tuiles plates", "Pierre locale"] },
      { style: "Alpin", period: "Traditionnel", characteristics: ["Lauzes", "Large debord", "Resistance neige"] },
      { style: "Moderne montagne", period: "XXe-XXIe", characteristics: ["Toits plats vegetalises", "Bois et metal", "Panneaux solaires"] }
    ],
    localInfo: {
      zipCodes: ["38000", "38100"],
      neighborhoods: ["Centre-ville", "Ile Verte", "Europole", "Championnet", "Eaux Claires", "Villeneuve", "Bastille"],
      nearbyCommunes: ["Saint-Martin-d'Heres", "Echirolles", "Fontaine", "La Tronche", "Meylan", "Seyssinet-Pariset"]
    },
    faq: [
      { question: "Les toitures grenoloises supportent-elles la neige ?", answer: "Les toitures alpines sont concues pour supporter 100-150 kg/m2 de neige. A Grenoble (altitude 212m), les chutes sont moderees mais les toits a forte pente evacuent bien la neige. Verifiez la resistance de votre charpente." },
      { question: "Le gel est-il problematique pour les toitures a Grenoble ?", answer: "Avec 55 jours de gel par an, Grenoble connait des hivers rigoureux. Les materiaux doivent resister aux cycles gel/degel. Privilegiez les tuiles haute densite et les ardoises epaisses. Evitez les materiaux poreux." },
      { question: "Les orages de montagne endommagent-ils les toitures ?", answer: "Les orages grenoblois peuvent etre violents avec des grelons importants. La cuvetage entre les massifs concentre les phenomenes. Des tuiles renforcees et une verification post-orage sont recommandees." },
      { question: "Quelle pente de toit pour la region grenobloise ?", answer: "En zone de neige, une pente minimale de 35-45% est recommandée pour evacuer naturellement la neige. Les toits plats necessitent un calcul de charge et un deneigement eventuel." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Grenoble | Expert Neige & Climat Alpin | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Grenoble. Analyse resistance neige et gel, tuiles alpines, ardoises. Specialiste montagne. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Grenoble par Intelligence Artificielle",
      introText: "Obtenez un diagnostic complet de votre toiture grenobloise en 30 secondes. Notre IA est specialisee dans les contraintes alpines : resistance a la neige, au gel intense, aux orages de montagne. Analyse des tuiles, ardoises et lauzes.",
      climateText: "Grenoble connait un climat semi-continental de montagne avec 55 jours de gel et 17 jours de neige par an. Les precipitations sont abondantes (934mm) avec des orages violents en ete. L'amplitude thermique jour/nuit est importante.",
      roofTypesText: "Les toitures grenoloises combinent tuiles plates alpines (35%), tuiles mecaniques (30%), ardoise (20%) et materiaux traditionnels comme les lauzes. Les fortes pentes (35-45%) permettent l'evacuation naturelle de la neige.",
      problemsText: "La neige peut s'accumuler dangereusement sur les toitures mal dimensionnees. Le gel intense (55 jours/an) cause l'eclatement des materiaux poreux. Les orages de montagne generent parfois des grelons destructeurs.",
      ctaText: "Verifiez la resistance de votre toiture aux conditions alpines"
    }
  },

  "dijon": {
    slug: "dijon",
    name: "Dijon",
    department: "Cote-d'Or",
    departmentCode: "21",
    region: "Bourgogne-Franche-Comte",
    regionSlug: "bourgogne-franche-comte",
    population: 159346,
    climate: {
      annualRainfall: 760,
      rainyDays: 114,
      frostDays: 52,
      snowDays: 15,
      windExposure: "modere",
      sunHours: 1840,
      hailRisk: "eleve"
    },
    roofTypes: [
      { type: "Tuiles vernissees", percentage: 40, description: "Tuiles polychromes bourguignonnes" },
      { type: "Tuiles plates", percentage: 30, description: "Tuiles de Bourgogne" },
      { type: "Ardoise", percentage: 20, description: "Ardoise sur patrimoine" },
      { type: "Zinc", percentage: 10, description: "Zinc sur immeubles XIXe" }
    ],
    commonProblems: [
      { problem: "Grele vignoble", frequency: "frequent", description: "Impacts severes sur tuiles", cause: "Couloir de grele bourguignon" },
      { problem: "Gel hivernal", frequency: "frequent", description: "Fissures et eclatement", cause: "52 jours de gel" },
      { problem: "Mousse", frequency: "modere", description: "Developpement vegetal", cause: "Precipitations regulieres" },
      { problem: "Vieillissement vernis", frequency: "modere", description: "Perte d'eclat des tuiles", cause: "UV et intemperies" }
    ],
    pricing: {
      inspectionAverage: 175,
      repairSmall: [420, 1150],
      repairMedium: [1400, 3800],
      renovation: [11000, 33000]
    },
    architecture: [
      { style: "Bourguignon", period: "XVe-XVIIIe", characteristics: ["Tuiles vernissees polychromes", "Motifs geometriques", "Hotel particulier"] },
      { style: "Hospices", period: "XVe siecle", characteristics: ["Toits polychromes iconiques", "Motifs losanges", "Patrimoine UNESCO"] },
      { style: "Vigneron", period: "XIXe siecle", characteristics: ["Maison de maitre", "Tuiles plates", "Cave voutee"] }
    ],
    localInfo: {
      zipCodes: ["21000", "21100"],
      neighborhoods: ["Centre historique", "Toison d'Or", "Montchapet", "Fontaine d'Ouche", "Gresilles", "Bourroches"],
      nearbyCommunes: ["Chenove", "Talant", "Fontaine-les-Dijon", "Quetigny", "Longvic", "Saint-Apollinaire"]
    },
    faq: [
      { question: "Pourquoi les toits de Dijon sont-ils multicolores ?", answer: "Les tuiles vernissees polychromes sont une tradition bourguignonne depuis le Moyen-Age. Les Hospices de Beaune en sont l'exemple le plus celebre. Ces motifs geometriques (losanges, chevrons) ornent les monuments et maisons bourgeoises." },
      { question: "La grele est-elle frequente a Dijon ?", answer: "Oui, le vignoble bourguignon est situe dans un couloir de grele. Dijon subit regulierement des orages de grele entre mai et aout. Les tuiles vernissees resistent mieux que les tuiles ordinaires grace a leur surface lisse." },
      { question: "Les tuiles vernissees sont-elles plus cheres ?", answer: "Oui, les tuiles vernissees bourguignonnes coutent 2 a 3 fois plus cher que les tuiles classiques (80-150 EUR/m2 contre 30-50 EUR/m2). Mais leur duree de vie est superieure (100+ ans) et elles sont parfois obligatoires dans les secteurs proteges." },
      { question: "Comment entretenir une toiture vernissee ?", answer: "Les tuiles vernissees necessitent peu d'entretien : leur surface lisse empeche la mousse de s'accrocher. Un simple rinçage a l'eau tous les 5 ans suffit. Evitez les traitements chimiques qui pourraient ternir le vernis." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Dijon | Expert Tuiles Vernissees & Grele | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Dijon. Specialiste tuiles vernissees bourguignonnes, detection degats grele, analyse patrimoine. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Dijon par Intelligence Artificielle",
      introText: "Analysez votre toiture dijonnaise en 30 secondes avec notre IA. Specialiste des toitures bourguignonnes : tuiles vernissees polychromes, resistance a la grele du vignoble, evaluation du patrimoine architectural unique.",
      climateText: "Dijon connait un climat semi-continental avec des hivers froids (52 jours de gel, 15 jours de neige) et des orages de grele frequents en ete. Le vignoble voisin est situe dans un couloir de grele qui touche aussi l'agglomeration.",
      roofTypesText: "Dijon est celebre pour ses tuiles vernissees polychromes (40%), heritage du XVe siecle visible sur les Hospices de Beaune et les hotels particuliers. Les tuiles plates de Bourgogne (30%) et l'ardoise (20%) completent ce patrimoine unique.",
      problemsText: "La grele est le risque majeur pour les toitures dijonnaises, pouvant fissurer meme les tuiles vernissees. Le gel hivernal (52 jours) fragilise les materiaux poreux. La mousse se developpe sur les versants nord.",
      ctaText: "Preservez votre toiture bourguignonne"
    }
  },

  "angers": {
    slug: "angers",
    name: "Angers",
    department: "Maine-et-Loire",
    departmentCode: "49",
    region: "Pays de la Loire",
    regionSlug: "pays-de-la-loire",
    population: 157175,
    climate: {
      annualRainfall: 664,
      rainyDays: 113,
      frostDays: 22,
      snowDays: 4,
      windExposure: "modere",
      sunHours: 1807,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Ardoise", percentage: 70, description: "Ardoise d'Anjou (Trelaze)" },
      { type: "Zinc", percentage: 15, description: "Zinc sur immeubles" },
      { type: "Tuiles", percentage: 10, description: "Tuiles mecaniques" },
      { type: "Autres", percentage: 5, description: "Bac acier, terrasse" }
    ],
    commonProblems: [
      { problem: "Mousse intense", frequency: "frequent", description: "Colonisation rapide des ardoises", cause: "Humidite et climat doux" },
      { problem: "Ardoises vieillissantes", frequency: "modere", description: "Delamination et porosite", cause: "Age du parc (nombreuses toitures anciennes)" },
      { problem: "Crochets corrodes", frequency: "modere", description: "Fixations oxydees", cause: "Humidite constante" },
      { problem: "Infiltrations", frequency: "modere", description: "Penetration d'eau aux jonctions", cause: "Pluies frequentes" }
    ],
    pricing: {
      inspectionAverage: 165,
      repairSmall: [380, 1050],
      repairMedium: [1300, 3500],
      renovation: [10000, 30000]
    },
    architecture: [
      { style: "Angevin", period: "XVe-XVIIIe", characteristics: ["Tuffeau blanc", "Ardoise bleue", "Lucarnes", "Pignons"] },
      { style: "Maison de maitre", period: "XIXe siecle", characteristics: ["Ardoise d'Anjou", "Zinc", "Symétrie"] },
      { style: "Contemporain", period: "XXe-XXIe", characteristics: ["Ardoise moderne", "Toits plats", "Mixite materiaux"] }
    ],
    localInfo: {
      zipCodes: ["49000", "49100"],
      neighborhoods: ["Centre-ville", "La Doutre", "Saint-Serge", "Monplaisir", "Belle-Beille", "Lac de Maine"],
      nearbyCommunes: ["Trelaze", "Avrille", "Beaucouze", "Bouchemaine", "Saint-Barthelemy-d'Anjou", "Les Ponts-de-Ce"]
    },
    faq: [
      { question: "Pourquoi l'ardoise est-elle si presente a Angers ?", answer: "Angers est la capitale mondiale de l'ardoise ! Les carrieres de Trelaze (banlieue d'Angers) produisent la meilleure ardoise depuis le XVe siecle. 70% des toitures angevines sont en ardoise, materiau local par excellence." },
      { question: "Quelle est la duree de vie de l'ardoise d'Anjou ?", answer: "L'ardoise de Trelaze est reputee pour sa longevite exceptionnelle : 80 a 120 ans pour les qualites superieures. Elle depasse largement les ardoises espagnoles (40-60 ans) ou synthetiques (25-35 ans)." },
      { question: "Comment reconnaitre une ardoise d'Anjou de qualite ?", answer: "L'ardoise d'Anjou se reconnait a sa couleur bleu-noir profond, son epaisseur reguliere (3-4mm) et son absence de pyrite (points rouilles). Tapez dessus : elle doit sonner clair. Demandez le certificat d'origine." },
      { question: "Faut-il traiter la mousse sur les ardoises a Angers ?", answer: "Oui, le climat humide favorise la mousse. Un traitement anti-mousse tous les 3-5 ans preserve l'etancheite et l'esthetique. Attention : jamais de nettoyage haute pression sur l'ardoise, cela l'endommage irreversiblement." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Angers | Expert Ardoise d'Anjou | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Angers. Specialiste ardoise de Trelaze, detection mousse, evaluation patrimoniale. Capitale de l'ardoise. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Angers par Intelligence Artificielle",
      introText: "Analysez votre toiture angevine en 30 secondes avec notre IA. Specialiste de l'ardoise d'Anjou, materiau emblematique de la region. Detection de la mousse, evaluation de l'etat des ardoises, verification des fixations.",
      climateText: "Angers beneficie d'un climat oceanique doux avec 664mm de pluie sur 113 jours. L'humidite constante favorise le developpement de la mousse sur les toitures. Les hivers sont clements (22 jours de gel) preservant les materiaux.",
      roofTypesText: "Angers est la capitale mondiale de l'ardoise, avec 70% des toitures couvertes de ce materiau noble extrait des carrieres de Trelaze. L'association du tuffeau blanc (pierre locale) et de l'ardoise bleue caracterise l'architecture angevine.",
      problemsText: "La mousse est l'ennemi principal des toitures angevines, colonisant rapidement les ardoises. Les crochets de fixation s'oxydent avec l'humidite. Les ardoises anciennes peuvent se delaminer apres plusieurs decennies.",
      ctaText: "Evaluez votre toiture en ardoise d'Anjou"
    }
  },

  "toulon": {
    slug: "toulon",
    name: "Toulon",
    department: "Var",
    departmentCode: "83",
    region: "Provence-Alpes-Cote d'Azur",
    regionSlug: "provence-alpes-cote-azur",
    population: 178745,
    climate: {
      annualRainfall: 665,
      rainyDays: 59,
      frostDays: 2,
      snowDays: 0,
      windExposure: "fort",
      sunHours: 2899,
      hailRisk: "faible"
    },
    roofTypes: [
      { type: "Tuiles canal", percentage: 60, description: "Tuiles romanes provencales" },
      { type: "Tuiles romanes", percentage: 25, description: "Tuiles a emboitement" },
      { type: "Toiture-terrasse", percentage: 12, description: "Toits plats mediterraneens" },
      { type: "Autres", percentage: 3, description: "Ardoise, zinc" }
    ],
    commonProblems: [
      { problem: "Mistral/vent d'est", frequency: "frequent", description: "Tuiles soulevees ou cassees", cause: "Vents violents frequents" },
      { problem: "Sel marin intense", frequency: "frequent", description: "Corrosion acceleree", cause: "Proximite immediate de la mer" },
      { problem: "Degradation UV", frequency: "modere", description: "Vieillissement des materiaux", cause: "Record d'ensoleillement (2899h/an)" },
      { problem: "Secheresse mortier", frequency: "modere", description: "Fissuration des joints", cause: "Climat tres sec" }
    ],
    pricing: {
      inspectionAverage: 170,
      repairSmall: [400, 1100],
      repairMedium: [1400, 3800],
      renovation: [11000, 32000]
    },
    architecture: [
      { style: "Provencal maritime", period: "XVIIe-XIXe", characteristics: ["Genoise", "Tuiles canal vieillies", "Couleurs pastel"] },
      { style: "Arsenal", period: "XVIIIe-XIXe", characteristics: ["Architecture militaire", "Toits en tuiles", "Rigueur geometrique"] },
      { style: "Moderne littoral", period: "XXe-XXIe", characteristics: ["Terrasses", "Integration paysagere", "Blanc et ocre"] }
    ],
    localInfo: {
      zipCodes: ["83000", "83100", "83200"],
      neighborhoods: ["Centre-ville", "Mourillon", "Cap Brun", "Saint-Jean-du-Var", "La Serinette", "La Rode"],
      nearbyCommunes: ["La Seyne-sur-Mer", "Hyeres", "La Garde", "La Valette-du-Var", "Ollioules", "Six-Fours"]
    },
    faq: [
      { question: "Le mistral affecte-t-il les toitures a Toulon ?", answer: "Oui, le mistral et le vent d'est peuvent souffler a plus de 100 km/h dans la rade de Toulon. Les tuiles doivent etre fixees (collees ou clouees). Les toitures face au vent dominant subissent le plus de degats." },
      { question: "Le sel marin est-il pire a Toulon qu'ailleurs ?", answer: "Oui, la rade fermee de Toulon concentre l'air marin sale. A moins de 500m de la mer, les elements metalliques s'oxydent en 5-10 ans contre 15-20 ans ailleurs. Privilegiez l'inox, l'aluminium ou le cuivre." },
      { question: "Toulon est-elle la ville la plus ensoleillee ?", answer: "Oui, avec 2899 heures de soleil par an, Toulon detient le record de France metropolitaine. Cet ensoleillement extreme accelere le vieillissement des materiaux. Les tuiles claires et les protections UV sont recommandees." },
      { question: "Peut-on installer des panneaux solaires a Toulon ?", answer: "Toulon est ideale pour le solaire avec son ensoleillement record. Verifiez cependant la resistance de votre charpente (charge supplementaire de 15-20 kg/m2) et les reglements d'urbanisme dans les secteurs proteges." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Toulon | Expert Mistral & Climat Maritime | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Toulon. Analyse resistance mistral, impact sel marin, degradation UV. Record ensoleillement. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Toulon par Intelligence Artificielle",
      introText: "Obtenez un diagnostic complet de votre toiture toulonnaise en 30 secondes. Notre IA analyse les contraintes specifiques de la rade : mistral violent, air marin corrosif, ensoleillement record de France.",
      climateText: "Toulon detient le record d'ensoleillement de France metropolitaine avec 2899 heures par an. Mais la rade est balayée par le mistral et le vent d'est. L'air marin tres sale corrode rapidement les elements metalliques.",
      roofTypesText: "Les toitures toulonnaises sont couvertes a 85% de tuiles terre cuite : tuiles canal provencales (60%) et tuiles romanes (25%). La genoise orne les facades. Les toitures-terrasses se developpent dans les constructions modernes.",
      problemsText: "Le vent est le risque principal : mistral et vent d'est arrachent les tuiles mal fixees. Le sel marin corrode les gouttieres et fixations en quelques annees. L'ensoleillement extreme vieillit prematurément les materiaux.",
      ctaText: "Protegez votre toiture du mistral et du sel marin"
    }
  },

  "rouen": {
    slug: "rouen",
    name: "Rouen",
    department: "Seine-Maritime",
    departmentCode: "76",
    region: "Normandie",
    regionSlug: "normandie",
    population: 114007,
    climate: {
      annualRainfall: 852,
      rainyDays: 122,
      frostDays: 28,
      snowDays: 7,
      windExposure: "modere",
      sunHours: 1664,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Ardoise", percentage: 50, description: "Ardoise sur patrimoine normand" },
      { type: "Zinc", percentage: 25, description: "Zinc sur immeubles XIXe-XXe" },
      { type: "Tuiles", percentage: 15, description: "Tuiles mecaniques" },
      { type: "Autres", percentage: 10, description: "Bac acier, chaume" }
    ],
    commonProblems: [
      { problem: "Humidite permanente", frequency: "frequent", description: "Infiltrations et mousse", cause: "852mm de pluie sur 122 jours" },
      { problem: "Pollution historique", frequency: "frequent", description: "Noircissement des materiaux", cause: "Heritage industriel et portuaire" },
      { problem: "Pans de bois humides", frequency: "modere", description: "Degradation du bois", cause: "Maisons a colombages et humidite" },
      { problem: "Zinc verdi", frequency: "modere", description: "Patine et corrosion", cause: "Climat humide et pollution" }
    ],
    pricing: {
      inspectionAverage: 175,
      repairSmall: [420, 1150],
      repairMedium: [1400, 3800],
      renovation: [11000, 33000]
    },
    architecture: [
      { style: "Normand a colombages", period: "XVe-XVIIe", characteristics: ["Pans de bois", "Encorbellements", "Ardoise", "Pignons sur rue"] },
      { style: "Gothique", period: "XIIe-XVe", characteristics: ["Fleches en pierre/ardoise", "Lucarnes ouvragees", "Patrimoine religieux"] },
      { style: "Industriel reconverti", period: "XIXe-XXe", characteristics: ["Briques", "Sheds", "Renovation contemporaine"] }
    ],
    localInfo: {
      zipCodes: ["76000", "76100"],
      neighborhoods: ["Centre historique", "Saint-Sever", "Martainville", "Grammont", "Pasteur", "Mont-Saint-Aignan"],
      nearbyCommunes: ["Sotteville-les-Rouen", "Le Petit-Quevilly", "Mont-Saint-Aignan", "Bois-Guillaume", "Darnetal"]
    },
    faq: [
      { question: "Le climat rouennais est-il difficile pour les toitures ?", answer: "Oui, Rouen est l'une des villes les plus arrosees de France avec 852mm sur 122 jours de pluie. L'humidite permanente favorise la mousse, les infiltrations et la degradation des materiaux. Un entretien regulier est essentiel." },
      { question: "Les maisons a colombages ont-elles des toitures specifiques ?", answer: "Oui, les maisons a pans de bois rouennaises ont des toitures en ardoise avec des pentes fortes. Les jonctions bois/toiture sont sensibles aux infiltrations. Le traitement du bois et l'etancheite doivent etre surveilles regulierement." },
      { question: "La pollution affecte-t-elle les toitures a Rouen ?", answer: "L'heritage industriel et portuaire a laisse des traces. La pollution noircit les ardoises et le zinc, et accelere leur degradation. Un nettoyage doux tous les 5-10 ans restaure l'aspect et prolonge la duree de vie." },
      { question: "Peut-on remplacer l'ardoise par un autre materiau a Rouen ?", answer: "Dans le centre historique et les secteurs proteges, l'ardoise naturelle est obligatoire. Ailleurs, d'autres materiaux sont possibles sous conditions. Consultez le PLU de Rouen avant tout projet de renovation." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Rouen | Expert Ardoise & Climat Normand | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Rouen. Specialiste ardoise, colombages, humidite normande. Detection mousse et infiltrations. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Rouen par Intelligence Artificielle",
      introText: "Analysez votre toiture rouennaise en 30 secondes avec notre IA. Specialiste du patrimoine normand : ardoises, maisons a colombages, resistance a l'humidite. Detection precise des problemes lies au climat humide.",
      climateText: "Rouen connait un climat oceanique tres humide avec 852mm de precipitations sur 122 jours. Le faible ensoleillement (1664h) et l'humidite permanente favorisent la mousse et les infiltrations. Les hivers sont doux mais pluvieux.",
      roofTypesText: "Les toitures rouennaises sont dominées par l'ardoise (50%), materiau noble du patrimoine normand. Le centre historique aux maisons a colombages arbore des toitures ardoise caracteristiques. Le zinc (25%) equipe les immeubles XIXe-XXe.",
      problemsText: "L'humidite permanente est l'ennemi numero un des toitures rouennaises. La mousse envahit rapidement les versants, les infiltrations sont frequentes. La pollution noircit les materiaux et accelere leur vieillissement.",
      ctaText: "Protegez votre toiture du climat normand"
    }
  },

  "clermont-ferrand": {
    slug: "clermont-ferrand",
    name: "Clermont-Ferrand",
    department: "Puy-de-Dome",
    departmentCode: "63",
    region: "Auvergne-Rhone-Alpes",
    regionSlug: "auvergne-rhone-alpes",
    population: 147865,
    climate: {
      annualRainfall: 586,
      rainyDays: 101,
      frostDays: 48,
      snowDays: 12,
      windExposure: "modere",
      sunHours: 1913,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Tuiles mecaniques", percentage: 40, description: "Tuiles terre cuite" },
      { type: "Ardoise", percentage: 30, description: "Ardoise sur patrimoine" },
      { type: "Lauzes", percentage: 15, description: "Pierre volcanique locale" },
      { type: "Zinc", percentage: 15, description: "Zinc sur immeubles" }
    ],
    commonProblems: [
      { problem: "Gel d'altitude", frequency: "frequent", description: "Fissures par cycles gel/degel", cause: "48 jours de gel (altitude 400m)" },
      { problem: "Neige", frequency: "modere", description: "Surcharge et infiltrations", cause: "12 jours de neige" },
      { problem: "Orages violents", frequency: "modere", description: "Grele et vent", cause: "Relief montagneux" },
      { problem: "Usure lauzes", frequency: "modere", description: "Degradation de la pierre", cause: "Age et intemperies" }
    ],
    pricing: {
      inspectionAverage: 170,
      repairSmall: [400, 1100],
      repairMedium: [1350, 3700],
      renovation: [10500, 32000]
    },
    architecture: [
      { style: "Auvergnat", period: "XVIIe-XIXe", characteristics: ["Pierre de Volvic noire", "Lauzes", "Austérité elegante"] },
      { style: "Roman auvergnat", period: "XIe-XIIe", characteristics: ["Clochers-peigne", "Lauzes epaisses", "Patrimoine religieux"] },
      { style: "Michelin", period: "XXe siecle", characteristics: ["Cites ouvrieres", "Tuiles mecaniques", "Rationalisme"] }
    ],
    localInfo: {
      zipCodes: ["63000", "63100"],
      neighborhoods: ["Centre historique", "Montferrand", "Les Salins", "Fontgieve", "Chamalieres", "La Pardieu"],
      nearbyCommunes: ["Chamalieres", "Aubiere", "Cournon-d'Auvergne", "Royat", "Beaumont", "Cebazat"]
    },
    faq: [
      { question: "Qu'est-ce qu'une toiture en lauzes ?", answer: "Les lauzes sont des pierres plates volcaniques (phonolite, basalte) utilisees traditionnellement en Auvergne. Tres lourdes (100-200 kg/m2), elles necessitent une charpente renforcee. Leur duree de vie depasse le siecle mais leur cout est eleve." },
      { question: "Le climat de Clermont-Ferrand est-il rude pour les toitures ?", answer: "Oui, l'altitude (400m) et la proximite des volcans creent un microclimat avec 48 jours de gel et des orages violents. Les materiaux doivent resister aux cycles gel/degel et aux variations de temperature importantes." },
      { question: "La pierre de Volvic est-elle utilisee pour les toitures ?", answer: "Non, la pierre de Volvic (lave noire) est utilisee pour les facades et soubassements a Clermont-Ferrand, mais pas pour les toitures. Les lauzes traditionnelles proviennent d'autres carrieres auvergnates (phonolite)." },
      { question: "Peut-on remplacer les lauzes par un autre materiau ?", answer: "Dans les secteurs proteges, le remplacement des lauzes est encadre. L'ardoise epaisse peut parfois etre autorisee comme alternative moins couteuse. Consultez l'Architecte des Batiments de France pour les monuments classes." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Clermont-Ferrand | Expert Lauzes & Climat Auvergnat | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Clermont-Ferrand. Specialiste lauzes, ardoise, resistance gel d'altitude. Patrimoine auvergnat. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Clermont-Ferrand par Intelligence Artificielle",
      introText: "Obtenez un diagnostic complet de votre toiture clermontoise en 30 secondes. Notre IA connait les specificites auvergnates : toitures en lauzes, resistance au gel d'altitude, patrimoine volcanique unique.",
      climateText: "Clermont-Ferrand, a 400m d'altitude au pied des volcans, connait un climat semi-continental avec 48 jours de gel et 12 jours de neige. Les orages de montagne peuvent etre violents. L'amplitude thermique met les materiaux a l'epreuve.",
      roofTypesText: "Les toitures clermontoises combinent tuiles mecaniques (40%), ardoise (30%) et les authentiques lauzes volcaniques (15%). La pierre noire de Volvic sur les facades contraste avec les toitures grises caracteristiques.",
      problemsText: "Le gel d'altitude (48 jours) cause des fissures dans les materiaux poreux. La neige peut s'accumuler sur les pentes faibles. Les lauzes anciennes peuvent se deliter avec le temps. Les orages apportent parfois de la grele.",
      ctaText: "Evaluez votre toiture face au climat auvergnat"
    }
  },

  "le-havre": {
    slug: "le-havre",
    name: "Le Havre",
    department: "Seine-Maritime",
    departmentCode: "76",
    region: "Normandie",
    regionSlug: "normandie",
    population: 172074,
    climate: {
      annualRainfall: 791,
      rainyDays: 120,
      frostDays: 20,
      snowDays: 5,
      windExposure: "tres_fort",
      sunHours: 1759,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Toiture-terrasse", percentage: 40, description: "Toits plats Perret (reconstruction)" },
      { type: "Ardoise", percentage: 25, description: "Ardoise sur patrimoine" },
      { type: "Zinc", percentage: 20, description: "Zinc sur immeubles" },
      { type: "Beton", percentage: 15, description: "Beton banche (reconstruction)" }
    ],
    commonProblems: [
      { problem: "Vents violents", frequency: "frequent", description: "Degats par tempetes", cause: "Exposition maritime frontale" },
      { problem: "Etancheite terrasses", frequency: "frequent", description: "Infiltrations toits plats", cause: "40% de toitures-terrasses (Perret)" },
      { problem: "Sel marin", frequency: "modere", description: "Corrosion des metaux", cause: "Facade maritime" },
      { problem: "Beton vieillissant", frequency: "modere", description: "Fissures et infiltrations", cause: "Heritage reconstruction 1945-1960" }
    ],
    pricing: {
      inspectionAverage: 180,
      repairSmall: [450, 1200],
      repairMedium: [1500, 4000],
      renovation: [12000, 35000]
    },
    architecture: [
      { style: "Perret (UNESCO)", period: "1945-1960", characteristics: ["Beton arme", "Toits-terrasses", "Modules standardises", "Patrimoine mondial"] },
      { style: "Normand ancien", period: "Pre-1944", characteristics: ["Ardoise", "Pans de bois", "Rares rescapes"] },
      { style: "Contemporain portuaire", period: "XXIe siecle", characteristics: ["Formes audacieuses", "Metal", "Integration portuaire"] }
    ],
    localInfo: {
      zipCodes: ["76600", "76610", "76620"],
      neighborhoods: ["Centre reconstruit", "Sainte-Adresse", "Sanvic", "Aplemont", "Caucriauville", "Bléville"],
      nearbyCommunes: ["Sainte-Adresse", "Harfleur", "Montivilliers", "Gonfreville-l'Orcher", "Octeville-sur-Mer"]
    },
    faq: [
      { question: "Pourquoi Le Havre a-t-il autant de toits plats ?", answer: "Le centre-ville du Havre, detruit en 1944, a ete reconstruit par Auguste Perret en beton arme avec des toitures-terrasses. Ce patrimoine unique est classe UNESCO depuis 2005. 40% des toitures havraises sont plates." },
      { question: "Les toitures-terrasses Perret posent-elles des problemes ?", answer: "Apres 60-70 ans, l'etancheite des terrasses Perret necessite souvent une refection. Le beton peut aussi presenter des fissures. Des programmes de renovation sont en cours, encadres par les Architectes des Batiments de France." },
      { question: "Le vent est-il un probleme majeur au Havre ?", answer: "Oui, Le Havre est l'une des villes les plus ventees de France avec une exposition maritime frontale. Les tempetes hivernales peuvent generer des rafales de 150+ km/h. Les toitures doivent etre concues pour resister a des vents extremes." },
      { question: "Comment entretenir une toiture-terrasse au Havre ?", answer: "Inspectez l'etancheité bi-annuellement, eliminez les debris et vegetaux, verifiez les evacuation d'eau. Dans le patrimoine Perret, les travaux sont soumis a autorisation. Privilegiez des membranes resistantes aux UV et au sel marin." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Le Havre | Expert Perret & Climat Maritime | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA au Havre. Specialiste toitures-terrasses Perret (UNESCO), resistance vent maritime, etancheite. Rapport PDF instantane.",
      h1: "Diagnostic Toiture au Havre par Intelligence Artificielle",
      introText: "Analysez votre toiture havraise en 30 secondes avec notre IA. Specialiste des toitures-terrasses du patrimoine Perret (UNESCO) et des toitures exposees aux vents maritimes extremes. Detection des infiltrations et degradations.",
      climateText: "Le Havre connait un climat oceanique avec une exposition maritime frontale. Les vents sont parmi les plus violents de France, depassant parfois 150 km/h en tempete. L'air marin sale corrode les elements metalliques. Les precipitations sont abondantes (791mm).",
      roofTypesText: "Le Havre presente un paysage unique avec 40% de toitures-terrasses, heritage de la reconstruction Perret (1945-1960) classee UNESCO. L'ardoise et le zinc couvrent les quartiers epargnes ou reconstruits differemment. Le beton banche est omnipresent.",
      problemsText: "L'etancheité des terrasses Perret (60-70 ans) est souvent a refaire. Le beton peut presenter des fissures par carbonatation. Le vent extreme arrache les elements mal fixes. Le sel marin corrode rapidement les metaux.",
      ctaText: "Verifiez votre toiture face aux vents maritimes"
    }
  },

  "reims": {
    slug: "reims",
    name: "Reims",
    department: "Marne",
    departmentCode: "51",
    region: "Grand Est",
    regionSlug: "grand-est",
    population: 187181,
    climate: {
      annualRainfall: 620,
      rainyDays: 117,
      frostDays: 45,
      snowDays: 14,
      windExposure: "modere",
      sunHours: 1716,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Ardoise", percentage: 45, description: "Ardoise sur patrimoine champenois" },
      { type: "Tuiles plates", percentage: 30, description: "Tuiles de Champagne" },
      { type: "Zinc", percentage: 15, description: "Zinc sur immeubles" },
      { type: "Autres", percentage: 10, description: "Tuiles mecaniques, terrasse" }
    ],
    commonProblems: [
      { problem: "Gel prolonge", frequency: "frequent", description: "Fissures et eclatement", cause: "45 jours de gel, hivers froids" },
      { problem: "Neige", frequency: "modere", description: "Accumulation et surcharge", cause: "14 jours de neige" },
      { problem: "Humidite champagne", frequency: "modere", description: "Mousse et lichen", cause: "Humidite des vignobles" },
      { problem: "Pollution calcaire", frequency: "modere", description: "Depots blanchatres", cause: "Poussiere de craie" }
    ],
    pricing: {
      inspectionAverage: 175,
      repairSmall: [420, 1150],
      repairMedium: [1400, 3800],
      renovation: [11000, 33000]
    },
    architecture: [
      { style: "Champenois", period: "XVIIe-XIXe", characteristics: ["Craie et ardoise", "Maisons de champagne", "Toits mansardes"] },
      { style: "Art Deco", period: "1920-1940", characteristics: ["Reconstruction apres 1918", "Motifs geometriques", "Ardoise et tuiles"] },
      { style: "Cathedrale", period: "XIIIe siecle", characteristics: ["Toiture plomb", "Fleches", "Chef-d'oeuvre gothique"] }
    ],
    localInfo: {
      zipCodes: ["51100"],
      neighborhoods: ["Centre-ville", "Cathedrale", "Clairmarais", "Wilson", "Courlancy", "Murigny", "Croix-Rouge"],
      nearbyCommunes: ["Tinqueux", "Cormontreuil", "Bezannes", "Saint-Brice-Courcelles", "Betheny", "Witry-les-Reims"]
    },
    faq: [
      { question: "Le climat remois est-il difficile pour les toitures ?", answer: "Oui, Reims connait des hivers froids avec 45 jours de gel et 14 jours de neige. Les cycles gel/degel fragilisent les materiaux poreux. L'humidite des vignobles champenois environnants favorise la mousse." },
      { question: "Les maisons de champagne ont-elles des toitures specifiques ?", answer: "Oui, les maisons de champagne traditionnelles ont des caves en craie et des toitures en ardoise. Le contraste blanc/noir est caracteristique. Les grandes maisons possèdent souvent des toits mansardes ouvragés." },
      { question: "L'ardoise est-elle obligatoire a Reims ?", answer: "Dans le centre historique et les secteurs proteges proches de la cathedrale, l'ardoise naturelle est souvent imposee. La reconstruction Art Deco post-1918 a aussi utilise l'ardoise. Consultez le PLU de Reims pour votre secteur." },
      { question: "La poussiere de craie affecte-t-elle les toitures ?", answer: "La craie omniprésente en Champagne peut deposer une fine pellicule blanche sur les toitures. Ce depôt n'est pas nocif mais peut ternir l'ardoise. Un rinçage occasionnel restaure l'aspect. La craie peut aussi boucher les gouttieres." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Reims | Expert Ardoise & Climat Champenois | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Reims. Specialiste ardoise, tuiles de Champagne, resistance gel. Patrimoine viticole. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Reims par Intelligence Artificielle",
      introText: "Obtenez un diagnostic complet de votre toiture remoise en 30 secondes. Notre IA connait les specificites champenoises : ardoise sur craie, resistance au gel hivernal, patrimoine des maisons de champagne.",
      climateText: "Reims connait un climat continental attenue avec des hivers froids (45 jours de gel, 14 jours de neige) et une humidite liee aux vignobles environnants. Les precipitations (620mm) sont bien reparties. Le gel prolonge teste la resistance des materiaux.",
      roofTypesText: "Les toitures remoises associent l'ardoise (45%) au patrimoine en craie blanche, creant un contraste noir/blanc caracteristique. Les tuiles plates de Champagne (30%) couvrent les maisons plus modestes. La reconstruction Art Deco a multiplie les toits en ardoise.",
      problemsText: "Le gel prolonge (45 jours) cause des fissures dans les materiaux poreux. La neige peut s'accumuler dangereusement. L'humidite des vignobles favorise la mousse. La poussiere de craie se depose sur les toitures et peut boucher les gouttieres.",
      ctaText: "Evaluez votre toiture champenoise"
    }
  },

  "saint-etienne": {
    slug: "saint-etienne",
    name: "Saint-Etienne",
    department: "Loire",
    departmentCode: "42",
    region: "Auvergne-Rhone-Alpes",
    regionSlug: "auvergne-rhone-alpes",
    population: 174082,
    climate: {
      annualRainfall: 704,
      rainyDays: 97,
      frostDays: 60,
      snowDays: 20,
      windExposure: "modere",
      sunHours: 1988,
      hailRisk: "modere"
    },
    roofTypes: [
      { type: "Tuiles mecaniques", percentage: 45, description: "Tuiles terre cuite" },
      { type: "Ardoise", percentage: 25, description: "Ardoise sur immeubles anciens" },
      { type: "Fibro-ciment", percentage: 15, description: "Heritage industriel" },
      { type: "Zinc/Bac acier", percentage: 15, description: "Batiments industriels reconvertis" }
    ],
    commonProblems: [
      { problem: "Gel intense", frequency: "frequent", description: "Eclatement des materiaux", cause: "60 jours de gel (altitude 500m)" },
      { problem: "Neige abondante", frequency: "frequent", description: "Surcharge toiture", cause: "20 jours de neige" },
      { problem: "Amiante", frequency: "modere", description: "Fibro-ciment ancien", cause: "Heritage industriel (mines, metallurgie)" },
      { problem: "Pollution residuelle", frequency: "modere", description: "Noircissement", cause: "Passe industriel" }
    ],
    pricing: {
      inspectionAverage: 165,
      repairSmall: [380, 1050],
      repairMedium: [1300, 3600],
      renovation: [10000, 30000]
    },
    architecture: [
      { style: "Minier", period: "XIXe-XXe", characteristics: ["Maisons en bande", "Toits simples", "Briques et tuiles"] },
      { style: "Industriel", period: "XIXe-XXe", characteristics: ["Sheds", "Bac acier", "Grandes portees"] },
      { style: "Design", period: "XXIe siecle", characteristics: ["Cite du Design", "Toits contemporains", "Renovation industrielle"] }
    ],
    localInfo: {
      zipCodes: ["42000", "42100"],
      neighborhoods: ["Centre", "Chateaucreux", "Bellevue", "Montreynaud", "Terrenoire", "La Cotonne"],
      nearbyCommunes: ["Saint-Priest-en-Jarez", "L'Etrat", "Villars", "La Ricamarie", "Le Chambon-Feugerolles", "Firminy"]
    },
    faq: [
      { question: "Pourquoi fait-il si froid a Saint-Etienne ?", answer: "Saint-Etienne est situee a 500m d'altitude dans un bassin entoure de montagnes. Cette position genere un microclimat froid avec 60 jours de gel par an, soit plus que Paris ou Lyon. Les toitures doivent resister a des hivers rigoureux." },
      { question: "L'amiante est-elle un probleme a Saint-Etienne ?", answer: "Oui, l'heritage industriel (mines, metallurgie) a laisse de nombreuses toitures en fibro-ciment contenant de l'amiante. Si votre toiture date d'avant 1997, un diagnostic amiante est obligatoire avant travaux. Le desamiantage est encadre." },
      { question: "Les sheds industriels peuvent-ils etre renoves ?", answer: "Oui, les anciens batiments industriels a sheds (toits en dents de scie) sont souvent reconvertis en logements ou bureaux. La renovation des sheds est complexe : etancheite des noues, remplacement des vitres. Des aides existent pour le patrimoine industriel." },
      { question: "Faut-il deneiger sa toiture a Saint-Etienne ?", answer: "Avec 20 jours de neige par an, le deneigement peut etre necessaire. Au-dela de 40cm d'accumulation, verifiez la charge supportable. Les toits a faible pente sont plus a risque. Ne montez jamais sur une toiture enneigee sans securite." }
    ],
    seoContent: {
      metaTitle: "Diagnostic Toiture Saint-Etienne | Expert Gel & Patrimoine Industriel | 59,90 EUR",
      metaDescription: "Diagnostic toiture par IA a Saint-Etienne. Analyse resistance gel/neige, detection amiante, patrimoine industriel. Rapport PDF instantane.",
      h1: "Diagnostic Toiture a Saint-Etienne par Intelligence Artificielle",
      introText: "Analysez votre toiture stephanoise en 30 secondes avec notre IA. Specialiste des contraintes locales : gel intense (60 jours/an), neige abondante, heritage industriel. Detection des problemes specifiques au bassin stephanois.",
      climateText: "Saint-Etienne, a 500m d'altitude, connait l'un des climats les plus froids des grandes villes francaises : 60 jours de gel et 20 jours de neige par an. Les materiaux doivent resister aux hivers rigoureux et aux accumulations de neige.",
      roofTypesText: "Les toitures stephanoises portent la marque du passe industriel : tuiles mecaniques sur les maisons de mineurs (45%), ardoise sur les immeubles anciens (25%), fibro-ciment et bac acier sur les batiments industriels reconvertis (30%).",
      problemsText: "Le gel intense (60 jours) eclate les materiaux poreux. La neige peut s'accumuler dangereusement (20 jours/an). Les toitures fibro-ciment anciennes peuvent contenir de l'amiante (diagnostic obligatoire). La pollution residuelle a noirci de nombreuses toitures.",
      ctaText: "Verifiez votre toiture face au climat stephanois"
    }
  }
}

// Liste des villes pour le sitemap et la navigation
export const cityList = Object.values(citiesData).map(city => ({
  slug: city.slug,
  name: city.name,
  department: city.department,
  departmentCode: city.departmentCode,
  region: city.region,
  regionSlug: city.regionSlug,
  population: city.population
}))

// Fonction pour obtenir les villes voisines
export function getNearbyCities(citySlug: string, limit: number = 5): CityData[] {
  const city = citiesData[citySlug]
  if (!city) return []
  
  // Retourne les villes de la meme region, triees par population
  return Object.values(citiesData)
    .filter(c => c.regionSlug === city.regionSlug && c.slug !== citySlug)
    .sort((a, b) => b.population - a.population)
    .slice(0, limit)
}

// Fonction pour obtenir les villes par region
export function getCitiesByRegion(region: string): CityData[] {
  return Object.values(citiesData)
    .filter(city => city.region === region)
    .sort((a, b) => b.population - a.population)
}

// Fonction pour obtenir toutes les villes
export function getAllCities(): CityData[] {
  return Object.values(citiesData).sort((a, b) => b.population - a.population)
}
