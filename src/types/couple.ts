export type CountryCuisine = 'vietnam' | 'korea' | 'japan' | 'italy' | 'dessert' | 'custom';

export interface UserProfileModel {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CoupleModel {
  id: string;
  user1Id?: string;
  user2Id?: string;
  inviteCode: string;
  status: 'pending' | 'active' | 'paused';
  anniversaryDate: string;
  nextDateTime?: string;
  nextDateLocation?: string;
  createdAt?: string;
  updatedAt?: string;
  partnerName?: string;
  partnerAvatar?: string;
}

export interface CoupleMessageModel {
  id: string;
  coupleId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'text' | 'sticker' | 'image' | 'date_invite';
  mediaUrl?: string;
  createdAt: string;
  invitationData?: {
    partnerName: string;
    senderName: string;
    dateTime: string;
    cuisine: string;
    location: string;
    specialNote?: string;
  };
}

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  country: CountryCuisine;
  tag: string;
  desc: string;
  isCustom?: boolean;
}

export interface RecipeIngredient {
  name: string;
  amount: string;
}

export interface RecipeModel {
  id: string;
  title: string;
  category?: string;
  area?: string;
  instructions: string[];
  thumbnail: string;
  youtubeUrl?: string;
  youtubeId?: string;
  ingredients: RecipeIngredient[];
  tags?: string[];
  sourceUrl?: string;
}

export interface TastePreferences {
  spiciness: number; // 0 (Không cay) -> 5 (Siêu cay 🌶️)
  sweetness: 'low' | 'medium' | 'high';
  allergies: string[];
  favoriteCuisines: string[];
  dislikedFoods: string[];
  customFoodItems: FoodItem[];
  entertainmentHobbies: string[];
}

export interface CoupleProfile {
  yourName: string;
  partnerName: string;
  anniversaryDate: string; // YYYY-MM-DD
  nextDateDate: string; // YYYY-MM-DD
  nextDateTime: string; // HH:mm
  nextDateLocation: string;
  avatarUrl?: string;
  partnerAvatarUrl?: string;
  bio?: string;
  tastePreferences: TastePreferences;
}

export const DEFAULT_COUPLE_PROFILE: CoupleProfile = {
  yourName: 'Người dùng',
  partnerName: 'Người thương',
  anniversaryDate: '2023-11-20',
  nextDateDate: '2026-08-29',
  nextDateTime: '19:00',
  nextDateLocation: 'Haidilao Landmark 81 & Xem Phim Sweetbox',
  bio: 'Cùng nhau ăn khắp thế gian và lưu giữ từng khoảnh khắc ngọt ngào.',
  tastePreferences: {
    spiciness: 2,
    sweetness: 'medium',
    allergies: [],
    favoriteCuisines: [
      'Bún Đậu Mắm Tôm',
      'Lẩu Haidilao',
      'K-BBQ Nướng',
      'Sushi Cá Hồi',
      'Trà Sữa Trân Châu',
    ],
    dislikedFoods: [],
    customFoodItems: [],
    entertainmentHobbies: [
      'Xem phim Sweetbox',
      'Cafe ngắm hoàng hôn',
      'Workshop làm gốm DIY',
      'Dạo phố đêm & Ăn vặt',
    ],
  },
};
