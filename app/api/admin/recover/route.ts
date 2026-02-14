import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email } = await req.json()

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    return NextResponse.json({ error: "Recuperation non configuree" }, { status: 500 })
  }

  // Check if email matches admin email
  if (email.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
    return NextResponse.json({ error: "Adresse email non reconnue." }, { status: 401 })
  }

  // Email matches - return the password
  return NextResponse.json({
    success: true,
    password: adminPassword,
  })
}
