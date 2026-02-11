
-- Comprehensive check to ensure ALL required columns exist
-- Run this in Supabase SQL Editor

ALTER TABLE public.characters 
ADD COLUMN IF NOT EXISTS role text,
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS image text,
ADD COLUMN IF NOT EXISTS real_name text,
ADD COLUMN IF NOT EXISTS emoji text,
ADD COLUMN IF NOT EXISTS color text,
ADD COLUMN IF NOT EXISTS faction text;

-- Verify columns
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'characters';
