-- ==============================================================================
-- ROMANTIC TASTE MATCH - SEED DATA
-- ==============================================================================

-- 1. Insert Demo Current User
INSERT INTO public.profiles (id, full_name, age, location, avatar_url, photos, bio, occupation, taste_profile)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Minh Hoàng',
  24,
  'Quận 1, TP. Hồ Chí Minh',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  ARRAY[
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
  ],
  'Thích lượn lờ phố phường, săn lùng quán ăn ngon và chụp ảnh cho người yêu. Cuối tuần thường đi cà phê hoặc làm nồi lẩu ấm cúng! ☕🍲',
  'Product Designer & Foodie Enthusiast',
  '{
    "spiciness": 4,
    "sweetness": 3,
    "budget": 2,
    "favoriteCuisines": ["Lẩu Haidilao", "BBQ Nướng Hàn Quốc", "Ramen", "Trà Sữa Oolong", "Bánh Tráng Trộn"],
    "dietaryNotes": ["Không ăn được hành sống"],
    "vibePreferences": ["Lãng mạn & Ấm cúng", "Chill & Nhạc Acoustic", "Quán ngắm hoàng hôn"]
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert Discover Candidates
INSERT INTO public.profiles (id, full_name, age, location, avatar_url, photos, bio, occupation, taste_profile)
VALUES 
(
  '00000000-0000-0000-0000-000000000002',
  'Thùy Trang (Chloe)',
  23,
  'Quận 3, TP. Hồ Chí Minh',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
  ARRAY[
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
  ],
  'Cuộc sống quá ngắn để ăn những món dở! Tìm một bạn cùng đi thử hết các quán nướng và lẩu quanh Sài Gòn. Biết chụp ảnh là điểm cộng lớn nha ✨',
  'Content Creator & Food Reviewer',
  '{
    "spiciness": 4,
    "sweetness": 4,
    "budget": 2,
    "favoriteCuisines": ["Lẩu Haidilao", "BBQ Nướng Hàn Quốc", "Ramen", "Bingsu Xoài", "Trà Sữa Oolong"],
    "dietaryNotes": ["Ghiền phô mai"],
    "vibePreferences": ["Lãng mạn & Ấm cúng", "Chill & Nhạc Acoustic", "Quán ngắm hoàng hôn"]
  }'::jsonb
),
(
  '00000000-0000-0000-0000-000000000003',
  'Bảo Ngọc',
  22,
  'Bình Thạnh, TP. Hồ Chí Minh',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
  ARRAY[
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
  ],
  'Tín đồ đồ Nhật và cà phê sân vườn. Thích những buổi trò chuyện sâu sắc dưới ánh nến và một ly cocktail nhẹ nhàng 🍸',
  'UX/UI Specialist',
  '{
    "spiciness": 2,
    "sweetness": 3,
    "budget": 3,
    "favoriteCuisines": ["Ramen", "Sushi & Sashimi", "Matcha Latte", "Pasta Ý", "Cocktail & Tapas"],
    "dietaryNotes": ["Ít dầu mỡ"],
    "vibePreferences": ["Lãng mạn & Ấm cúng", "Yên tĩnh & Tinh tế", "Rooftop Bar View Đẹp"]
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- 3. Insert Initial Match
INSERT INTO public.matches (id, user_1, user_2, compatibility_score, breakdown, status)
VALUES (
  '00000000-0000-0000-0000-000000000101',
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  94,
  '{
    "tasteScore": 92,
    "cuisineScore": 95,
    "vibeScore": 95,
    "highlights": ["Cùng mê mẩn: Lẩu Haidilao, BBQ Nướng Hàn Quốc 🍲", "Gu ăn cay rất hợp: Ghiền ăn cay 🌶️"]
  }'::jsonb,
  'accepted'
) ON CONFLICT (id) DO NOTHING;
