import { generateText } from "ai"

export async function POST(req: Request) {
  const { image, mimeType } = await req.json()

  if (!image || !mimeType) {
    return Response.json(
      { error: "Image et type MIME requis" },
      { status: 400 }
    )
  }

  const result = await generateText({
    model: "google/gemini-2.5-flash",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Tu es l'expert en toiture de l'entreprise ACO-HABITAT. Analyse cette image satellite de toiture de maniere professionnelle.

Ton rapport doit inclure :
1. MATERIAUX IDENTIFIES : Identifie les materiaux de couverture visibles (tuiles, ardoises, zinc, etc.)
2. ETAT GENERAL : Decris l'etat general de la toiture
3. DEFAUTS DETECTES : Liste les defauts visibles (mousse, lichens, tuiles cassees/deplacees, problemes d'etancheite, etc.)
4. NIVEAU D'URGENCE : Attribue un niveau - Faible, Moyenne ou Haute
5. RECOMMANDATIONS : Propose des actions correctives

Sois precis et professionnel. Reponds en francais.`,
          },
          {
            type: "image",
            image: `data:${mimeType};base64,${image}`,
          },
        ],
      },
    ],
  })

  return Response.json({ text: result.text })
}
