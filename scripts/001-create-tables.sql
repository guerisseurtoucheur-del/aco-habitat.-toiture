-- Table pour stocker les diagnostics
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
);

-- Table pour les paniers abandonnes
CREATE TABLE IF NOT EXISTS abandoned_carts (
  id SERIAL PRIMARY KEY,
  email TEXT,
  address TEXT,
  captured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reminded BOOLEAN DEFAULT FALSE,
  converted BOOLEAN DEFAULT FALSE
);

-- Table compteur global
CREATE TABLE IF NOT EXISTS stats (
  key TEXT PRIMARY KEY,
  value INTEGER DEFAULT 0
);

-- Initialiser le compteur
INSERT INTO stats (key, value) VALUES ('total_diagnostics', 0) ON CONFLICT (key) DO NOTHING;

-- Index pour la recherche
CREATE INDEX IF NOT EXISTS idx_diagnostics_email ON diagnostics(email);
CREATE INDEX IF NOT EXISTS idx_diagnostics_created ON diagnostics(created_at);
CREATE INDEX IF NOT EXISTS idx_abandoned_email ON abandoned_carts(email);
