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
  sections: GuideSection[]
  faq: GuideFAQ[]
  relatedServices: string[]
  relatedGuides: string[]
}

export const guidesData: GuideData[] = [
  {
    slug: "diagnostic-toiture-satellite",
    title: "Diagnostic toiture par satellite",
    metaTitle:
      "Comment diagnostiquer sa toiture par satellite en 2026 ? | Guide ACO-HABITAT",
    metaDescription:
      "Decouvrez comment analyser l'etat de votre toiture gratuitement grace a une image satellite et l'intelligence artificielle. Guide complet : methode, outils et interpretation des resultats.",
    heroTitle: "Comment diagnostiquer l'etat de sa toiture par satellite ?",
    heroDescription:
      "Il est desormais possible d'analyser l'etat de votre toiture sans monter sur le toit. Grace aux images satellites et a l'intelligence artificielle, un diagnostic complet peut etre realise en moins de 30 secondes. Voici comment ca fonctionne.",
    datePublished: "2026-01-15",
    dateModified: "2026-02-10",
    readTime: "8 min",
    sections: [
      {
        title: "Pourquoi diagnostiquer sa toiture a distance ?",
        content:
          "Monter sur un toit est dangereux : chaque annee, des milliers d'accidents surviennent lors d'inspections de toiture par des particuliers. Le diagnostic par satellite elimine ce risque tout en offrant une precision comparable a une inspection physique. Les images satellites haute resolution (Google Maps, Bing Maps) combinees a l'intelligence artificielle permettent de detecter les problemes visibles depuis le ciel : mousse, tuiles cassees, affaissements et zones d'infiltration potentielles.",
      },
      {
        title: "Comment fonctionne le diagnostic IA par satellite ?",
        content:
          "L'outil de diagnostic ACO-HABITAT utilise un algorithme d'intelligence artificielle entraine sur plus de 50 000 images de toitures. Lorsque vous soumettez une photo de votre toit, l'IA superpose trois calques d'analyse pour identifier les problemes :",
        list: [
          "Calque vegetal : detecte la mousse, le lichen et toute vegetation qui s'installe sur votre couverture. Ces organismes retiennent l'humidite et accelerent la degradation des materiaux.",
          "Calque structurel : identifie les tuiles cassees, deplacees, manquantes ou fissurees. Detecte aussi les problemes de faitage, de rives et d'aretiers.",
          "Calque etancheite : repere les traces d'humidite, les zones de stagnation d'eau, les points faibles au niveau des noues et des penetrations (cheminee, velux).",
        ],
      },
      {
        title: "Quelle image utiliser pour le diagnostic ?",
        content:
          "La qualite du diagnostic depend directement de la qualite de l'image fournie. Voici les sources recommandees par ordre de preference :",
        list: [
          "Photo par drone : la meilleure option. Resolution tres elevee, angle de vue optimal et image recente. Si vous disposez d'un drone ou pouvez en emprunter un, c'est la source ideale.",
          "Google Maps vue satellite : gratuit et accessible a tous. Allez sur Google Maps, passez en vue satellite et zoomez sur votre toiture. Faites une capture d'ecran nette de l'ensemble du toit.",
          "Bing Maps Bird's eye : l'alternative a Google Maps qui offre parfois de meilleures images dans certaines zones de France.",
          "Photo aerienne existante : si vous avez une photo de votre maison prise depuis un point en hauteur (voisin, colline), elle peut convenir si la toiture est bien visible.",
        ],
      },
      {
        title: "Comment interpreter les resultats du diagnostic ?",
        content:
          "Le rapport de diagnostic classe chaque probleme detecte par niveau d'urgence. Les zones rouges indiquent des problemes necessitant une intervention rapide (fuites actives, tuiles manquantes). Les zones orange signalent des degradations a surveiller (mousse epaisse, fissures). Les zones vertes confirment les parties en bon etat. Un pourcentage global d'etat est attribue a votre toiture, accompagne de recommandations de travaux chiffrees.",
      },
      {
        title: "Quelles sont les limites du diagnostic satellite ?",
        content:
          "Le diagnostic par satellite est un excellent outil de pre-diagnostic, mais il a ses limites. Il ne peut pas detecter les problemes invisibles depuis l'exterieur : etat de la charpente, isolation, ventilation sous-toiture. C'est pourquoi ACO-HABITAT propose systematiquement une visite technique sur site pour completer le diagnostic IA avant tout devis de travaux. Le diagnostic IA permet neanmoins d'identifier 80 a 90% des problemes courants et de prioriser les interventions.",
      },
    ],
    faq: [
      {
        question:
          "Le diagnostic de toiture par satellite est-il fiable ?",
        answer:
          "Oui, notre IA atteint une precision de 98% pour la detection des problemes visibles (mousse, tuiles cassees, infiltrations). Le diagnostic est ensuite valide par nos experts couvreurs avant toute recommandation de travaux.",
      },
      {
        question: "Combien coute un diagnostic de toiture par satellite ?",
        answer:
          "Le diagnostic par satellite via notre outil IA est 100% gratuit et sans engagement. Vous recevez un rapport complet en moins de 30 secondes.",
      },
      {
        question:
          "Puis-je utiliser une photo Google Maps pour le diagnostic ?",
        answer:
          "Oui, une capture d'ecran de Google Maps en vue satellite fonctionne parfaitement. Assurez-vous de zoomer suffisamment pour que votre toiture soit bien visible et nette.",
      },
    ],
    relatedServices: ["diagnostic-ia", "couverture", "reparation-toiture"],
    relatedGuides: [
      "quand-renover-toiture",
      "mousse-toiture-dangers",
    ],
  },
  {
    slug: "quand-renover-toiture",
    title: "Quand renover sa toiture",
    metaTitle:
      "Quand faut-il renover sa toiture ? Les 7 signes a surveiller | ACO-HABITAT",
    metaDescription:
      "Decouvrez les 7 signes qui indiquent que votre toiture a besoin d'une renovation. Age, fuites, mousse, isolation : guide complet pour savoir quand agir.",
    heroTitle: "Quand faut-il renover sa toiture ? Les 7 signes qui ne trompent pas",
    heroDescription:
      "Votre toiture protege votre maison, mais elle ne dure pas eternellement. Savoir reconnaitre les signes de vieillissement permet d'agir au bon moment et d'eviter des reparations beaucoup plus couteuses. Voici les 7 indicateurs qui doivent vous alerter.",
    datePublished: "2026-01-20",
    dateModified: "2026-02-10",
    readTime: "10 min",
    sections: [
      {
        title: "Quelle est la duree de vie d'une toiture ?",
        content:
          "La duree de vie d'une toiture varie selon le materiau utilise. Les tuiles en terre cuite durent en moyenne 50 a 100 ans. Les ardoises naturelles peuvent atteindre 75 a 150 ans. Le zinc a une duree de vie de 30 a 80 ans. Le bac acier dure entre 25 et 50 ans. Les tuiles beton entre 30 et 50 ans. Cependant, ces durees ne sont valables que si l'entretien est regulier. Une toiture negligee peut necessiter une renovation bien avant ces echeances.",
      },
      {
        title: "Signe n1 : votre toiture a plus de 25 ans sans entretien",
        content:
          "Si votre couverture n'a jamais ete entretenue depuis sa pose et qu'elle a plus de 25 ans, un diagnostic complet s'impose. Meme si aucun probleme n'est visible de l'interieur, des degradations peuvent etre en cours : mousse qui s'infiltre sous les tuiles, micro-fissures qui s'agrandissent, joints de faitage qui s'effritent. Un diagnostic IA gratuit par satellite peut vous donner une premiere evaluation en 30 secondes.",
      },
      {
        title: "Signe n2 : des tuiles cassees ou deplacees sont visibles",
        content:
          "Des tuiles cassees, fissurees ou deplacees sont des portes ouvertes aux infiltrations d'eau. Meme une seule tuile manquante peut laisser passer suffisamment d'eau pour endommager la charpente et l'isolation en quelques mois. Si vous constatez des debris de tuiles au sol apres un coup de vent, c'est un signal d'alerte serieux.",
      },
      {
        title: "Signe n3 : de la mousse ou du lichen recouvre votre toit",
        content:
          "La mousse n'est pas qu'un probleme esthetique. Elle retient l'humidite en permanence contre vos tuiles, accelerant leur degradation. Elle s'infiltre sous les tuiles et les souleve progressivement, creant des voies d'infiltration. Un demoussage professionnel suivi d'un traitement hydrofuge peut prolonger la vie de votre toiture de 10 a 15 ans.",
      },
      {
        title: "Signe n4 : des traces d'humidite apparaissent a l'interieur",
        content:
          "Des taches d'humidite au plafond ou sur les murs des combles sont le signe que l'eau s'infiltre deja. A ce stade, les degats sont souvent plus etendus qu'ils ne paraissent : l'eau peut cheminer le long des chevrons avant de goutter, rendant difficile la localisation exacte de la fuite. Une intervention rapide est necessaire pour eviter la degradation de la charpente et le developpement de moisissures.",
      },
      {
        title: "Signe n5 : votre facture de chauffage augmente",
        content:
          "Si votre facture energetique augmente sans raison apparente, votre toiture peut etre en cause. Jusqu'a 30% des deperditions thermiques d'une maison passent par le toit. Une isolation vieillissante ou degradee par l'humidite perd son efficacite. Une renovation de toiture avec isolation performante peut reduire votre facture de chauffage de 25 a 30%.",
      },
      {
        title: "Signe n6 : la charpente presente des signes de faiblesse",
        content:
          "Des craquements inhabituels, un affaissement visible de la ligne de faitage, des poutres qui s'effritent au toucher : ces signes indiquent un probleme de charpente qui necessite une intervention urgente. La cause peut etre l'humidite, des insectes xylophages (capricornes, vrillettes) ou simplement le vieillissement du bois. Un diagnostic structure est indispensable.",
      },
      {
        title: "Signe n7 : vous envisagez des travaux d'amenagement",
        content:
          "Si vous projetez d'amenager vos combles, d'installer des panneaux solaires ou de faire une surelevement, c'est le moment ideal pour renover votre toiture. Combiner les travaux permet de realiser des economies sur les couts de chantier (echafaudage, main d'oeuvre) et de beneficier d'aides financieres cumulees (MaPrimeRenov, CEE).",
      },
    ],
    faq: [
      {
        question: "Quel est le prix moyen d'une renovation de toiture ?",
        answer:
          "Le prix d'une renovation complete de toiture varie entre 80 et 200 euros par m2 selon le materiau choisi et l'etat de la charpente. Pour une maison de 100m2 au sol, comptez entre 10 000 et 25 000 euros. Le diagnostic IA gratuit ACO-HABITAT permet d'obtenir une premiere estimation rapide.",
      },
      {
        question:
          "Puis-je beneficier d'aides pour renover ma toiture ?",
        answer:
          "Oui, si vos travaux incluent une amelioration de l'isolation thermique, vous pouvez beneficier de MaPrimeRenov, des Certificats d'Economies d'Energie (CEE) et parfois d'aides locales. ACO-HABITAT vous accompagne dans toutes vos demarches.",
      },
      {
        question: "Combien de temps durent les travaux de renovation ?",
        answer:
          "Une renovation complete de toiture dure en moyenne 1 a 3 semaines selon la surface et la complexite du chantier. La maison reste habitable pendant les travaux.",
      },
    ],
    relatedServices: ["renovation-toiture", "couverture", "isolation-thermique"],
    relatedGuides: [
      "prix-renovation-toiture",
      "diagnostic-toiture-satellite",
    ],
  },
  {
    slug: "prix-renovation-toiture",
    title: "Prix renovation toiture 2026",
    metaTitle:
      "Prix Renovation Toiture en 2026 : Tarifs, Aides et Devis | ACO-HABITAT",
    metaDescription:
      "Guide complet des prix de renovation de toiture en 2026. Tarifs par materiau (tuiles, ardoises, zinc), aides financieres et conseils pour reduire le cout de vos travaux.",
    heroTitle:
      "Quel est le prix d'une renovation de toiture en 2026 ?",
    heroDescription:
      "Le cout d'une renovation de toiture depend de nombreux facteurs : surface, materiau, etat de la charpente, isolation. Ce guide vous donne les prix actualises en 2026 et les astuces pour optimiser votre budget.",
    datePublished: "2026-02-01",
    dateModified: "2026-02-10",
    readTime: "12 min",
    sections: [
      {
        title: "Les facteurs qui influencent le prix",
        content:
          "Le cout d'une renovation de toiture depend de cinq facteurs principaux : la surface de la toiture (en m2), le materiau de couverture choisi, l'etat de la charpente (renforcement ou remplacement necessaire), le type d'isolation souhaite et l'accessibilite du chantier (hauteur, acces echafaudage). Un diagnostic prealable par IA permet d'evaluer precisement l'etendue des travaux necessaires et d'eviter les mauvaises surprises en cours de chantier.",
      },
      {
        title: "Prix par materiau de couverture (HT/m2 pose)",
        content:
          "Voici les fourchettes de prix constatees en 2026, fourniture et pose comprises, hors charpente et isolation :",
        list: [
          "Tuiles terre cuite : 60 a 120 euros/m2. Le choix le plus repandu en France. Bonne durabilite (50-100 ans) et large choix de coloris.",
          "Ardoises naturelles : 100 a 180 euros/m2. Materiau noble et tres durable (75-150 ans). Prix plus eleve mais excellent retour sur investissement.",
          "Zinc : 80 a 150 euros/m2. Ideal pour les toitures a faible pente. Duree de vie de 30 a 80 ans. Pose technique necessitant un specialiste.",
          "Bac acier : 40 a 80 euros/m2. Solution economique pour les grandes surfaces. Bonne durabilite (25-50 ans) si entretien regulier.",
          "Tuiles beton : 35 a 70 euros/m2. Alternative economique aux tuiles terre cuite. Durabilite de 30 a 50 ans.",
        ],
      },
      {
        title: "Cout des travaux complementaires",
        content:
          "A ces prix de couverture s'ajoutent souvent des travaux complementaires necessaires pour une renovation complete et durable :",
        list: [
          "Renovation de charpente : 40 a 100 euros/m2 si reparation, 80 a 180 euros/m2 si remplacement complet.",
          "Isolation thermique par l'interieur : 30 a 60 euros/m2 (laine minerale ou ouate de cellulose).",
          "Isolation par l'exterieur (sarking) : 80 a 150 euros/m2. Plus cher mais plus performant.",
          "Zinguerie complete (gouttieres, cheneaux) : 30 a 60 euros/ml.",
          "Echafaudage : 15 a 25 euros/m2 de facade. Cout souvent inclus dans le devis global.",
          "Ecran sous-toiture HPV : 8 a 15 euros/m2. Fortement recommande pour toute renovation.",
        ],
      },
      {
        title:
          "Aides financieres disponibles en 2026",
        content:
          "Plusieurs dispositifs peuvent reduire significativement le cout de votre renovation si les travaux incluent une amelioration de la performance energetique :",
        list: [
          "MaPrimeRenov : jusqu'a 75 euros/m2 pour l'isolation de la toiture, sous conditions de revenus. Cumulable avec les CEE.",
          "Certificats d'Economies d'Energie (CEE) : primes versees par les fournisseurs d'energie. Montant variable selon les travaux.",
          "Eco-PTZ : pret a taux zero jusqu'a 50 000 euros pour financer vos travaux de renovation energetique.",
          "TVA a taux reduit (5,5%) : applicable sur les travaux d'amelioration energetique dans les logements de plus de 2 ans.",
          "Aides locales : certaines regions, departements et communes proposent des aides complementaires. Renseignez-vous aupres de votre collectivite.",
        ],
      },
      {
        title: "Comment obtenir le meilleur prix ?",
        content:
          "Pour optimiser le cout de votre renovation de toiture, voici nos conseils :",
        list: [
          "Faites un diagnostic prealable : le diagnostic IA gratuit ACO-HABITAT permet d'identifier precisement les travaux necessaires et d'eviter les depenses inutiles.",
          "Comparez plusieurs devis : demandez au minimum 3 devis detailles. Attention aux devis anormalement bas qui cachent souvent des malfacons.",
          "Combinez les travaux : renovation + isolation + charpente en une seule intervention reduit les couts de chantier.",
          "Planifiez hors saison : les tarifs sont souvent plus avantageux en automne et en hiver.",
          "Profitez des aides : faites votre demande MaPrimeRenov AVANT le debut des travaux. ACO-HABITAT vous accompagne dans ces demarches.",
        ],
      },
    ],
    faq: [
      {
        question:
          "Quel budget prevoir pour renover une toiture de 100m2 ?",
        answer:
          "Pour une renovation complete (couverture + charpente si necessaire + isolation) d'une toiture de 100m2, prevoyez entre 12 000 et 30 000 euros selon le materiau et l'etendue des travaux. Les aides (MaPrimeRenov, CEE) peuvent reduire ce budget de 20 a 40%.",
      },
      {
        question:
          "Faut-il un permis de construire pour renover sa toiture ?",
        answer:
          "Non, une simple declaration prealable de travaux suffit pour une renovation a l'identique. Un permis de construire n'est necessaire que si vous changez l'aspect exterieur (materiau, couleur) ou si votre maison est situee pres d'un monument historique.",
      },
      {
        question:
          "La renovation de toiture est-elle deductible des impots ?",
        answer:
          "Les travaux de renovation de toiture ne sont pas directement deductibles des impots. En revanche, les travaux d'isolation thermique ouvrent droit a MaPrimeRenov et a l'eco-PTZ, qui sont des aides financieres directes, plus avantageuses qu'une deduction fiscale.",
      },
    ],
    relatedServices: [
      "renovation-toiture",
      "isolation-thermique",
      "couverture",
    ],
    relatedGuides: [
      "quand-renover-toiture",
      "diagnostic-toiture-satellite",
    ],
  },
  {
    slug: "mousse-toiture-dangers",
    title: "Dangers de la mousse sur toiture",
    metaTitle:
      "Mousse sur la toiture : quels dangers et comment l'eliminer ? | ACO-HABITAT",
    metaDescription:
      "La mousse sur votre toit n'est pas qu'esthetique : elle cause des fuites et degrade vos tuiles. Decouvrez les dangers reels et les solutions professionnelles pour l'eliminer.",
    heroTitle:
      "Quels sont les dangers de la mousse sur une toiture ?",
    heroDescription:
      "La mousse qui verdit votre toit n'est pas un simple probleme esthetique. C'est un veritable accelerateur de degradation qui peut reduire de moitie la duree de vie de votre couverture. Voici pourquoi il faut agir et comment le faire efficacement.",
    datePublished: "2026-01-25",
    dateModified: "2026-02-10",
    readTime: "7 min",
    sections: [
      {
        title: "Comment la mousse s'installe-t-elle sur votre toit ?",
        content:
          "La mousse se developpe principalement sur les versants nord et les zones ombragees de votre toiture, la ou l'humidite persiste plus longtemps. Les spores transportees par le vent se deposent entre les tuiles et dans les micro-fissures. En presence d'humidite, elles germent et forment un tapis vegetal qui retient encore plus d'eau, creant un cercle vicieux. Les toitures en tuiles poreuses (terre cuite ancienne, beton) sont les plus vulnerables.",
      },
      {
        title:
          "Danger n1 : degradation acceleree des materiaux de couverture",
        content:
          "La mousse maintient une humidite permanente sur vos tuiles. Cette humidite constante provoque des cycles gel-degel qui eclatent les tuiles de l'interieur. Les micro-organismes produisent aussi des acides qui attaquent la surface des materiaux. Resultat : des tuiles qui deviennent poreuses, se fissurent et se cassent bien avant leur duree de vie normale. Une toiture envahie par la mousse peut perdre 30 a 50% de sa durabilite.",
      },
      {
        title: "Danger n2 : infiltrations d'eau et fuites",
        content:
          "La mousse s'infiltre sous les tuiles et les souleve progressivement. L'eau de pluie qui devrait ruisseler sur la couverture s'infiltre alors par capillarite sous les tuiles deplacees. Ces micro-infiltrations sont souvent invisibles pendant des mois, le temps que l'eau deteriore lentement l'ecran sous-toiture, l'isolation et la charpente. Quand la fuite devient visible a l'interieur, les degats sont souvent importants.",
      },
      {
        title: "Danger n3 : obstruction des evacuations d'eau",
        content:
          "La mousse et les debris vegetaux s'accumulent dans les gouttieres, les cheneaux et les noues. Cette obstruction empeche l'eau de s'ecouler correctement et provoque des debordements. L'eau stagnante au bord de la toiture peut s'infiltrer dans les murs, degrader les facades et creer des problemes d'humidite dans toute la maison.",
      },
      {
        title: "Danger n4 : surcout energetique",
        content:
          "Une couverture envahie par la mousse retient l'humidite qui finit par atteindre l'isolation. Une isolation humide perd jusqu'a 80% de son efficacite thermique. Votre facture de chauffage augmente sans que vous compreniez pourquoi. Le cout annuel supplementaire peut atteindre plusieurs centaines d'euros, soit largement plus que le cout d'un demoussage preventif.",
      },
      {
        title: "Comment eliminer la mousse efficacement ?",
        content:
          "Le demoussage professionnel se deroule en trois etapes pour un resultat durable :",
        list: [
          "Nettoyage mecanique : brossage ou nettoyage haute pression adapte a votre type de couverture. La pression est modulee pour ne pas endommager les tuiles.",
          "Traitement biocide : application d'un produit anti-mousse professionnel qui elimine mousses, lichens et algues en profondeur. Le produit continue d'agir pendant plusieurs semaines.",
          "Protection hydrofuge : application d'un hydrofuge qui impermeabilise les tuiles tout en les laissant respirer. Protection efficace pendant 8 a 10 ans selon le produit et l'exposition.",
        ],
      },
      {
        title: "Demoussage : a quelle frequence ?",
        content:
          "La frequence ideale de demoussage depend de l'orientation et de l'environnement de votre toiture. En regle generale, un demoussage tous les 5 a 8 ans est recommande. Si votre maison est entouree d'arbres ou si votre toit comporte des versants nord ombrages, un demoussage tous les 3 a 5 ans peut etre necessaire. Le diagnostic IA gratuit ACO-HABITAT permet d'evaluer instantanement le niveau de mousse sur votre couverture et de determiner si un demoussage est necessaire.",
      },
    ],
    faq: [
      {
        question: "Puis-je demousser ma toiture moi-meme ?",
        answer:
          "C'est fortement deconseille pour des raisons de securite (risque de chute) et d'efficacite. Un nettoyeur haute pression mal utilise peut endommager irreversiblement vos tuiles. De plus, sans traitement biocide et hydrofuge professionnel, la mousse revient en quelques mois.",
      },
      {
        question: "Combien coute un demoussage professionnel ?",
        answer:
          "Le prix d'un demoussage professionnel (nettoyage + traitement + hydrofuge) varie entre 15 et 35 euros/m2 selon l'etat de la toiture et le type de traitement. Pour une maison standard de 100m2 au sol, comptez entre 1 500 et 4 000 euros.",
      },
      {
        question:
          "Le demoussage abime-t-il les tuiles ?",
        answer:
          "Un demoussage professionnel n'abime pas les tuiles car la pression est adaptee au materiau. C'est justement l'utilisation de nettoyeurs haute pression grand public, trop puissants et mal orientes, qui peut deteriorer la surface des tuiles.",
      },
    ],
    relatedServices: ["demoussage", "diagnostic-ia", "couverture"],
    relatedGuides: [
      "quand-renover-toiture",
      "diagnostic-toiture-satellite",
    ],
  },
]

export function getGuideBySlug(slug: string): GuideData | undefined {
  return guidesData.find((g) => g.slug === slug)
}

export function getAllGuideSlugs(): string[] {
  return guidesData.map((g) => g.slug)
}
