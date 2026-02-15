-- Seed the diagnostic counter with initial value
INSERT INTO stats (key, value) VALUES ('total_diagnostics', 147)
ON CONFLICT (key) DO NOTHING;
