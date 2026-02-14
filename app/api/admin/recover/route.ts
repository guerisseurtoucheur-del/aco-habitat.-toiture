import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const { email } = await req.json()

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    return NextResponse.json({ error: "Recuperation non configuree" }, { status: 500 })
  }

  // Always return success to not reveal if the email exists
  if (email.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
    return NextResponse.json({ success: true })
  }

  // Email matches - send password by email (never return it in the response)
  try {
    const smtpPort = Number(process.env.SMTP_PORT) || 587
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    await transporter.sendMail({
      from: `"ACO-HABITAT" <${process.env.SMTP_USER || "noreply@aco-habitat.fr"}>`,
      to: adminEmail,
      subject: "Recuperation mot de passe - Admin ACO-HABITAT",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px;">
          <div style="text-align: center; padding: 20px; background: #0a0a0a; border-radius: 12px 12px 0 0;">
            <h2 style="color: #22d3ee; margin: 0;">ACO-HABITAT</h2>
            <p style="color: #888; margin: 5px 0 0; font-size: 13px;">Recuperation d'acces admin</p>
          </div>
          <div style="padding: 30px; background: #111; border-radius: 0 0 12px 12px;">
            <p style="color: #ccc; line-height: 1.6;">
              Vous avez demande la recuperation de votre mot de passe administrateur.
            </p>
            <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="color: #888; margin: 0 0 8px; font-size: 12px;">VOTRE MOT DE PASSE</p>
              <p style="color: #22d3ee; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 2px;">${adminPassword}</p>
            </div>
            <p style="color: #999; font-size: 13px; line-height: 1.6;">
              Rendez-vous sur votre page admin et utilisez ce mot de passe pour vous connecter.
            </p>
            <p style="color: #666; font-size: 11px; margin-top: 20px; padding-top: 15px; border-top: 1px solid #333;">
              Si vous n'avez pas fait cette demande, ignorez cet email. Votre compte reste securise.
            </p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error("[v0] SMTP config:", { host: process.env.SMTP_HOST, port: process.env.SMTP_PORT, user: process.env.SMTP_USER ? "SET" : "MISSING", pass: process.env.SMTP_PASS ? "SET" : "MISSING" })
    console.error("[v0] SMTP error:", err)
    return NextResponse.json({ error: "Erreur envoi email. Verifiez la configuration SMTP." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
