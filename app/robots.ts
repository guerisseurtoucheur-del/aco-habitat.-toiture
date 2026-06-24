import type { MetadataRoute } from "next"

// Robots des IA explicitement autorises afin que le site puisse etre lu
// et cite par ChatGPT, Claude, Perplexity, Google Gemini, Meta AI, etc.
const AI_BOTS = [
  "GPTBot", // OpenAI (entrainement)
  "OAI-SearchBot", // OpenAI (recherche / citations)
  "ChatGPT-User", // ChatGPT (navigation a la demande)
  "ClaudeBot", // Anthropic Claude
  "Claude-Web", // Anthropic Claude
  "anthropic-ai", // Anthropic
  "PerplexityBot", // Perplexity
  "Perplexity-User", // Perplexity (navigation)
  "Google-Extended", // Google Gemini / AI Overviews
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot", // Amazon / Alexa
  "meta-externalagent", // Meta AI
  "DuckAssistBot", // DuckDuckGo AI
  "CCBot", // Common Crawl (source de nombreux LLM)
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin"],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/admin"],
      })),
    ],
    sitemap: "https://aco-habitat.fr/sitemap.xml",
    host: "https://aco-habitat.fr",
  }
}
