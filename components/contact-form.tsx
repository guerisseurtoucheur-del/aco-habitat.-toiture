"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceOptions = [
  "Couverture & Toiture",
  "Charpente",
  "Isolation thermique",
  "Zinguerie",
  "Urgence & Depannage",
  "Diagnostic IA",
  "Autre",
];

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

  const updateField = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold font-serif mb-3">
          Demande envoyee !
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Merci pour votre message. Notre equipe vous recontactera sous 24h
          pour discuter de votre projet.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setFormState({
              name: "",
              email: "",
              phone: "",
              service: "",
              message: "",
            });
          }}
          className="mt-8 text-primary font-semibold hover:underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-xl p-8"
    >
      <div className="flex flex-col gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Nom complet <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={formState.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Jean Dupont"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email <span className="text-primary">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={formState.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="jean@exemple.fr"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Telephone
            </label>
            <input
              id="phone"
              type="tel"
              value={formState.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="06 12 34 56 78"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Type de service <span className="text-primary">*</span>
          </label>
          <select
            id="service"
            required
            value={formState.service}
            onChange={(e) => updateField("service", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="">Selectionnez un service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Votre message <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formState.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Decrivez votre projet ou votre besoin..."
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full flex items-center justify-center gap-3 py-4 rounded-xl text-base font-semibold transition-all",
            loading
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Envoyer ma demande
            </>
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center">
          En soumettant ce formulaire, vous acceptez d&apos;etre contacte par
          notre equipe. Vos donnees ne seront jamais partagees.
        </p>
      </div>
    </form>
  );
}
