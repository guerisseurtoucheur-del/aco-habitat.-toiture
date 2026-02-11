import { GoogleGenerativeAI } from "@google/generative-ai";
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

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Le fichier doit etre une image." },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "L'image ne doit pas depasser 10 Mo." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      },
    ]);

    const text = result.response.text();

    return NextResponse.json({ report: text });
  } catch (error) {
    console.error("Erreur diagnostic:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'analyse. Veuillez reessayer." },
      { status: 500 }
    );
  }
}
