import { getChatMessages } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params
    const messages = await getChatMessages(sessionId)
    return NextResponse.json({ messages })
  } catch {
    return NextResponse.json({ messages: [] })
  }
}
