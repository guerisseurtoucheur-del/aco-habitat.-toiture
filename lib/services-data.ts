import { Search, Hammer, Home, Thermometer, TreePine, HardHat, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ServiceData {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  icon: LucideIcon
  heroTitle: string
  heroDescription: string
  features: { title: string; description: string }[]
  details: string[]
  cta: string
}

export const servicesData: ServiceData[] = [
  {
    slug: "couverture",
    title: "Couverture",
    metaTitle: "Travaux de Couverture | Couvreur Professionnel - ACO-HABITAT",
    metaDescription:
      "Expert couvreur sur toute la France. Pose, reparation et renovation de couverture en tuiles, ardoises et zinc. Devis gratuit sous 24h. Intervention rapide.",
    icon: Home,
    heroTitle: "Expert en travaux de couverture",
    heroDescription:
      "Nous intervenons sur tous types de couverture : tuiles, ardoises, zinc, bac acier. De la reparation ponctuelle a la renovation complete, notre equipe garantit une toiture etanche et durable.",
    features: [
      {
        title: "Pose de couverture neuve",
        description:
          "Installation complete de couverture pour construction neuve ou extension. Tuiles, ardoises, zinc ou bac acier selon vos besoins et votre budget.",
      },
      {
        title: "Renovation de couverture",
        description:
          "Renovation integrale de votre toiture : depose de l'ancienne couverture, verification de la charpente, pose d'un ecran sous-toiture et nouvelle couverture.",
      },
      {
        title: "Reparation et entretien",
        description:
          "Intervention rapide pour fuites, tuiles cassees ou deplacees, faitage endommage, noues deteriorees et tout probleme d'etancheite.",
      },
      {
        title: "Zinguerie",
        description:
          "Pose et remplacement de gouttieres, cheneaux, descentes d'eaux pluviales et toutes pieces de zinguerie pour une evacuation optimale.",
      },
    ],
    details: [
      "Intervention sur toute la France",
      "Diagnostic gratuit par IA avant travaux",
      "Devis detaille et transparent",
      "Garantie decennale sur tous nos travaux",
      "Materiaux de qualite professionnelle",
    ],
    cta: "Demander un devis couverture",
  },
  {
    slug: "charpente",
    title: "Charpente",
    metaTitle: "Travaux de Charpente | Charpentier Expert - ACO-HABITAT",
    metaDescription:
      "Charpentier professionnel sur toute la France. Renforcement, remplacement et traitement de charpente bois. Expertise et diagnostic gratuit. Devis sous 24h.",
    icon: HardHat,
    heroTitle: "Expert en charpente bois",
    heroDescription:
      "Notre equipe de charpentiers intervient pour tous travaux de charpente : renforcement de structure, remplacement de pieces, traitement contre les insectes et champignons, creation de charpente neuve.",
    features: [
      {
        title: "Renforcement de charpente",
        description:
          "Consolidation de votre charpente existante par ajout de pieces de renfort, contreventement ou reprise en sous-oeuvre pour retrouver une structure saine.",
      },
      {
        title: "Remplacement de pieces",
        description:
          "Remplacement des elements de charpente endommages : pannes, chevrons, arbaletriers, entraits. Utilisation de bois traite classe 2 minimum.",
      },
      {
        title: "Traitement curatif et preventif",
        description:
          "Traitement du bois contre les insectes xylophages (capricornes, vrillettes) et les champignons (merule). Injection, pulverisation ou gel selon le diagnostic.",
      },
      {
        title: "Creation de charpente",
        description:
          "Conception et pose de charpente traditionnelle ou industrielle pour construction neuve, surelevement ou amenagement de combles.",
      },
    ],
    details: [
      "Expertise charpente sur toute la France",
      "Diagnostic structure par IA + visite sur site",
      "Traitement certifie CTB-A+",
      "Garantie decennale",
      "Bois de qualite, traite et certifie",
    ],
    cta: "Demander un devis charpente",
  },
  {
    slug: "diagnostic-ia",
    title: "Diagnostic IA",
    metaTitle: "Diagnostic Toiture par IA | Analyse Gratuite en 30s - ACO-HABITAT",
    metaDescription:
      "Diagnostic toiture gratuit par intelligence artificielle. Analysez l'etat de votre toit en 30 secondes : mousse, fissures, infiltrations. Rapport detaille instantane.",
    icon: Search,
    heroTitle: "Diagnostic toiture par intelligence artificielle",
    heroDescription:
      "Notre technologie IA de pointe analyse votre toiture a partir d'une simple photo satellite ou drone. En moins de 30 secondes, recevez un rapport complet identifiant tous les problemes : vegetation, structure et etancheite.",
    features: [
      {
        title: "Calque vegetal",
        description:
          "Detection precise de la mousse, du lichen et de la vegetation sur votre couverture. Cartographie des zones affectees avec niveau de gravite.",
      },
      {
        title: "Calque structure",
        description:
          "Identification des tuiles cassees, deplacees ou manquantes. Detection des problemes de faitage, de rive et d'aretier.",
      },
      {
        title: "Calque etancheite",
        description:
          "Analyse des traces d'humidite, des zones de stagnation d'eau et des risques d'infiltration. Evaluation de l'etat des elements de zinguerie.",
      },
      {
        title: "Rapport detaille",
        description:
          "Rapport complet avec photos annotees, niveau d'urgence par zone et recommandations de travaux chiffrees. Telechargeable en PDF.",
      },
    ],
    details: [
      "Gratuit et sans engagement",
      "Resultat en moins de 30 secondes",
      "Precision de detection de 98%",
      "Valide par nos experts couvreurs",
      "Compatible photo satellite, drone ou aerienne",
    ],
    cta: "Lancer un diagnostic gratuit",
  },
  {
    slug: "reparation-toiture",
    title: "Reparation",
    metaTitle: "Reparation de Toiture | Intervention Rapide - ACO-HABITAT",
    metaDescription:
      "Reparation urgente de toiture sur toute la France. Fuites, tuiles cassees, faitage endommage. Intervention rapide et devis gratuit. Couvreur professionnel.",
    icon: Hammer,
    heroTitle: "Reparation rapide de votre toiture",
    heroDescription:
      "Une fuite ? Des tuiles cassees ? Un faitage endommage ? Notre equipe intervient rapidement pour securiser votre toiture et effectuer les reparations necessaires avant que les degats ne s'aggravent.",
    features: [
      {
        title: "Reparation de fuites",
        description:
          "Localisation precise de l'origine des fuites grace a notre diagnostic IA, puis reparation durable avec garantie d'etancheite.",
      },
      {
        title: "Remplacement de tuiles",
        description:
          "Remplacement des tuiles cassees, fissures ou manquantes. Nous trouvons les tuiles identiques pour un resultat homogene.",
      },
      {
        title: "Reparation de faitage",
        description:
          "Remise en etat du faitage : remplacement des tuiles faitieres, refection du scellement ou pose de faitage a sec ventile.",
      },
      {
        title: "Urgence toiture",
        description:
          "Intervention d'urgence pour bache de protection, mise hors d'eau temporaire et securisation apres tempete ou sinistre.",
      },
    ],
    details: [
      "Intervention rapide sur toute la France",
      "Diagnostic prealable gratuit",
      "Devis detaille avant intervention",
      "Garantie sur toutes les reparations",
      "Assurance dommages-ouvrage",
    ],
    cta: "Signaler une urgence toiture",
  },
  {
    slug: "renovation-toiture",
    title: "Renovation",
    metaTitle: "Renovation de Toiture Complete | Expert Couvreur - ACO-HABITAT",
    metaDescription:
      "Renovation complete de toiture. Depose, charpente, isolation et pose de nouvelle couverture. Tuiles, ardoises, zinc. Devis gratuit. Garantie decennale.",
    icon: Wrench,
    heroTitle: "Renovation complete de votre toiture",
    heroDescription:
      "Votre toiture vieillit et les reparations ne suffisent plus ? Nous realisons la renovation integrale de votre couverture : depose, verification et renfort de charpente, ecran sous-toiture, isolation et pose de la nouvelle couverture.",
    features: [
      {
        title: "Etude et diagnostic complet",
        description:
          "Avant tout devis, notre IA analyse votre toiture puis nos experts realisent une visite technique pour evaluer precisement l'etendue des travaux.",
      },
      {
        title: "Depose et preparation",
        description:
          "Depose soignee de l'ancienne couverture, verification complete de la charpente et remplacement des pieces abimees si necessaire.",
      },
      {
        title: "Isolation et etancheite",
        description:
          "Pose d'ecran sous-toiture HPV, isolation thermique par l'exterieur (sarking) ou par l'interieur selon votre projet et votre budget.",
      },
      {
        title: "Pose de couverture neuve",
        description:
          "Pose de la nouvelle couverture en tuiles terre cuite, ardoise naturelle, zinc ou bac acier. Finitions et zinguerie soignees.",
      },
    ],
    details: [
      "Renovation sur mesure",
      "Accompagnement aides financieres (MaPrimeRenov)",
      "Garantie decennale",
      "Chantier propre et securise",
      "Suivi photo du chantier",
    ],
    cta: "Demander un devis renovation",
  },
  {
    slug: "isolation-thermique",
    title: "Isolation thermique",
    metaTitle: "Isolation Thermique Toiture | Economies d'Energie - ACO-HABITAT",
    metaDescription:
      "Isolation thermique de toiture et combles. Reduisez votre facture energetique jusqu'a 30%. Eligible MaPrimeRenov. Devis gratuit. Intervention France entiere.",
    icon: Thermometer,
    heroTitle: "Isolation thermique de votre toiture",
    heroDescription:
      "30% des deperditions thermiques passent par la toiture. Notre equipe realise l'isolation de vos combles et de votre sous-toiture pour ameliorer votre confort et reduire significativement votre facture energetique.",
    features: [
      {
        title: "Isolation des combles perdus",
        description:
          "Soufflage de laine minerale ou ouate de cellulose sur le plancher des combles non amenages. Solution rapide et economique.",
      },
      {
        title: "Isolation des combles amenages",
        description:
          "Pose de panneaux isolants sous rampants avec membrane d'etancheite a l'air. Maintien de l'espace habitable sous combles.",
      },
      {
        title: "Isolation par l'exterieur (sarking)",
        description:
          "Pose de panneaux isolants rigides sur la charpente, sous la couverture. Solution performante qui ne reduit pas l'espace interieur.",
      },
      {
        title: "Accompagnement aides",
        description:
          "Nous vous accompagnons dans vos demarches MaPrimeRenov, CEE et autres aides financieres pour reduire le cout de vos travaux.",
      },
    ],
    details: [
      "Jusqu'a 30% d'economies d'energie",
      "Eligible MaPrimeRenov et CEE",
      "Materiaux certifies ACERMI",
      "Etude thermique prealable",
      "Garantie decennale",
    ],
    cta: "Demander un devis isolation",
  },
  {
    slug: "demoussage",
    title: "Demoussage",
    metaTitle: "Demoussage Toiture | Nettoyage et Traitement - ACO-HABITAT",
    metaDescription:
      "Demoussage et nettoyage de toiture professionnel. Traitement anti-mousse et hydrofuge longue duree. Prolongez la vie de votre couverture. Devis gratuit.",
    icon: TreePine,
    heroTitle: "Demoussage et protection de votre toiture",
    heroDescription:
      "La mousse et le lichen degradent votre couverture et reduisent son etancheite. Notre traitement professionnel combine nettoyage, traitement anti-mousse curatif et application d'un hydrofuge protecteur longue duree.",
    features: [
      {
        title: "Nettoyage haute pression",
        description:
          "Nettoyage adapte a votre type de couverture : haute pression modulee pour tuiles beton, basse pression pour ardoises et tuiles terre cuite.",
      },
      {
        title: "Traitement anti-mousse",
        description:
          "Application d'un biocide professionnel certifie pour eliminer mousse, lichen, algues et champignons en profondeur.",
      },
      {
        title: "Application hydrofuge",
        description:
          "Protection longue duree avec un hydrofuge colore ou incolore qui impermeabilise vos tuiles tout en les laissant respirer.",
      },
      {
        title: "Nettoyage des gouttieres",
        description:
          "En complement du demoussage, nettoyage complet des gouttieres, cheneaux et descentes pour une evacuation optimale des eaux de pluie.",
      },
    ],
    details: [
      "Diagnostic IA prealable gratuit",
      "Produits professionnels certifies",
      "Protection hydrofuge jusqu'a 10 ans",
      "Respect de l'environnement",
      "Avant/apres photo fourni",
    ],
    cta: "Demander un devis demoussage",
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug)
}
