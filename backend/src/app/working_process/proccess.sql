-- Main process table
CREATE TABLE
  processes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    type VARCHAR(50) NOT NULL UNIQUE,
    tag TEXT NOT NULL,
    heading_part1 TEXT NOT NULL,
    heading_part2 TEXT,
    paragraph TEXT,
    image TEXT,
    alt TEXT,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
  );

-- Child table for process steps
CREATE TABLE
  process_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    process_id UUID REFERENCES processes (id) ON DELETE CASCADE,
    image TEXT,
    icon_alt TEXT,
    icon TEXT,
    alt TEXT,
    title TEXT NOT NULL,
    description TEXT,
    order_index NUMBER DEFAULT 0 NOT NULL,
    isHiden BOOLEAN DEFAULT FALSE
  );