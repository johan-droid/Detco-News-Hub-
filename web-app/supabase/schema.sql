-- Detective Conan News Hub Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. NEWS TABLE
-- Stores news articles, updates, and announcements.
-- -----------------------------------------------------------------------------
create table if not exists public.news (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now(),
  
  title text not null,
  content text not null,
  author text,
  
  -- Category for filtering: BREAKING, MANGA, ANIME, THEORY, EVENTS
  category text not null default 'BREAKING',
  
  -- Cloudinary image URL
  image text,
  
  -- Optional: slug for SEO-friendly URLs if we implement dynamic routing later
  slug text unique
);

-- Enable Row Level Security (RLS)
alter table public.news enable row level security;

-- Policy: Everyone can read news
create policy "Public can view news" 
  on public.news for select 
  using (true);

-- Policy: Only authenticated users (admins) can insert/update/delete
create policy "Admins can manage news" 
  on public.news for all 
  using (auth.role() = 'authenticated');


-- -----------------------------------------------------------------------------
-- 2. CHARACTERS TABLE
-- Stores character profiles for the "Characters" section.
-- -----------------------------------------------------------------------------
create table if not exists public.characters (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  
  name text not null,
  real_name text, -- e.g., Shinichi Kudo for Conan
  
  role text, -- e.g., "The Great Detective"
  description text,
  
  -- Visuals
  image text,
  emoji text, -- e.g., "🔍"
  
  -- Theme coloring (hex code)
  color text, 
  
  -- Faction or Group tag (e.g., "Main Hero", "Black Organization")
  faction text
);

-- Enable RLS
alter table public.characters enable row level security;

-- Policy: Everyone can read characters
create policy "Public can view characters" 
  on public.characters for select 
  using (true);

-- Policy: Only authenticated users can manage characters
create policy "Admins can manage characters" 
  on public.characters for all 
  using (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- 3. SEED DATA (Optional)
-- Initial data to populate the tables locally or for testing.
-- -----------------------------------------------------------------------------

-- Characters Seed
insert into public.characters (name, real_name, role, description, color, emoji, faction)
values 
  ('Conan Edogawa', 'Shinichi Kudo', 'The Great Detective', 'A teenage detective shrunk into a child''s body by the Black Organization.', '#4A90D9', '🔍', 'Main Hero'),
  ('Ran Mouri', 'Ran Mouri', 'Karate Champion', 'Shinichi''s childhood love and Conan''s primary guardian.', '#E85D9A', '🥋', 'Fan Favorite'),
  ('Ai Haibara', 'Shiho Miyano', 'Scientist & Ally', 'Former Black Organization scientist who created APTX 4869.', '#9B59B6', '🧬', 'Mystery'),
  ('Inspector Megure', 'Juzo Megure', 'Police Inspector', 'Tokyo Metropolitan Police''s finest.', '#2ECC71', '👮', 'Classic');

-- News Seed
insert into public.news (title, content, category, author, created_at)
values 
  ('Detective Conan Movie 28 Surpasses Box Office Records', 'The latest film crosses all-time records in Japan...', 'BREAKING', 'Conan Edogawa', now()),
  ('Volume 107 Chapter Drops a Major Black Org Revelation', 'Gosho Aoyama teases a stunning plot twist...', 'MANGA', 'Ai Haibara', now() - interval '2 days');
