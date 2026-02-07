CREATE TABLE
    industry_section (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        page TEXT NOT NULL UNIQUE,
        tag TEXT NOT NULL,
        heading_title TEXT,
        paragraph TEXT,
        created_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    industry_tabs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        section_id UUID NOT NULL REFERENCES industry_section (id) ON DELETE CASCADE,
        tab_key TEXT NOT NULL, -- podcasting, corporate, saas_tech
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        cta_label TEXT NOT NULL,
        cta_link TEXT NOT NULL,
        position INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    industry_tab_points (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        tab_id UUID NOT NULL REFERENCES industry_tabs (id) ON DELETE CASCADE,
        point TEXT NOT NULL,
        position INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW ()
    );