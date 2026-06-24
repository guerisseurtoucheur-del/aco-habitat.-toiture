export function StructuredData() {
  const SITE = "https://diag.aco-habitat.fr"

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "ACO-HABITAT",
    alternateName: "ACO-HABITAT Traitement du Bois & Charpente",
    url: SITE,
    telephone: "+33233311979",
    email: "aco.habitat@orange.fr",
    description:
      "Expert du traitement du bois et de la charpente depuis 2006. Traitement curatif et préventif contre les insectes xylophages (capricorne, vrillette, lyctus), la mérule et les champignons lignivores. Diagnostic gratuit et devis sans engagement.",
    image: `${SITE}/og-image.jpg`,
    logo: `${SITE}/icon-512.png`,
    foundingDate: "2006",
    priceRange: "$$",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Orne (61)" },
      { "@type": "AdministrativeArea", name: "Sarthe (72)" },
      { "@type": "AdministrativeArea", name: "Mayenne (53)" },
      { "@type": "AdministrativeArea", name: "Eure (27)" },
      { "@type": "AdministrativeArea", name: "Eure-et-Loir (28)" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de traitement du bois",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Diagnostic de charpente",
            description:
              "Inspection complète des bois : identification de l'agresseur (insecte ou champignon), étendue de l'attaque et mesure d'humidité. Diagnostic gratuit et sans engagement.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Traitement des insectes xylophages",
            description:
              "Traitement curatif contre les capricornes, vrillettes et lyctus : bûchage des parties attaquées, injection sous pression et pulvérisation d'un produit certifié.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Traitement de la mérule et des champignons lignivores",
            description:
              "Éradication des champignons lignivores à la source : suppression des causes d'humidité, dépose des bois contaminés et application d'un fongicide certifié.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Traitement de charpente",
            description:
              "Traitement complet de la charpente attaquée et renforcement des pièces de bois ayant perdu leur résistance mécanique.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Traitement préventif du bois",
            description:
              "Protection durable d'une charpente saine, neuve ou rénovée contre les insectes et les champignons lignivores.",
          },
        },
      ],
    },
    sameAs: [],
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment savoir si ma charpente est attaquée par des insectes ou des champignons ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les signes les plus fréquents sont : des petits trous ronds ou ovales dans le bois, de la sciure (vermoulure) au pied des poutres, un bruit de grignotement, un bois qui s'effrite ou qui sonne creux, et la présence de filaments ou de taches brunes en cas de mérule. Au moindre doute, demandez un diagnostic gratuit.",
        },
      },
      {
        "@type": "Question",
        name: "Le diagnostic de charpente est-il vraiment gratuit ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. ACO-HABITAT réalise un diagnostic gratuit et sans engagement : identification de l'agresseur, évaluation de l'étendue de l'attaque et mesure de l'humidité des bois. Vous recevez ensuite un devis clair et détaillé.",
        },
      },
      {
        "@type": "Question",
        name: "Qu'est-ce que la mérule et pourquoi est-elle dangereuse ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La mérule (Serpula lacrymans) est un champignon lignivore qui se développe dans les bois humides et peu ventilés. Elle digère le bois, le rend cassant et peut compromettre la solidité d'une charpente ou d'un plancher en quelques mois. Son traitement nécessite de supprimer la source d'humidité et d'appliquer un fongicide certifié.",
        },
      },
      {
        "@type": "Question",
        name: "Dans quelles zones ACO-HABITAT intervient-il ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ACO-HABITAT intervient directement dans l'Orne (61), la Sarthe (72), la Mayenne (53), l'Eure (27) et l'Eure-et-Loir (28). Pour les demandes situées en dehors de cette zone, nous vous mettons en relation avec un expert qualifié.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la différence entre un traitement curatif et préventif ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le traitement curatif s'applique sur un bois déjà attaqué : on élimine les insectes ou champignons en place (bûchage, injection, pulvérisation, fongicide). Le traitement préventif protège un bois sain pour empêcher toute future attaque. Les deux peuvent être combinés lors d'une même intervention.",
        },
      },
      {
        "@type": "Question",
        name: "Le traitement du bois est-il garanti ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. ACO-HABITAT utilise des produits certifiés et garantit ses interventions de traitement du bois et de la charpente. La durée et les conditions de garantie sont précisées dans le devis.",
        },
      },
    ],
  }

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ACO-HABITAT Traitement du Bois",
    url: SITE,
    description:
      "Expert du traitement du bois et de la charpente depuis 2006 : insectes xylophages, mérule et champignons lignivores. Diagnostic gratuit.",
    publisher: {
      "@type": "Organization",
      name: "ACO-HABITAT",
      url: SITE,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  )
}
