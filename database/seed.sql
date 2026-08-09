DROP TABLE IF EXISTS rackets;

CREATE TABLE rackets (
  id SERIAL PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  head_size INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  swingweight INTEGER,
  balance_points INTEGER,
  stiffness INTEGER,
  beam_width TEXT,
  string_pattern TEXT NOT NULL,
  play_style TEXT,
  image_url TEXT
);

INSERT INTO rackets (
  brand,
  model,
  head_size,
  weight,
  swingweight,
  balance_points,
  stiffness,
  beam_width,
  string_pattern,
  play_style,
  image_url
)
VALUES
  (...),
  (...),
  (...);