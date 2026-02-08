-- 1. Create main blogs table
CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    alt TEXT,
    is_publish BOOLEAN DEFAULT TRUE,
    is_feature BOOLEAN DEFAULT FALSE,
    position INTEGER NOT NULL DEFAULT 0,
    read_time TEXT,     
    updatedAt TEXT,              
    whatWillLearn TEXT[] DEFAULT '{}', 
    meta_title VARCHAR(255),      -- SEO
    meta_description TEXT,        -- SEO
    keywords TEXT[] DEFAULT '{}', -- SEO keywords
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
