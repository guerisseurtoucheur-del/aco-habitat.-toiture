import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact & Devis | ACO-HABITAT",
  description:
    "Demandez votre devis gratuit. Contactez ACO-HABITAT pour tous vos projets de toiture, couverture, isolation et charpente.",
};

const contactInfo = [
  {
    icon: Phone,
    label: "Telephone",
    value: "06 00 00 00 00",
    href: "tel:+33600000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@aco-habitat.fr",
    href: "mailto:contact@aco-habitat.fr",
  },
  {
    icon: MapPin,
    label: "Zone d'intervention",
    value: "France metropolitaine",
    href: null,
  },
  {
    icon: Clock,
    label: "Disponibilite",
    value: "Lun-Sam, 7h-19h",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-balance max-w-2xl">
            Parlons de votre projet
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
            Devis gratuit et sans engagement. Remplissez le formulaire
            ci-dessous et notre equipe vous recontactera sous 24 heures.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold font-serif mb-8">
                Nos coordonnees
              </h2>
              <div className="flex flex-col gap-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-foreground font-semibold hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-semibold">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-12 bg-secondary rounded-xl p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Nos garanties
                </h3>
                <ul className="flex flex-col gap-3">
                  <li className="text-sm text-foreground">
                    Devis gratuit sous 24h
                  </li>
                  <li className="text-sm text-foreground">
                    Assurance decennale
                  </li>
                  <li className="text-sm text-foreground">
                    Artisan qualifie RGE
                  </li>
                  <li className="text-sm text-foreground">
                    Garantie de satisfaction
                  </li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
