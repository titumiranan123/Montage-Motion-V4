
CREATE TABLE service_sections (
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
CREATE TABLE service_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id INTEGER NOT NULL REFERENCES service_sections(id) ON DELETE CASCADE,
  service_title TEXT NOT NULL,
  service_description TEXT,
  image TEXT,
  alt TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
