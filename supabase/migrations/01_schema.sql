-- ==============================================================================
-- ROMANTIC TASTE MATCH - SUPABASE POSTGRESQL DDL SCHEMA
-- ==============================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Taste & Vibe Preferences)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18),
  location TEXT NOT NULL DEFAULT 'TP. Hồ Chí Minh',
  avatar_url TEXT,
  photos TEXT[] DEFAULT '{}',
  bio TEXT,
  occupation TEXT,
  taste_profile JSONB NOT NULL DEFAULT '{
    "spiciness": 3,
    "sweetness": 3,
    "budget": 2,
    "favoriteCuisines": ["Lẩu Haidilao", "BBQ Nướng"],
    "dietaryNotes": [],
    "vibePreferences": ["Lãng mạn & Ấm cúng"]
  }'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Matches Table (Compatibility & Status)
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_1 UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_2 UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  compatibility_score INTEGER NOT NULL CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
  breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'accepted' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_match_pair UNIQUE (user_1, user_2)
);

-- 4. Date Invitations Table (Interactive Date Planner Pass)
CREATE TABLE IF NOT EXISTS public.date_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  match_id UUID REFERENCES public.matches(id) ON DELETE SET NULL,
  date_time TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  custom_cuisine TEXT,
  location TEXT NOT NULL DEFAULT 'Trung tâm Sài Gòn',
  budget_tier INTEGER DEFAULT 2 CHECK (budget_tier BETWEEN 1 AND 4),
  special_message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Chat Messages Table (Instant Messaging & Interactive Cards)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'date_invite', 'date_response')),
  invitation_id UUID REFERENCES public.date_invitations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR HIGH-PERFORMANCE QUERIES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_taste ON public.profiles USING GIN (taste_profile);
CREATE INDEX IF NOT EXISTS idx_matches_users ON public.matches (user_1, user_2);
CREATE INDEX IF NOT EXISTS idx_messages_match ON public.messages (match_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invitations_receiver ON public.date_invitations (receiver_id, status);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.date_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for demo purposes (or tie to auth.uid())
CREATE POLICY "Public profiles access" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Public matches access" ON public.matches FOR ALL USING (true);
CREATE POLICY "Public date invitations access" ON public.date_invitations FOR ALL USING (true);
CREATE POLICY "Public messages access" ON public.messages FOR ALL USING (true);

-- Enable Supabase Realtime Replication for Instant Chat
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.date_invitations;
