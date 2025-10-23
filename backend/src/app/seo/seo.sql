CREATE TABLE seo_meta (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
page_name VARCHAR(50) NOT NULL,
meta_title VARCHAR(255) NOT NULL,
meta_description TEXT NOT NULL,
meta_keywords TEXT,
canonical_url VARCHAR(255),
meta_robots VARCHAR(50),
schema TEXT,
twitter_card_type VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE page_seo
ADD CONSTRAINT page_seo_page_name_unique UNIQUE (page_name);