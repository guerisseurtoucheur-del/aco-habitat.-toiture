import { NextRequest, NextResponse } from "next/server"
import { getAllDiagnostics } from "@/lib/db"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "aco-habitat-admin-2026"

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    
    if (!password || password.trim() !== ADMIN_PASSWORD.trim()) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 })
    }

    const diagnostics = await getAllDiagnostics()

    return NextResponse.json({ diagnostics, totalCount: diagnostics.length })
  } catch (error) {
    console.error("Admin API error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
