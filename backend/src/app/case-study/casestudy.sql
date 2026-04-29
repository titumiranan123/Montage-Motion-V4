CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- TABLE 1: authors
-- =============================================
CREATE TABLE authors (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(150) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  role       VARCHAR(100),
  avatar_url TEXT,
  bio        TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =============================================
-- TABLE 2: clients
-- =============================================
CREATE TABLE clients (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(255) NOT NULL,
  meta       VARCHAR(500),
  industry   VARCHAR(150),
  team_size  VARCHAR(100),
  stage      VARCHAR(100),
  location   VARCHAR(150),
  website    VARCHAR(255),
  logo_url   TEXT,
  tags       JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =============================================
-- TABLE 3: tags
-- =============================================
CREATE TABLE tags (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name      VARCHAR(100) NOT NULL UNIQUE,
  slug      VARCHAR(100) NOT NULL UNIQUE,
  color_hex CHAR(7)
);

-- =============================================
-- TABLE 4: case_studies
-- =============================================
CREATE TABLE case_studies (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            VARCHAR(255) NOT NULL UNIQUE,

  -- hero
  title_normal    VARCHAR(300),
  title_highlight VARCHAR(300),
  title_suffix    VARCHAR(300),
  description     TEXT,

  -- type & status as plain VARCHAR (Zod handles validation)
  type            VARCHAR(50)  NOT NULL DEFAULT 'client_success',
  status          VARCHAR(50)  NOT NULL DEFAULT 'draft',

  author_id       UUID REFERENCES authors(id) ON DELETE SET NULL,
  client_id       UUID REFERENCES clients(id) ON DELETE SET NULL,
  published_at    DATE,
  read_time_min   SMALLINT,
  tag_slugs       TEXT[] NOT NULL DEFAULT '{}',

  -- hero floating badges  [{ value, label }]
  hero_stats      JSONB NOT NULL DEFAULT '[]',

  -- metrics strip  [{ value, label, sub }]
  metrics         JSONB NOT NULL DEFAULT '[]',

  -- challenge  { intro, items: [{ title, desc }] }
  challenge       JSONB NOT NULL DEFAULT '{}',

  -- solution   { intro, phases: [{ phase, time, desc }] }
  solution        JSONB NOT NULL DEFAULT '{}',

  -- outcome    { description, before: [{label,value}], after: [{label,value}] }
  outcome         JSONB NOT NULL DEFAULT '{}',

  -- testimonials  [{ quote, name, role, avatar }]
  testimonials    JSONB NOT NULL DEFAULT '[]',

  -- related / more  [{ tag, title, meta }]
  related         JSONB NOT NULL DEFAULT '[]',

  -- media  [{ type, url, alt, caption }]
  media           JSONB NOT NULL DEFAULT '[]',

  -- seo + calendly
  seo             JSONB NOT NULL DEFAULT '{}',
  -- {
  --   meta_title: "",
  --   meta_description: "",
  --   og_image: "",
  --   canonical: "",
  --   calendly_url: ""
  -- }

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cs_type      ON case_studies(type);
CREATE INDEX idx_cs_status    ON case_studies(status);
CREATE INDEX idx_cs_published ON case_studies(published_at DESC);
CREATE INDEX idx_cs_tags      ON case_studies USING GIN(tag_slugs);
CREATE INDEX idx_cs_seo       ON case_studies USING GIN(seo);

-- auto updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

CREATE TRIGGER trg_cs_updated_at
BEFORE UPDATE ON case_studies
FOR EACH ROW EXECUTE FUNCTION set_updated_at();