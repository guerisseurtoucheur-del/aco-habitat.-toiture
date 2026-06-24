import { Search, Bug, Home, Droplets, TreePine, ShieldCheck, Hammer } from "lucide-react"
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
    slug: "diagnostic-ia",
    title: "Diagnostic charpente",
    metaTitle: "Diagnostic de charpente gratuit | Insectes, mérule, humidité - ACO-HABITAT",
    metaDescription:
      "Diagnostic gratuit de votre charpente et de vos bois : insectes xylophages, mérule, champignons lignivores et humidité. Expert depuis 2006. Devis sans engagement.",
    icon: Search,
    heroTitle: "Diagnostic de charpente et des bois",
    heroDescription:
      "Avant tout traitement, ACO-HABITAT réalise une inspection complète de vos bois : identification de l'agresseur (insectes ou champignons), étendue de l'attaque, mesure d'humidité et recherche des causes. Un diagnostic clair, gratuit et sans engagement.",
    features: [
      {
        title: "Identification de l'agresseur",
        description:
          "Nous reconnaissons l'attaque en cours grâce aux indices : taille et forme des trous, type de vermoulure (sciure), galeries, présence de mycélium ou de fructification.",
      },
      {
        title: "Sondage des bois",
        description:
          "Sondage à l'aiguille et au poinçon des pièces de charpente pour évaluer la profondeur de l'attaque et repérer les bois qui ont perdu leur résistance.",
      },
      {
        title: "Mesure d'humidité",
        description:
          "Relevé du taux d'humidité du bois et des maçonneries : un champignon ou un insecte se développe toujours sur un bois trop humide ou mal ventilé.",
      },
      {
        title: "Rapport et préconisations",
        description:
          "Vous recevez un état des lieux clair avec la nature du problème, les zones touchées et le traitement adapté, accompagné d'un devis détaillé.",
      },
    ],
    details: [
      "Diagnostic gratuit et sans engagement",
      "Expert traitement du bois depuis 2006",
      "Identification précise insectes / champignons",
      "Recherche systématique des causes d'humidité",
      "Devis clair et détaillé",
    ],
    cta: "Demander mon diagnostic gratuit",
  },
  {
    slug: "charpente",
    title: "Traitement de charpente",
    metaTitle: "Traitement de charpente bois | Curatif et préventif - ACO-HABITAT",
    metaDescription:
      "Traitement de charpente contre les insectes xylophages et les champignons. Bûchage, injection, pulvérisation par un applicateur certifié. Diagnostic gratuit.",
    icon: Home,
    heroTitle: "Traitement de votre charpente",
    heroDescription:
      "ACO-HABITAT traite durablement votre charpente attaquée par les insectes ou les champignons. Bûchage des parties dégradées, injection en profondeur et pulvérisation d'un produit certifié : votre structure retrouve sa solidité.",
    features: [
      {
        title: "Bûchage des bois attaqués",
        description:
          "Nous retirons au burin les parties de bois dégradées par les larves ou le champignon, jusqu'à atteindre le bois sain.",
      },
      {
        title: "Injection sous pression",
        description:
          "Pose de chevilles-injecteurs dans les pièces de forte section pour faire pénétrer le produit au cœur du bois et atteindre les larves.",
      },
      {
        title: "Pulvérisation de surface",
        description:
          "Application d'un produit de traitement certifié sur l'ensemble des bois, après brossage et dépoussiérage, pour une protection homogène.",
      },
      {
        title: "Renforcement de structure",
        description:
          "Si des pièces ont perdu leur résistance, nous les renforçons ou les remplaçons par du bois traité de classe adaptée.",
      },
    ],
    details: [
      "Applicateur certifié",
      "Produits homologués curatifs et préventifs",
      "Traitement de la cause d'humidité",
      "Intervention garantie",
      "Diagnostic gratuit préalable",
    ],
    cta: "Demander un devis charpente",
  },
  {
    slug: "reparation-toiture",
    title: "Insectes xylophages",
    metaTitle: "Traitement insectes xylophages | Capricorne, vrillette, lyctus - ACO-HABITAT",
    metaDescription:
      "Traitement curatif contre les insectes xylophages : capricorne des maisons, vrillette, lyctus. Bûchage, injection et pulvérisation. Expert depuis 2006. Diagnostic gratuit.",
    icon: Bug,
    heroTitle: "Traitement des insectes xylophages",
    heroDescription:
      "Capricornes, vrillettes et lyctus dévorent votre charpente de l'intérieur, parfois pendant des années avant d'être visibles. ACO-HABITAT stoppe l'infestation et protège durablement vos bois contre une nouvelle attaque.",
    features: [
      {
        title: "Capricorne des maisons",
        description:
          "Le plus destructeur sur les bois résineux de charpente. Larves vivant jusqu'à 10 ans dans le bois, trous de sortie ovales de 6 à 10 mm.",
      },
      {
        title: "Vrillette",
        description:
          "Petite et grosse vrillette, qui apprécient les ambiances humides et les bois déjà fragilisés. Trous ronds de 1 à 4 mm et vermoulure granuleuse.",
      },
      {
        title: "Lyctus",
        description:
          "Attaque les bois feuillus riches en amidon (chêne, châtaignier), les parquets et les bois récents. Vermoulure très fine comme du talc.",
      },
      {
        title: "Traitement complet",
        description:
          "Bûchage, brossage, injection sous pression et pulvérisation d'un insecticide certifié pour éliminer les larves et prévenir toute nouvelle infestation.",
      },
    ],
    details: [
      "Identification précise de l'insecte",
      "Traitement curatif en profondeur",
      "Protection préventive longue durée",
      "Produits certifiés",
      "Diagnostic gratuit",
    ],
    cta: "Signaler une attaque d'insectes",
  },
  {
    slug: "renovation-toiture",
    title: "Mérule & champignons",
    metaTitle: "Traitement mérule et champignons lignivores | Expert - ACO-HABITAT",
    metaDescription:
      "Traitement de la mérule et des champignons lignivores. Recherche des causes d'humidité, dépose des bois contaminés, traitement fongicide des bois et maçonneries. Diagnostic gratuit.",
    icon: Droplets,
    heroTitle: "Traitement de la mérule et des champignons",
    heroDescription:
      "La mérule, surnommée la lèpre des maisons, se propage très vite et peut détruire une charpente ou un plancher en quelques mois. ACO-HABITAT traite la mérule et les champignons lignivores à la source, en supprimant d'abord les causes d'humidité.",
    features: [
      {
        title: "Recherche des causes",
        description:
          "Identification de l'origine de l'humidité (infiltration, remontée capillaire, fuite, manque de ventilation) : sans cela, le champignon reviendrait.",
      },
      {
        title: "Dépose des bois contaminés",
        description:
          "Retrait et évacuation des bois envahis par le mycélium, qui ont perdu toute résistance et propagent le champignon.",
      },
      {
        title: "Traitement fongicide",
        description:
          "Application en profondeur d'un fongicide certifié sur les bois conservés et traitement par injection des maçonneries contaminées.",
      },
      {
        title: "Assainissement",
        description:
          "Mise en place des conditions pour assécher et ventiler durablement les zones touchées et empêcher tout retour du champignon.",
      },
    ],
    details: [
      "Intervention rapide (mérule = urgence)",
      "Traitement de la cause et de l'effet",
      "Traitement des bois et des maçonneries",
      "Produits fongicides certifiés",
      "Diagnostic gratuit",
    ],
    cta: "Signaler une suspicion de mérule",
  },
  {
    slug: "isolation-thermique",
    title: "Humidité & assèchement",
    metaTitle: "Traitement de l'humidité et assèchement des murs | ACO-HABITAT",
    metaDescription:
      "Traitement de l'humidité à l'origine des attaques de bois : remontées capillaires, condensation, ventilation. Assèchement des murs et assainissement. Diagnostic gratuit.",
    icon: TreePine,
    heroTitle: "Traitement de l'humidité",
    heroDescription:
      "L'humidité est la cause numéro un des attaques de champignons et de nombreux insectes. ACO-HABITAT traite les remontées capillaires, les problèmes de condensation et de ventilation pour protéger durablement vos bois et votre bâti.",
    features: [
      {
        title: "Remontées capillaires",
        description:
          "Traitement par injection d'une barrière étanche dans les murs pour stopper l'eau qui remonte du sol et entretient l'humidité du bâti.",
      },
      {
        title: "Diagnostic humidité",
        description:
          "Mesure du taux d'humidité des murs et des bois, identification de l'origine (capillarité, infiltration, condensation) avant tout traitement.",
      },
      {
        title: "Ventilation",
        description:
          "Conseils et solutions de ventilation pour évacuer l'humidité ambiante, indispensable pour éviter le retour des champignons.",
      },
      {
        title: "Assainissement des bois",
        description:
          "Une fois la source d'humidité traitée, nous protégeons les bois assainis par un traitement préventif adapté.",
      },
    ],
    details: [
      "Traitement de la cause des attaques",
      "Barrière contre les remontées capillaires",
      "Diagnostic humidité précis",
      "Protection durable du bâti",
      "Diagnostic gratuit",
    ],
    cta: "Demander un diagnostic humidité",
  },
  {
    slug: "demoussage",
    title: "Traitement préventif",
    metaTitle: "Traitement préventif du bois | Protection charpente - ACO-HABITAT",
    metaDescription:
      "Traitement préventif du bois contre les insectes et champignons. Protégez une charpente saine, neuve ou rénovée, sur le long terme. Produits certifiés. Diagnostic gratuit.",
    icon: ShieldCheck,
    heroTitle: "Traitement préventif du bois",
    heroDescription:
      "Mieux vaut prévenir que guérir. Le traitement préventif protège une charpente saine contre les insectes xylophages et les champignons avant toute attaque. Idéal sur un bois neuf, après rénovation ou en zone humide.",
    features: [
      {
        title: "Protection longue durée",
        description:
          "Application d'un produit de traitement préventif qui protège le bois contre les insectes et les champignons pendant de nombreuses années.",
      },
      {
        title: "Bois neuf et rénové",
        description:
          "Recommandé sur les charpentes neuves, les combles aménagés et après tous travaux exposant des bois non traités.",
      },
      {
        title: "Zones à risque",
        description:
          "Particulièrement conseillé en région humide ou océanique, où le risque de mérule et d'insectes est plus élevé.",
      },
      {
        title: "Produits certifiés",
        description:
          "Application de produits homologués par un applicateur formé, dans le respect des dosages et des normes en vigueur.",
      },
    ],
    details: [
      "Protège un bois encore sain",
      "Insectes et champignons",
      "Idéal bois neuf, combles, rénovation",
      "Produits homologués",
      "Diagnostic gratuit",
    ],
    cta: "Demander un devis préventif",
  },
  {
    slug: "couverture",
    title: "Remplacement de bois",
    metaTitle: "Remplacement et renforcement de bois de charpente | ACO-HABITAT",
    metaDescription:
      "Remplacement des bois de charpente détruits par les insectes ou la mérule. Renforcement de structure, reprise de pièces, pose de bois traité. Diagnostic gratuit.",
    icon: Hammer,
    heroTitle: "Remplacement et renforcement des bois",
    heroDescription:
      "Lorsqu'une attaque a trop avancé, certaines pièces ne peuvent plus être conservées. ACO-HABITAT remplace les bois détruits et renforce votre charpente avec du bois traité, pour lui rendre toute sa solidité.",
    features: [
      {
        title: "Remplacement de pièces",
        description:
          "Dépose et remplacement des pannes, chevrons, entraits ou arbalétriers détruits par les insectes ou les champignons.",
      },
      {
        title: "Renforcement de structure",
        description:
          "Pose de pièces de renfort, moisage et reprise des assemblages pour consolider une charpente affaiblie.",
      },
      {
        title: "Bois traité",
        description:
          "Utilisation de bois de classe d'emploi adaptée, traité contre les insectes et les champignons, pour une durabilité maximale.",
      },
      {
        title: "Traitement complet",
        description:
          "Le remplacement s'accompagne toujours d'un traitement des bois conservés et de la suppression des causes d'humidité.",
      },
    ],
    details: [
      "Reprise des bois détruits",
      "Renforcement de charpente",
      "Bois traité et certifié",
      "Traitement des bois conservés",
      "Diagnostic gratuit",
    ],
    cta: "Demander un devis",
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug)
}
