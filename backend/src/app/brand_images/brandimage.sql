CREATE TABLE brandimage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image VARCHAR(512) NOT NULL,
    alt VARCHAR(512) NOT NULL,
    width VARCHAR(512) NOT NULL,
    height VARCHAR(512) NOT NULL,
    ishide BOOLEAN DEFAULT FALSE,
    type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);