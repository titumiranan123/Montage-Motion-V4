CREATE TABLE ourstory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  tag TEXT NOT NULL,
  heading_part1 TEXT NOT NULL,
  heading_part2 TEXT,
  paragraph TEXT,
  image TEXT,
  alt TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ourstory_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES ourstory(id) ON DELETE CASCADE,
  image TEXT,
  icon TEXT,
  icon_alt TEXT,
  alt TEXT,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0 NOT NULL,
  is_hidden BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_story_steps_order 
ON ourstory_steps(story_id, order_index);