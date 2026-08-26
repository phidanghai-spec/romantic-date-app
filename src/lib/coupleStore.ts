import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CoupleProfile, DEFAULT_COUPLE_PROFILE, FoodItem } from '@/types/couple';

interface CoupleStoreState {
  profile: CoupleProfile;
  updateProfile: (updates: Partial<CoupleProfile>) => void;
  updateTastePreferences: (tasteUpdates: Partial<CoupleProfile['tastePreferences']>) => void;
  addCustomFoodItem: (item: FoodItem) => void;
  removeCustomFoodItem: (itemId: string) => void;
  toggleDislikedFood: (foodName: string) => void;
  getDaysTogether: () => number;
}

export const useCoupleStore = create<CoupleStoreState>()(
  persist(
    (set, get) => ({
      profile: DEFAULT_COUPLE_PROFILE,

      updateProfile: (updates) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...updates,
          },
        })),

      updateTastePreferences: (tasteUpdates) =>
        set((state) => ({
          profile: {
            ...state.profile,
            tastePreferences: {
              ...state.profile.tastePreferences,
              ...tasteUpdates,
            },
          },
        })),

      addCustomFoodItem: (item) =>
        set((state) => {
          const currentCustom = state.profile.tastePreferences.customFoodItems || [];
          // Avoid duplicate ID or name
          if (currentCustom.some((f) => f.name.toLowerCase() === item.name.toLowerCase())) {
            return state;
          }
          return {
            profile: {
              ...state.profile,
              tastePreferences: {
                ...state.profile.tastePreferences,
                customFoodItems: [item, ...currentCustom],
              },
            },
          };
        }),

      removeCustomFoodItem: (itemId) =>
        set((state) => ({
          profile: {
            ...state.profile,
            tastePreferences: {
              ...state.profile.tastePreferences,
              customFoodItems: (
                state.profile.tastePreferences.customFoodItems || []
              ).filter((f) => f.id !== itemId),
            },
          },
        })),

      toggleDislikedFood: (foodName) =>
        set((state) => {
          const currentDisliked = state.profile.tastePreferences.dislikedFoods || [];
          const exists = currentDisliked.includes(foodName);
          const updated = exists
            ? currentDisliked.filter((f) => f !== foodName)
            : [...currentDisliked, foodName];

          return {
            profile: {
              ...state.profile,
              tastePreferences: {
                ...state.profile.tastePreferences,
                dislikedFoods: updated,
              },
            },
          };
        }),

      getDaysTogether: () => {
        const { anniversaryDate } = get().profile;
        if (!anniversaryDate) return 520;
        try {
          const start = new Date(anniversaryDate);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - start.getTime());
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          return isNaN(diffDays) ? 520 : diffDays;
        } catch {
          return 520;
        }
      },
    }),
    {
      name: 'our-date-night-couple-profile',
    }
  )
);
