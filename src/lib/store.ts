import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Match, DateInvitation, TasteProfile } from '@/types';
import { CURRENT_USER, MOCK_USERS } from '@/data/mockUsers';
import { calculateTasteCompatibility } from '@/lib/tasteEngine';

interface AppState {
  currentUser: UserProfile;
  discoverQueue: UserProfile[];
  matches: Match[];
  activeInvitations: DateInvitation[];
  matchedUserModal: { user: UserProfile; match: Match } | null;
  
  // Actions
  updateCurrentUserProfile: (profile: Partial<UserProfile>) => void;
  updateTasteProfile: (taste: Partial<TasteProfile>) => void;
  swipeRight: (user: UserProfile) => Match | null;
  swipeLeft: (user: UserProfile) => void;
  superLike: (user: UserProfile) => Match | null;
  closeMatchModal: () => void;
  createDateInvitation: (invitation: Omit<DateInvitation, 'id' | 'createdAt' | 'status'>) => DateInvitation;
  respondToInvitation: (invitationId: string, status: 'accepted' | 'declined') => void;
  resetDiscoverQueue: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: CURRENT_USER,
      discoverQueue: MOCK_USERS.map((user) => {
        const breakdown = calculateTasteCompatibility(CURRENT_USER.tasteProfile, user.tasteProfile);
        return {
          ...user,
          compatibilityScore: breakdown.totalScore,
          compatibilityBreakdown: breakdown,
        };
      }),
      matches: [
        {
          id: 'match_user_1',
          user1Id: CURRENT_USER.id,
          user2Id: MOCK_USERS[0].id,
          userProfile: MOCK_USERS[0],
          compatibilityScore: 94,
          compatibilityBreakdown: calculateTasteCompatibility(
            CURRENT_USER.tasteProfile,
            MOCK_USERS[0].tasteProfile
          ),
          status: 'accepted',
          lastMessage: 'Buổi hẹn tiếp theo: Lẩu Haidilao 🍲✨',
          lastMessageTime: '10:30 AM',
          unreadCount: 0,
          createdAt: new Date().toISOString(),
        },
      ],
      activeInvitations: [],
      matchedUserModal: null,

      updateCurrentUserProfile: (profile) =>
        set((state) => {
          const updatedUser = { ...state.currentUser, ...profile };
          const updatedQueue = state.discoverQueue.map((user) => {
            const breakdown = calculateTasteCompatibility(updatedUser.tasteProfile, user.tasteProfile);
            return {
              ...user,
              compatibilityScore: breakdown.totalScore,
              compatibilityBreakdown: breakdown,
            };
          });
          return { currentUser: updatedUser, discoverQueue: updatedQueue };
        }),

      updateTasteProfile: (taste) =>
        set((state) => {
          const updatedTaste = { ...state.currentUser.tasteProfile, ...taste };
          const updatedUser = { ...state.currentUser, tasteProfile: updatedTaste };
          const updatedQueue = state.discoverQueue.map((user) => {
            const breakdown = calculateTasteCompatibility(updatedTaste, user.tasteProfile);
            return {
              ...user,
              compatibilityScore: breakdown.totalScore,
              compatibilityBreakdown: breakdown,
            };
          });
          return { currentUser: updatedUser, discoverQueue: updatedQueue };
        }),

      swipeRight: (user) => {
        const { currentUser, discoverQueue } = get();
        const breakdown = calculateTasteCompatibility(currentUser.tasteProfile, user.tasteProfile);
        
        set({
          discoverQueue: discoverQueue.filter((u) => u.id !== user.id),
        });

        const newMatch: Match = {
          id: `match_${user.id}_${Date.now()}`,
          user1Id: currentUser.id,
          user2Id: user.id,
          userProfile: user,
          compatibilityScore: breakdown.totalScore,
          compatibilityBreakdown: breakdown,
          status: 'accepted',
          lastMessage: `Cả hai bạn đã Taste Match thành công (${breakdown.totalScore}%)! 🎉`,
          lastMessageTime: 'Vừa xong',
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          matches: [newMatch, ...state.matches],
          matchedUserModal: { user, match: newMatch },
        }));

        return newMatch;
      },

      swipeLeft: (user) => {
        set((state) => ({
          discoverQueue: state.discoverQueue.filter((u) => u.id !== user.id),
        }));
      },

      superLike: (user) => {
        const match = get().swipeRight(user);
        return match;
      },

      closeMatchModal: () => set({ matchedUserModal: null }),

      createDateInvitation: (invitationData) => {
        const newInvitation: DateInvitation = {
          id: `inv_${Date.now()}`,
          status: 'pending',
          createdAt: new Date().toISOString(),
          ...invitationData,
        };

        set((state) => ({
          activeInvitations: [newInvitation, ...state.activeInvitations],
        }));

        return newInvitation;
      },

      respondToInvitation: (invitationId, status) => {
        set((state) => {
          const updatedInvitations = state.activeInvitations.map((inv) =>
            inv.id === invitationId ? { ...inv, status } : inv
          );

          return { activeInvitations: updatedInvitations };
        });
      },

      resetDiscoverQueue: () => {
        const { currentUser } = get();
        set({
          discoverQueue: MOCK_USERS.map((user) => {
            const breakdown = calculateTasteCompatibility(currentUser.tasteProfile, user.tasteProfile);
            return {
              ...user,
              compatibilityScore: breakdown.totalScore,
              compatibilityBreakdown: breakdown,
            };
          }),
        });
      },
    }),
    {
      name: 'romantic_taste_match_storage_v2',
      partialize: (state) => ({
        currentUser: state.currentUser,
        matches: state.matches,
        activeInvitations: state.activeInvitations,
      }),
    }
  )
);
