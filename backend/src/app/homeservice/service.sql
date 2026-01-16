CREATE TABLE
  service_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    type VARCHAR(50) NOT NULL,
    tag TEXT NOT NULL,
    heading_part1 TEXT NOT NULL,
    heading_part2 TEXT,
    paragraph TEXT,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
  );

-- ============================
--  TABLE: service_items
-- ============================
CREATE TABLE
  home_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    section_id UUID NOT NULL REFERENCES service_sections (id) ON DELETE CASCADE,
    service_title TEXT NOT NULL,
    service_type TEXT,
    page_active BOOLEAN DEFAULT false,
    service_description TEXT,
    image TEXT,
    alt TEXT,
    icon TEXT,
    icon_alt TEXT,
    href VARCHAR(256),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
  );

CREATE TABLE
  service_item_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    service_item_id UUID NOT NULL REFERENCES home_services (id) ON DELETE CASCADE,
    section_name VARCHAR(50) NOT NULL,
    visible BOOLEAN DEFAULT true
  );