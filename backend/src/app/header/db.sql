CREATE TABLE header_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  header_id UUID REFERENCES page_headers(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt TEXT NOT NULL,
  video_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE page_headers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  page_subtitle VARCHAR(255) NOT NULL,
  page_title VARCHAR(255),
  description TEXT,
  cta_primary_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
