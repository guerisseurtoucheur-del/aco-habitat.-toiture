import type { Metadata } from "next";
import Link from "next/link";
import { Satellite, Shield, Zap, Eye } from "lucide-react";
import { DiagnosticForm } from "@/components/diagnostic-form";

export const metadata: Metadata = {
  title: "Diagnostic IA Satellite | ACO-HABITAT",
  description:
    "Analysez l'etat de votre toiture gratuitement grace a notre intelligence artificielle. Importez une photo et recevez un rapport instantane.",
};

const features = [
  {
    icon: Zap,
    title: "Instantane",
    description: "Resultat en quelques secondes",
  },
  {
    icon: Eye,
    title: "Detection precise",
    description: "Mousse, defauts, deformations",
  },
  {
    icon: Shield,
    title: "Confidentiel",
    description: "Vos images ne sont pas conservees",
  },
];

export default function DiagnosticPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Satellite className="h-5 w-5 text-primary" />
            </div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">
              Diagnostic IA
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-balance max-w-2xl">
            Analysez votre toiture par intelligence artificielle
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
            Importez une photo aerienne ou satellite de votre toiture. Notre IA
            detecte les materiaux, les defauts et vous donne un niveau
            d&apos;urgence.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-card border border-border flex items-center justify-center">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Tool */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <DiagnosticForm />
        </div>
      </section>

      {/* Info */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary font-serif">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Importez</h3>
              <p className="text-sm text-muted-foreground">
                Deposez une photo aerienne ou satellite de votre toiture.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary font-serif">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Analysez</h3>
              <p className="text-sm text-muted-foreground">
                Notre IA examine chaque detail de la toiture visible.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary font-serif">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Recevez</h3>
              <p className="text-sm text-muted-foreground">
                Un rapport complet avec recommandations et niveau d&apos;urgence.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Pour un diagnostic complet sur site,{" "}
              <Link href="/contact" className="text-primary font-semibold hover:underline">
                contactez-nous
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
