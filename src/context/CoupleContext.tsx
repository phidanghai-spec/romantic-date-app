'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CoupleMessageModel, TastePreferences, DEFAULT_COUPLE_PROFILE } from '@/types/couple';

export interface UserEntity {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

export interface CoupleEntity {
  id: string;
  coupleCode: string;
  status: 'pending' | 'active' | 'paused';
  anniversaryDate: string; // YYYY-MM-DD
  nextDate: string; // YYYY-MM-DD
  nextDateTime: string; // HH:mm
  favoriteLocation: string;
  bio?: string;
  tastePreferences: TastePreferences;
}

export interface CoupleContextType {
  currentUser: UserEntity;
  partner: UserEntity;
  couple: CoupleEntity;
  messages: CoupleMessageModel[];
  datingDays: number;
  isPaired: boolean;
  isLoading: boolean;
  updateCurrentUser: (updates: Partial<UserEntity>) => void;
  updatePartner: (updates: Partial<UserEntity>) => void;
  updateCouple: (updates: Partial<CoupleEntity>) => Promise<void>;
  updateTastePreferences: (tasteUpdates: Partial<TastePreferences>) => void;
  sendMessage: (
    content: string,
    type?: CoupleMessageModel['type'],
    invitationData?: CoupleMessageModel['invitationData']
  ) => Promise<void>;
  createCoupleCode: () => Promise<string>;
  pairWithCode: (code: string, partnerName?: string) => Promise<{ success: boolean; message?: string }>;
  getDatingDays: (annivDate?: string) => number;
}

// ── Centralized Dating Days Calculation Helper ──
export function calculateDatingDays(anniversaryDate: string): number {
  try {
    if (!anniversaryDate) return 520;
    const start = new Date(anniversaryDate);
    const now = new Date();
    // Normalize to midnight UTC/local to avoid hour shifts
    const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.floor((nowUtc - startUtc) / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) ? 520 : Math.max(1, diffDays);
  } catch {
    return 520;
  }
}

const DEFAULT_CURRENT_USER: UserEntity = {
  id: 'usr-self',
  fullName: 'Phi Đăng (Anh iu)',
  email: 'phidang@ourdatenight.app',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
};

const DEFAULT_PARTNER: UserEntity = {
  id: 'usr-partner',
  fullName: 'Thụy Ngọc (Bé iu)',
  email: 'thuyngoc@ourdatenight.app',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
};

const DEFAULT_COUPLE: CoupleEntity = {
  id: 'couple-main-520',
  coupleCode: 'LOVE-520',
  status: 'active',
  anniversaryDate: '2023-11-20',
  nextDate: '2026-08-29',
  nextDateTime: '19:00',
  favoriteLocation: 'Haidilao Landmark 81 & Xem Phim Sweetbox',
  bio: 'Cùng nhau ăn khắp thế gian và lưu giữ từng khoảnh khắc ngọt ngào.',
  tastePreferences: DEFAULT_COUPLE_PROFILE.tastePreferences,
};

const INITIAL_SEED_MESSAGES: CoupleMessageModel[] = [
  {
    id: 'msg-seed-1',
    coupleId: 'couple-main-520',
    senderId: 'usr-partner',
    senderName: 'Thụy Ngọc (Bé iu)',
    content: 'Tối nay mình đi ăn gì đó lãng mạn nha anh iu? 💖',
    type: 'text',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'msg-seed-2',
    coupleId: 'couple-main-520',
    senderId: 'usr-self',
    senderName: 'Phi Đăng (Anh iu)',
    content: 'Anh vừa quay trúng món Lẩu Haidilao chuẩn gu hai đứa mình luôn nè! 🍲✨',
    type: 'text',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
];

const STORAGE_KEY = 'our_date_night_ssot_v2';
const CoupleContext = createContext<CoupleContextType | undefined>(undefined);

// Cross-tab broadcast channel
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel('our_date_night_ssot_sync');
  } catch {
    broadcastChannel = null;
  }
}

