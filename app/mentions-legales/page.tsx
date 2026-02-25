import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Mentions Legales & CGV | ACO-HABITAT",
  description: "Mentions legales, conditions generales de vente et politique de confidentialite de la plateforme ACO-HABITAT.",
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Retour au site
          </Link>
          <h1
            className="text-3xl font-bold text-foreground md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mentions Legales & CGV
          </h1>
          <p className="mt-2 text-muted-foreground">
            Derniere mise a jour : 13 fevrier 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="prose prose-invert max-w-none space-y-12">

          {/* Mentions legales */}
          <section>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              1. Mentions legales
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">Editeur du site :</strong> ACO-HABITAT<br />
                Adresse : France<br />
                Telephone : 02 33 31 19 79<br />
                Email : aco.habitat@orange.fr<br />
                Site web : aco-habitat.fr
              </p>
              <p>
                <strong className="text-foreground">Hebergement :</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA
              </p>
            </div>
          </section>

          {/* Nature du service */}
          <section>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              2. Nature du service
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                ACO-HABITAT est une <strong className="text-foreground">plateforme de diagnostic numerique</strong> qui utilise
                l{"'"}intelligence artificielle pour analyser l{"'"}etat apparent d{"'"}une toiture a partir d{"'"}images
                (satellite IGN, photo drone, photo smartphone, capture Google Maps).
              </p>
              <p>
                Le service fournit un rapport d{"'"}analyse automatise incluant des scores indicatifs, la
                detection de zones potentiellement problematiques et des recommandations generales.
              </p>
            </div>
          </section>

          {/* CLAUSE CLE : Limitation de responsabilite */}
          <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              3. Limitation de responsabilite - Clause essentielle
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <div className="rounded-lg bg-amber-500/10 p-4 text-amber-200">
                <p className="font-semibold">
                  Le diagnostic fourni par ACO-HABITAT est une <strong>aide a la decision</strong> basee
                  sur l{"'"}analyse automatisee d{"'"}images par intelligence artificielle. Il ne constitue
                  en aucun cas :
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  <li>Un diagnostic technique officiel au sens de la reglementation</li>
                  <li>Un remplacement d{"'"}une inspection physique par un professionnel qualifie</li>
                  <li>Une garantie de l{"'"}etat reel de la toiture</li>
                  <li>Un devis ou une estimation contractuelle de travaux</li>
                </ul>
              </div>
              <p>
                <strong className="text-foreground">Precision :</strong> L{"'"}analyse est realisee a partir d{"'"}images
                bidimensionnelles dont la qualite, la resolution et l{"'"}actualite varient. Des defauts non
                visibles en surface (charpente, sous-couverture, isolation interne) ne peuvent pas etre
                detectes par ce procede.
              </p>
              <p>
                <strong className="text-foreground">Recommandation imperative :</strong> Avant tout engagement
                de travaux, le client est tenu de faire realiser une inspection physique par un couvreur
                professionnel qualifie. Le rapport ACO-HABITAT peut servir de base de discussion avec ce
                professionnel mais ne s{"'"}y substitue pas.
              </p>
              <p>
                ACO-HABITAT <strong className="text-foreground">decline toute responsabilite</strong> en cas de
                decisions prises par le client sur la seule base du rapport automatise, notamment en cas de
                travaux entrepris, de degats non detectes, ou d{"'"}ecarts entre le diagnostic numerique et
                l{"'"}etat reel de la toiture.
              </p>
            </div>
          </section>

          {/* Independance */}
          <section className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6">
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              4. Independance vis-a-vis des prestataires de travaux
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                ACO-HABITAT est une <strong className="text-foreground">plateforme independante</strong>. Le site
                n{"'"}est affilie, partenaire ou mandataire d{"'"}aucune entreprise de couverture, charpente
                ou travaux de toiture.
              </p>
              <p>
                L{"'"}annuaire de couvreurs eventuellement propose sur le site est fourni a titre informatif.
                <strong className="text-foreground"> Le choix du prestataire, la negociation du devis et
                l{"'"}execution du chantier relevent de la seule responsabilite du client.</strong>
              </p>
              <p>
                ACO-HABITAT n{"'"}intervient pas dans la relation contractuelle entre le client et le
                couvreur choisi. Aucune garantie n{"'"}est accordee quant a la qualite, les delais ou les
                tarifs des prestataires referencies.
              </p>
              <p>
                <strong className="text-foreground">Recherche via Google Maps :</strong> La fonctionnalite de
                recherche de couvreurs utilise exclusivement l{"'"}API Google Maps Embed. Les resultats affiches
                sont fournis par Google LLC. ACO-HABITAT n{"'"}a aucun controle sur les resultats de recherche,
                les avis affiches ou les informations des etablissements. Le site agit uniquement comme
                outil de visualisation de donnees publiques fournies par Google.
              </p>
            </div>
          </section>

          {/* CGV */}
          <section>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              5. Conditions Generales de Vente (CGV)
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <h3 className="text-base font-semibold text-foreground">5.1 Prix et paiement</h3>
              <p>
                Le diagnostic de toiture est facture <strong className="text-foreground">19,90 EUR TTC</strong> par
                analyse, payable en ligne par carte bancaire via la plateforme securisee Stripe.
                Le prix inclut l{"'"}analyse IA complete (vegetal, structure, etancheite, thermique) et le
                rapport PDF telechareable.
              </p>

              <h3 className="text-base font-semibold text-foreground">5.2 Livraison du service</h3>
              <p>
                Le rapport de diagnostic est genere automatiquement et mis a disposition immediatement
                apres le paiement. Le delai de generation est generalement inferieur a 60 secondes.
                Le rapport PDF est telechareable directement depuis le navigateur.
              </p>

              <h3 className="text-base font-semibold text-foreground">5.3 Droit de retractation</h3>
              <p>
                Conformement a l{"'"}article L221-28 du Code de la Consommation, le droit de retractation
                ne peut etre exerce pour les contenus numeriques fournis immediatement apres le paiement
                avec l{"'"}accord expres du consommateur. En cliquant sur {"\""}Payer{"\""},
                le client accepte que le service soit execute immediatement et renonce expressement a son
                droit de retractation.
              </p>

              <h3 className="text-base font-semibold text-foreground">5.4 Remboursement</h3>
              <p>
                En cas de dysfonctionnement technique empechant la generation du rapport (erreur serveur,
                absence de resultat), un remboursement integral sera effectue sous 14 jours ouvrables.
                Les demandes de remboursement sont a adresser a aco.habitat@orange.fr avec le numero
                de transaction Stripe.
              </p>
            </div>
          </section>

          {/* Propriete intellectuelle */}
          <section>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              6. Propriete intellectuelle
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Le rapport de diagnostic genere est la propriete du client qui l{"'"}a commande. Le client
                est libre de le transmettre, partager ou imprimer a sa convenance, notamment pour
                consultation aupres de professionnels du batiment.
              </p>
              <p>
                Les images satellite IGN sont utilisees conformement a la licence ouverte Etalab. Le code
                source, la marque ACO-HABITAT, les algorithmes d{"'"}analyse et le design du site restent la
                propriete exclusive d{"'"}ACO-HABITAT.
              </p>
            </div>
          </section>

          {/* Donnees personnelles */}
          <section>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              7. Protection des donnees personnelles
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">Donnees collectees :</strong> Adresse postale (pour
                localisation satellite), photos uploadees, adresse email (si fournie pour l{"'"}annuaire
                couvreurs), donnees de paiement (traitees exclusivement par Stripe).
              </p>
              <p>
                <strong className="text-foreground">Finalite :</strong> Les donnees sont collectees uniquement
                pour la fourniture du service de diagnostic. Aucune donnee personnelle n{"'"}est vendue ou
                transmise a des tiers a des fins commerciales.
              </p>
              <p>
                <strong className="text-foreground">Conservation :</strong> Les images uploadees et les rapports
                sont conserves 30 jours puis automatiquement supprimes. Les donnees de facturation sont
                conservees conformement aux obligations legales (10 ans).
              </p>
              <p>
                <strong className="text-foreground">Droits :</strong> Conformement au RGPD, vous disposez d{"'"}un
                droit d{"'"}acces, de rectification, de suppression et de portabilite de vos donnees.
                Contact : aco.habitat@orange.fr.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              8. Droit applicable et litiges
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Les presentes conditions sont soumises au droit francais. En cas de litige, les parties
                s{"'"}efforceront de trouver une solution amiable. A defaut, les tribunaux competents du
                ressort du siege social d{"'"}ACO-HABITAT seront seuls competents.
              </p>
              <p>
                Conformement a l{"'"}article L612-1 du Code de la Consommation, le client peut recourir
                gratuitement au service de mediation de la consommation.
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
