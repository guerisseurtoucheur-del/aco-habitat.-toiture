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
    image: "/images/toiture-mousse.png",
    imageAlt: "Toiture en ardoise recouverte de mousse et lichen - exemple de degradation vegetale necessitant un traitement",
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
  {
    slug: "diagnostic-toiture-avant-achat",
    title: "Diagnostic toiture avant achat immobilier",
    metaTitle: "Diagnostic Toiture Avant Achat Immobilier : Ce Qu'il Faut Verifier | ACO-HABITAT",
    metaDescription: "Vous achetez une maison ? Decouvrez pourquoi et comment faire verifier la toiture avant de signer. Evitez les mauvaises surprises et negociez le prix en connaissance de cause.",
    heroTitle: "Pourquoi faire un diagnostic toiture avant d'acheter une maison ?",
    heroDescription: "La toiture represente jusqu'a 20% de la valeur d'une maison. Une renovation non anticipee peut couter entre 10 000 et 30 000 euros. Voici comment verifier l'etat du toit avant de signer le compromis et eviter une mauvaise surprise financiere.",
    datePublished: "2026-02-05",
    dateModified: "2026-02-14",
    readTime: "9 min",
    sections: [
      {
        title: "Le diagnostic toiture n'est pas obligatoire... mais indispensable",
        content: "Contrairement au DPE, a l'amiante ou au plomb, le diagnostic de toiture n'est pas obligatoire lors d'une vente immobiliere. C'est un angle mort de la legislation que beaucoup d'acheteurs decouvrent trop tard. Le vendeur n'a aucune obligation de vous informer sur l'etat de la couverture, sauf vice cache avere. Resultat : des milliers d'acheteurs chaque annee decouvrent apres la signature que leur toiture necessite des travaux importants. Un diagnostic preventif de 19,90 euros peut vous eviter une facture de 15 000 euros.",
      },
      {
        title: "Les 5 points a verifier sur la toiture avant d'acheter",
        content: "Lors de la visite, concentrez-vous sur ces elements visibles depuis le sol et depuis les combles :",
        list: [
          "L'age de la couverture : demandez au vendeur quand la toiture a ete posee ou renovee pour la derniere fois. Au-dela de 25 ans sans entretien, prevoyez des travaux.",
          "La presence de mousse et lichen : un versant nord tres vert indique un manque d'entretien. Le demoussage coute entre 1 500 et 3 000 euros pour une maison standard.",
          "Les tuiles cassees ou deplacees : visibles depuis la rue avec des jumelles ou via une image satellite. Chaque tuile cassee est une porte ouverte aux infiltrations.",
          "L'etat des combles : inspectez les combles avec une lampe torche. Cherchez les traces d'humidite, les taches sombres sur le bois, l'odeur de moisi et les traces d'insectes.",
          "La zinguerie et les points singuliers : gouttieres, noues, faitage, solins autour de la cheminee. Ce sont les points faibles les plus frequents d'une toiture.",
        ],
      },
      {
        title: "Comment le diagnostic IA vous aide a negocier le prix",
        content: "Le rapport PDF du diagnostic IA detaille chaque probleme detecte avec un niveau de gravite et une estimation de cout. Ce document objectif et factuel est un outil de negociation puissant : vous pouvez le presenter au vendeur ou a l'agent immobilier pour justifier une baisse de prix equivalente aux travaux a prevoir. Nos clients negocient en moyenne entre 3 000 et 10 000 euros de reduction grace au rapport diagnostic.",
      },
      {
        title: "Que faire si le diagnostic revele des problemes graves ?",
        content: "Si le diagnostic revele un score inferieur a 50/100, cela signifie que des travaux importants sont necessaires a court terme. Vous avez trois options :",
        list: [
          "Negocier le prix a la baisse : deduisez le cout estime des travaux du prix de vente. Le rapport PDF chiffre vous donne les arguments.",
          "Demander au vendeur de faire les travaux avant la vente : c'est possible mais rare. Le vendeur risque de faire au moins cher.",
          "Renoncer a l'achat : si les travaux sont trop importants et que le vendeur refuse de negocier, il est parfois plus sage de passer son chemin.",
        ],
      },
      {
        title: "Le bon timing pour le diagnostic",
        content: "Idealement, faites le diagnostic IA des la premiere visite pour avoir une idee rapide de l'etat de la toiture. Si le bien vous interesse, vous pouvez ensuite demander une inspection physique par un couvreur avant de signer le compromis. Inserez une clause suspensive dans le compromis : 'sous reserve d'un diagnostic de toiture satisfaisant'. Cela vous laisse une porte de sortie si l'inspection physique revele des problemes non detectables par satellite.",
      },
    ],
    faq: [
      {
        question: "Le diagnostic toiture est-il obligatoire pour vendre une maison ?",
        answer: "Non, le diagnostic toiture n'est pas obligatoire dans le dossier de diagnostics immobiliers (DDT). Seuls le DPE, l'amiante, le plomb, les termites (selon les zones) et l'electricite/gaz sont obligatoires. Cependant, le vendeur peut etre tenu responsable au titre des vices caches si un probleme grave de toiture n'a pas ete signale.",
      },
      {
        question: "Peut-on se retourner contre le vendeur si la toiture fuit apres l'achat ?",
        answer: "Oui, si la fuite existait avant la vente et que le vendeur le savait (ou aurait du le savoir), vous pouvez invoquer la garantie des vices caches. Vous avez 2 ans apres la decouverte du vice pour agir. Un diagnostic prealable vous protege en documentant l'etat de la toiture au moment de l'achat.",
      },
      {
        question: "Combien coute un diagnostic toiture avant achat ?",
        answer: "Le diagnostic IA ACO-HABITAT coute 19,90 euros et prend moins de 30 secondes. Pour une inspection physique complete par un couvreur, comptez entre 150 et 300 euros. Le rapport IA suffit souvent pour une premiere evaluation et pour la negociation.",
      },
    ],
    relatedServices: ["diagnostic-ia", "couverture", "renovation-toiture"],
    relatedGuides: [
      "quand-renover-toiture",
      "prix-renovation-toiture",
    ],
  },
  // ========================
  // GLOSSAIRE TOITURE
  // ========================
  {
    slug: "glossaire-toiture",
    title: "Glossaire toiture",
    metaTitle: "Glossaire toiture : tous les termes expliques | ACO-HABITAT",
    metaDescription:
      "Dictionnaire complet des termes de couverture et toiture : faitage, noue, solins, chevrons, liteaux, zinguerie et 40+ definitions expliquees simplement par des experts couvreurs.",
    heroTitle: "Glossaire de la toiture : tous les termes expliques",
    heroDescription:
      "Vous ne comprenez pas le devis de votre couvreur ? Faitage, noue, solins, zinguerie... Ce glossaire complet vous explique chaque terme de la toiture en langage clair. Redigee par des professionnels de la couverture en Normandie.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "12 min",
    sections: [
      {
        title: "Structure et charpente",
        content:
          "La charpente est le squelette de votre toiture. Elle supporte l'ensemble de la couverture et repartit les charges vers les murs porteurs. Voici les termes essentiels :",
        list: [
          "Charpente : structure en bois ou en metal qui soutient la toiture. Il existe deux types principaux : la charpente traditionnelle (assemblage de poutres) et la charpente industrielle (fermettes prefabriquees).",
          "Fermette : element prefabrique en bois de la charpente industrielle, en forme de triangle. Plus legere et moins couteuse que la charpente traditionnelle, mais ne permet pas d'amenager les combles.",
          "Panne : poutre horizontale qui relie les fermes entre elles. On distingue la panne faitiere (en haut), les pannes intermediaires (au milieu) et la panne sabliere (en bas, posee sur les murs).",
          "Chevron : piece de bois inclinee fixee sur les pannes, qui descend du faitage jusqu'a l'egout. C'est sur les chevrons qu'on fixe les liteaux.",
          "Liteau (ou latte) : petite piece de bois horizontale clouee sur les chevrons, sur laquelle viennent s'accrocher les tuiles ou les ardoises.",
          "Volige : planche de bois mince posee sur les chevrons pour constituer un support continu de couverture, utilisee notamment pour les ardoises et les bardeaux.",
          "Entrait : piece horizontale basse de la ferme, qui relie les deux pieds de la charpente et empeche les murs de s'ecarter.",
          "Arbaletrier : piece inclinee de la ferme, allant de l'entrait au poincon (sommet). Il supporte le poids de la toiture.",
          "Poincon : piece verticale de la ferme, reliant l'entrait au sommet. Il soutient la panne faitiere.",
        ],
      },
      {
        title: "Elements de couverture",
        content:
          "La couverture est la partie visible et etanche de votre toiture. Selon votre region et votre budget, plusieurs materiaux sont possibles :",
        list: [
          "Tuile : element de couverture en terre cuite ou beton. Les tuiles plates sont typiques du nord de la France, les tuiles canal du sud. Duree de vie : 30 a 50 ans.",
          "Ardoise : pierre naturelle (schiste) ou materiau synthetique decoupee en plaques fines. Tres repandue en Normandie et Bretagne. Duree de vie : 75 a 100 ans pour l'ardoise naturelle.",
          "Zinc : metal utilise en couverture et en zinguerie. Tres durable (80+ ans), etanche, mais plus couteux. Repandu a Paris et dans le nord.",
          "Bac acier : tole ondulee ou nervuree en acier galvanise. Legere, economique, utilisee surtout pour les batiments agricoles et industriels. Duree de vie : 30 a 40 ans.",
          "Bardeau (shingle) : petite plaque souple en bitume recouverte de granules mineraux. Legere et peu couteuse, mais duree de vie plus courte (20-25 ans).",
          "Chaume : couverture vegetale traditionnelle en paille de seigle ou roseau. Typique des chaumieres normandes. Entretien regulier necessaire, duree de vie 25-40 ans.",
        ],
      },
      {
        title: "Points singuliers et zinguerie",
        content:
          "Les points singuliers sont les zones les plus vulnerables de votre toiture. C'est la que surviennent la majorite des infiltrations :",
        list: [
          "Faitage : ligne horizontale au sommet du toit, a la jonction des deux pans. Couvert par des tuiles faitieres ou un closoir ventile. C'est le point culminant de la toiture.",
          "Noue : angle rentrant forme par la rencontre de deux pans de toiture. Zone d'ecoulement naturel de l'eau, c'est l'un des points les plus sensibles aux infiltrations.",
          "Aretier : arete saillante formee par la rencontre de deux pans de toiture. Oppose de la noue. Couvert par des tuiles d'aretier.",
          "Rive : bordure laterale du toit, le long des pignons. Protegee par des tuiles de rive ou un bandeau.",
          "Egout (ou gouttiere) : partie basse du toit d'ou l'eau s'ecoule. Les gouttieres et descentes d'eau pluviale evacuent l'eau vers le sol.",
          "Solins : pieces de zinc, plomb ou mortier assurant l'etancheite entre la couverture et un mur, une cheminee ou un velux. Un solin defaillant est une cause majeure d'infiltration.",
          "Chatiere : petite tuile speciale perforee permettant la ventilation sous-toiture. Indispensable pour eviter la condensation et la pourriture de la charpente.",
          "Closoir : bande de ventilation placee sous les tuiles faitieres. Permet l'aeration tout en empechant la penetration d'eau, d'oiseaux et d'insectes.",
          "Dauphin : partie basse et coudee de la descente d'eau pluviale, qui dirige l'eau vers le caniveau ou le regard.",
          "Crapaudine : grille placee dans les gouttieres ou les descentes pour retenir les feuilles et les debris.",
        ],
      },
      {
        title: "Isolation et ventilation",
        content:
          "L'isolation de la toiture est essentielle car 25 a 30% des deperditions thermiques d'une maison passent par le toit. Voici les termes a connaitre :",
        list: [
          "Isolation par l'interieur (ITI) : pose d'un isolant (laine de verre, laine de roche, ouate de cellulose) sous la charpente, entre les chevrons ou sous les combles. Methode la plus courante et la moins couteuse.",
          "Isolation par l'exterieur (ITE/Sarking) : pose de panneaux isolants rigides sur les chevrons, avant la couverture. Plus performante car elle supprime les ponts thermiques, mais plus couteuse car elle necessite de decouvrir le toit.",
          "Pare-vapeur : film etanche pose du cote interieur (chaud) de l'isolant pour empecher la vapeur d'eau de penetrer dans l'isolant et de provoquer de la condensation.",
          "Ecran sous-toiture : membrane posee sur les chevrons, sous les liteaux. Protege la charpente et l'isolant contre les infiltrations d'eau et la poussiere en cas de tuile deplacee.",
          "Ventilation sous-toiture : circulation d'air entre la couverture et l'isolant. Indispensable pour evacuer l'humidite et eviter la condensation. Assuree par les chatieres, le closoir et les ouvertures en egout.",
          "Pont thermique : zone de faiblesse dans l'isolation ou le froid s'infiltre. Au niveau de la toiture, les ponts thermiques se situent souvent aux jonctions mur/toit et autour des velux.",
        ],
      },
      {
        title: "Pathologies et degradations",
        content:
          "Les degradations de toiture sont nombreuses et peuvent avoir des causes variees. Voici les problemes les plus courants :",
        list: [
          "Mousse et lichen : vegetaux qui colonisent les tuiles, surtout sur les versants nord. Ils retiennent l'humidite et accelerent la porosite des materiaux. Un demoussage tous les 5 a 10 ans est recommande.",
          "Infiltration : penetration d'eau a travers la couverture, generalement au niveau des points singuliers (noues, solins, cheminee). Cause la plus frequente d'intervention en urgence.",
          "Gelivure : eclatement d'une tuile ou d'une ardoise sous l'effet du gel. L'eau penetree dans les micro-fissures gele et fait eclater le materiau.",
          "Affaissement : deformation visible de la toiture, signe d'un probleme de charpente (bois pourri, surcharge, termites). Necessite une intervention rapide.",
          "Faitage souffle : tuiles faitieres soulevees ou arrachees par le vent. Expose la charpente aux infiltrations.",
          "Grele : les grelons peuvent fissurer, casser ou poinconner les tuiles, ardoises et elements de zinguerie. Les degats de grele sont couverts par l'assurance habitation (catastrophe naturelle ou evenement climatique).",
        ],
      },
      {
        title: "Termes administratifs et reglementaires",
        content:
          "Avant de lancer des travaux de toiture, certaines demarches administratives sont necessaires :",
        list: [
          "Declaration prealable (DP) : document a deposer en mairie pour des travaux modifiant l'aspect exterieur de la toiture (changement de materiau, couleur). Delai d'instruction : 1 mois.",
          "Permis de construire : necessaire si les travaux modifient la structure ou la surface de plancher (surelevation, amenagement de combles avec creation de surface). Delai d'instruction : 2 a 3 mois.",
          "DTU (Document Technique Unifie) : regles de l'art que les professionnels doivent respecter pour la pose et la renovation de toiture. Le DTU 40 concerne les couvertures.",
          "Garantie decennale : assurance obligatoire couvrant les dommages compromettant la solidite de l'ouvrage pendant 10 ans apres les travaux. Tout couvreur professionnel doit en disposer.",
          "QUALIBAT / RGE : labels de qualification des entreprises du batiment. RGE (Reconnu Garant de l'Environnement) est obligatoire pour beneficier des aides a la renovation energetique (MaPrimeRenov, CEE).",
        ],
      },
    ],
    faq: [
      {
        question: "Qu'est-ce que le faitage d'une toiture ?",
        answer:
          "Le faitage est la ligne horizontale situee au sommet de la toiture, la ou les deux pans se rejoignent. Il est couvert par des tuiles faitieres scellees au mortier ou fixees mecaniquement. C'est un point critique pour l'etancheite : un faitage endommage laisse entrer l'eau directement dans la charpente.",
      },
      {
        question: "Quelle est la difference entre une noue et un aretier ?",
        answer:
          "La noue est un angle rentrant (creux) ou deux pans de toit se rejoignent : l'eau coule vers le creux. L'aretier est l'inverse : c'est un angle saillant (bosse) ou deux pans se rencontrent. La noue est beaucoup plus sensible aux infiltrations car elle concentre l'ecoulement d'eau.",
      },
      {
        question: "C'est quoi un solin en toiture ?",
        answer:
          "Un solin est une piece d'etancheite (zinc, plomb ou mortier) qui assure la jonction entre la couverture et un element vertical (mur, cheminee, lucarne). C'est l'une des causes les plus frequentes de fuite quand il vieillit ou se decolle.",
      },
    ],
    relatedServices: ["couverture", "renovation-toiture", "diagnostic-ia"],
    relatedGuides: ["quand-renover-toiture", "diagnostic-toiture-satellite"],
  },
  // ========================
  // DEGATS DE GRELE SUR TOITURE
  // ========================
  {
    slug: "degats-grele-toiture",
    title: "Degats de grele sur toiture",
    metaTitle:
      "Degats de grele sur toiture : que faire, assurance et reparation | ACO-HABITAT",
    metaDescription:
      "Votre toiture a ete touchee par la grele ? Decouvrez comment evaluer les degats, faire jouer votre assurance, et reparer votre couverture. Guide complet avec conseils d'experts couvreurs.",
    heroTitle:
      "Degats de grele sur toiture : comment reagir et faire reparer ?",
    heroDescription:
      "La grele peut causer des dommages considerables sur votre toiture en quelques minutes : tuiles cassees, ardoises fissurees, zinguerie cabossee, velux fissures. Voici le guide complet pour evaluer les degats, faire jouer votre assurance et reparer rapidement.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "10 min",
    sections: [
      {
        title: "Les types de degats causes par la grele",
        content:
          "La grele n'affecte pas tous les materiaux de la meme facon. Les grelons de plus de 2 cm de diametre peuvent causer des dommages significatifs, et ceux de plus de 4 cm sont devastateurs. Voici les degats les plus courants :",
        list: [
          "Tuiles en terre cuite : fissures, eclats, trous de poinconnement. Les tuiles canal et les tuiles plates sont les plus vulnerables car elles sont minces. Un grelon de 3 cm suffit a les casser.",
          "Ardoises : eclats en surface, fissures traversantes, decrochage des crochets. L'ardoise naturelle resiste mieux que l'ardoise synthetique, mais reste fragile aux impacts.",
          "Bac acier et zinc : bosses, deformations, poinconnement. Le metal ne casse pas mais se deforme definitivement. Les deformations creent des points bas ou l'eau stagne.",
          "Velux et fenetres de toit : fissures du vitrage, deformation du cadre, perte d'etancheite du joint. Un velux fissure par la grele peut fuir des la prochaine pluie.",
          "Gouttieres et descentes : bosses, perforations, decrochage. Les gouttieres en PVC sont particulierement fragiles face aux grelons.",
          "Faitage et aretiers : tuiles faitieres cassees, mortier eclate, closoirs arraches. Le faitage est expose car il est au point le plus haut du toit.",
        ],
      },
      {
        title: "Comment evaluer les degats apres un orage de grele",
        content:
          "Apres un episode de grele, il est essentiel d'evaluer rapidement les degats pour eviter que les infiltrations n'aggravent la situation. Attention : ne montez jamais sur un toit mouille ou endommage.",
        list: [
          "Inspection visuelle depuis le sol : utilisez des jumelles pour observer la toiture. Cherchez les tuiles cassees, les eclats visibles et les elements de zinguerie deformes.",
          "Diagnostic par IA ACO-HABITAT : prenez une photo satellite ou drone de votre toiture et lancez un diagnostic. L'IA detecte les tuiles endommagees et les zones a risque d'infiltration.",
          "Verification interieure : montez dans les combles avec une lampe torche. Cherchez les taches d'humidite, les gouttes d'eau et les rayons de lumiere visibles a travers la couverture.",
          "Controle des gouttieres : verifiez que les gouttieres ne sont pas bouchees par les debris de tuiles et qu'elles evacuent correctement l'eau.",
          "Photos datees : prenez des photos de tous les degats avec la date visible (sur votre telephone). Ces photos sont indispensables pour le dossier d'assurance.",
        ],
      },
      {
        title: "Faire jouer son assurance habitation",
        content:
          "Les degats de grele sont couverts par la garantie 'evenements climatiques' de votre assurance multirisque habitation (MRH). Voici la procedure a suivre scrupuleusement :",
        list: [
          "Declarer le sinistre dans les 5 jours : vous avez 5 jours ouvrables apres l'orage pour envoyer votre declaration de sinistre a votre assureur. Par lettre recommandee ou via l'application de votre assureur.",
          "Contenu de la declaration : date et heure de l'orage, description des degats, photos, estimation provisoire des dommages. Mentionnez le numero de votre contrat.",
          "Arrete de catastrophe naturelle : si la commune est declaree en catastrophe naturelle, le delai de declaration passe a 10 jours apres la publication de l'arrete au Journal Officiel.",
          "Expertise : l'assureur mandate un expert qui viendra constater les degats. Conservez les elements endommages (tuiles cassees) comme preuves. Ne faites pas de reparation definitive avant le passage de l'expert.",
          "Mesures conservatoires : vous pouvez (et devez) poser une bache pour proteger la maison des infiltrations en attendant l'expert. Gardez les factures, elles seront remboursees.",
          "Franchise : une franchise reste a votre charge (generalement 380 euros pour les evenements climatiques). En cas de catastrophe naturelle, la franchise est fixee par la loi.",
          "Indemnisation : l'assureur vous indemnise sur la base du rapport d'expertise, en valeur de remplacement (vetuste deduite) ou en valeur a neuf si votre contrat le prevoit.",
        ],
      },
      {
        title: "Reparation et renovation apres la grele",
        content:
          "Une fois l'expertise faite et l'indemnisation recue, il faut reparer rapidement pour eviter que les infiltrations ne degradent la charpente et l'isolation :",
        list: [
          "Reparation partielle : si seules quelques tuiles sont cassees, un couvreur remplace les elements endommages. Compter 50 a 100 euros par m2 selon le materiau.",
          "Renovation complete : si plus de 30% de la couverture est touchee, une renovation complete est souvent plus economique que des reparations piece par piece.",
          "Remplacement de la zinguerie : gouttieres, descentes et solins cabosses doivent etre remplaces pour garantir l'etancheite.",
          "Choix de materiaux resistants : si votre toiture est souvent exposee a la grele, envisagez des tuiles classees 'resistance a la grele' (norme EN 490) ou des ardoises epaisses.",
          "Amelioration de l'isolation : profitez des travaux pour ameliorer l'isolation de la toiture. Les aides MaPrimeRenov et les CEE peuvent financer une partie des travaux.",
        ],
      },
      {
        title: "Prevenir les degats de grele",
        content:
          "Il est impossible d'empecher la grele, mais certaines mesures reduisent les degats :",
        list: [
          "Entretien regulier : une toiture bien entretenue (tuiles remplacees, solins en bon etat) resiste mieux aux impacts car les materiaux fragiles cassent plus facilement.",
          "Materiaux resistants : lors d'une renovation, choisissez des tuiles en beton (plus resistantes que la terre cuite) ou des ardoises naturelles epaisses.",
          "Grilles anti-grele pour velux : des protections exterieures existent pour les fenetres de toit, tres efficaces dans les zones exposees.",
          "Diagnostic preventif : un diagnostic IA regulier permet de detecter les tuiles fragiles ou fissurees qui casseront au prochain orage.",
          "Surveillance meteo : les alertes meteo orange et rouge pour orages/grele vous laissent le temps de rentrer les objets vulnerables (stores, volets roulants).",
        ],
      },
    ],
    faq: [
      {
        question:
          "La grele est-elle couverte par l'assurance habitation ?",
        answer:
          "Oui, les degats de grele sont couverts par la garantie 'evenements climatiques' de votre assurance multirisque habitation. Vous avez 5 jours pour declarer le sinistre. Une franchise reste a votre charge (environ 380 euros en moyenne).",
      },
      {
        question:
          "Combien coute la reparation d'une toiture apres la grele ?",
        answer:
          "Le cout depend de l'etendue des degats. Pour quelques tuiles cassees : 200 a 500 euros. Pour une reparation de zone : 50 a 100 euros/m2. Pour une renovation complete : 80 a 180 euros/m2 selon le materiau. L'assurance prend en charge une partie des couts.",
      },
      {
        question:
          "Puis-je faire les reparations moi-meme apres la grele ?",
        answer:
          "Il est fortement deconseille de monter sur un toit endommage. Les tuiles cassees sont glissantes et fragiles. De plus, les reparations faites par un non-professionnel ne seront pas couvertes par la garantie decennale et pourraient etre refusees par l'assurance.",
      },
      {
        question:
          "Comment savoir si mes tuiles sont cassees par la grele sans monter sur le toit ?",
        answer:
          "Utilisez le diagnostic IA ACO-HABITAT : prenez une photo aerienne (satellite ou drone) de votre toiture et lancez l'analyse. L'IA detecte les tuiles endommagees, les eclats et les zones a risque. Vous pouvez aussi observer avec des jumelles depuis le sol ou verifier les combles de l'interieur.",
      },
    ],
    relatedServices: ["reparation-toiture", "couverture", "diagnostic-ia"],
    relatedGuides: ["quand-renover-toiture", "prix-renovation-toiture"],
  },
  // ========================
  // DUREE DE VIE D'UNE TOITURE
  // ========================
  {
    slug: "duree-de-vie-toiture",
    title: "Duree de vie d'une toiture",
    metaTitle:
      "Duree de vie d'une toiture : combien de temps dure chaque materiau ? | ACO-HABITAT",
    metaDescription:
      "Tuile, ardoise, zinc, bac acier, chaume : decouvrez la duree de vie reelle de chaque type de toiture, les signes d'usure et quand prevoir le remplacement. Guide expert couvreur.",
    heroTitle:
      "Duree de vie d'une toiture : combien d'annees selon le materiau ?",
    heroDescription:
      "La duree de vie d'une toiture varie enormement selon le materiau, le climat et l'entretien. De 20 ans pour un bardeau bitume a plus de 100 ans pour une ardoise naturelle. Voici les chiffres reels et les signes qui montrent que votre toit arrive en fin de vie.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "9 min",
    sections: [
      {
        title: "Duree de vie par materiau",
        content:
          "Chaque materiau de couverture a une esperance de vie differente. Ces chiffres correspondent a une toiture correctement posee et normalement entretenue :",
        list: [
          "Ardoise naturelle : 75 a 100 ans. C'est le materiau le plus durable. Les toitures en ardoise du Pays de Loire et de Normandie depassent souvent le siecle. L'ardoise synthetique (fibrociment) dure moins : 30 a 40 ans.",
          "Tuile en terre cuite : 30 a 50 ans. Les tuiles plates durent plus longtemps (50 ans) que les tuiles canal (30-40 ans). Les tuiles de qualite superieure (Imerys, Terreal) atteignent 70 ans.",
          "Tuile en beton : 40 a 50 ans. Plus resistantes aux chocs que la terre cuite, mais plus lourdes. Elles peuvent se decolorer avec le temps.",
          "Zinc : 50 a 80 ans. Materiau tres durable et etanche. Le zinc patine naturellement avec le temps (couleur gris-bleu). Ne necessite quasi aucun entretien.",
          "Bac acier : 30 a 40 ans. Economique et leger, mais sensible a la corrosion si le revetement est raye. L'acier galvanise dure plus longtemps que l'acier laque.",
          "Bardeau bitume (shingle) : 20 a 25 ans. Le moins durable des materiaux de couverture. Sensible aux UV et aux variations de temperature.",
          "Chaume : 25 a 40 ans. Necessite un entretien regulier (retapissage) tous les 10-15 ans. Les chaumieres normandes bien entretenues durent 40 ans.",
          "Toiture vegetalisee : 30 a 50 ans pour l'etancheite sous-jacente. La vegetation elle-meme necessite un entretien annuel.",
        ],
      },
      {
        title: "Les facteurs qui reduisent la duree de vie",
        content:
          "Plusieurs facteurs accelerent le vieillissement de votre toiture et peuvent reduire sa duree de vie de 30 a 50% :",
        list: [
          "Mousse et lichen : la vegetation retient l'humidite en permanence sur les tuiles, ce qui accelere la porosite et le gel. Un nettoyage tous les 5-10 ans prolonge considerablement la duree de vie.",
          "Manque de ventilation : sans ventilation sous-toiture adequate, la condensation pourrit la charpente et degrade l'isolant. C'est un tueur silencieux.",
          "Exposition climatique : les toitures exposees plein nord (humidite, mousse) et plein ouest (pluies, vents dominants) vieillissent plus vite. En Normandie, le versant nord-ouest est le plus expose.",
          "Grele et tempetes : les evenements climatiques violents causent des degats immediats (tuiles cassees) mais aussi des micro-fissures invisibles qui fragilisent les materiaux a long terme.",
          "Arbres proches : les branches qui frottent sur la toiture usent les materiaux. Les feuilles mortes bouchent les gouttieres et creent des zones de stagnation d'eau.",
          "Mauvaise pose initiale : une pose non conforme aux DTU (regles de l'art) reduit la duree de vie de 30 a 50%. Recouvrement insuffisant, pente inadequate, absence d'ecran sous-toiture...",
        ],
      },
      {
        title: "Les signes que votre toiture arrive en fin de vie",
        content:
          "Comment savoir si votre toiture doit etre renovee ? Voici les signes d'alerte a surveiller :",
        list: [
          "Tuiles poreuses : versez de l'eau sur une tuile demontee. Si elle l'absorbe comme une eponge, les tuiles sont en fin de vie et ne protegent plus contre les infiltrations.",
          "Mousses tres epaisses : si la mousse est epaisse de plusieurs centimetres et recouvre plus de 50% de la surface, les tuiles dessous sont probablement deteriorees.",
          "Tuiles cassees a repetition : si vous devez remplacer des tuiles chaque annee, c'est que l'ensemble de la couverture est fragilise. Des reparations ponctuelles ne suffiront plus.",
          "Traces d'humidite dans les combles : taches sombres sur la charpente, gouttes d'eau, odeur de moisi. Signe d'infiltrations multiples.",
          "Affaissement visible : si la ligne de faitage n'est plus droite ou si un versant semble s'affaisser, c'est un probleme de charpente grave.",
          "Age de la toiture : si votre toiture approche de la duree de vie theorique de son materiau, commencez a prevoir la renovation meme si elle semble encore en bon etat.",
          "Facture de chauffage en hausse : une augmentation inexpliquee peut indiquer que l'isolation de la toiture est degradee par les infiltrations.",
        ],
      },
      {
        title: "Comment prolonger la duree de vie de votre toiture",
        content:
          "Un entretien regulier peut doubler la duree de vie de votre toiture. Voici les bonnes pratiques :",
        list: [
          "Demoussage tous les 5 a 10 ans : supprimez la mousse, le lichen et les algues, puis appliquez un traitement hydrofuge et anti-mousse.",
          "Nettoyage des gouttieres : 2 fois par an (automne et printemps). Les gouttieres bouchees provoquent des debordements qui degradent les rives et les murs.",
          "Verification annuelle : inspectez votre toiture une fois par an (visuellement depuis le sol ou par diagnostic IA). Detectez les problemes tot pour les reparer a moindre cout.",
          "Remplacement rapide des elements casses : une tuile cassee non remplacee laisse entrer l'eau qui pourrit les liteaux et les chevrons. Le cout de la negligence est toujours superieur au cout de la reparation.",
          "Elagage des arbres proches : coupez les branches qui surplombent ou touchent la toiture. Gardez au minimum 2 metres de distance.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure une toiture en tuile ?",
        answer:
          "Une toiture en tuile terre cuite dure entre 30 et 50 ans avec un entretien correct. Les tuiles de qualite superieure atteignent 70 ans. Les tuiles en beton durent 40 a 50 ans. Sans entretien (mousse non traitee), la duree de vie chute a 20-30 ans.",
      },
      {
        question: "Quelle est la toiture la plus durable ?",
        answer:
          "L'ardoise naturelle est le materiau de toiture le plus durable : 75 a 100 ans. Suivie par le zinc (50-80 ans), la tuile en beton (40-50 ans), la tuile terre cuite (30-50 ans), le bac acier (30-40 ans) et le bardeau bitume (20-25 ans).",
      },
      {
        question: "Comment savoir si ma toiture doit etre refaite ?",
        answer:
          "Les signes principaux sont : tuiles poreuses qui absorbent l'eau, mousse tres epaisse sur plus de 50% du toit, tuiles cassees a repetition, traces d'humidite dans les combles, affaissement visible, et age superieur a la duree de vie theorique du materiau. Un diagnostic IA ACO-HABITAT vous donne un score precis en 30 secondes.",
      },
    ],
    relatedServices: ["diagnostic-ia", "renovation-toiture", "demoussage"],
    relatedGuides: ["quand-renover-toiture", "glossaire-toiture"],
  },
  // ========================
  // SIGNES D'UNE MAUVAISE ISOLATION TOITURE
  // ========================
  {
    slug: "signes-mauvaise-isolation-toiture",
    title: "Signes d'une mauvaise isolation toiture",
    metaTitle:
      "10 signes d'une mauvaise isolation de toiture | Guide expert ACO-HABITAT",
    metaDescription:
      "Comment detecter une mauvaise isolation de toiture ? Condensation, facture elevee, moisissures... Decouvrez les 10 signes d'alerte et les solutions pour isoler efficacement votre toit.",
    heroTitle:
      "10 signes que l'isolation de votre toiture est defaillante",
    heroDescription:
      "25 a 30% des deperditions thermiques d'une maison passent par la toiture. Une mauvaise isolation coute en moyenne 600 a 1 200 euros par an en chauffage gaspille. Voici les signes qui ne trompent pas et les solutions pour y remedier.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "8 min",
    sections: [
      {
        title: "Les signes visibles d'une mauvaise isolation",
        content:
          "Certains signes sont detectables a l'oeil nu, sans outil ni competence technique :",
        list: [
          "Neige qui fond inegalement : en hiver, observez votre toit apres une chute de neige. Si la neige fond plus vite a certains endroits, c'est que la chaleur s'echappe par ces zones mal isolees.",
          "Gouttieres gelees malgre un toit chaud : si la neige fond sur le toit mais gele dans les gouttieres, la chaleur fuit par la toiture et l'eau regele en contrebas. Risque de formation de barrages de glace.",
          "Moisissures dans les combles : taches noires ou vertes sur la charpente, les murs ou le plafond des combles. La condensation due au manque d'isolation favorise les moisissures.",
          "Peinture qui cloque au plafond : des cloques ou ecaillages de peinture au plafond du dernier etage indiquent une infiltration d'humidite par condensation.",
          "Sensation de paroi froide : si le plafond du dernier etage est froid au toucher en hiver, l'isolation est insuffisante. Un mur bien isole est a temperature ambiante.",
        ],
      },
      {
        title: "Les signes mesurables",
        content:
          "Ces signes se verifient avec des outils ou des donnees chiffrables :",
        list: [
          "Facture de chauffage anormalement elevee : comparez votre consommation au kWh/m2/an de votre DPE. Au-dela de 150 kWh/m2/an, la toiture est probablement mal isolee.",
          "Difference de temperature entre etages : si le dernier etage est 3 a 5 degres plus froid que le rez-de-chaussee en hiver (ou plus chaud en ete), l'isolation du toit est en cause.",
          "DPE classe E, F ou G : un mauvais classement energetique est souvent lie a une isolation de toiture defaillante, car c'est le premier poste de deperdition.",
          "Camera thermique : une image thermique du toit montre clairement les zones de fuite de chaleur (zones rouges). Certains diagnostiqueurs proposent ce service.",
          "Condensation sur les velux : si vos fenetres de toit sont couvertes de buee en hiver, c'est un signe de probleme d'isolation et/ou de ventilation.",
        ],
      },
      {
        title: "Les solutions pour ameliorer l'isolation",
        content:
          "Plusieurs techniques existent pour isoler ou reenforcer l'isolation de votre toiture :",
        list: [
          "Isolation des combles perdus par soufflage : la solution la plus rapide et economique (15-25 EUR/m2). De la ouate de cellulose ou de la laine de verre est soufflee sur le plancher des combles. Efficacite immediate.",
          "Isolation sous rampants : panneaux ou rouleaux d'isolant poses entre les chevrons et sous les chevrons. Ideal pour les combles amenages. Cout : 40-80 EUR/m2.",
          "Sarking (isolation par l'exterieur) : panneaux rigides poses sur les chevrons, sous la couverture. La methode la plus performante car elle elimine tous les ponts thermiques. Cout : 100-250 EUR/m2, mais necessite de decouvrir le toit.",
          "Remplacement de l'isolant degrade : si l'isolant existant est tasse, mouille ou moisi, il doit etre retire et remplace. Un isolant humide perd jusqu'a 80% de ses performances.",
          "Amelioration de la ventilation : installer des chatieres et un closoir ventile si la toiture n'en a pas. La ventilation est aussi importante que l'isolation pour eviter la condensation.",
        ],
      },
      {
        title: "Les aides financieres pour l'isolation de toiture",
        content:
          "L'Etat et les organismes encouragent l'isolation de toiture avec plusieurs dispositifs cumulables :",
        list: [
          "MaPrimeRenov : aide de l'Etat calculee selon vos revenus et le gain energetique. Jusqu'a 75 EUR/m2 pour l'isolation des rampants, 12 EUR/m2 pour les combles perdus.",
          "CEE (Certificats d'Economie d'Energie) : prime versee par les energeticiens (EDF, Engie, TotalEnergies). Cumulable avec MaPrimeRenov. De 5 a 15 EUR/m2.",
          "TVA reduite a 5,5% : pour les travaux d'isolation dans les logements de plus de 2 ans. S'applique sur la main-d'oeuvre et les materiaux.",
          "Eco-PTZ : pret a taux zero jusqu'a 50 000 euros pour financer les travaux de renovation energetique. Duree : jusqu'a 20 ans.",
          "Condition obligatoire : les travaux doivent etre realises par un artisan RGE (Reconnu Garant de l'Environnement) pour beneficier de toutes ces aides.",
        ],
      },
    ],
    faq: [
      {
        question:
          "Combien coute une mauvaise isolation de toiture par an ?",
        answer:
          "Une toiture mal isolee fait perdre 25 a 30% de la chaleur produite. Pour une maison de 100 m2 chauffee au gaz, cela represente 600 a 1 200 euros de gaspillage par an. L'isolation des combles perdus (1 500-2 500 euros apres aides) se rentabilise en 2 a 3 ans.",
      },
      {
        question:
          "Comment savoir si mon isolation de toiture est suffisante ?",
        answer:
          "La methode la plus simple : montez dans les combles et mesurez l'epaisseur de l'isolant. Pour les combles perdus, il faut minimum 30 cm de laine de verre (ou equivalent). Sous les rampants, minimum 20 cm. Si l'isolant est tasse, humide ou absent par endroits, il doit etre renforce.",
      },
      {
        question:
          "Quelle est la meilleure isolation pour un toit ?",
        answer:
          "Pour les combles perdus, le soufflage de ouate de cellulose offre le meilleur rapport performance/prix. Pour les combles amenages, des panneaux de laine de bois ou de polyurethane sous rampants sont les plus performants. Pour la meilleure performance globale, le sarking (isolation par l'exterieur) supprime tous les ponts thermiques.",
      },
    ],
    relatedServices: ["isolation-thermique", "diagnostic-ia", "renovation-toiture"],
    relatedGuides: ["duree-de-vie-toiture", "prix-renovation-toiture"],
  },
  // ========================
  // METHODOLOGIE IA ACO-HABITAT
  // ========================
  {
    slug: "methodologie-diagnostic-ia",
    title: "Notre methodologie de diagnostic par IA",
    metaTitle:
      "Methodologie du diagnostic toiture par IA | Comment fonctionne ACO-HABITAT",
    metaDescription:
      "Decouvrez comment l'intelligence artificielle d'ACO-HABITAT analyse votre toiture : algorithme de detection, 4 axes d'analyse (structure, vegetal, etancheite, thermique), generation du score et du rapport PDF.",
    heroTitle:
      "Comment notre IA analyse votre toiture : la methodologie complete",
    heroDescription:
      "Notre algorithme de diagnostic toiture a ete entraine sur plus de 50 000 images de toitures francaises. Voici en toute transparence comment il fonctionne, ce qu'il detecte et ses limites.",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    readTime: "7 min",
    sections: [
      {
        title: "L'image d'entree : satellite ou drone",
        content:
          "Le diagnostic commence par une image aerienne de votre toiture. L'utilisateur entre une adresse et notre systeme recupere automatiquement l'image satellite via Google Maps. L'image est decoupee pour isoler precisement la zone de la toiture a analyser. L'utilisateur peut aussi importer une photo drone pour une resolution encore meilleure. L'IA s'adapte a la resolution de l'image : plus elle est nette, plus le diagnostic est precis.",
      },
      {
        title: "Les 4 axes d'analyse",
        content:
          "L'IA analyse la toiture selon 4 axes independants, chacun note sur 100 :",
        list: [
          "Score vegetal (mousse, lichen, algues) : l'algorithme detecte la couverture vegetale sur les tuiles. Il distingue la mousse legere (couleur verte claire) de la mousse epaisse (vert fonce/brun) et du lichen (gris/blanc). Le score diminue proportionnellement a la surface couverte et a l'epaisseur estimee.",
          "Score structure (tuiles, faitage, rives) : l'IA repere les tuiles cassees, deplacees, manquantes et les anomalies de faitage. Elle analyse aussi l'alignement general des rangs de tuiles et detecte les affaissements. Chaque anomalie reduit le score selon sa gravite.",
          "Score etancheite (infiltrations, noues, solins) : l'algorithme identifie les zones a risque d'infiltration : noues encrassees, solins decolles, gouttieres debordantes, traces d'humidite visibles. Il analyse aussi les points de penetration (cheminee, velux) qui sont les zones les plus vulnerables.",
          "Score thermique (isolation) : base sur l'analyse de la toiture combinee aux donnees climatiques locales et a l'age estime du batiment. L'IA evalue le risque de deperdition thermique en analysant l'etat general de la couverture et la presence eventuelle de signes de defaut d'isolation (tuiles gondolees, condensation visible).",
        ],
      },
      {
        title: "Le score global et les recommandations",
        content:
          "Le score global est une moyenne ponderee des 4 sous-scores. La structure et l'etancheite pesent plus lourd (30% chacun) car ce sont les problemes les plus urgents. Le vegetal et le thermique pesent 20% chacun. A partir de ces scores, l'IA genere des recommandations personnalisees avec des niveaux d'urgence : rouge (intervention rapide necessaire), orange (a surveiller), vert (bon etat). Chaque recommandation est accompagnee d'une estimation de cout basee sur les prix moyens constates en France.",
      },
      {
        title: "Le rapport PDF",
        content:
          "Le diagnostic genere automatiquement un rapport PDF complet contenant : les coordonnees du client, l'adresse du bien, la photo de la toiture analysee, le score global et les 4 sous-scores illustres par des graphiques, la liste des problemes detectes classes par urgence, les recommandations de travaux avec estimations, et les prochaines etapes conseillee. Ce rapport peut etre utilise pour demander des devis a des couvreurs ou pour negocier un prix d'achat immobilier.",
      },
      {
        title: "Les limites de l'analyse par IA",
        content:
          "Notre diagnostic est un outil de pre-diagnostic puissant, mais il a des limites que nous assumons en toute transparence :",
        list: [
          "L'IA ne voit pas a travers la couverture : elle ne peut pas detecter l'etat de la charpente, de l'isolation ou de la ventilation sous-toiture.",
          "La precision depend de l'image : une image satellite ancienne ou floue reduit la fiabilite. Une photo drone recente donne les meilleurs resultats.",
          "Les ombres et les reflets : les ombres portees d'arbres ou de batiments voisins peuvent masquer des zones de la toiture. Les reflets sur le zinc ou les tuiles vernissees peuvent fausser l'analyse.",
          "Les toitures plates : l'algorithme est optimise pour les toitures en pente. Les toits plats (terrasses, toitures vegetalisees) sont moins bien analyses car les problemes sont moins visibles depuis le dessus.",
          "C'est un pre-diagnostic, pas un diagnostic definitif : pour toute decision de travaux importante, nous recommandons systematiquement une visite sur site par un couvreur professionnel pour completer l'analyse IA.",
        ],
      },
      {
        title: "L'amelioration continue",
        content:
          "Notre algorithme s'ameliore en permanence. Chaque diagnostic realise enrichit notre base d'apprentissage. Nous travaillons actuellement sur la detection des degats de grele, l'analyse des toitures en ardoise (specifiques a la Normandie et la Bretagne) et l'integration de donnees meteo historiques pour evaluer l'exposition aux intemperies de chaque toiture. Notre objectif : atteindre 95% de correlation avec les diagnostics physiques realises par des couvreurs certifies.",
      },
    ],
    faq: [
      {
        question: "L'IA peut-elle remplacer un couvreur ?",
        answer:
          "Non, et ce n'est pas son objectif. L'IA est un outil de pre-diagnostic qui detecte 80 a 90% des problemes visibles depuis l'exterieur. Pour l'etat de la charpente, l'isolation et les problemes internes, une visite sur site par un professionnel reste indispensable. L'IA permet de prioriser et de savoir ou regarder en priorite.",
      },
      {
        question: "Sur combien d'images l'IA a-t-elle ete entrainee ?",
        answer:
          "Notre algorithme a ete entraine sur plus de 50 000 images de toitures francaises couvrant tous les types de materiaux (tuile terre cuite, ardoise, zinc, bac acier) et toutes les pathologies courantes (mousse, tuiles cassees, infiltrations, affaissements).",
      },
      {
        question: "Le diagnostic est-il fiable ?",
        answer:
          "Notre taux de detection des problemes visibles est de 85 a 90% sur les images de bonne qualite (drone ou satellite recent). La fiabilite diminue avec des images anciennes ou floues. C'est pourquoi nous indiquons toujours un indice de confiance dans nos rapports.",
      },
    ],
    relatedServices: ["diagnostic-ia", "couverture", "renovation-toiture"],
    relatedGuides: ["diagnostic-toiture-satellite", "glossaire-toiture"],
  },
]

export function getGuideBySlug(slug: string): GuideData | undefined {
  return guidesData.find((g) => g.slug === slug)
}

export function getAllGuideSlugs(): string[] {
  return guidesData.map((g) => g.slug)
}
