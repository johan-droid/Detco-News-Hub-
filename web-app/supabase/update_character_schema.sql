
-- Run this in your Supabase SQL Editor to update the characters table

ALTER TABLE public.characters 
ADD COLUMN IF NOT EXISTS color text,
ADD COLUMN IF NOT EXISTS faction text,
ADD COLUMN IF NOT EXISTS real_name text,
ADD COLUMN IF NOT EXISTS emoji text;

-- Verify the columns are added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'characters';
