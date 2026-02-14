import { NextResponse } from "next/server"

// Store recovery codes in memory (valid for 10 minutes)
const recoveryCodes = new Map<string, { code: string; expires: number }>()

export async function POST(req: Request) {
  const { email } = await req.json()

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    return NextResponse.json({ error: "Recuperation non configuree" }, { status: 500 })
  }

  // Check if email matches admin email
  if (email.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
    // Don't reveal if email exists or not - always say "sent"
    return NextResponse.json({ success: true })
  }

  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

  recoveryCodes.set("admin", { code, expires })

  // Send email with code via Resend-compatible fetch
  try {
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "ACO-HABITAT <noreply@aco-habitat.fr>",
          to: [adminEmail],
          subject: "Code de recuperation - Admin ACO-HABITAT",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px;">
              <h2 style="color: #0891b2; margin-bottom: 20px;">ACO-HABITAT - Recuperation d'acces</h2>
              <p>Vous avez demande un code de recuperation pour acceder au tableau de bord admin.</p>
              <div style="background: #f0f9ff; border: 2px solid #0891b2; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
                <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Votre code de recuperation :</p>
                <p style="margin: 0; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #0891b2;">${code}</p>
              </div>
              <p style="color: #999; font-size: 13px;">Ce code est valable 10 minutes. Si vous n'avez pas fait cette demande, ignorez cet email.</p>
            </div>
          `,
        }),
      })
    } else {
      // Fallback: log code to console for development
      console.log(`[ACO-HABITAT] Code de recuperation admin: ${code}`)
    }
  } catch (err) {
    console.error("Failed to send recovery email:", err)
  }

  return NextResponse.json({ success: true })
}

// Verify recovery code
export async function PUT(req: Request) {
  const { code } = await req.json()

  const stored = recoveryCodes.get("admin")
  if (!stored) {
    return NextResponse.json({ error: "Aucun code en attente. Demandez un nouveau code." }, { status: 400 })
  }

  if (Date.now() > stored.expires) {
    recoveryCodes.delete("admin")
    return NextResponse.json({ error: "Code expire. Demandez un nouveau code." }, { status: 400 })
  }

  if (code !== stored.code) {
    return NextResponse.json({ error: "Code incorrect." }, { status: 401 })
  }

  // Code is valid - clean up and return admin password
  recoveryCodes.delete("admin")

  return NextResponse.json({
    success: true,
    password: process.env.ADMIN_PASSWORD || "",
  })
}
