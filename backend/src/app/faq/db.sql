-- ENUM type for faq category
CREATE TABLE
  faq_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    section_tag TEXT NOT NULL,
    section_title TEXT NOT NULL,
    section_description TEXT NOT NULL,
    contact_image TEXT NOT NULL,
    contact_alt TEXT,
    contact_heading VARCHAR(255) NOT NULL,
    contact_description TEXT,
    contact_name VARCHAR(100),
    contact_position VARCHAR(100),
    contact_link TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
  );

CREATE TABLE
  faq_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    faq_section_id UUID NOT NULL REFERENCES faq_sections (id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
  );