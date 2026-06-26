import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getAllArticles } from "@/lib/blog-data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog Traitement du Bois | Mérule, Insectes & Charpente - ACO-HABITAT",
  description:
    "Conseils d'experts sur le traitement du bois : prix d'un traitement mérule 2026, obligations légales, insectes xylophages, protection de la charpente. Guides pratiques pour propriétaires.",
  keywords: [
    "blog traitement du bois",
    "prix traitement mérule",
    "mérule obligations légales",
    "insectes xylophages",
    "traitement charpente",
  ],
  openGraph: {
    title: "Blog Traitement du Bois | Mérule, Insectes & Charpente - ACO-HABITAT",
    description:
      "Conseils d'experts sur le traitement du bois : prix, obligations légales, insectes xylophages et protection de la charpente.",
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
              Tout savoir sur le traitement du bois
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Guides pratiques, prix, obligations légales et conseils d&apos;experts pour protéger votre charpente
              contre la mérule et les insectes xylophages.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Card
                  key={article.slug}
                  className="group overflow-hidden border-border/60 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:[transform:perspective(1000px)_rotateX(2deg)] hover:shadow-2xl hover:shadow-primary/10"
                >
                  <Link href={`/blog/${article.slug}`} className="block">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/5 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                      <Badge className="absolute left-3 top-3 shadow-sm" variant="secondary">
                        {article.category}
                      </Badge>
                    </div>
                  </Link>
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
              Un doute sur l&apos;état de votre charpente ?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Demandez un diagnostic gratuit et sans engagement. Nous identifions l&apos;agresseur et établissons un
              devis clair.
            </p>
            <Link href="/#devis">
              <Button size="lg" className="gap-2">
                Diagnostic gratuit
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
