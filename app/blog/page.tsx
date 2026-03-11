import type { Metadata } from "next"
import Link from "next/link"
import { getAllArticles } from "@/lib/blog-data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog Toiture | Conseils, Prix et Aides - ACO-HABITAT",
  description: "Conseils d'experts sur la toiture : prix renovation 2026, aides MaPrimeRenov, entretien, reparations. Guides pratiques pour proprietaires.",
  keywords: ["blog toiture", "prix toiture", "aides renovation toiture", "conseils toiture", "entretien toiture"],
  openGraph: {
    title: "Blog Toiture | Conseils, Prix et Aides - ACO-HABITAT",
    description: "Conseils d'experts sur la toiture : prix renovation 2026, aides MaPrimeRenov, entretien, reparations.",
    type: "website",
  },
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <Badge variant="outline" className="mb-4">
              Blog & Conseils
            </Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Tout savoir sur votre toiture
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Guides pratiques, prix, aides financieres et conseils d'experts pour entretenir, reparer ou renover votre toiture.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Card key={article.slug} className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/20">ACO</span>
                    </div>
                    <Badge className="absolute top-3 left-3" variant="secondary">
                      {article.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <Link href={`/blog/${article.slug}`}>
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <Link href={`/blog/${article.slug}`}>
                      <Button variant="ghost" size="sm" className="group/btn p-0 h-auto">
                        Lire l'article
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Besoin d'evaluer votre toiture ?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Notre diagnostic IA analyse votre toiture en 30 secondes et vous fournit un rapport detaille.
            </p>
            <Link href="/#diagnostic">
              <Button size="lg" className="gap-2">
                Faire un diagnostic
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
