CREATE TABLE
    work_header (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        type VARCHAR(50) NOT NULL UNIQUE,
        tag TEXT NOT NULL,
        heading_part1 TEXT NOT NULL,
        heading_part2 TEXT,
        paragraph TEXT,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    Works (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        title VARCHAR(255),
        description TEXT,
        thumbnail VARCHAR(512),
        video_link VARCHAR(512) NOT NULL,
        is_visible BOOLEAN DEFAULT TRUE,
        is_feature BOOLEAN DEFAULT FALSE,
        position INTEGER,
        type VARCHAR(50) NOT NULL,
        sub_type VARCHAR(50),
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

ALTER TABLE works
DROP CONSTRAINT IF EXISTS works_type_check;