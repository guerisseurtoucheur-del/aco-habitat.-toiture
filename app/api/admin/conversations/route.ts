import { getChatConversations, getChatStats } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const [conversations, stats] = await Promise.all([
      getChatConversations(),
      getChatStats(),
    ])

    return NextResponse.json({ conversations, stats })
  } catch {
    return NextResponse.json({ conversations: [], stats: { total_sessions: 0, total_messages: 0, user_messages: 0, active_days: 0 } })
  }
}
