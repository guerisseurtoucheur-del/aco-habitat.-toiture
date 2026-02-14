import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

async function seed() {
  // Insert initial counter if not exists
  await sql`INSERT INTO stats (key, value) VALUES ('total_diagnostics', 147) ON CONFLICT (key) DO NOTHING`
  console.log('Counter seeded to 147')

  // Verify
  const result = await sql`SELECT * FROM stats WHERE key = 'total_diagnostics'`
  console.log('Current counter:', result)
}

seed().catch(console.error)
