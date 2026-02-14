import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

async function migrate() {
  await sql`ALTER TABLE diagnostics ADD COLUMN IF NOT EXISTS client_name TEXT DEFAULT ''`
  await sql`ALTER TABLE diagnostics ADD COLUMN IF NOT EXISTS client_phone TEXT DEFAULT ''`
  console.log("Added client_name and client_phone columns to diagnostics table")
}

migrate().catch(console.error)
