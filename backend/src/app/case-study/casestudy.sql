CREATE TABLE case_studies (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  type             TEXT,
  status           TEXT DEFAULT 'draft',

  title     TEXT,
 
  description      TEXT,
  image_url        TEXT,
  image_alt        TEXT,

  client_name      TEXT,
  client_logo      TEXT,
  client_industry  TEXT,
  client_domain    TEXT,
  client_employees INT,
  client_desc      TEXT,

  challenge_intro  TEXT,
  solution_intro   TEXT,
  outcome_desc     TEXT,
  outcome_video    TEXT,

  meta_title       TEXT,
  meta_desc        TEXT,
  meta_keywords    TEXT,
  calendly_url     TEXT,

  tag_slugs        TEXT[],
  client_tags      TEXT[],
  hero_stats       JSONB,
  metrics          JSONB,
  challenge_items  JSONB,
  solution_phases  JSONB,
  testimonials     JSONB,

  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);