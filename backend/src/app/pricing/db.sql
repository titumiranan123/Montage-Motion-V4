
-- ===============================
-- TABLE: page_price_plans
-- ===============================
CREATE TABLE page_price_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- matches 'pageType' union
  tag TEXT NOT NULL,
  heading_part1 TEXT NOT NULL,
  heading_part2 TEXT,
  paragraph TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: ensure unique page type (1 price section per page type)
CREATE UNIQUE INDEX idx_page_price_plans_type ON page_price_plans(type);

-- ===============================
-- TABLE: packages
-- ===============================
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_price_plan_id UUID NOT NULL REFERENCES page_price_plans(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  currency VARCHAR(10) DEFAULT 'USD',
  price NUMERIC(10, 2) NOT NULL,
  billing_cycle VARCHAR(50),
  is_hidden BOOLEAN DEFAULT FALSE, -- corresponds to ishiden
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- TABLE: package_features
-- ===============================
CREATE TABLE package_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- INDEXES for performance
-- ===============================
CREATE INDEX idx_packages_page_id ON packages(page_price_plan_id);
CREATE INDEX idx_package_features_package_id ON package_features(package_id);
