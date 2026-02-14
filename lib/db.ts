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
  thermalScore: number
  stripeSessionId: string
}) {
  await sql`
    INSERT INTO diagnostics (client_name, client_phone, email, address, global_score, structure_score, vegetal_score, thermal_score, stripe_session_id)
    VALUES (${data.name}, ${data.phone}, ${data.email}, ${data.address}, ${data.globalScore}, ${data.structureScore}, ${data.vegetalScore}, ${data.thermalScore}, ${data.stripeSessionId})
  `
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
