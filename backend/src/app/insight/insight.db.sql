-- 1. comparisons table
CREATE TABLE
    insight_section (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        page TEXT NOT NULL,
        tag TEXT NOT NULL,
        heading_title TEXT,
        paragraph TEXT
    );

-- 2. comparison_columns table
CREATE TABLE
    steps (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        section_id UUID NOT NULL REFERENCES insight_section (id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        heading TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        items JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );