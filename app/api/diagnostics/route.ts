import { NextResponse } from "next/server"
import { saveDiagnostic, getDiagnosticCount } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    await saveDiagnostic({
      email: data.email || "",
      address: data.address || "",
      globalScore: data.globalScore || 0,
      structureScore: data.structureScore || 0,
      vegetalScore: data.vegetalScore || 0,
      thermalScore: data.thermalScore || 0,
      stripeSessionId: data.stripeSessionId || "",
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving diagnostic:", error)
    return NextResponse.json({ error: "Erreur sauvegarde" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const count = await getDiagnosticCount()
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
