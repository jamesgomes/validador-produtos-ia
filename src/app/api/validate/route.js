import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";

// Cria cliente Vision API usando variáveis de ambiente (sem arquivo físico)
const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

export async function POST(req) {
  try {
    const { title, description, imageUrl } = await req.json();

    // ✅ 1. Validação de texto com OpenAI Moderation
    const openaiResponse = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "omni-moderation-latest",
        input: `${title}\n${description}`,
      }),
    }).then((r) => r.json());

    if (openaiResponse.error) {
      return NextResponse.json(
        { error: `OpenAI: ${openaiResponse.error.message}` },
        { status: 429 }
      );
    }

    const textResult = openaiResponse.results[0];
    const textFlags = Object.keys(textResult.categories).filter((cat) => textResult.categories[cat]);

    // ✅ 2. Análise de imagem com Google Vision SDK
    const [visionResult] = await client.safeSearchDetection(imageUrl);
    const safeSearch = visionResult.safeSearchAnnotation || {};

    // Mapeia possíveis riscos
    const imageFlags = [];
    if (["LIKELY", "VERY_LIKELY"].includes(safeSearch.violence)) imageFlags.push("violence");
    if (["LIKELY", "VERY_LIKELY"].includes(safeSearch.adult)) imageFlags.push("sexual");
    if (["LIKELY", "VERY_LIKELY"].includes(safeSearch.racy)) imageFlags.push("sexual");

    // ✅ Combina resultado final
    const reasons = [...new Set([...textFlags, ...imageFlags])];
    const status = reasons.length > 0 ? "review" : "approved";

    return NextResponse.json({
      status,
      reasons,
      textModeration: textResult.categories,
      imageModeration: safeSearch,
    });
  } catch (error) {
    console.error("Validation Error:", error.message);
    return NextResponse.json(
      { error: "Erro ao validar produto. Verifique as credenciais ou tente novamente." },
      { status: 500 }
    );
  }
}
