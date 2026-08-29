'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
}

export interface CoupleData {
  id: string;
  user1Id?: string;
  user2Id?: string;
  inviteCode: string;
  status: 'pending' | 'active' | 'paused';
  anniversaryDate: string;
  partnerName?: string;
  partnerAvatar?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  couple: CoupleData | null;
  partnerProfile: UserProfile | null;
  isPaired: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  createInviteCode: () => Promise<string>;
  pairWithInviteCode: (code: string, partnerName?: string) => Promise<{ success: boolean; message?: string }>;
  startSoloDemoMode: () => void;
  getDaysInLove: () => number;
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-demo-1',
  email: 'anhyeu@ourdatenight.app',
  fullName: 'Minh Hoàng (Anh iu)',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
};

const DEFAULT_DEMO_COUPLE: CoupleData = {
  id: 'couple-demo-520',
  user1Id: 'usr-demo-1',
  user2Id: 'usr-demo-2',
  inviteCode: 'LOVE-520',
  status: 'active',
  anniversaryDate: '2023-11-20',
  partnerName: 'Bé iu (Thu Hà)',
  partnerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_DEMO_USER);
  const [session, setSession] = useState<Session | null>(null);
  const [couple, setCouple] = useState<CoupleData | null>(DEFAULT_DEMO_COUPLE);
  const [partnerProfile, setPartnerProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load initial session and local storage cache
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof window !== 'undefined') {
          const cachedUser = localStorage.getItem('odn_user');
          const cachedCouple = localStorage.getItem('odn_couple');

          if (cachedUser) setUser(JSON.parse(cachedUser));
          if (cachedCouple) setCouple(JSON.parse(cachedCouple));
        }

        if (isSupabaseConfigured) {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            setSession(data.session);
            await fetchUserProfile(data.session.user);
          }
        }
      } catch (err) {
        console.warn('Auth initialization fallback:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          await fetchUserProfile(newSession.user);
        } else {
          // Do not completely wipe if using demo mode
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      const profileData: UserProfile = {
        id: authUser.id,
        email: authUser.email || '',
        fullName: profile?.full_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Người dùng',
        avatarUrl: profile?.avatar_url || authUser.user_metadata?.avatar_url,
      };

      setUser(profileData);
      localStorage.setItem('odn_user', JSON.stringify(profileData));

      // Fetch couple matching
      const { data: coupleData } = await supabase
        .from('couples')
        .select('*')
        .or(`user1_id.eq.${authUser.id},user2_id.eq.${authUser.id}`)
        .single();

      if (coupleData) {
        const isUser1 = coupleData.user1_id === authUser.id;
        const partnerId = isUser1 ? coupleData.user2_id : coupleData.user1_id;

        let pName = 'Người thương';
        let pAvatar = undefined;

        if (partnerId) {
          const { data: pProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', partnerId)
            .single();

          if (pProfile) {
            pName = pProfile.full_name;
            pAvatar = pProfile.avatar_url;
            setPartnerProfile({
              id: pProfile.id,
              email: pProfile.email,
              fullName: pProfile.full_name,
              avatarUrl: pProfile.avatar_url,
            });
          }
        }

        const coupleObj: CoupleData = {
          id: coupleData.id,
          user1Id: coupleData.user1_id,
          user2Id: coupleData.user2_id,
          inviteCode: coupleData.invite_code,
          status: coupleData.status,
          anniversaryDate: coupleData.anniversary_date || '2023-11-20',
          partnerName: pName,
          partnerAvatar: pAvatar,
        };

        setCouple(coupleObj);
        localStorage.setItem('odn_couple', JSON.stringify(coupleObj));
      }
    } catch (err) {
      console.warn('Error fetching Supabase profile:', err);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Mock login for offline/demo
      const mockUser: UserProfile = {
        id: `usr-${Date.now()}`,
        email,
        fullName: email.split('@')[0],
      };
      setUser(mockUser);
      localStorage.setItem('odn_user', JSON.stringify(mockUser));
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured) {
      const mockUser: UserProfile = {
        id: `usr-${Date.now()}`,
        email,
        fullName: fullName || email.split('@')[0],
      };
      setUser(mockUser);
      localStorage.setItem('odn_user', JSON.stringify(mockUser));
      return { error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (!error && data.user) {
      // Create profile row
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        full_name: fullName,
      });
    }

    return { error };
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      setUser(DEFAULT_DEMO_USER);
      localStorage.setItem('odn_user', JSON.stringify(DEFAULT_DEMO_USER));
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    return { error };
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setCouple(null);
    setPartnerProfile(null);
    setSession(null);
    localStorage.removeItem('odn_user');
    localStorage.removeItem('odn_couple');
  };

  const createInviteCode = async (): Promise<string> => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const code = `LOVE-${randomDigits}`;

    const newCouple: CoupleData = {
      id: `couple-${randomDigits}`,
      user1Id: user?.id,
      inviteCode: code,
      status: 'pending',
      anniversaryDate: new Date().toISOString().split('T')[0],
    };

    if (isSupabaseConfigured && user) {
      try {
        const { data } = await supabase
          .from('couples')
          .insert({
            user1_id: user.id,
            invite_code: code,
            status: 'pending',
            anniversary_date: new Date().toISOString().split('T')[0],
          })
          .select()
          .single();

        if (data) {
          newCouple.id = data.id;
        }
      } catch (err) {
        console.warn('Supabase invite create error, falling back:', err);
      }
    }

    setCouple(newCouple);
    localStorage.setItem('odn_couple', JSON.stringify(newCouple));
    return code;
  };

  const pairWithInviteCode = async (
    code: string,
    partnerName = 'Bé iu'
  ): Promise<{ success: boolean; message?: string }> => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Vui lòng nhập mã ghép đôi' };

    if (isSupabaseConfigured && user) {
      try {
        const { data: foundCouple, error: findError } = await supabase
          .from('couples')
          .select('*')
          .eq('invite_code', cleanCode)
          .single();

        if (findError || !foundCouple) {
          return { success: false, message: 'Mã ghép đôi không tồn tại hoặc đã hết hạn' };
        }

        const { data: updated, error: updateError } = await supabase
          .from('couples')
          .update({
            user2_id: user.id,
            status: 'active',
          })
          .eq('id', foundCouple.id)
          .select()
          .single();

        if (!updateError && updated) {
          const coupleObj: CoupleData = {
            id: updated.id,
            user1Id: updated.user1_id,
            user2Id: updated.user2_id,
            inviteCode: updated.invite_code,
            status: 'active',
            anniversaryDate: updated.anniversary_date || '2023-11-20',
            partnerName,
          };
          setCouple(coupleObj);
          localStorage.setItem('odn_couple', JSON.stringify(coupleObj));
          return { success: true, message: 'Ghép đôi thành công!' };
        }
      } catch (err) {
        console.warn('Supabase pairing error:', err);
      }
    }

    // Local / Demo Pairing Fallback
    const localCouple: CoupleData = {
      id: `couple-${cleanCode}`,
      user1Id: 'usr-partner',
      user2Id: user?.id || 'usr-self',
      inviteCode: cleanCode,
      status: 'active',
      anniversaryDate: '2023-11-20',
      partnerName,
    };
    setCouple(localCouple);
    localStorage.setItem('odn_couple', JSON.stringify(localCouple));
    return { success: true, message: 'Ghép đôi thành công!' };
  };

  const startSoloDemoMode = () => {
    setUser(DEFAULT_DEMO_USER);
    setCouple(DEFAULT_DEMO_COUPLE);
    localStorage.setItem('odn_user', JSON.stringify(DEFAULT_DEMO_USER));
    localStorage.setItem('odn_couple', JSON.stringify(DEFAULT_DEMO_COUPLE));
  };

  const getDaysInLove = () => {
    const anniv = couple?.anniversaryDate || '2023-11-20';
    try {
      const start = new Date(anniv);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - start.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return isNaN(diffDays) ? 520 : diffDays;
    } catch {
      return 520;
    }
  };

  const isPaired = Boolean(couple && couple.status === 'active');

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        couple,
        partnerProfile,
        isPaired,
        isLoading,
        isConfigured: isSupabaseConfigured,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        createInviteCode,
        pairWithInviteCode,
        startSoloDemoMode,
        getDaysInLove,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useCoupleAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useCoupleAuth must be used within an AuthProvider');
  }
  return context;
};
