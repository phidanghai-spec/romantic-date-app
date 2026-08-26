export interface TasteProfile {
  spiciness: number; // 1 (No spice) to 5 (Extremely spicy)
  sweetness: number; // 1 (Not sweet) to 5 (Sweet tooth)
  budget: number; // 1 ($) to 4 ($$$$)
  favoriteCuisines: string[];
  dietaryNotes: string[];
  vibePreferences: string[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  location: string;
  distanceKm: number;
  avatarUrl: string;
  photos: string[];
  bio: string;
  occupation: string;
  tasteProfile: TasteProfile;
  compatibilityScore?: number;
  compatibilityBreakdown?: CompatibilityBreakdown;
}

export interface CompatibilityBreakdown {
  totalScore: number;
  tasteScore: number;
  cuisineScore: number;
  vibeScore: number;
  sharedCuisines: string[];
  sharedVibes: string[];
  highlights: string[];
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  userProfile: UserProfile;
  compatibilityScore: number;
  compatibilityBreakdown: CompatibilityBreakdown;
  status: 'pending' | 'accepted' | 'rejected';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  createdAt: string;
}

export interface DateInvitation {
  id: string;
  senderId: string;
  receiverId: string;
  matchId?: string;
  dateTime: string;
  cuisine: string;
  customCuisine?: string;
  location: string;
  budgetTier?: number;
  status: 'pending' | 'accepted' | 'declined';
  specialMessage?: string;
  createdAt: string;
}
