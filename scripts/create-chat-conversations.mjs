import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS chat_conversations (
      id SERIAL PRIMARY KEY,
      session_id TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  console.log("Table chat_conversations created successfully")

  await sql`CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_conversations(session_id)`
  console.log("Index created successfully")

  await sql`CREATE INDEX IF NOT EXISTS idx_chat_created ON chat_conversations(created_at DESC)`
  console.log("Index created successfully")
}

main().catch(console.error)
