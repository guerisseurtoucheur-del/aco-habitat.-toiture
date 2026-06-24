import { NextResponse } from "next/server"

const serviceLabels: Record<string, string> = {
  insectes: "Insectes xylophages (capricorne, vrillette, lyctus)",
  merule: "Mérule / champignons lignivores",
  preventif: "Traitement préventif du bois",
  charpente: "Charpente / structure bois",
  autre: "Autre / à déterminer",
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, service, message } = body

    if (!name || !phone || !email || !service || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("[v0] RESEND_API_KEY manquante")
      return NextResponse.json(
        { error: "Configuration email manquante. Contactez-nous au 02 33 31 19 79." },
        { status: 500 },
      )
    }

    const safeName = escapeHtml(String(name))
    const safePhone = escapeHtml(String(phone))
    const safeEmail = escapeHtml(String(email))
    const safeService = escapeHtml(serviceLabels[service] || String(service))
    const safeMessage = escapeHtml(String(message))

    const htmlContent = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f0e8;">
        <div style="background: #b04a25; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">ACO-HABITAT</h1>
          <p style="color: #f2d9cb; margin: 4px 0 0; font-size: 13px;">Nouvelle demande de devis - Traitement du bois</p>
        </div>
        <div style="background: #ffffff; padding: 24px; border: 1px solid #e7ddcf; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #8a7a66; font-size: 13px; width: 130px;">Nom</td>
              <td style="padding: 10px 0; color: #2a2117; font-size: 14px; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8a7a66; font-size: 13px;">Téléphone</td>
              <td style="padding: 10px 0; font-size: 14px;">
                <a href="tel:${safePhone}" style="color: #b04a25; text-decoration: none; font-weight: 600;">${safePhone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8a7a66; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; font-size: 14px;">
                <a href="mailto:${safeEmail}" style="color: #b04a25; text-decoration: none;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8a7a66; font-size: 13px;">Type de problème</td>
              <td style="padding: 10px 0; color: #2a2117; font-size: 14px;">${safeService}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e7ddcf;">
            <p style="color: #8a7a66; font-size: 13px; margin: 0 0 8px;">Message</p>
            <p style="color: #2a2117; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      </div>
    `

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ACO-HABITAT <devis@aco-habitat.fr>",
        to: ["aco.habitat@orange.fr"],
        reply_to: String(email),
        subject: `Nouvelle demande - ${serviceLabels[service] || service} - ${name}`,
        html: htmlContent,
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => "")
      console.error("[v0] Erreur Resend:", res.status, detail)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi. Veuillez réessayer ou nous appeler au 02 33 31 19 79." },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Erreur envoi email:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi. Veuillez réessayer." },
      { status: 500 },
    )
  }
}
