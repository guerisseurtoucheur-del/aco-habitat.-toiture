import { NextRequest, NextResponse } from "next/server"
import { getAllDiagnostics, getDiagnosticCount } from "@/lib/db"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "aco-habitat-admin-2026"

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 })
    }

    const [diagnostics, count] = await Promise.all([
      getAllDiagnostics(),
      getDiagnosticCount(),
    ])

    return NextResponse.json({ diagnostics, totalCount: count })
  } catch (error) {
    console.error("Admin API error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
