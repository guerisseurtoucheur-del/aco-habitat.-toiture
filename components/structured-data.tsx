export function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: "ACO-HABITAT",
    alternateName: "ACO-HABITAT Expert Toiture",
    url: "https://diag.aco-habitat.fr",
    telephone: "+33233311979",
    email: "aco.habitat@orange.fr",
    description:
      "Expert couvreur France entiere. Diagnostic toiture par intelligence artificielle a 59,90\u20AC. Demoussage, reparation, renovation, charpente et isolation. Devis d'intervention gratuit.",
    image: "https://diag.aco-habitat.fr/og-image.jpg",
    logo: "https://diag.aco-habitat.fr/icon-512.png",
    priceRange: "$$",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    areaServed: [
      {
        "@type": "Country",
        name: "France",
      },
      {
        "@type": "AdministrativeArea",
        name: "Normandie",
      },
      {
        "@type": "City",
        name: "Alencon",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Toiture",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Diagnostic Toiture IA",
            description:
              "Analyse de votre toiture par intelligence artificielle via image satellite pour 59,90\u20AC. Detection des problemes de vegetation, structure, etancheite et thermique en 30 secondes.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Demoussage et Traitement Toiture",
            description:
              "Elimination de la mousse, du lichen et des vegetaux parasites sur votre toiture. Traitement preventif longue duree.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Reparation et Renovation Toiture",
            description:
              "Reparation de tuiles cassees, remplacement de materiaux, renovation complete de couverture. Intervention rapide.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Charpente",
            description:
              "Diagnostic, reparation et renforcement de charpente. Traitement contre les insectes xylophages et champignons.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Isolation Toiture",
            description:
              "Isolation thermique par l'interieur ou l'exterieur. Amelioration du bilan energetique et reduction des pertes de chaleur.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [],
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment fonctionne le diagnostic IA de toiture ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notre intelligence artificielle analyse votre photo satellite ou aerienne en superposant trois calques de diagnostic : vegetal (mousse, lichen), structure (tuiles cassees, deplacees) et etancheite (traces d'humidite, infiltrations). Le resultat est disponible en moins de 30 secondes.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle photo dois-je utiliser pour le diagnostic ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vous pouvez utiliser une capture d'ecran de Google Maps en vue satellite, une photo prise par drone, ou toute photo aerienne de votre toiture. Plus l'image est nette et recente, plus le diagnostic sera precis.",
        },
      },
      {
        "@type": "Question",
        name: "Combien coute le diagnostic en ligne ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le diagnostic IA en ligne coute 59,90\u20AC. Vous recevez instantanement un rapport detaille avec les zones problematiques identifiees, une analyse thermique, un score d'isolation et des recommandations d'intervention. Le devis d'intervention qui suit est gratuit et sans engagement.",
        },
      },
      {
        "@type": "Question",
        name: "Dans quelles zones intervenez-vous ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ACO-HABITAT intervient sur toute la France. Que vous soyez en Ile-de-France, en Normandie, dans le Nord ou partout ailleurs, nous nous deplacons pour diagnostiquer et reparer votre toiture.",
        },
      },
      {
        "@type": "Question",
        name: "Combien coute une intervention de reparation ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le cout depend de la nature et de l'etendue des travaux identifies lors du diagnostic. Le diagnostic IA coute 59,90\u20AC et le devis d'intervention est gratuit et detaille. Nos prix sont transparents et competitifs.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la precision du diagnostic IA ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notre IA atteint un taux de precision de 98% pour la detection des problemes de vegetation, de structure et d'etancheite. Le diagnostic est ensuite valide par nos experts couvreurs avant toute intervention.",
        },
      },
    ],
  }

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ACO-HABITAT Diagnostic Toiture",
    url: "https://diag.aco-habitat.fr",
    description:
      "Diagnostic de votre toiture par intelligence artificielle pour 59,90\u20AC. Analyse satellite en 30 secondes.",
    publisher: {
      "@type": "Organization",
      name: "ACO-HABITAT",
      url: "https://diag.aco-habitat.fr",
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
