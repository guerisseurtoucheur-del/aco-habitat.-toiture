import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import nodemailer from "nodemailer"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 })
  }

  try {
    // Find diagnostics older than 3 days that haven't received a follow-up
    const diagnostics = await sql`
      SELECT id, client_name, client_phone, email, address, score_global
      FROM diagnostics
      WHERE followup_sent = FALSE
        AND email IS NOT NULL
        AND email != ''
        AND created_at < NOW() - INTERVAL '3 days'
      LIMIT 10
    `

    if (diagnostics.length === 0) {
      return NextResponse.json({ message: "Aucun suivi a envoyer", sent: 0 })
    }

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

    let sentCount = 0

    for (const diag of diagnostics) {
      try {
        const score = diag.score_global || 0
        const clientName = diag.client_name || "Madame, Monsieur"
        const address = diag.address || "votre propriete"

        let urgencyBlock = ""
        if (score < 50) {
          urgencyBlock = `
            <div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="color: #dc2626; font-weight: bold; margin: 0 0 5px;">Intervention recommandee</p>
              <p style="color: #991b1b; margin: 0; font-size: 14px;">
                Votre toiture a obtenu un score de ${score}/100. Des travaux sont recommandes pour eviter 
                des degats plus importants. Nous pouvons vous proposer un devis gratuit.
              </p>
            </div>
          `
        } else if (score < 75) {
          urgencyBlock = `
            <div style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="color: #d97706; font-weight: bold; margin: 0 0 5px;">Points a surveiller</p>
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                Votre toiture a obtenu un score de ${score}/100. Quelques points meritent attention 
                pour prevenir une degradation. Un devis preventif pourrait vous faire economiser.
              </p>
            </div>
          `
        } else {
          urgencyBlock = `
            <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="color: #16a34a; font-weight: bold; margin: 0 0 5px;">Bon etat general</p>
              <p style="color: #166534; margin: 0; font-size: 14px;">
                Votre toiture a obtenu un score de ${score}/100. Bonne nouvelle ! 
                Un entretien regulier vous permettra de maintenir cet etat.
              </p>
            </div>
          `
        }

        await transporter.sendMail({
          from: `"ACO-HABITAT" <${process.env.SMTP_USER || "noreply@aco-habitat.fr"}>`,
          to: diag.email,
          subject: `Suivi de votre diagnostic toiture - ${address}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px; background: #0a0a0a; border-radius: 12px 12px 0 0;">
                <h1 style="color: #22d3ee; margin: 0; font-size: 22px;">ACO-HABITAT</h1>
                <p style="color: #888; margin: 5px 0 0; font-size: 13px;">Suivi diagnostic toiture</p>
              </div>
              
              <div style="padding: 30px; background: #111; color: #ccc; border-radius: 0 0 12px 12px;">
                <p style="line-height: 1.6;">
                  Bonjour <strong style="color: #fff;">${clientName}</strong>,
                </p>
                <p style="line-height: 1.6;">
                  Nous revenons vers vous suite au diagnostic de votre toiture situe au 
                  <strong style="color: #fff;">${address}</strong>, realise il y a quelques jours.
                </p>
                
                ${urgencyBlock}

                <p style="line-height: 1.6;">
                  Nous restons a votre disposition pour :
                </p>
                <ul style="color: #ccc; line-height: 1.8;">
                  <li>Repondre a vos questions sur le diagnostic</li>
                  <li>Vous proposer un <strong style="color: #22d3ee;">devis gratuit et sans engagement</strong></li>
                  <li>Planifier une intervention sur votre toiture</li>
                </ul>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="mailto:aco.habitat@orange.fr?subject=Demande%20de%20devis%20-%20${encodeURIComponent(address)}" 
                     style="display: inline-block; padding: 14px 32px; background: #22d3ee; color: #000; font-weight: bold; text-decoration: none; border-radius: 8px; font-size: 15px;">
                    Demander un devis gratuit
                  </a>
                </div>

                <p style="line-height: 1.6;">
                  Vous pouvez aussi nous contacter directement par telephone au 
                  <strong style="color: #fff;">02 33 31 19 79</strong>.
                </p>

                <p style="color: #888; line-height: 1.6;">
                  Cordialement,<br>
                  <strong style="color: #ccc;">L'equipe ACO-HABITAT</strong>
                </p>

                <div style="background: #1a1500; border: 1px solid #d97706; border-radius: 8px; padding: 16px; margin: 25px 0 0;">
                  <p style="color: #fbbf24; font-weight: bold; margin: 0 0 5px; font-size: 13px;">Probleme de charpente ?</p>
                  <p style="color: #ccc; margin: 0 0 12px; font-size: 13px; line-height: 1.5;">
                    Completez votre diagnostic toiture avec une <strong style="color: #fbbf24;">analyse charpente par IA</strong> 
                    pour une vision complete de votre couverture.
                  </p>
                  <a href="https://aco-habitat.fr" 
                     style="display: inline-block; padding: 10px 24px; background: #d97706; color: #000; font-weight: bold; text-decoration: none; border-radius: 6px; font-size: 13px;">
                    Diagnostic charpente sur aco-habitat.fr
                  </a>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                  <p style="color: #555; font-size: 11px; margin: 0;">
                    ACO-HABITAT - Diagnostic Toiture par IA<br>
                    aco.habitat@orange.fr | diag.aco-habitat.fr
                  </p>
                  <p style="color: #444; font-size: 10px; margin: 10px 0 0;">
                    Si vous ne souhaitez plus recevoir nos emails, repondez a ce message avec "STOP".
                  </p>
                </div>
              </div>
            </div>
          `,
        })

        // Mark as sent
        await sql`
          UPDATE diagnostics 
          SET followup_sent = TRUE, followup_sent_at = NOW() 
          WHERE id = ${diag.id}
        `
        sentCount++
      } catch (err) {
        console.error(`Erreur envoi suivi pour diagnostic ${diag.id}:`, err)
      }
    }

    return NextResponse.json({ 
      message: `${sentCount} email(s) de suivi envoye(s)`, 
      sent: sentCount,
      total: diagnostics.length 
    })
  } catch (error) {
    console.error("Erreur cron followup:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
