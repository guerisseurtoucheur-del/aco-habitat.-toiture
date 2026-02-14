import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { answer } = await req.json()

  const adminPassword = process.env.ADMIN_PASSWORD
  const securityAnswer = process.env.ADMIN_SECURITY_ANSWER || "nathan"

  if (!adminPassword) {
    return NextResponse.json({ error: "Recuperation non configuree." }, { status: 500 })
  }

  if (!answer || answer.toLowerCase().trim() !== securityAnswer.toLowerCase().trim()) {
    return NextResponse.json({ error: "Reponse incorrecte." }, { status: 401 })
  }

  // Answer is correct - return the password
  return NextResponse.json({
    success: true,
    password: adminPassword,
  })
}
