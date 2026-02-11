import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Satellite, Shield, Wrench, Clock, Star } from "lucide-react";

const stats = [
  { value: "15+", label: "Annees d'experience" },
  { value: "800+", label: "Toitures renovees" },
  { value: "100%", label: "Clients satisfaits" },
  { value: "24h", label: "Delai d'intervention" },
];

const services = [
  {
    icon: Wrench,
    title: "Couverture & Toiture",
    description:
      "Pose et renovation de toiture en tuiles, ardoises ou zinc. Travail soigne et materiaux de qualite.",
  },
  {
    icon: Shield,
    title: "Isolation Thermique",
    description:
      "Isolation par l'interieur ou l'exterieur. Reduisez vos factures d'energie et gagnez en confort.",
  },
  {
    icon: Satellite,
    title: "Diagnostic IA Satellite",
    description:
      "Analyse de votre toiture par intelligence artificielle a partir d'images satellite.",
  },
  {
    icon: Clock,
    title: "Urgence & Depannage",
    description:
      "Intervention rapide en cas de fuite, infiltration ou degat de tempete. Disponible 7j/7.",
  },
];

const testimonials = [
  {
    name: "Marie L.",
    location: "Lyon",
    text: "Travail impeccable, equipe ponctuelle et professionnelle. Notre toit a ete refait en moins d'une semaine.",
    rating: 5,
  },
  {
    name: "Jean-Pierre D.",
    location: "Marseille",
    text: "Le diagnostic IA nous a permis de detecter un probleme d'etancheite avant qu'il ne s'aggrave. Tres innovant !",
    rating: 5,
  },
  {
    name: "Sophie M.",
    location: "Bordeaux",
    text: "Excellent rapport qualite-prix. L'isolation a fait une vraie difference sur notre facture de chauffage.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-roof.jpg"
            alt="Vue aerienne de toitures en tuiles dans un quartier residentiel francais"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              Artisan couvreur qualifie
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-background leading-tight font-serif text-balance">
              Votre toiture merite le meilleur savoir-faire
            </h1>
            <p className="mt-6 text-lg text-background/80 leading-relaxed max-w-xl">
              Expert en couverture, charpente et isolation. Nous combinons
              artisanat traditionnel et technologie IA pour proteger votre maison.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors"
              >
                Demander un devis gratuit
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 bg-background/10 text-background border border-background/20 px-8 py-4 rounded-lg text-base font-semibold hover:bg-background/20 transition-colors backdrop-blur-sm"
              >
                <Satellite className="h-5 w-5" />
                Diagnostic IA gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary font-serif">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Nos expertises
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-balance">
              Des solutions completes pour votre habitat
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              De la couverture a l&apos;isolation, en passant par le diagnostic
              par intelligence artificielle, nous couvrons tous vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-card border border-border rounded-xl p-8 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Decouvrir tous nos services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground font-serif text-balance">
                Analysez votre toiture gratuitement
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-lg leading-relaxed">
                Notre IA analyse les images satellite de votre toit en quelques
                secondes. Detectez mousse, tuiles cassees et problemes
                d&apos;etancheite.
              </p>
            </div>
            <Link
              href="/diagnostic"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-background/90 transition-colors"
            >
              <Satellite className="h-5 w-5" />
              Lancer le diagnostic
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Temoignages
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-balance">
              Ce que disent nos clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-card border border-border rounded-xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-balance">
            Parlons de votre projet
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Devis gratuit et sans engagement. Notre equipe vous repond sous 24h.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-lg text-base font-semibold hover:bg-foreground/90 transition-colors"
            >
              Nous contacter
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
