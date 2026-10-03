-- Mimiko Studio Database Schema
-- Run this in your Neon SQL Editor to create all tables

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  cover_image TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Designs table
CREATE TABLE IF NOT EXISTS designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  category VARCHAR(100) NOT NULL,
  price VARCHAR(50),
  price_type VARCHAR(20) DEFAULT 'starting',
  availability VARCHAR(20) DEFAULT 'made-to-order',
  customizable BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  material TEXT,
  craft TEXT,
  occasion TEXT,
  care TEXT,
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Design Images table
CREATE TABLE IF NOT EXISTS design_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_id UUID REFERENCES designs(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  design_id UUID,
  design_name VARCHAR(255),
  collection VARCHAR(255),
  occasion VARCHAR(255),
  requested_date DATE,
  quantity INTEGER DEFAULT 1,
  customization VARCHAR(50) DEFAULT 'no',
  color_preference VARCHAR(255),
  size_details TEXT,
  notes TEXT,
  reference_images JSONB DEFAULT '[]',
  status VARCHAR(20) DEFAULT 'NEW',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_designs_collection ON designs(collection_id);
CREATE INDEX IF NOT EXISTS idx_designs_slug ON designs(slug);
CREATE INDEX IF NOT EXISTS idx_designs_featured ON designs(featured);
CREATE INDEX IF NOT EXISTS idx_design_images_design ON design_images(design_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);

-- Insert default collections
INSERT INTO collections (name, slug, description, featured, sort_order) VALUES
  ('Jewellery', 'jewellery', 'Timeless pieces designed to complement every occasion.', true, 1),
  ('Traditional Ornaments', 'traditional-ornaments', 'Celebrating Indian craftsmanship and tradition.', true, 2),
  ('Embroidery', 'embroidery', 'Detailed handcrafted embroidery created with patience and artistry.', true, 3),
  ('Navratri Collection', 'navratri', 'Celebrate every Garba night with handcrafted festive ornaments.', true, 4),
  ('Custom Designs', 'custom', 'Have something special in mind? Let us create it for you.', true, 5)
ON CONFLICT (slug) DO NOTHING;
