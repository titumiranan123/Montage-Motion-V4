-- Main process table
CREATE TABLE processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  tag TEXT NOT NULL,
  heading_part1 TEXT NOT NULL,
  heading_part2 TEXT ,
  paragraph TEXT,
  image TEXT NOT NULL,
  alt TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Child table for process steps
CREATE TABLE process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_id UUID REFERENCES processes(id) ON DELETE CASCADE,
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT,
  isHiden BOOLEAN DEFAULT FALSE
);
