
CREATE TABLE whychooseus_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL ,
  tag TEXT NOT NULL,
  heading_part1 TEXT NOT NULL,
  heading_part2 TEXT ,
  paragraph TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================
--  TABLE: service_items
-- ============================
CREATE TABLE whychooseus_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  whychooseus_id UUID NOT NULL REFERENCES whychooseus_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  alt TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
