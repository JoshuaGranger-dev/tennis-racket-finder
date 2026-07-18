CREATE TABLE rackets (
  id SERIAL PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  head_size INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  swingweight INTEGER,
  balance TEXT,
  stiffness INTEGER,
  beam_width TEXT,
  string_pattern TEXT NOT NULL,
  play_style TEXT
);