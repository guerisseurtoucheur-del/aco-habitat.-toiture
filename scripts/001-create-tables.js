import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('Creating tables...');

  await sql`
    CREATE TABLE IF NOT EXISTS diagnostics (
      id SERIAL PRIMARY KEY,
      ref_id TEXT UNIQUE NOT NULL,
      email TEXT,
      address TEXT,
      score_global INTEGER,
      score_vegetal INTEGER,
      score_structure INTEGER,
      score_etancheite INTEGER,
      score_thermique INTEGER,
      toiture_type TEXT,
      stripe_session_id TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  console.log('Table diagnostics created');

  await sql`
    CREATE TABLE IF NOT EXISTS abandoned_carts (
      id SERIAL PRIMARY KEY,
      email TEXT,
      address TEXT,
      captured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      reminded BOOLEAN DEFAULT FALSE,
      converted BOOLEAN DEFAULT FALSE
    )
  `;
  console.log('Table abandoned_carts created');

  await sql`
    CREATE TABLE IF NOT EXISTS stats (
      key TEXT PRIMARY KEY,
      value INTEGER DEFAULT 0
    )
  `;
  console.log('Table stats created');

  await sql`INSERT INTO stats (key, value) VALUES ('total_diagnostics', 0) ON CONFLICT (key) DO NOTHING`;
  console.log('Stats initialized');

  await sql`CREATE INDEX IF NOT EXISTS idx_diagnostics_email ON diagnostics(email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_diagnostics_created ON diagnostics(created_at)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_abandoned_email ON abandoned_carts(email)`;
  console.log('Indexes created');

  console.log('Migration complete!');
}

migrate().catch(console.error);
