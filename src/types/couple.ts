export type CountryCuisine = 'vietnam' | 'korea' | 'japan' | 'italy' | 'dessert' | 'custom';

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  country: CountryCuisine;
  tag: string;
  desc: string;
  isCustom?: boolean;
}

export interface TastePreferences {
  spiciness: number; // 0 (Không cay) -> 5 (Siêu cay 🌶️)
  sweetness: 'low' | 'medium' | 'high'; // Ít ngọt / Vừa / Hảo ngọt
  allergies: string[]; // Hải sản, Đậu phộng, Đồ sống, Sữa bò, Gluten...
  favoriteCuisines: string[]; // Danh sách món ruột
  dislikedFoods: string[]; // Món không thích / đã loại bỏ khỏi roulette
  customFoodItems: FoodItem[]; // Món ăn do người dùng tự thêm
  entertainmentHobbies: string[]; // Xem phim, Dạo phố, Cafe, Boardgame, Workshop DIY...
}

export interface CoupleProfile {
  yourName: string;
  partnerName: string;
  anniversaryDate: string; // YYYY-MM-DD
  nextDateDate: string; // YYYY-MM-DD
  nextDateTime: string; // HH:mm (e.g. 19:00)
  nextDateLocation: string; // Quán ăn / Địa điểm quen thuộc
  avatarUrl?: string;
  partnerAvatarUrl?: string;
  bio?: string;
  tastePreferences: TastePreferences;
}

export const DEFAULT_COUPLE_PROFILE: CoupleProfile = {
  yourName: 'Anh yêu',
  partnerName: 'Bé iu',
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
