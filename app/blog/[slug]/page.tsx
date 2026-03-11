import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug, getAllArticles } from "@/lib/blog-data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2 } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article non trouve",
    }
  }

  return {
    title: `${article.title} | Blog ACO-HABITAT`,
    description: article.description,
    keywords: [article.category, "toiture", "renovation", "diagnostic"],
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const allArticles = getAllArticles()
  const otherArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 2)

  // Schema Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-6 -ml-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au blog
              </Button>
            </Link>
            <Badge variant="outline" className="mb-4">
              {article.category}
            </Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {article.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime} de lecture
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-table:text-sm">
              <div dangerouslySetInnerHTML={{ __html: formatContent(article.content) }} />
            </article>

            {/* CTA Box */}
            <Card className="mt-12 bg-primary/5 border-primary/20">
              <CardContent className="p-6 sm:p-8 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Evaluez l'etat de votre toiture
                </h3>
                <p className="text-muted-foreground mb-4">
                  Notre diagnostic IA analyse votre toiture en 30 secondes et detecte les problemes potentiels.
                </p>
                <Link href="/#diagnostic">
                  <Button size="lg" className="gap-2">
                    Faire un diagnostic gratuit
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Other Articles */}
        {otherArticles.length > 0 && (
          <section className="border-t border-border bg-muted/30 py-12">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Articles similaires
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {otherArticles.map((otherArticle) => (
                  <Link key={otherArticle.slug} href={`/blog/${otherArticle.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {otherArticle.category}
                        </Badge>
                        <h3 className="font-medium text-foreground line-clamp-2 mb-2">
                          {otherArticle.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {otherArticle.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

function formatContent(content: string): string {
  // Convert markdown-like content to HTML
  let html = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Lists
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // Paragraphs
    .split('\n\n')
    .map(p => {
      if (p.startsWith('<h') || p.startsWith('<li') || p.startsWith('|')) {
        return p
      }
      if (p.trim() && !p.startsWith('<')) {
        return `<p>${p}</p>`
      }
      return p
    })
    .join('\n')

  // Wrap consecutive li elements in ul
  html = html.replace(/(<li>.*?<\/li>\n?)+/g, '<ul>$&</ul>')

  // Simple table parsing
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(c => c.trim())
    if (cells.some(c => c.includes('---'))) return ''
    const isHeader = match.includes('Type') || match.includes('Profil') || match.includes('Prix')
    const tag = isHeader ? 'th' : 'td'
    return `<tr>${cells.map(c => `<${tag} class="border px-3 py-2">${c.trim()}</${tag}>`).join('')}</tr>`
  })
  
  // Wrap table rows
  if (html.includes('<tr>')) {
    html = html.replace(/(<tr>[^]*?<\/tr>\s*)+/g, '<table class="w-full border-collapse border my-4">$&</table>')
  }

  return html
}
