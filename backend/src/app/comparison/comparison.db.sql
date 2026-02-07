-- 1. comparisons table
CREATE TABLE
    comparisons (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        page TEXT NOT NULL UNIQUE,
        tag TEXT NOT NULL,
        heading_title TEXT,
        paragraph TEXT
    );

-- 2. comparison_columns table
CREATE TABLE
    comparison_columns (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        section_id UUID NOT NULL REFERENCES comparisons (id) ON DELETE CASCADE,
        type TEXT NOT NULL CHECK (type IN ('montage', 'agencies', 'freelancers')),
        title TEXT,
        image TEXT,
        bonus_title TEXT,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
        -- UNIQUE (page, type) -- removed because 'page' does not exist here
    );

-- 3. comparison_entries table
CREATE TABLE
    comparison_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        column_id UUID NOT NULL REFERENCES comparison_columns (id) ON DELETE CASCADE,
        entry_type TEXT NOT NULL CHECK (entry_type IN ('item', 'bonus')),
        text TEXT NOT NULL,
        position INT NOT NULL,
        UNIQUE (column_id, entry_type, position)
    );