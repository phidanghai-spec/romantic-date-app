-- ==============================================================================
-- OUR DATE NIGHT (ROMANTIC COUPLE APP) - SUPABASE POSTGRESQL DDL SCHEMA
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT DEFAULT 'Cùng nhau ăn khắp thế gian và lưu giữ từng khoảnh khắc ngọt ngào.',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Couples Table (Multi-tenant Pairing)
CREATE TABLE IF NOT EXISTS public.couples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user2_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  invite_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('pending', 'active', 'paused')),
  anniversary_date DATE NOT NULL DEFAULT CURRENT_DATE,
  next_date_time TIMESTAMPTZ,
  next_date_location TEXT DEFAULT 'Haidilao Landmark 81',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. User Preferences Table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  spicy_level INTEGER NOT NULL DEFAULT 2 CHECK (spicy_level BETWEEN 0 AND 5),
  sweet_level TEXT NOT NULL DEFAULT 'medium' CHECK (sweet_level IN ('low', 'medium', 'high')),
  dietary_restrictions TEXT[] DEFAULT '{}',
  favorite_dishes TEXT[] DEFAULT '{}',
  disliked_dishes TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_user_pref UNIQUE (user_id)
);

-- 5. Date Invitations Table (Interactive VIP Floral Date Pass)
CREATE TABLE IF NOT EXISTS public.date_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  couple_id UUID REFERENCES public.couples(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  receiver_email TEXT NOT NULL,
  partner_name TEXT NOT NULL DEFAULT 'Bé iu',
  date_time TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Trung tâm Sài Gòn',
  special_message TEXT DEFAULT 'Em chỉ cần chuẩn bị một nụ cười thật xinh thôi ❤️',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  ics_uid TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Couple Messages Table (Realtime Chat & Interactive Cards)
CREATE TABLE IF NOT EXISTS public.couple_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL DEFAULT 'Người thương',
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'sticker', 'image', 'date_invite')),
  media_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Memories Table (Scrapbook Album)
CREATE TABLE IF NOT EXISTS public.memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  location TEXT NOT NULL DEFAULT 'TP. Hồ Chí Minh',
  cuisine TEXT NOT NULL DEFAULT 'Lẩu Haidilao',
  photo_url TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Couple Bucket List Table
CREATE TABLE IF NOT EXISTS public.couple_bucket_list (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Kỷ Niệm',
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_couples_invite ON public.couples(invite_code);
CREATE INDEX IF NOT EXISTS idx_messages_couple ON public.couple_messages(couple_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_memories_couple ON public.memories(couple_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_bucket_couple ON public.couple_bucket_list(couple_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.date_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couple_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couple_bucket_list ENABLE ROW LEVEL SECURITY;

-- Public demo access policies (or tied to auth.uid() in production)
CREATE POLICY "Public profiles access" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Public couples access" ON public.couples FOR ALL USING (true);
CREATE POLICY "Public user_preferences access" ON public.user_preferences FOR ALL USING (true);
CREATE POLICY "Public date_invitations access" ON public.date_invitations FOR ALL USING (true);
CREATE POLICY "Public couple_messages access" ON public.couple_messages FOR ALL USING (true);
CREATE POLICY "Public memories access" ON public.memories FOR ALL USING (true);
CREATE POLICY "Public bucket list access" ON public.couple_bucket_list FOR ALL USING (true);

-- Enable Supabase Realtime Replication
ALTER PUBLICATION supabase_realtime ADD TABLE public.couple_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.date_invitations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.memories;
