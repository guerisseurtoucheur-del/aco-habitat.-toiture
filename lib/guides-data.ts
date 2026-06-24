export interface GuideFAQ {
  question: string
  answer: string
}

export interface GuideSection {
  title: string
  content: string
  list?: string[]
}

export interface GuideData {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroDescription: string
  datePublished: string
  dateModified: string
  readTime: string
  image?: string
  imageAlt?: string
  sections: GuideSection[]
  faq: GuideFAQ[]
  relatedServices: string[]
  relatedGuides: string[]
}

export const guidesData: GuideData[] = [
  {
    slug: "diagnostic-toiture-satellite",
    title: "Reconnaître une attaque de charpente",
    metaTitle:
      "Comment reconnaître une attaque d'insectes ou de champignons dans sa charpente ? | Guide ACO-HABITAT",
    metaDescription:
      "Trous, sciure, galeries, mycélium : apprenez à reconnaître une attaque de votre charpente par les insectes xylophages ou les champignons. Guide complet : indices, identification et bons réflexes.",
    heroTitle: "Comment reconnaître une attaque de votre charpente ?",
    heroDescription:
      "Les insectes xylophages et les champignons travaillent le bois en silence, souvent pendant des années avant d'être visibles. Savoir lire les indices (trous, sciure, galeries, filaments) permet d'agir avant que la charpente ne perde sa solidité. Voici comment identifier une attaque.",
    datePublished: "2026-01-15",
    dateModified: "2026-02-10",
    readTime: "8 min",
    sections: [
      {
        title: "Pourquoi surveiller régulièrement ses bois ?",
        content:
          "Une charpente attaquée ne se voit pas toujours du premier coup d'œil : les larves d'insectes vivent à l'intérieur du bois et les champignons se développent souvent dans des zones peu visibles (combles, sous-toiture, vide sanitaire). Quand les dégâts deviennent évidents, l'attaque est généralement déjà avancée. Une inspection régulière des bois, surtout dans les maisons anciennes ou humides, permet de détecter le problème tôt et de limiter le coût des travaux.",
      },
      {
        title: "Les indices laissés par les insectes xylophages",
        content:
          "Chaque insecte laisse des traces caractéristiques qui permettent de l'identifier. Voici les principaux indices à rechercher sur vos bois :",
        list: [
          "Trous de sortie : les capricornes laissent des trous ovales de 6 à 10 mm, les vrillettes des trous ronds de 1 à 4 mm, les lyctus des trous ronds de 1 à 2 mm.",
          "Vermoulure (sciure) : la sciure rejetée renseigne sur l'insecte. Granuleuse pour la vrillette, en forme de petits cylindres pour le capricorne, fine comme du talc pour le lyctus.",
          "Galeries sous la surface : en grattant le bois avec un couteau, on découvre des galeries creusées dans le sens des fibres, signe de la présence de larves.",
          "Bruit de grignotement : par temps calme, on entend parfois les larves de capricorne ronger le bois, surtout au printemps et en été.",
          "Bois qui sonne creux : un bois sondé qui sonne creux ou s'effrite a perdu sa résistance interne.",
        ],
      },
      {
        title: "Les indices laissés par les champignons",
        content:
          "Les champignons lignivores se nourrissent du bois et le détruisent. Ils se reconnaissent à d'autres signes :",
        list: [
          "Filaments blancs (mycélium) : nappes cotonneuses blanches qui s'étalent sur le bois, les maçonneries ou les enduits, caractéristiques de la mérule.",
          "Fructifications : plaques brunâtres bordées de blanc (mérule) ou petites formes en console pour d'autres champignons.",
          "Bois qui se craquelle en cubes : la pourriture cubique, où le bois se fend en petits cubes friables, est typique des champignons de pourriture brune.",
          "Odeur de moisi ou de champignon : une odeur de cave humide persistante accompagne souvent une attaque fongique.",
          "Bois mou et humide : un bois qui s'enfonce sous la pression du doigt et reste humide est en cours de destruction.",
        ],
      },
      {
        title: "Comment se déroule notre diagnostic ?",
        content:
          "Le diagnostic ACO-HABITAT consiste à inspecter l'ensemble des bois accessibles, à sonder les pièces de charpente à l'aiguille et au poinçon, et à mesurer le taux d'humidité du bois et des maçonneries. Nous identifions l'agresseur (insecte ou champignon), évaluons l'étendue et la profondeur de l'attaque, et surtout nous recherchons la cause (humidité, ventilation insuffisante). Vous recevez ensuite un état des lieux clair et un devis de traitement adapté.",
      },
      {
        title: "Que faire en cas de doute ?",
        content:
          "Au moindre doute (trous récents, sciure fraîche, filaments blancs, odeur de moisi), il est essentiel de faire intervenir un professionnel. Une attaque non traitée s'étend et fragilise la structure : ce qui n'est qu'un traitement de surface aujourd'hui peut devenir un remplacement de pièces demain. Le diagnostic ACO-HABITAT est gratuit et sans engagement : il permet de savoir précisément à quoi vous avez affaire avant d'engager des frais.",
      },
    ],
    faq: [
      {
        question:
          "Comment savoir si les trous dans ma charpente sont récents ?",
        answer:
          "Un trou récent présente un bois clair à l'intérieur et est souvent accompagné de sciure fraîche au pied de la pièce. Un trou ancien est foncé et sans vermoulure. En cas de doute, un professionnel confirme si l'attaque est active.",
      },
      {
        question: "Combien coûte un diagnostic de charpente ?",
        answer:
          "Le diagnostic réalisé par ACO-HABITAT est gratuit et sans engagement. Nous identifions l'agresseur, évaluons l'étendue de l'attaque et vous remettons un devis clair.",
      },
      {
        question:
          "Une attaque d'insectes est-elle toujours visible ?",
        answer:
          "Non. Les larves vivent à l'intérieur du bois et l'attaque peut rester invisible plusieurs années. C'est pourquoi une inspection régulière des bois, surtout dans les maisons anciennes, est recommandée.",
      },
    ],
    relatedServices: ["diagnostic-ia", "charpente", "reparation-toiture"],
    relatedGuides: [
      "quand-renover-toiture",
      "mousse-toiture-dangers",
    ],
  },
  {
    slug: "quand-renover-toiture",
    title: "Quand faut-il traiter sa charpente",
    metaTitle:
      "Quand faut-il traiter sa charpente ? Les 7 signes à surveiller | ACO-HABITAT",
    metaDescription:
      "Découvrez les 7 signes qui indiquent que votre charpente doit être traitée. Trous, sciure, humidité, mérule : guide complet pour savoir quand agir avant que le bois ne soit détruit.",
    heroTitle: "Quand faut-il traiter sa charpente ? Les 7 signes qui ne trompent pas",
    heroDescription:
      "Votre charpente soutient toute la maison, mais le bois est vulnérable aux insectes et aux champignons. Savoir reconnaître les signes d'une attaque permet d'intervenir au bon moment et d'éviter le remplacement coûteux de pièces de structure. Voici les 7 indicateurs qui doivent vous alerter.",
    datePublished: "2026-01-20",
    dateModified: "2026-02-10",
    readTime: "10 min",
    sections: [
      {
        title: "Le bois de charpente est-il éternel ?",
        content:
          "Une charpente bien traitée et maintenue au sec peut durer plusieurs siècles : on le voit dans de nombreuses maisons anciennes. Mais le bois reste un matériau vivant, vulnérable aux insectes xylophages (capricorne, vrillette, lyctus) et aux champignons lignivores (dont la mérule) dès qu'il est exposé à l'humidité. Sans surveillance ni traitement, une attaque peut détruire des pièces maîtresses en quelques années. La clé de la longévité d'une charpente, c'est la prévention et la maîtrise de l'humidité.",
      },
      {
        title: "Signe n°1 : vous voyez de petits trous dans le bois",
        content:
          "Des petits trous ronds ou ovales à la surface des poutres sont les trous de sortie des insectes xylophages adultes. Ovales de 6 à 10 mm pour le capricorne, ronds de 1 à 4 mm pour la vrillette. Leur présence indique qu'au moins une génération d'insectes est arrivée à maturité dans votre bois : l'attaque est souvent déjà bien installée.",
      },
      {
        title: "Signe n°2 : de la sciure (vermoulure) apparaît",
        content:
          "Des petits tas de sciure fine au pied des poutres ou sur le sol des combles signalent une attaque active. Cette vermoulure est rejetée par les larves qui creusent le bois. Sa texture aide à identifier l'insecte : granuleuse pour la vrillette, en petits cylindres pour le capricorne, ou fine comme du talc pour le lyctus.",
      },
      {
        title: "Signe n°3 : des filaments blancs ou des plaques brunes",
        content:
          "Des nappes cotonneuses blanches, des filaments qui s'étalent sur le bois ou les murs, ou des plaques brunâtres bordées de blanc sont les signes d'une attaque de champignon, en particulier la mérule. C'est une urgence : la mérule se propage très vite et peut détruire une charpente ou un plancher en quelques mois.",
      },
      {
        title: "Signe n°4 : une odeur de moisi ou de champignon",
        content:
          "Une odeur persistante de cave humide ou de champignon dans les combles, une cave ou un sous-sol traduit la présence d'humidité et souvent le développement d'un champignon. Cette odeur précède parfois l'apparition visible des filaments. Elle doit conduire à une inspection des bois et à une recherche des causes d'humidité.",
      },
      {
        title: "Signe n°5 : le bois est mou, sonne creux ou s'effrite",
        content:
          "Un bois qui s'enfonce sous la pression d'un poinçon, qui sonne creux ou s'effrite a perdu sa résistance mécanique, rongé de l'intérieur par les larves ou décomposé par un champignon. Sur une pièce porteuse (panne, chevron, entrait), c'est un signal d'alerte sérieux qui impose un diagnostic rapide.",
      },
      {
        title: "Signe n°6 : des traces d'humidité sur les bois",
        content:
          "L'humidité est la cause numéro un des attaques de champignons et favorise certains insectes. Des auréoles, des bois noircis, de la condensation ou des maçonneries humides au contact de la charpente créent les conditions idéales pour la mérule. Traiter l'humidité (infiltration, remontée capillaire, ventilation) est indispensable avant tout traitement durable du bois.",
      },
      {
        title: "Signe n°7 : vous achetez ou rénovez une maison ancienne",
        content:
          "Lors de l'achat ou de la rénovation d'une maison ancienne, c'est le moment idéal pour faire contrôler la charpente. Les bois exposés pendant des travaux, les combles longtemps inoccupés ou les maisons situées en zone humide sont particulièrement à risque. Un diagnostic préalable évite de découvrir trop tard une attaque coûteuse, et un traitement préventif protège durablement une charpente encore saine.",
      },
    ],
    faq: [
      {
        question: "Quel est le prix moyen d'un traitement de charpente ?",
        answer:
          "Le prix d'un traitement de charpente varie en général entre 20 et 45 euros par m² de surface au sol traitée, selon l'accès, l'état des bois et le type d'attaque. Pour une maison de 100 m², comptez souvent entre 2 000 et 4 500 euros. Le diagnostic ACO-HABITAT est gratuit et permet d'obtenir un devis précis.",
      },
      {
        question:
          "Un traitement de charpente est-il garanti ?",
        answer:
          "Oui, un traitement réalisé par un applicateur certifié avec des produits homologués fait l'objet d'une garantie. La durabilité dépend aussi de la maîtrise des causes d'humidité, que nous traitons systématiquement.",
      },
      {
        question: "Combien de temps dure une intervention de traitement ?",
        answer:
          "Un traitement curatif de charpente (bûchage, injection, pulvérisation) dure en général de 1 à 3 jours selon la surface et l'accès. La maison reste habitable pendant l'intervention.",
      },
    ],
    relatedServices: ["charpente", "reparation-toiture", "demoussage"],
    relatedGuides: [
      "prix-renovation-toiture",
      "diagnostic-toiture-satellite",
    ],
  },
  {
    slug: "prix-renovation-toiture",
    title: "Prix d'un traitement du bois 2026",
    metaTitle:
      "Prix d'un traitement de charpente et du bois en 2026 : tarifs et devis | ACO-HABITAT",
    metaDescription:
      "Guide complet des prix de traitement du bois en 2026. Tarifs par type d'attaque (insectes, mérule, humidité), facteurs de prix et conseils pour obtenir le bon devis.",
    heroTitle:
      "Quel est le prix d'un traitement de charpente en 2026 ?",
    heroDescription:
      "Le coût d'un traitement du bois dépend de nombreux facteurs : surface, type d'attaque (insectes ou champignons), accès aux bois, et causes d'humidité à traiter. Ce guide vous donne les prix actualisés en 2026 et les conseils pour un devis juste.",
    datePublished: "2026-02-01",
    dateModified: "2026-02-10",
    readTime: "12 min",
    sections: [
      {
        title: "Les facteurs qui influencent le prix",
        content:
          "Le coût d'un traitement du bois dépend de cinq facteurs principaux : la surface de charpente à traiter (en m²), le type d'agresseur (insectes xylophages ou champignons lignivores), l'état des bois (simple traitement ou remplacement de pièces), l'accessibilité de la charpente (hauteur, encombrement des combles) et les causes d'humidité à supprimer. Un diagnostic préalable permet d'évaluer précisément l'étendue des travaux et d'éviter les mauvaises surprises.",
      },
      {
        title: "Prix par type d'intervention",
        content:
          "Voici les fourchettes de prix constatées en 2026, fournitures et main-d'œuvre comprises :",
        list: [
          "Traitement curatif des insectes xylophages : 20 à 45 euros/m² de surface au sol. Comprend le bûchage, le brossage, l'injection sous pression et la pulvérisation.",
          "Traitement préventif du bois : 12 à 25 euros/m². Protection d'une charpente saine, neuve ou rénovée, contre insectes et champignons.",
          "Traitement de la mérule et des champignons : 40 à 120 euros/m² selon l'étendue. Inclut la dépose des bois contaminés et le traitement fongicide des bois et maçonneries.",
          "Traitement contre les remontées capillaires : 100 à 180 euros/ml de mur traité par injection d'une barrière étanche.",
          "Remplacement de pièces de charpente : 80 à 180 euros/m² si des bois ont perdu leur résistance et doivent être remplacés par du bois traité.",
        ],
      },
      {
        title: "Les prestations complémentaires",
        content:
          "À ces traitements s'ajoutent parfois des travaux complémentaires nécessaires pour un résultat durable :",
        list: [
          "Recherche et traitement des causes d'humidité : indispensable avant tout traitement fongicide, sans quoi le champignon reviendrait.",
          "Mise en place d'une ventilation : pour assécher durablement les zones touchées et empêcher le retour des champignons.",
          "Renforcement de structure : moisage, pose de pièces de renfort ou reprise d'assemblages affaiblis.",
          "Évacuation des bois contaminés : dépose et élimination des pièces envahies par le mycélium.",
          "Accès et protection : mise en place de protections et nettoyage du chantier après intervention.",
        ],
      },
      {
        title:
          "Aides et prise en charge",
        content:
          "Certaines situations permettent une prise en charge partielle des travaux :",
        list: [
          "Assurance habitation : certains contrats couvrent les dégâts liés à un dégât des eaux à l'origine d'une attaque fongique. Vérifiez vos garanties.",
          "Vice caché : en cas de mérule non signalée lors d'une vente immobilière, l'acheteur peut se retourner contre le vendeur au titre de la garantie des vices cachés.",
          "Obligation d'information mérule : dans les zones faisant l'objet d'un arrêté préfectoral, la présence de mérule doit être déclarée lors d'une vente.",
          "TVA réduite : les travaux dans les logements de plus de 2 ans peuvent bénéficier d'une TVA à taux réduit selon leur nature.",
          "Copropriété : pour une charpente en parties communes, le coût est réparti entre copropriétaires selon le règlement.",
        ],
      },
      {
        title: "Comment obtenir le meilleur prix ?",
        content:
          "Pour obtenir un traitement au juste prix, voici nos conseils :",
        list: [
          "Faites un diagnostic préalable : le diagnostic gratuit ACO-HABITAT identifie précisément l'agresseur et l'étendue, et évite les traitements inutiles.",
          "Méfiez-vous des devis trop bas : un traitement bâclé (sans bûchage ni recherche des causes d'humidité) ne tient pas dans le temps.",
          "Exigez un applicateur certifié et des produits homologués : c'est la garantie d'un traitement efficace et durable.",
          "Traitez la cause, pas seulement l'effet : un traitement fongicide sans suppression de l'humidité est voué à l'échec.",
          "Comparez plusieurs devis détaillés : assurez-vous qu'ils décrivent précisément les prestations (surface, produits, garantie).",
        ],
      },
    ],
    faq: [
      {
        question:
          "Quel budget prévoir pour traiter la charpente d'une maison de 100 m² ?",
        answer:
          "Pour un traitement curatif des insectes sur une charpente de 100 m² de surface au sol, prévoyez entre 2 000 et 4 500 euros. Un traitement de mérule, plus complexe, peut dépasser ce montant selon l'étendue et les bois à remplacer. Le diagnostic gratuit permet d'obtenir un chiffrage précis.",
      },
      {
        question:
          "Le traitement préventif est-il moins cher que le curatif ?",
        answer:
          "Oui. Un traitement préventif (12 à 25 euros/m²) protège un bois encore sain et coûte nettement moins cher qu'un traitement curatif après attaque, qui implique bûchage, injection et parfois remplacement de pièces. Prévenir reste toujours plus économique que guérir.",
      },
      {
        question:
          "Le traitement du bois est-il déductible des impôts ?",
        answer:
          "Le traitement du bois n'ouvre pas droit à une déduction fiscale spécifique. En revanche, pour un bien locatif, ces travaux d'entretien et de réparation sont généralement déductibles des revenus fonciers. Renseignez-vous selon votre situation.",
      },
    ],
    relatedServices: [
      "charpente",
      "renovation-toiture",
      "reparation-toiture",
    ],
    relatedGuides: [
      "quand-renover-toiture",
      "diagnostic-toiture-satellite",
    ],
  },
  {
    slug: "mousse-toiture-dangers",
    title: "Les dangers de la mérule",
    metaTitle:
      "Mérule : quels dangers pour votre maison et comment la traiter ? | ACO-HABITAT",
    metaDescription:
      "La mérule, surnommée la lèpre des maisons, détruit charpentes et planchers en quelques mois. Découvrez ses dangers réels, comment la reconnaître et les solutions professionnelles pour l'éliminer.",
    heroTitle:
      "Quels sont les dangers de la mérule ?",
    heroDescription:
      "La mérule n'est pas un simple champignon d'humidité. C'est le plus redoutable des champignons lignivores : elle se propage très vite, traverse les maçonneries et peut détruire une charpente ou un plancher en quelques mois. Voici pourquoi il faut agir vite et comment la traiter efficacement.",
    datePublished: "2026-01-25",
    dateModified: "2026-02-10",
    readTime: "7 min",
    image: "/images/merule-bois.png",
    imageAlt: "Charpente en bois attaquée par la mérule - mycélium cotonneux et bois fendu en cubes nécessitant un traitement fongicide",
    sections: [
      {
        title: "Comment la mérule s'installe-t-elle ?",
        content:
          "La mérule (Serpula lacrymans) se développe dans les zones sombres, humides et mal ventilées : caves, vides sanitaires, sous-sols, combles touchés par une infiltration. Elle a besoin d'un bois dont l'humidité dépasse 20 % et d'une absence de circulation d'air. Une fois installée, elle produit des filaments (syrrhotes) capables de traverser les murs et de transporter l'eau pour humidifier elle-même de nouveaux bois secs. C'est ce qui la rend si dangereuse et si difficile à arrêter.",
      },
      {
        title: "Danger n°1 : destruction rapide des bois de structure",
        content:
          "La mérule digère la cellulose du bois, qui perd alors toute résistance mécanique et se fend en petits cubes friables (pourriture cubique). Sur une panne, un solivage ou un plancher, cela peut conduire à un effondrement. Contrairement aux insectes, qui agissent sur plusieurs années, la mérule peut compromettre une structure en quelques mois seulement.",
      },
      {
        title: "Danger n°2 : propagation à toute la maison",
        content:
          "La mérule ne se limite pas au bois où elle est apparue. Ses filaments traversent les maçonneries, les plâtres et les isolants pour atteindre d'autres pièces de bois, parfois à plusieurs mètres de distance. Une attaque détectée dans une cave peut ainsi gagner les planchers et la charpente des étages. Plus on attend, plus la zone à traiter s'étend.",
      },
      {
        title: "Danger n°3 : un coût qui explose avec le temps",
        content:
          "Détectée tôt, une attaque de mérule se traite par assainissement, dépose ciblée et traitement fongicide. Détectée tard, elle impose le remplacement de pièces de structure, la dépose d'enduits et de planchers, et le traitement des maçonneries. Le coût peut être multiplié par cinq ou dix. La rapidité d'intervention est le facteur le plus important pour limiter la facture.",
      },
      {
        title: "Danger n°4 : impact sur la vente et la valeur du bien",
        content:
          "La présence de mérule doit être signalée lors d'une vente immobilière dans les zones couvertes par un arrêté préfectoral. Une mérule non déclarée peut entraîner une action en vice caché contre le vendeur. Au-delà de l'aspect légal, un bien touché par la mérule perd de sa valeur tant que le traitement et l'assainissement n'ont pas été réalisés et documentés.",
      },
      {
        title: "Comment éliminer la mérule efficacement ?",
        content:
          "Le traitement professionnel de la mérule se déroule en plusieurs étapes pour un résultat durable :",
        list: [
          "Recherche et suppression des causes d'humidité : infiltration, remontée capillaire, fuite ou défaut de ventilation. Sans cela, le champignon reviendrait.",
          "Dépose des bois contaminés : retrait et évacuation des pièces envahies par le mycélium, qui ne peuvent plus être conservées.",
          "Traitement fongicide : application en profondeur d'un fongicide certifié sur les bois conservés et traitement par injection des maçonneries contaminées.",
          "Assainissement et ventilation : mise en place des conditions pour assécher durablement la zone et empêcher tout retour du champignon.",
        ],
      },
      {
        title: "Mérule : pourquoi ne jamais attendre ?",
        content:
          "Face à la mérule, le temps joue toujours contre vous. Au moindre indice (filaments blancs, plaques brunes, odeur de champignon, bois qui se fend en cubes), il faut faire intervenir un professionnel sans tarder. Le diagnostic ACO-HABITAT est gratuit : il permet de confirmer la présence de mérule, d'en mesurer l'étendue et de mettre en place un traitement adapté avant que les dégâts ne deviennent structurels.",
      },
    ],
    faq: [
      {
        question: "Peut-on traiter la mérule soi-même ?",
        answer:
          "Non. Un traitement superficiel ne stoppe pas la mérule, qui continue de se propager dans les maçonneries et les bois voisins. Seul un traitement professionnel, combinant suppression de l'humidité, dépose des bois contaminés et fongicide certifié, élimine durablement le champignon.",
      },
      {
        question: "Combien coûte un traitement de mérule ?",
        answer:
          "Le coût varie fortement selon l'étendue : de quelques milliers d'euros pour une attaque localisée et détectée tôt, à beaucoup plus si des pièces de structure doivent être remplacées. C'est pourquoi une intervention rapide est essentielle pour limiter la facture.",
      },
      {
        question:
          "La mérule est-elle dangereuse pour la santé ?",
        answer:
          "La mérule s'attaque au bâti, pas directement à l'organisme, mais l'humidité et les moisissures associées peuvent dégrader la qualité de l'air intérieur et gêner les personnes sensibles. Assainir la zone améliore aussi le confort et la salubrité du logement.",
      },
    ],
    relatedServices: ["renovation-toiture", "diagnostic-ia", "isolation-thermique"],
    relatedGuides: [
      "quand-renover-toiture",
      "diagnostic-toiture-satellite",
    ],
  },
  {
    slug: "diagnostic-toiture-avant-achat",
    title: "État parasitaire avant achat immobilier",
    metaTitle: "État parasitaire avant achat immobilier : ce qu'il faut vérifier | ACO-HABITAT",
    metaDescription: "Vous achetez une maison ? Découvrez pourquoi et comment faire contrôler l'état des bois (insectes, mérule, humidité) avant de signer. Évitez les mauvaises surprises et négociez en connaissance de cause.",
    heroTitle: "Pourquoi faire contrôler les bois avant d'acheter une maison ?",
    heroDescription: "Une charpente attaquée par les insectes ou un plancher rongé par la mérule peut coûter des milliers d'euros de travaux. Ces dégâts sont souvent invisibles lors d'une simple visite. Voici comment vérifier l'état des bois avant de signer le compromis et éviter une mauvaise surprise financière.",
    datePublished: "2026-02-05",
    dateModified: "2026-02-14",
    readTime: "9 min",
    sections: [
      {
        title: "L'état parasitaire n'est pas toujours obligatoire... mais indispensable",
        content: "Le diagnostic termites (état parasitaire) n'est obligatoire que dans les zones faisant l'objet d'un arrêté préfectoral. Ailleurs, rien n'oblige le vendeur à faire contrôler l'état des bois, ni à signaler une attaque d'insectes ou de champignons (sauf vice caché avéré). Résultat : de nombreux acheteurs découvrent après la signature que la charpente est attaquée ou qu'un champignon s'est installé. Un contrôle préalable peut éviter une facture de plusieurs milliers d'euros.",
      },
      {
        title: "Les 5 points à vérifier sur les bois avant d'acheter",
        content: "Lors de la visite, concentrez-vous sur ces éléments, en particulier dans les combles, les caves et les pièces humides :",
        list: [
          "L'aspect de la charpente : recherchez les trous de sortie d'insectes, la sciure (vermoulure) au pied des poutres et les galeries en surface.",
          "Les signes de champignons : filaments blancs, plaques brunes, bois qui se fend en cubes, odeur de moisi ou de cave humide.",
          "L'humidité : auréoles, bois noircis, condensation, maçonneries humides au contact des bois. L'humidité est la cause numéro un des attaques.",
          "La solidité du bois : si possible, sondez discrètement les bois accessibles. Un bois mou, creux ou qui s'effrite a perdu sa résistance.",
          "Les zones à risque : caves, vides sanitaires, sous-pentes mal ventilées et planchers anciens sont les endroits les plus exposés.",
        ],
      },
      {
        title: "Comment un diagnostic vous aide à négocier",
        content: "Un diagnostic professionnel des bois détaille la nature de l'attaque, son étendue et le traitement nécessaire, avec une estimation de coût. Ce document objectif est un outil de négociation puissant : vous pouvez le présenter au vendeur ou à l'agent immobilier pour justifier une baisse de prix correspondant aux travaux à prévoir. Mieux vaut connaître l'état réel des bois avant de signer que de le découvrir après.",
      },
      {
        title: "Que faire si le diagnostic révèle une attaque grave ?",
        content: "Si le diagnostic révèle une attaque importante (mérule, charpente fortement dégradée), vous avez trois options :",
        list: [
          "Négocier le prix à la baisse : déduisez le coût estimé du traitement et du remplacement des bois du prix de vente.",
          "Demander au vendeur de faire traiter avant la vente : exigez une intervention par un professionnel certifié avec garantie.",
          "Renoncer à l'achat : si l'attaque est trop avancée (mérule étendue) et que le vendeur refuse de négocier, il est parfois plus sage de passer son chemin.",
        ],
      },
      {
        title: "Le bon timing pour le contrôle",
        content: "Idéalement, faites contrôler les bois dès que le bien vous intéresse sérieusement, avant de signer le compromis. Vous pouvez insérer une clause suspensive dans le compromis : « sous réserve d'un état des bois satisfaisant ». Cela vous laisse une porte de sortie si le contrôle révèle une attaque importante. Dans les zones à mérule ou à termites, le diagnostic réglementaire correspondant reste obligatoire.",
      },
    ],
    faq: [
      {
        question: "L'état parasitaire est-il obligatoire pour vendre une maison ?",
        answer: "Le diagnostic termites n'est obligatoire que dans les zones couvertes par un arrêté préfectoral. La présence de mérule doit également être signalée dans les zones concernées. Ailleurs, aucun diagnostic des bois n'est obligatoire, mais le vendeur reste tenu par la garantie des vices cachés.",
      },
      {
        question: "Peut-on se retourner contre le vendeur si on découvre la mérule après l'achat ?",
        answer: "Oui, si l'attaque existait avant la vente et que le vendeur le savait (ou aurait dû le savoir), vous pouvez invoquer la garantie des vices cachés. Vous avez 2 ans après la découverte du vice pour agir. Un diagnostic préalable documente l'état des bois au moment de l'achat.",
      },
      {
        question: "Combien coûte un contrôle des bois avant achat ?",
        answer: "Le diagnostic réalisé par ACO-HABITAT est gratuit et sans engagement. Pour un état parasitaire réglementaire établi par un diagnostiqueur certifié (obligatoire en zone termites), comptez entre 100 et 250 euros selon la surface.",
      },
    ],
    relatedServices: ["diagnostic-ia", "charpente", "renovation-toiture"],
    relatedGuides: [
      "quand-renover-toiture",
      "prix-renovation-toiture",
    ],
  },
  {
    slug: "glossaire-toiture",
    title: "Glossaire du traitement du bois",
    metaTitle: "Glossaire du traitement du bois : tous les termes expliqués | ACO-HABITAT",
    metaDescription:
      "Dictionnaire complet des termes du traitement du bois et de la charpente : capricorne, vrillette, mérule, vermoulure, bûchage, injection, classe d'emploi et 40+ définitions expliquées simplement.",
    heroTitle: "Glossaire du traitement du bois : tous les termes expliqués",
    heroDescription:
      "Vous ne comprenez pas le devis de traitement de votre charpente ? Capricorne, vrillette, mérule, bûchage, fongicide... Ce glossaire complet vous explique chaque terme en langage clair. Rédigé par des professionnels du traitement du bois.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "12 min",
    sections: [
      {
        title: "Structure et charpente",
        content:
          "La charpente est le squelette de votre toiture. Elle supporte la couverture et répartit les charges vers les murs porteurs. Voici les termes essentiels pour comprendre quelles pièces peuvent être attaquées :",
        list: [
          "Charpente : structure en bois qui soutient la toiture. On distingue la charpente traditionnelle (assemblage de poutres) et la charpente industrielle (fermettes préfabriquées).",
          "Fermette : élément préfabriqué en bois de la charpente industrielle, en forme de triangle. En sections fines, elle est particulièrement vulnérable aux insectes.",
          "Panne : poutre horizontale qui relie les fermes entre elles. On distingue la panne faîtière (en haut), les pannes intermédiaires et la panne sablière (en bas, sur les murs).",
          "Chevron : pièce de bois inclinée fixée sur les pannes, qui descend du faîtage jusqu'à l'égout.",
          "Liteau : petite pièce de bois clouée sur les chevrons, qui reçoit les tuiles ou ardoises. Souvent attaqué car de faible section.",
          "Volige : planche mince posée sur les chevrons pour former un support continu de couverture.",
          "Entrait : pièce horizontale basse de la ferme, qui relie les deux pieds de la charpente et empêche les murs de s'écarter.",
          "Arbalétrier : pièce inclinée de la ferme, allant de l'entrait au poinçon. Il supporte le poids de la toiture.",
          "Poinçon : pièce verticale de la ferme, reliant l'entrait au sommet et soutenant la panne faîtière.",
          "Solivage : ensemble des solives qui supportent un plancher. Souvent touché par la mérule en cas d'humidité.",
        ],
      },
      {
        title: "Les insectes xylophages",
        content:
          "Les insectes xylophages se nourrissent du bois, principalement au stade larvaire. Voici les principaux ennemis de la charpente :",
        list: [
          "Capricorne des maisons : le plus destructeur sur les bois résineux. Larves vivant jusqu'à 10 ans dans le bois, trous de sortie ovales de 6 à 10 mm.",
          "Vrillette : petite et grosse vrillette, qui apprécient les bois humides ou déjà fragilisés. Trous ronds de 1 à 4 mm.",
          "Lyctus : attaque les bois feuillus riches en amidon (chêne, châtaignier) et les bois récents. Vermoulure très fine comme du talc.",
          "Termite : insecte social qui creuse le bois de l'intérieur sans le perforer en surface. Réglementé par arrêté préfectoral dans les zones concernées.",
          "Larve : stade du développement de l'insecte qui creuse et digère le bois. C'est elle qui cause les dégâts, pas l'adulte.",
          "Xylophage : qui se nourrit du bois. Terme générique désignant les insectes mangeurs de bois.",
        ],
      },
      {
        title: "Les champignons et l'humidité",
        content:
          "Les champignons lignivores décomposent le bois en présence d'humidité. Ils sont souvent plus rapides et plus destructeurs que les insectes :",
        list: [
          "Mérule (Serpula lacrymans) : le plus redoutable des champignons lignivores. Filaments blancs, plaques brunes, pourriture cubique. Capable de traverser les maçonneries.",
          "Champignon lignivore : champignon qui se nourrit du bois et le détruit. La mérule et le coniophore en font partie.",
          "Mycélium : ensemble des filaments du champignon, qui colonisent le bois et les maçonneries.",
          "Fructification : organe reproducteur visible du champignon (plaque, console), qui libère les spores.",
          "Pourriture cubique : décomposition du bois qui se fend en petits cubes friables, typique des champignons de pourriture brune.",
          "Remontée capillaire : humidité du sol qui remonte dans les murs et entretient l'humidité du bâti, favorisant les champignons.",
          "Condensation : eau qui se dépose sur les surfaces froides, source d'humidité fréquente dans les combles mal ventilés.",
        ],
      },
      {
        title: "Les techniques de traitement",
        content:
          "Le traitement curatif du bois suit un protocole précis pour atteindre les larves et les champignons au cœur du bois :",
        list: [
          "Bûchage : retrait au burin des parties de bois dégradées, jusqu'à atteindre le bois sain.",
          "Brossage et dépoussiérage : préparation de la surface du bois pour permettre une bonne pénétration du produit.",
          "Injection : pose de chevilles-injecteurs dans les pièces de forte section pour faire pénétrer le produit sous pression au cœur du bois.",
          "Pulvérisation : application du produit de traitement sur l'ensemble des surfaces de bois.",
          "Fongicide : produit destiné à éliminer les champignons.",
          "Insecticide : produit destiné à éliminer les insectes xylophages et leurs larves.",
          "Traitement curatif : intervention sur un bois déjà attaqué pour stopper et éliminer l'agresseur.",
          "Traitement préventif : protection d'un bois sain contre une attaque future.",
        ],
      },
      {
        title: "Normes et garanties",
        content:
          "Le traitement du bois est encadré par des normes et des certifications qui garantissent l'efficacité de l'intervention :",
        list: [
          "Classe d'emploi : classement du bois selon son exposition à l'humidité (de la classe 1, intérieur sec, à la classe 5, immersion). Détermine le niveau de traitement nécessaire.",
          "Produit homologué : produit de traitement autorisé, dont l'efficacité et l'innocuité ont été évaluées.",
          "Applicateur certifié : professionnel formé et habilité à appliquer les produits de traitement dans le respect des dosages et des normes.",
          "CTB-A+ / CTB-P+ : certifications de qualité pour les entreprises de traitement et les produits, gages de sérieux.",
          "Garantie : engagement de l'entreprise sur la durabilité du traitement réalisé.",
          "État parasitaire : diagnostic de la présence d'agents de dégradation du bois, obligatoire en zone termites lors d'une vente.",
        ],
      },
      {
        title: "Termes administratifs et réglementaires",
        content:
          "Quelques notions utiles autour du traitement du bois et de la vente immobilière :",
        list: [
          "Arrêté préfectoral termites : décision qui rend obligatoire le diagnostic termites lors d'une vente dans une zone donnée.",
          "Arrêté mérule : zone où la présence de mérule doit être signalée lors d'une transaction immobilière.",
          "Vice caché : défaut grave non apparent et non signalé lors d'une vente. Une attaque de bois dissimulée peut être qualifiée de vice caché.",
          "Garantie des vices cachés : protection légale (article 1641 du Code civil) permettant à l'acheteur d'agir si un défaut grave non signalé apparaît.",
          "Devoir de conseil : obligation du notaire d'informer les parties sur les éléments importants de la transaction.",
          "DTU : Document Technique Unifié, règles de l'art que les professionnels doivent respecter.",
        ],
      },
    ],
    faq: [
      {
        question: "Quelle est la différence entre un capricorne et une vrillette ?",
        answer:
          "Le capricorne des maisons attaque surtout les bois résineux de charpente et laisse des trous ovales de 6 à 10 mm. La vrillette, plus petite, apprécie les bois humides et laisse des trous ronds de 1 à 4 mm. Les deux se traitent par bûchage, injection et pulvérisation.",
      },
      {
        question: "Qu'est-ce que la mérule exactement ?",
        answer:
          "La mérule (Serpula lacrymans) est un champignon lignivore qui décompose le bois en présence d'humidité. Surnommée la lèpre des maisons, elle se propage très vite, traverse les maçonneries et peut détruire une charpente ou un plancher en quelques mois.",
      },
      {
        question: "C'est quoi le bûchage en traitement du bois ?",
        answer:
          "Le bûchage consiste à retirer au burin les parties de bois dégradées par les insectes ou les champignons, jusqu'à atteindre le bois sain. C'est une étape préalable indispensable avant l'injection et la pulvérisation du produit de traitement.",
      },
    ],
    relatedServices: ["charpente", "renovation-toiture", "diagnostic-ia"],
    relatedGuides: ["quand-renover-toiture", "diagnostic-toiture-satellite"],
  },
  {
    slug: "degats-grele-toiture",
    title: "Le capricorne des maisons",
    metaTitle:
      "Capricorne des maisons : reconnaître, traiter et prévenir | ACO-HABITAT",
    metaDescription:
      "Le capricorne des maisons est le plus destructeur des insectes xylophages. Découvrez comment le reconnaître, évaluer les dégâts et traiter durablement votre charpente. Guide complet d'experts.",
    heroTitle:
      "Le capricorne des maisons : comment le reconnaître et le traiter ?",
    heroDescription:
      "Le capricorne des maisons est le plus redoutable des insectes xylophages : ses larves dévorent les bois résineux de charpente pendant des années avant d'être repérées. Voici le guide complet pour reconnaître une attaque, évaluer les dégâts et traiter efficacement votre charpente.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "10 min",
    sections: [
      {
        title: "Qu'est-ce que le capricorne des maisons ?",
        content:
          "Le capricorne des maisons (Hylotrupes bajulus) est un coléoptère dont la larve s'attaque exclusivement aux bois résineux (sapin, épicéa, pin), c'est-à-dire l'essentiel des charpentes modernes. La femelle pond dans les fissures du bois ; les larves creusent ensuite des galeries pendant 3 à 10 ans, ne ressortant qu'à l'état adulte. C'est cette longue phase larvaire, silencieuse et invisible, qui rend le capricorne si dangereux pour une charpente.",
      },
      {
        title: "Comment reconnaître une attaque de capricorne",
        content:
          "Plusieurs indices trahissent la présence du capricorne. Plus ils sont nombreux, plus l'attaque est avancée :",
        list: [
          "Trous de sortie ovales : de 6 à 10 mm, à bords nets, par lesquels les adultes s'échappent. Ils n'apparaissent que tardivement, après plusieurs années.",
          "Vermoulure : sciure rejetée par les larves, mêlée de petits cylindres, parfois visible au pied des poutres.",
          "Bruit de grignotement : par temps calme, on entend parfois les larves ronger le bois, surtout au printemps et en été.",
          "Galeries internes : en sondant le bois, on découvre des galeries ovales creusées dans le sens des fibres, sous une fine pellicule de surface intacte.",
          "Bois qui sonne creux : une poutre attaquée sonne creux et peut s'effondrer en surface sous la pression du poinçon.",
        ],
      },
      {
        title: "Comment évaluer l'étendue des dégâts",
        content:
          "Avant tout traitement, il faut évaluer l'ampleur de l'attaque pour adapter l'intervention :",
        list: [
          "Sondage systématique : chaque pièce de charpente accessible est sondée à l'aiguille et au poinçon pour repérer les galeries et les zones affaiblies.",
          "Repérage des pièces porteuses : on vérifie en priorité les pannes, chevrons et entraits, dont la défaillance compromet la structure.",
          "Mesure d'humidité : un bois humide est plus vulnérable ; la mesure aide à comprendre les causes de l'attaque.",
          "Évaluation de la résistance : les pièces qui ont perdu trop de matière devront être renforcées ou remplacées, pas seulement traitées.",
          "Diagnostic professionnel : un expert ACO-HABITAT établit gratuitement un état précis et un devis adapté.",
        ],
      },
      {
        title: "Le traitement curatif contre le capricorne",
        content:
          "Le traitement d'une charpente attaquée par le capricorne suit un protocole précis, réalisé par un applicateur certifié :",
        list: [
          "Bûchage : retrait des parties de bois dégradées en surface jusqu'au bois sain.",
          "Brossage et dépoussiérage : préparation des bois pour une bonne pénétration du produit.",
          "Injection sous pression : pose de chevilles-injecteurs dans les pièces de forte section pour atteindre les larves au cœur du bois.",
          "Pulvérisation : application d'un insecticide certifié sur l'ensemble des bois.",
          "Renforcement ou remplacement : les pièces trop affaiblies sont consolidées ou remplacées par du bois traité.",
        ],
      },
      {
        title: "Prévenir une attaque de capricorne",
        content:
          "Mieux vaut prévenir que guérir. Plusieurs mesures réduisent le risque d'attaque :",
        list: [
          "Traitement préventif des bois : protège une charpente saine, neuve ou rénovée, contre les insectes pendant de nombreuses années.",
          "Maîtrise de l'humidité : un bois sec et bien ventilé est moins vulnérable aux insectes et aux champignons.",
          "Inspection régulière : surveillez vos combles, surtout dans les maisons anciennes, pour détecter une attaque tôt.",
          "Bois traité en classe adaptée : lors d'une rénovation ou d'une construction, utilisez du bois traité en classe d'emploi appropriée.",
          "Intervention rapide au moindre doute : un diagnostic gratuit dès les premiers indices limite l'étendue des travaux.",
        ],
      },
    ],
    faq: [
      {
        question:
          "Le capricorne des maisons est-il dangereux pour la structure ?",
        answer:
          "Oui. Les larves de capricorne creusent les bois résineux de charpente pendant plusieurs années et peuvent leur faire perdre une grande partie de leur résistance. Sur des pièces porteuses, une attaque non traitée peut compromettre la solidité de la charpente.",
      },
      {
        question:
          "Combien coûte le traitement d'une charpente attaquée par le capricorne ?",
        answer:
          "Le traitement curatif (bûchage, injection, pulvérisation) coûte en général entre 20 et 45 euros/m² de surface au sol. Si des pièces doivent être renforcées ou remplacées, le coût augmente. Le diagnostic ACO-HABITAT est gratuit et permet un chiffrage précis.",
      },
      {
        question:
          "Puis-je traiter le capricorne moi-même ?",
        answer:
          "Un traitement de surface en vente libre ne pénètre pas assez profondément pour atteindre les larves au cœur du bois. Seul un traitement professionnel, avec bûchage et injection sous pression par un applicateur certifié, élimine durablement l'infestation.",
      },
      {
        question:
          "Comment savoir si une attaque de capricorne est encore active ?",
        answer:
          "Une attaque active se reconnaît à la présence de vermoulure fraîche, de trous clairs récents et parfois au bruit des larves. Un professionnel confirme l'activité de l'attaque lors du diagnostic et adapte le traitement en conséquence.",
      },
    ],
    relatedServices: ["reparation-toiture", "charpente", "diagnostic-ia"],
    relatedGuides: ["quand-renover-toiture", "prix-renovation-toiture"],
  },
  {
    slug: "duree-de-vie-toiture",
    title: "Durée de vie d'une charpente",
    metaTitle:
      "Durée de vie d'une charpente : combien de temps dure le bois ? | ACO-HABITAT",
    metaDescription:
      "Combien de temps dure une charpente en bois ? Découvrez les facteurs qui réduisent sa longévité (insectes, champignons, humidité), les signes d'usure et comment prolonger sa durée de vie.",
    heroTitle:
      "Durée de vie d'une charpente : combien de temps dure le bois ?",
    heroDescription:
      "Une charpente bien entretenue peut durer plusieurs siècles, comme en témoignent les maisons anciennes. Mais sans surveillance, les insectes xylophages, les champignons et l'humidité peuvent la détruire en quelques années. Voici les facteurs qui déterminent la longévité d'une charpente et comment la préserver.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "9 min",
    sections: [
      {
        title: "De quoi dépend la longévité d'une charpente ?",
        content:
          "Contrairement à une idée reçue, la durée de vie d'une charpente n'est pas fixée d'avance : elle dépend surtout des conditions dans lesquelles le bois est conservé. Une charpente maintenue au sec, ventilée et traitée peut traverser les siècles. À l'inverse, une charpente exposée à l'humidité ou attaquée par les insectes peut être ruinée en quelques années. Les trois grands ennemis du bois sont l'humidité, les insectes xylophages et les champignons lignivores.",
      },
      {
        title: "Les facteurs qui réduisent la durée de vie",
        content:
          "Plusieurs facteurs accélèrent la dégradation d'une charpente et peuvent réduire considérablement sa durée de vie :",
        list: [
          "L'humidité : c'est l'ennemi numéro un. Un bois dont l'humidité dépasse 20 % devient vulnérable aux champignons, en particulier la mérule.",
          "Les insectes xylophages : capricornes, vrillettes et lyctus creusent le bois de l'intérieur et lui font perdre sa résistance sur plusieurs années.",
          "Les champignons lignivores : la mérule et les autres champignons décomposent le bois et peuvent détruire des pièces de structure en quelques mois.",
          "Le manque de ventilation : des combles ou un vide sanitaire mal ventilés retiennent l'humidité et favorisent les attaques.",
          "Les infiltrations : une fuite de toiture ou une remontée capillaire non traitée entretient une humidité propice aux champignons.",
          "L'absence d'entretien : une charpente jamais inspectée laisse une attaque se développer sans contrôle jusqu'à ce que les dégâts soient majeurs.",
        ],
      },
      {
        title: "Les signes qu'une charpente est en danger",
        content:
          "Comment savoir si votre charpente doit être traitée ? Voici les signes d'alerte à surveiller :",
        list: [
          "Trous et sciure : trous ronds ou ovales et petits tas de vermoulure signalent une attaque d'insectes active.",
          "Filaments blancs ou plaques brunes : signes d'une attaque de champignon, en particulier la mérule. Urgence.",
          "Bois mou ou friable : un bois qui s'enfonce sous le poinçon ou se fend en cubes a perdu sa résistance.",
          "Odeur de moisi : une odeur de cave humide persistante traduit une humidité excessive et un risque fongique.",
          "Affaissement : une ligne de faîtage qui n'est plus droite ou un plancher qui fléchit signale un problème de structure grave.",
          "Humidité visible : auréoles, bois noircis, condensation ou maçonneries humides au contact des bois.",
        ],
      },
      {
        title: "Comment prolonger la durée de vie de votre charpente",
        content:
          "Un entretien régulier et une bonne prévention peuvent préserver une charpente pendant des générations. Voici les bonnes pratiques :",
        list: [
          "Maîtriser l'humidité : traitez sans tarder toute infiltration ou remontée capillaire, et assurez une bonne ventilation des combles et vides sanitaires.",
          "Traitement préventif : protégez une charpente saine contre les insectes et champignons par un traitement préventif, surtout en zone humide.",
          "Inspection régulière : faites contrôler vos bois périodiquement pour détecter une attaque tôt et limiter le coût des travaux.",
          "Intervention rapide : au moindre indice (trous, sciure, filaments), faites établir un diagnostic sans attendre.",
          "Bois traité de qualité : lors de travaux, utilisez du bois traité en classe d'emploi adaptée à son exposition.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure une charpente en bois ?",
        answer:
          "Une charpente bien conçue, maintenue au sec et entretenue peut durer plus d'un siècle, voire plusieurs. Sa durée de vie dépend surtout de la maîtrise de l'humidité et de la protection contre les insectes et les champignons. Sans entretien, une attaque peut la dégrader en quelques années.",
      },
      {
        question: "Quel est le principal ennemi d'une charpente ?",
        answer:
          "L'humidité est le principal ennemi du bois : elle favorise le développement des champignons lignivores (dont la mérule) et fragilise le bois face aux insectes. Maîtriser l'humidité est la clé d'une charpente durable.",
      },
      {
        question: "Comment savoir si ma charpente doit être traitée ?",
        answer:
          "Les signes principaux sont : trous et sciure (insectes), filaments blancs ou plaques brunes (champignons), bois mou ou friable, odeur de moisi, affaissement et humidité visible. Un diagnostic gratuit ACO-HABITAT permet de savoir précisément à quoi vous avez affaire.",
      },
    ],
    relatedServices: ["diagnostic-ia", "charpente", "demoussage"],
    relatedGuides: ["quand-renover-toiture", "glossaire-toiture"],
  },
  {
    slug: "signes-mauvaise-isolation-toiture",
    title: "Signes d'un problème d'humidité",
    metaTitle:
      "10 signes d'un problème d'humidité dans la maison | Guide expert ACO-HABITAT",
    metaDescription:
      "Comment détecter un problème d'humidité avant qu'il ne détruise vos bois ? Condensation, moisissures, remontées capillaires... Découvrez les 10 signes d'alerte et les solutions de traitement.",
    heroTitle:
      "10 signes d'un problème d'humidité dans votre maison",
    heroDescription:
      "L'humidité est la cause numéro un des attaques de champignons et fragilise le bois face aux insectes. La détecter tôt permet d'éviter qu'une charpente ou un plancher ne soit détruit. Voici les 10 signes d'alerte et les solutions pour assainir durablement votre habitation.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "8 min",
    sections: [
      {
        title: "Les signes visibles d'un problème d'humidité",
        content:
          "Certains signes sont détectables à l'œil nu, sans outil ni compétence technique :",
        list: [
          "Auréoles et taches sombres : sur les murs, les plafonds ou la charpente, elles signalent une infiltration ou une condensation chronique.",
          "Moisissures : taches noires ou vertes sur les murs, les bois ou dans les angles, favorisées par un excès d'humidité.",
          "Salpêtre : dépôt blanchâtre au bas des murs, signe caractéristique d'une remontée capillaire.",
          "Peinture ou enduit qui cloque : des cloques ou un décollement de revêtement traduisent une humidité présente dans le support.",
          "Bois noirci ou humide : une charpente ou un solivage qui reste humide et fonce est en danger d'attaque fongique.",
        ],
      },
      {
        title: "Les signes ressentis et mesurables",
        content:
          "D'autres signes se ressentent ou se vérifient avec des outils :",
        list: [
          "Odeur de moisi : une odeur de cave humide persistante traduit la présence d'humidité et souvent de moisissures ou de champignons.",
          "Sensation de froid et d'humidité : une pièce qui reste froide et humide malgré le chauffage signale un excès d'humidité dans les parois.",
          "Condensation sur les surfaces froides : buée sur les fenêtres, les murs froids ou les tuyaux, signe d'un défaut de ventilation.",
          "Linge et objets qui moisissent : dans une cave ou un placard, des objets qui moisissent rapidement révèlent un taux d'humidité élevé.",
          "Humidimètre : la mesure du taux d'humidité du bois et des murs confirme et localise le problème. Au-delà de 20 % d'humidité, le bois est exposé aux champignons.",
        ],
      },
      {
        title: "Les causes possibles et leurs solutions",
        content:
          "L'humidité peut avoir plusieurs origines, chacune appelant une solution adaptée :",
        list: [
          "Remontée capillaire : l'eau du sol remonte dans les murs. Solution : injection d'une barrière étanche dans le mur pour stopper la remontée.",
          "Infiltration : eau qui pénètre par une fissure, une toiture ou une façade. Solution : réparer la source de l'infiltration et assainir.",
          "Condensation : eau qui se dépose sur les surfaces froides, faute de ventilation. Solution : améliorer la ventilation du logement.",
          "Défaut de ventilation : combles, caves ou vides sanitaires confinés. Solution : créer une circulation d'air pour évacuer l'humidité.",
          "Dégât des eaux : fuite de plomberie. Solution : réparer la fuite puis assécher et traiter les bois exposés.",
        ],
      },
      {
        title: "Pourquoi traiter l'humidité avant le bois",
        content:
          "Traiter une charpente attaquée sans supprimer la source d'humidité revient à soigner les symptômes sans guérir la maladie : le champignon réapparaît et les insectes restent favorisés. C'est pourquoi ACO-HABITAT recherche systématiquement la cause de l'humidité avant tout traitement fongicide. Une fois la source maîtrisée (barrière contre les remontées capillaires, réparation des infiltrations, ventilation), le traitement des bois devient durable et la maison retrouve un environnement sain.",
      },
    ],
    faq: [
      {
        question:
          "Pourquoi l'humidité abîme-t-elle la charpente ?",
        answer:
          "Un bois dont l'humidité dépasse 20 % devient le terrain idéal des champignons lignivores comme la mérule, qui le décomposent. L'humidité fragilise aussi le bois face aux insectes. Maîtriser l'humidité est donc indispensable pour protéger une charpente.",
      },
      {
        question:
          "Comment savoir si j'ai des remontées capillaires ?",
        answer:
          "Les remontées capillaires se reconnaissent à un mur humide sur sa partie basse (jusqu'à 1 à 1,5 m), souvent accompagné de salpêtre, de décollement d'enduit et d'une sensation de froid. Un humidimètre confirme le diagnostic. Le traitement consiste à injecter une barrière étanche.",
      },
      {
        question:
          "Quelle est la meilleure solution contre l'humidité ?",
        answer:
          "Il n'y a pas de solution universelle : tout dépend de l'origine de l'humidité. Remontée capillaire, infiltration, condensation ou défaut de ventilation appellent des traitements différents. Un diagnostic précis est indispensable pour choisir la bonne solution.",
      },
    ],
    relatedServices: ["isolation-thermique", "diagnostic-ia", "renovation-toiture"],
    relatedGuides: ["duree-de-vie-toiture", "prix-renovation-toiture"],
  },
  {
    slug: "methodologie-diagnostic-ia",
    title: "Notre méthode de diagnostic et de traitement",
    metaTitle:
      "Notre méthode de diagnostic et de traitement du bois | Comment fonctionne ACO-HABITAT",
    metaDescription:
      "Découvrez la méthode ACO-HABITAT pour diagnostiquer et traiter vos bois : inspection, identification de l'agresseur, recherche des causes d'humidité, bûchage, injection et pulvérisation.",
    heroTitle:
      "Comment nous diagnostiquons et traitons vos bois : la méthode complète",
    heroDescription:
      "Depuis 2006, ACO-HABITAT applique une méthode rigoureuse pour traiter durablement les charpentes attaquées. Voici en toute transparence comment nous diagnostiquons l'agresseur, recherchons les causes et appliquons le traitement adapté.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "7 min",
    sections: [
      {
        title: "Étape 1 : l'inspection des bois",
        content:
          "Tout commence par une inspection complète des bois accessibles : charpente, solivage, planchers, escaliers, menuiseries. Nous recherchons les indices d'attaque (trous, vermoulure, galeries, filaments, plaques) et repérons les zones humides. Cette inspection visuelle est complétée par un sondage des pièces à l'aiguille et au poinçon pour évaluer la profondeur des dégâts et repérer les bois qui ont perdu leur résistance.",
      },
      {
        title: "Étape 2 : l'identification de l'agresseur",
        content:
          "L'identification précise de l'agresseur conditionne tout le traitement. Nous distinguons :",
        list: [
          "Les insectes xylophages : capricorne (trous ovales 6-10 mm), vrillette (trous ronds 1-4 mm), lyctus (vermoulure fine). Chacun a un comportement et un traitement spécifiques.",
          "Les champignons lignivores : mérule (filaments blancs, plaques brunes, pourriture cubique) et autres champignons d'humidité, qui imposent un traitement fongicide et l'assainissement.",
          "L'humidité : sa nature (remontée capillaire, infiltration, condensation) est identifiée car elle est la cause de la plupart des attaques.",
          "L'activité de l'attaque : nous déterminons si l'attaque est active (en cours) ou ancienne, ce qui change la nature de l'intervention.",
        ],
      },
      {
        title: "Étape 3 : la recherche des causes",
        content:
          "Traiter le bois sans traiter la cause serait inutile. Nous mesurons le taux d'humidité du bois et des maçonneries, et identifions l'origine de l'humidité : remontée capillaire depuis le sol, infiltration par la toiture ou la façade, condensation due à un défaut de ventilation, ou fuite de plomberie. C'est cette recherche des causes qui garantit la durabilité du traitement, en particulier face aux champignons.",
      },
      {
        title: "Étape 4 : le traitement",
        content:
          "Le traitement est réalisé par un applicateur certifié avec des produits homologués, selon un protocole précis :",
        list: [
          "Bûchage : retrait des parties de bois dégradées jusqu'au bois sain.",
          "Brossage et dépoussiérage : préparation des surfaces pour une bonne pénétration du produit.",
          "Injection sous pression : pose de chevilles-injecteurs dans les pièces de forte section pour atteindre les larves ou le champignon au cœur du bois.",
          "Pulvérisation : application du produit (insecticide ou fongicide) sur l'ensemble des bois.",
          "Traitement des maçonneries : en cas de mérule, injection des murs contaminés.",
          "Renforcement ou remplacement : les pièces trop affaiblies sont consolidées ou remplacées par du bois traité.",
        ],
      },
      {
        title: "Étape 5 : l'assainissement et la prévention",
        content:
          "Une fois l'agresseur éliminé et la cause d'humidité traitée, nous mettons en place les conditions pour empêcher tout retour : assèchement des zones touchées, amélioration de la ventilation, et traitement préventif des bois conservés. Cette dernière étape transforme une intervention curative en protection durable.",
      },
      {
        title: "Notre engagement de transparence",
        content:
          "Nous nous engageons à vous expliquer clairement la nature du problème, les bois concernés et le traitement proposé, sans jargon et sans en rajouter. Le diagnostic est gratuit et sans engagement, le devis est détaillé, et le traitement est garanti. Notre objectif : que vous compreniez exactement ce qui est fait et pourquoi.",
      },
    ],
    faq: [
      {
        question: "Le diagnostic est-il vraiment gratuit ?",
        answer:
          "Oui. L'inspection des bois, l'identification de l'agresseur et la remise d'un devis sont gratuites et sans engagement. Vous n'êtes engagé que si vous décidez de faire réaliser le traitement.",
      },
      {
        question: "Pourquoi rechercher les causes d'humidité avant de traiter ?",
        answer:
          "Parce qu'un traitement fongicide sans suppression de l'humidité est voué à l'échec : le champignon réapparaît. La recherche et le traitement des causes (remontée capillaire, infiltration, ventilation) sont indispensables pour un résultat durable.",
      },
      {
        question: "Vos produits sont-ils dangereux ?",
        answer:
          "Nous utilisons des produits homologués, appliqués par un applicateur certifié dans le respect des dosages et des consignes de sécurité. Des précautions simples (aération, éloignement temporaire) sont indiquées au cas par cas.",
      },
    ],
    relatedServices: ["diagnostic-ia", "charpente", "renovation-toiture"],
    relatedGuides: ["diagnostic-toiture-satellite", "glossaire-toiture"],
  },
  {
    slug: "diagnostic-toiture-achat-vente-immobilier",
    title: "Traitement du bois et transaction immobilière",
    metaTitle:
      "Traitement du bois avant achat ou vente de maison | ACO-HABITAT",
    metaDescription:
      "Pourquoi contrôler l'état des bois avant d'acheter ou vendre une maison ? Insectes, mérule, humidité : découvrez comment protéger votre transaction immobilière et éviter les litiges.",
    heroTitle:
      "Traitement du bois : un enjeu clé de votre transaction immobilière",
    heroDescription:
      "Que vous soyez acheteur, vendeur, agent immobilier ou notaire, l'état des bois (charpente, planchers, menuiseries) est un enjeu majeur dans toute transaction. Une attaque d'insectes ou de mérule peut coûter cher et entraîner des litiges. Voici comment sécuriser la vente.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "8 min",
    sections: [
      {
        title: "Acheteur : pourquoi contrôler les bois avant d'acheter",
        content: `Une charpente attaquée par les insectes ou un plancher rongé par la mérule peut représenter plusieurs milliers, voire dizaines de milliers d'euros de travaux. Or, en dehors des zones soumises à un diagnostic termites ou mérule obligatoire, rien n'oblige le vendeur à faire contrôler l'état des bois.

Faire contrôler les bois avant d'acheter vous permet de :
- **Connaître l'état réel** de la charpente, des planchers et des menuiseries
- **Négocier le prix** en vous appuyant sur un diagnostic objectif
- **Anticiper les travaux** de traitement et les intégrer dans votre financement
- **Éviter les mauvaises surprises** : capricorne, vrillette, mérule, humidité

Le diagnostic ACO-HABITAT est gratuit et sans engagement. C'est l'un des contrôles les plus rentables avant un achat immobilier.`,
      },
      {
        title: "Vendeur : comment l'état des bois impacte votre vente",
        content: `En tant que vendeur, l'état de la charpente est souvent examiné de près par les acheteurs et leurs conseils. Une charpente saine, ou traitée et documentée, rassure et facilite la vente.

Les avantages d'un diagnostic des bois pour le vendeur :
- **Transparence** : vous montrez que vous n'avez rien à cacher
- **Confiance** : un diagnostic objectif rassure plus qu'une simple affirmation
- **Sécurité juridique** : signaler l'état des bois limite le risque d'action en vice caché
- **Rapidité** : les acheteurs hésitent moins quand les bois sont documentés

Si une attaque est détectée, faire réaliser le traitement avant la vente, avec garantie à l'appui, est souvent un excellent argument commercial.`,
      },
      {
        title: "Agent immobilier : un contrôle qui sécurise le mandat",
        content: `Proposer un contrôle de l'état des bois à vos clients est un service qui vous démarque et qui sécurise la transaction.

Pour l'agent immobilier :
- **Outil de prospection** : proposez un diagnostic gratuit pour décrocher un mandat
- **Service à valeur ajoutée** : intégrez l'état des bois au dossier de vente
- **Prévention des litiges** : un défaut de bois non signalé est une cause fréquente de contentieux post-vente
- **Confiance renforcée** entre vendeur et acheteur

En anticipant la question des bois, vous évitez qu'une découverte tardive ne fasse échouer la vente au dernier moment.`,
      },
      {
        title: "Notaire : sécuriser l'acte et le devoir de conseil",
        content: `Le notaire joue un rôle central dans la transaction. Un diagnostic de l'état des bois, là où il n'est pas obligatoire, constitue une pièce complémentaire précieuse.

Intérêts pour le notaire :
- **Devoir de conseil** : informer les parties de l'état des bois renforce votre mission
- **Prévention des litiges** : un vice caché lié aux bois (mérule, capricorne) est une cause fréquente de contentieux
- **Documentation** : le rapport de diagnostic constitue une pièce objective à annexer
- **Protection** : en cas de litige, vous démontrez que l'information était disponible

Dans les zones soumises à arrêté, les diagnostics termites et mérule obligatoires doivent évidemment figurer au dossier.`,
      },
      {
        title: "Comment se déroule le diagnostic des bois",
        content: `Le processus est simple et rapide :

1. **Prise de contact** : vous nous indiquez le bien et le contexte (achat, vente, doute)
2. **Inspection sur place** : nous contrôlons la charpente, les planchers et les menuiseries accessibles
3. **Identification** : nous repérons les attaques d'insectes, de champignons et les zones humides
4. **Remise d'un état des lieux** : nature du problème, étendue, traitement préconisé et devis

Le diagnostic est gratuit et sans engagement. En cas d'attaque, nous proposons un traitement réalisé par un applicateur certifié et garanti.`,
      },
      {
        title: "Aspects juridiques : ce que dit la loi",
        content: `Plusieurs règles encadrent l'état des bois lors d'une transaction :

- Le **diagnostic termites (état parasitaire)** est obligatoire dans les zones couvertes par un arrêté préfectoral
- La présence de **mérule** doit être signalée dans les zones concernées par un arrêté
- L'article 1641 du Code civil prévoit la **garantie des vices cachés** : une attaque grave non signalée peut permettre à l'acheteur de demander l'annulation de la vente ou une réduction du prix
- Le vendeur a une **obligation d'information** sur les défauts connus du bien
- Le notaire a un **devoir de conseil** envers les deux parties

Un diagnostic des bois, même hors zone obligatoire, est un élément de transparence qui protège le vendeur contre une accusation de dissimulation et informe l'acheteur des risques.`,
      },
    ],
    faq: [
      {
        question: "Le diagnostic des bois est-il obligatoire pour vendre une maison ?",
        answer:
          "Le diagnostic termites n'est obligatoire qu'en zone soumise à arrêté préfectoral, et la mérule doit être signalée dans les zones concernées. Ailleurs, aucun diagnostic des bois n'est imposé, mais la garantie des vices cachés s'applique : mieux vaut contrôler et documenter l'état des bois.",
      },
      {
        question: "Que risque un vendeur qui cache une attaque de mérule ?",
        answer:
          "Un vendeur qui dissimule une attaque connue s'expose à une action en garantie des vices cachés : l'acheteur peut demander l'annulation de la vente ou une réduction du prix, dans un délai de 2 ans après la découverte du vice.",
      },
      {
        question: "Combien coûte un diagnostic des bois avant transaction ?",
        answer:
          "Le diagnostic réalisé par ACO-HABITAT est gratuit et sans engagement. Pour un état parasitaire réglementaire établi par un diagnostiqueur certifié (obligatoire en zone termites), comptez entre 100 et 250 euros selon la surface.",
      },
    ],
    relatedServices: ["diagnostic-ia", "charpente", "renovation-toiture"],
    relatedGuides: ["diagnostic-toiture-avant-achat", "glossaire-toiture"],
  },
]

export function getGuideBySlug(slug: string): GuideData | undefined {
  return guidesData.find((g) => g.slug === slug)
}

export function getAllGuideSlugs(): string[] {
  return guidesData.map((g) => g.slug)
}
