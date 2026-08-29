import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CoupleProfile, DEFAULT_COUPLE_PROFILE, FoodItem } from '@/types/couple';

// ── Dating Days Calculation with UTC Normalization ──
export function calculateDatingDays(anniversaryDate: string): number {
  try {
    if (!anniversaryDate) return 520;
    const start = new Date(anniversaryDate);
    if (isNaN(start.getTime())) return 520;
    const now = new Date();
    const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.floor((nowUtc - startUtc) / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) ? 520 : Math.max(1, diffDays);
  } catch {
    return 520;
  }
}

interface CoupleStoreState {
  profile: CoupleProfile;
  updateProfile: (updates: Partial<CoupleProfile>) => void;
  updateTastePreferences: (tasteUpdates: Partial<CoupleProfile['tastePreferences']>) => void;
  addCustomFoodItem: (item: FoodItem) => void;
  removeCustomFoodItem: (itemId: string) => void;
  toggleDislikedFood: (foodName: string) => void;
  getDaysTogether: (annivDate?: string) => number;
  resetToDefaults: () => void;
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

      getDaysTogether: (annivDate?: string) => {
        const targetDate = annivDate || get().profile.anniversaryDate;
        return calculateDatingDays(targetDate);
      },

      resetToDefaults: () =>
        set({
          profile: DEFAULT_COUPLE_PROFILE,
        }),
    }),
    {
      name: 'our-date-night-couple-profile',
    }
  )
);