export const CoupleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserEntity>(DEFAULT_CURRENT_USER);
  const [partner, setPartner] = useState<UserEntity>(DEFAULT_PARTNER);
  const [couple, setCouple] = useState<CoupleEntity>(DEFAULT_COUPLE);
  const [messages, setMessages] = useState<CoupleMessageModel[]>(INITIAL_SEED_MESSAGES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to persist & broadcast state
  const syncToStorageAndTabs = useCallback((
    newCurrUser: UserEntity,
    newPartner: UserEntity,
    newCouple: CoupleEntity,
    newMessages: CoupleMessageModel[]
  ) => {
    if (typeof window !== 'undefined') {
      const payload = {
        currentUser: newCurrUser,
        partner: newPartner,
        couple: newCouple,
        messages: newMessages,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      broadcastChannel?.postMessage({ type: 'SSOT_UPDATE', payload });
    }
  }, []);

  // 1. Initial hydration from LocalStorage & Supabase
  useEffect(() => {
    const hydrate = async () => {
      try {
        if (typeof window !== 'undefined') {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const data = JSON.parse(raw);
            if (data.currentUser) setCurrentUser(data.currentUser);
            if (data.partner) setPartner(data.partner);
            if (data.couple) setCouple(data.couple);
            if (data.messages && Array.isArray(data.messages)) setMessages(data.messages);
          }
        }

        // Hydrate from Supabase if configured
        if (isSupabaseConfigured) {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData.session?.user) {
            const authUser = sessionData.session.user;
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authUser.id)
              .single();

            if (profile) {
              setCurrentUser((prev) => ({
                ...prev,
                id: profile.id,
                fullName: profile.full_name || prev.fullName,
                email: profile.email || prev.email,
                avatarUrl: profile.avatar_url || prev.avatarUrl,
              }));
            }

            // Couple table
            const { data: coupleRow } = await supabase
              .from('couples')
              .select('*')
              .or(`user1_id.eq.${authUser.id},user2_id.eq.${authUser.id}`)
              .single();

            if (coupleRow) {
              const isU1 = coupleRow.user1_id === authUser.id;
              const partnerId = isU1 ? coupleRow.user2_id : coupleRow.user1_id;

              if (partnerId) {
                const { data: partnerRow } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', partnerId)
                  .single();

                if (partnerRow) {
                  setPartner((prev) => ({
                    ...prev,
                    id: partnerRow.id,
                    fullName: partnerRow.full_name || prev.fullName,
                    email: partnerRow.email || prev.email,
                    avatarUrl: partnerRow.avatar_url || prev.avatarUrl,
                  }));
                }
              }

              setCouple((prev) => ({
                ...prev,
                id: coupleRow.id,
                coupleCode: coupleRow.invite_code || prev.coupleCode,
                anniversaryDate: coupleRow.anniversary_date || prev.anniversaryDate,
                status: coupleRow.status || prev.status,
              }));
            }
          }
        }
      } catch (err) {
        console.warn('SSOT hydration warning:', err);
      } finally {
        setIsLoading(false);
      }
    };

    hydrate();

    // Cross-tab broadcast listener
    const handleBroadcast = (event: MessageEvent) => {
      if (event.data?.type === 'SSOT_UPDATE' && event.data.payload) {
        const p = event.data.payload;
        if (p.currentUser) setCurrentUser(p.currentUser);
        if (p.partner) setPartner(p.partner);
        if (p.couple) setCouple(p.couple);
        if (p.messages) setMessages(p.messages);
      }
    };

    // Storage event listener fallback (standard cross-tab)
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          if (data.currentUser) setCurrentUser(data.currentUser);
          if (data.partner) setPartner(data.partner);
          if (data.couple) setCouple(data.couple);
          if (data.messages) setMessages(data.messages);
        } catch {
          // ignore
        }
      }
    };

    broadcastChannel?.addEventListener('message', handleBroadcast);
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      broadcastChannel?.removeEventListener('message', handleBroadcast);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  const getDatingDays = useCallback((annivDate?: string) => {
    return calculateDatingDays(annivDate || couple.anniversaryDate);
  }, [couple.anniversaryDate]);

  const updateCurrentUser = (updates: Partial<UserEntity>) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...updates };
      syncToStorageAndTabs(next, partner, couple, messages);
      return next;
    });
  };

  const updatePartner = (updates: Partial<UserEntity>) => {
    setPartner((prev) => {
      const next = { ...prev, ...updates };
      syncToStorageAndTabs(currentUser, next, couple, messages);
      return next;
    });
  };

  const updateCouple = async (updates: Partial<CoupleEntity>) => {
    const updatedCouple = { ...couple, ...updates };
    setCouple(updatedCouple);
    syncToStorageAndTabs(currentUser, partner, updatedCouple, messages);

    if (isSupabaseConfigured && couple.id) {
      try {
        await supabase
          .from('couples')
          .update({
            anniversary_date: updatedCouple.anniversaryDate,
            invite_code: updatedCouple.coupleCode,
            status: updatedCouple.status,
          })
          .eq('id', couple.id);
      } catch (err) {
        console.warn('Supabase couple update warning:', err);
      }
    }
  };

  const updateTastePreferences = (tasteUpdates: Partial<TastePreferences>) => {
    setCouple((prev) => {
      const next = {
        ...prev,
        tastePreferences: {
          ...prev.tastePreferences,
          ...tasteUpdates,
        },
      };
      syncToStorageAndTabs(currentUser, partner, next, messages);
      return next;
    });
  };

  const sendMessage = async (
    content: string,
    type: CoupleMessageModel['type'] = 'text',
    invitationData?: CoupleMessageModel['invitationData']
  ) => {
    if (!content.trim()) return;

    const newMsg: CoupleMessageModel = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      coupleId: couple.id,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      content: content.trim(),
      type,
      invitationData,
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    syncToStorageAndTabs(currentUser, partner, couple, updatedMessages);

    if (isSupabaseConfigured && couple.id) {
      try {
        await supabase.from('couple_messages').insert({
          couple_id: couple.id,
          sender_id: currentUser.id,
          sender_name: currentUser.fullName,
          content: content.trim(),
          type,
        });
      } catch (err) {
        console.warn('Supabase message insert error:', err);
      }
    }
  };

  const createCoupleCode = async (): Promise<string> => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const code = `LOVE-${randomDigits}`;
    await updateCouple({ coupleCode: code, id: `couple-${randomDigits}`, status: 'pending' });
    return code;
  };

  const pairWithCode = async (
    code: string,
    partnerName = 'Thụy Ngọc (Bé iu)'
  ): Promise<{ success: boolean; message?: string }> => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Vui lòng nhập mã ghép đôi' };

    updatePartner({ fullName: partnerName });
    await updateCouple({ coupleCode: cleanCode, id: `couple-${cleanCode}`, status: 'active' });
    return { success: true, message: 'Ghép đôi thành công!' };
  };

  const datingDays = getDatingDays();
  const isPaired = couple.status === 'active';

  return (
    <CoupleContext.Provider
      value={{
        currentUser,
        partner,
        couple,
        messages,
        datingDays,
        isPaired,
        isLoading,
        updateCurrentUser,
        updatePartner,
        updateCouple,
        updateTastePreferences,
        sendMessage,
        createCoupleCode,
        pairWithCode,
        getDatingDays,
      }}
    >
      {children}
    </CoupleContext.Provider>
  );
};

export const useCouple = () => {
  const context = useContext(CoupleContext);
  if (!context) {
    throw new Error('useCouple must be used within a CoupleProvider');
  }
  return context;
};
