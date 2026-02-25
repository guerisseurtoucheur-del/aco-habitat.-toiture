import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function saveDiagnostic(data: {
  name: string
  phone: string
  email: string
  address: string
  globalScore: number
  structureScore: number
  vegetalScore: number
  etancheiteScore: number
  thermalScore: number
  stripeSessionId: string
}) {
  const refId = `DIAG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  console.log("[v0] saveDiagnostic called, refId:", refId, "email:", data.email, "address:", data.address)
  await sql`
    INSERT INTO diagnostics (ref_id, client_name, client_phone, email, address, score_global, score_structure, score_vegetal, score_etancheite, score_thermique, stripe_session_id)
    VALUES (${refId}, ${data.name}, ${data.phone}, ${data.email}, ${data.address}, ${data.globalScore}, ${data.structureScore}, ${data.vegetalScore}, ${data.etancheiteScore}, ${data.thermalScore}, ${data.stripeSessionId})
  `
  console.log("[v0] saveDiagnostic success, refId:", refId)
  // Increment counter
  await sql`
    INSERT INTO stats (key, value) VALUES ('total_diagnostics', 1)
    ON CONFLICT (key) DO UPDATE SET value = stats.value + 1, updated_at = NOW()
  `
}

export async function getDiagnosticCount(): Promise<number> {
  const result = await sql`SELECT value FROM stats WHERE key = 'total_diagnostics'`
  return result.length > 0 ? result[0].value : 0
}

export async function getAllDiagnostics() {
  const result = await sql`
    SELECT 
      id, client_name, client_phone, email, address, 
      score_global, score_structure, score_vegetal, score_etancheite, score_thermique,
      toiture_type, stripe_session_id, created_at
    FROM diagnostics
    ORDER BY created_at DESC
  `
  return result
}

export async function saveAbandonedCart(data: {
  email: string
  address: string
}) {
  await sql`
    INSERT INTO abandoned_carts (email, address)
    VALUES (${data.email}, ${data.address})
    ON CONFLICT DO NOTHING
  `
}

export async function saveChatMessage(data: {
  sessionId: string
  role: string
  content: string
}) {
  await sql`
    INSERT INTO chat_conversations (session_id, role, content)
    VALUES (${data.sessionId}, ${data.role}, ${data.content})
  `
}

export async function getChatConversations() {
  const result = await sql`
    SELECT 
      session_id,
      MIN(created_at) as started_at,
      MAX(created_at) as last_message_at,
      COUNT(*) as message_count,
      COUNT(*) FILTER (WHERE role = 'user') as user_messages,
      (SELECT content FROM chat_conversations c2 WHERE c2.session_id = c1.session_id AND role = 'user' ORDER BY created_at ASC LIMIT 1) as first_question
    FROM chat_conversations c1
    GROUP BY session_id
    ORDER BY MAX(created_at) DESC
    LIMIT 100
  `
  return result
}

export async function getChatMessages(sessionId: string) {
  const result = await sql`
    SELECT role, content, created_at
    FROM chat_conversations
    WHERE session_id = ${sessionId}
    ORDER BY created_at ASC
  `
  return result
}

export async function getChatStats() {
  const result = await sql`
    SELECT 
      COUNT(DISTINCT session_id) as total_sessions,
      COUNT(*) as total_messages,
      COUNT(*) FILTER (WHERE role = 'user') as user_messages,
      COUNT(DISTINCT DATE(created_at)) as active_days
    FROM chat_conversations
  `
  return result[0] || { total_sessions: 0, total_messages: 0, user_messages: 0, active_days: 0 }
}
