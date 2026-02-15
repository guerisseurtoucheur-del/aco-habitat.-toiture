import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Allow large body for PDF attachments (up to 20MB)
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { email, address, globalScore, pdfBase64 } = await req.json()
    console.log("[v0] POST /api/send-report called, email:", email, "address:", address, "pdfBase64 length:", pdfBase64?.length || 0)

    if (!email) {
      console.log("[v0] send-report missing email")
      return NextResponse.json({ error: "Email requis" }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com"
    const smtpPort = Number(process.env.SMTP_PORT) || 587
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    console.log("[v0] SMTP config - host:", smtpHost, "port:", smtpPort, "user:", smtpUser, "pass set:", !!smtpPass)

    if (!smtpUser || !smtpPass) {
      console.log("[v0] SMTP credentials missing!")
      return NextResponse.json({ error: "Configuration SMTP manquante", details: { host: smtpHost, user: !!smtpUser, pass: !!smtpPass } }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    const scoreText = globalScore >= 75 ? "Bon etat" : globalScore >= 50 ? "A surveiller" : "Intervention recommandee"

    console.log("[v0] Sending email to:", email, "from:", smtpUser)
    await transporter.sendMail({
      from: `"ACO-HABITAT Diagnostic" <${process.env.SMTP_USER || "noreply@aco-habitat.fr"}>`,
      to: email,
      subject: `Votre diagnostic toiture - ${address}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 20px; background: #0a0a0a; border-radius: 12px 12px 0 0;">
            <h1 style="color: #22d3ee; margin: 0; font-size: 24px;">ACO-HABITAT</h1>
            <p style="color: #888; margin: 5px 0 0; font-size: 14px;">Diagnostic Toiture par IA</p>
          </div>
          
          <div style="padding: 30px; background: #111; border-radius: 0 0 12px 12px;">
            <h2 style="color: #fff; margin: 0 0 10px;">Votre rapport est pret</h2>
            <p style="color: #999; line-height: 1.6;">
              Bonjour,<br><br>
              Votre diagnostic toiture pour <strong style="color: #fff;">${address}</strong> est termine.
            </p>
            
            <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="color: #888; margin: 0 0 5px; font-size: 12px;">SCORE GLOBAL</p>
              <p style="color: ${globalScore >= 75 ? "#22c55e" : globalScore >= 50 ? "#f59e0b" : "#ef4444"}; font-size: 36px; font-weight: bold; margin: 0;">
                ${globalScore}/100
              </p>
              <p style="color: #888; margin: 5px 0 0; font-size: 14px;">${scoreText}</p>
            </div>

            <p style="color: #999; line-height: 1.6;">
              Vous trouverez votre rapport PDF complet en piece jointe de cet email. 
              Ce document contient l'analyse detaillee avec les scores par categorie, 
              les zones problematiques detectees et nos recommandations.
            </p>

            <div style="background: #1a1500; border: 1px solid #d97706; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="color: #fbbf24; font-weight: bold; margin: 0 0 5px; font-size: 14px;">Diagnostic charpente par IA</p>
              <p style="color: #ccc; margin: 0 0 12px; font-size: 13px; line-height: 1.5;">
                Completez votre analyse avec un diagnostic charpente pour une vision complete 
                de l'etat de votre couverture et de sa structure porteuse.
              </p>
              <a href="https://aco-habitat.fr" 
                 style="display: inline-block; padding: 10px 24px; background: #d97706; color: #000; font-weight: bold; text-decoration: none; border-radius: 6px; font-size: 13px;">
                Analyser ma charpente sur aco-habitat.fr
              </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                ACO-HABITAT - Diagnostic Toiture par IA<br>
                aco.habitat@orange.fr | diag.aco-habitat.fr
              </p>
            </div>
          </div>
        </div>
      `,
      attachments: pdfBase64 ? [
        {
          filename: `diagnostic-toiture-${new Date().toISOString().slice(0, 10)}.pdf`,
          content: Buffer.from(pdfBase64, "base64"),
          contentType: "application/pdf",
        },
      ] : [],
    })

    console.log("[v0] Email sent successfully to:", email)
    return NextResponse.json({ success: true })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error("[v0] SMTP Error:", errMsg)
    return NextResponse.json({ error: "Erreur envoi email", details: errMsg }, { status: 500 })
  }
}
