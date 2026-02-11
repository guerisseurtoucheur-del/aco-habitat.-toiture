import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Cle API Gemini non configuree." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Aucune image fournie." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Le fichier doit etre une image." },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "L'image ne doit pas depasser 10 Mo." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64Data = Buffer.from(bytes).toString("base64");

    const prompt = `Tu es un expert en toiture pour la societe ACO-HABITAT. Analyse cette image de toiture de maniere professionnelle.

Structure ton rapport ainsi :

**ETAT GENERAL**
Decris l'etat general de la toiture visible sur l'image.

**MATERIAUX IDENTIFIES**
Liste les materiaux de couverture identifies (tuiles, ardoises, zinc, etc.).

**DEFAUTS DETECTES**
Liste les defauts visibles : mousse, lichens, tuiles cassees ou deplacees, problemes de zinguerie, deformations, etc. Si aucun defaut n'est visible, indique-le.

**NIVEAU D'URGENCE**
Indique un niveau d'urgence : FAIBLE, MOYEN ou ELEVE, avec une explication.

**RECOMMANDATIONS**
Donne 2-3 recommandations concretes pour l'entretien ou la renovation.

Sois precis, professionnel et utile. Reponds en francais.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: file.type,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Erreur lors de la communication avec l'IA." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Aucun resultat genere.";

    return NextResponse.json({ report: text });
  } catch (error) {
    console.error("Erreur diagnostic:", error);
    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de l'analyse. Veuillez reessayer.",
      },
      { status: 500 }
    );
  }
}
