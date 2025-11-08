-- 1️⃣ Career Page Table
CREATE TABLE career_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) UNIQUE NOT NULL,
  tag TEXT NOT NULL,
  heading_part1 TEXT NOT NULL,
  heading_part2 TEXT,
  paragraph TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2️⃣ Job Posts Table
CREATE TABLE job_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_page_id UUID REFERENCES career_pages(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  positions_available INT NOT NULL,
  deadline TEXT NOT NULL,
  description TEXT NOT NULL,
  employment_type VARCHAR(50) NOT NULL,
  work_arrangement VARCHAR(50) NOT NULL,
  salary JSONB,
  applylink TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
