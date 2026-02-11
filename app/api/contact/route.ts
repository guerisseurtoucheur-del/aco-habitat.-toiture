import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, service, message } = body

    if (!name || !phone || !email || !service || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      )
    }

    const serviceLabels: Record<string, string> = {
      diagnostic: "Diagnostic IA",
      reparation: "Reparation de toiture",
      renovation: "Renovation complete",
      isolation: "Isolation thermique",
      demoussage: "Demoussage et traitement",
      charpente: "Charpente",
      autre: "Autre",
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.orange.fr",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0a1628; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #3b82f6; margin: 0; font-size: 22px;">ACO-HABITAT</h1>
          <p style="color: #94a3b8; margin: 4px 0 0; font-size: 13px;">Nouvelle demande de devis</p>
        </div>
        <div style="background: #0f1d32; padding: 24px; border: 1px solid #1e3a5f; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 130px;">Nom</td>
              <td style="padding: 10px 0; color: #e2e8f0; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Telephone</td>
              <td style="padding: 10px 0; color: #e2e8f0; font-size: 14px;">
                <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; color: #e2e8f0; font-size: 14px;">
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Service</td>
              <td style="padding: 10px 0; color: #e2e8f0; font-size: 14px;">${serviceLabels[service] || service}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #1e3a5f;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">Message</p>
            <p style="color: #e2e8f0; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"ACO-HABITAT Site Web" <${process.env.SMTP_USER}>`,
      to: "aco.habitat@orange.fr",
      replyTo: email,
      subject: `Nouvelle demande - ${serviceLabels[service] || service} - ${name}`,
      html: htmlContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur envoi email:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi. Veuillez reessayer." },
      { status: 500 }
    )
  }
}
