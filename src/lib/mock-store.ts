import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CoupleSession {
  coupleId: string;
  inviteCode: string;
  isPaired: boolean;
  userRole: 'sender' | 'receiver' | 'solo';
  partnerName: string;
  userName: string;
  pairedAt?: string;
}

export interface ChatMessage {
  id: string;
  coupleId: string;
  senderName: string;
  isSelf: boolean;
  content: string;
  type: 'text' | 'sticker' | 'date_invite' | 'image';
  timestamp: string;
  mediaUrl?: string;
  invitationData?: {
    partnerName: string;
    senderName?: string;
    dateTime: string;
    cuisine: string;
    location: string;
    specialNote?: string;
  };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    coupleId: 'couple-default',
    senderName: 'Người thương',
    isSelf: false,
    content: 'Tối nay mình đi ăn gì đó lãng mạn nha anh iu? 💖',
    type: 'text',
    timestamp: '18:15',
  },
  {
    id: 'msg-2',
    coupleId: 'couple-default',
    senderName: 'Bạn',
    isSelf: true,
    content: 'Anh vừa quay trúng món Lẩu Haidilao chuẩn gu em luôn nè! 🍲✨',
    type: 'text',
    timestamp: '18:16',
  },
  {
    id: 'msg-3',
    coupleId: 'couple-default',
    senderName: 'Bạn',
    isSelf: true,
    content: 'Anh gửi em tấm vé VIP Date Pass qua đây nha:',
    type: 'date_invite',
    timestamp: '18:17',
    invitationData: {
      partnerName: 'Người thương',
      senderName: 'Bạn',
      dateTime: 'Tối Thứ 7 lúc 19:00',
      cuisine: 'Lẩu Haidilao & Bingsu Xoài',
      location: 'Landmark 81, TP. Hồ Chí Minh',
    },
  },
];

interface MockAppState {
  session: CoupleSession;
  messages: ChatMessage[];
  createInviteCode: () => string;
  pairWithCode: (code: string, partnerName?: string) => boolean;
  startSoloDemo: () => void;
  sendMessage: (content: string, type?: ChatMessage['type'], invitationData?: ChatMessage['invitationData']) => void;
  resetSession: () => void;
}

export const useMockAppStore = create<MockAppState>()(
  persist(
    (set, get) => ({
      session: {
        coupleId: 'couple-love-520',
        inviteCode: 'LOVE-520',
        isPaired: true,
        userRole: 'solo',
        userName: 'Người dùng',
        partnerName: 'Người thương',
        pairedAt: '2023-11-20',
      },
      messages: INITIAL_MESSAGES,

      createInviteCode: () => {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const code = `LOVE-${randomDigits}`;
        const newCoupleId = `couple-${randomDigits}`;
        set((state) => ({
          session: {
            ...state.session,
            coupleId: newCoupleId,
            inviteCode: code,
            isPaired: false,
          },
        }));
        return code;
      },

      pairWithCode: (code: string, partnerName = 'Người thương') => {
        const cleanCode = code.trim().toUpperCase();
        if (!cleanCode) return false;

        set((state) => ({
          session: {
            ...state.session,
            coupleId: `couple-${cleanCode}`,
            inviteCode: cleanCode,
            partnerName: partnerName || state.session.partnerName,
            isPaired: true,
            pairedAt: new Date().toISOString().split('T')[0],
          },
        }));
        return true;
      },

      startSoloDemo: () => {
        set((state) => ({
          session: {
            ...state.session,
            isPaired: true,
            coupleId: 'demo-couple-solo',
          },
        }));
      },

      sendMessage: (content, type = 'text', invitationData) => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
          now.getMinutes()
        ).padStart(2, '0')}`;

        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          coupleId: get().session.coupleId,
          senderName: get().session.userName,
          isSelf: true,
          content,
          type,
          timestamp: timeStr,
          invitationData,
        };

        set((state) => ({
          messages: [...state.messages, newMsg],
        }));

        // Trigger auto-reply in demo
        if (type === 'date_invite') {
          setTimeout(() => {
            const replyMsg: ChatMessage = {
              id: `msg-reply-${Date.now()}`,
              coupleId: get().session.coupleId,
              senderName: get().session.partnerName,
              isSelf: false,
              content: 'Dạ em đồng ý lunn! Háo hức chờ tới tối Thứ 7 quá nèee 🥰❤️',
              type: 'text',
              timestamp: `${String(new Date().getHours()).padStart(2, '0')}:${String(
                new Date().getMinutes()
              ).padStart(2, '0')}`,
            };
            set((state) => ({
              messages: [...state.messages, replyMsg],
            }));
          }, 1200);
        }
      },

      resetSession: () => {
        set({
          session: {
            coupleId: 'couple-love-520',
            inviteCode: 'LOVE-520',
            isPaired: true,
            userRole: 'solo',
            userName: 'Người dùng',
            partnerName: 'Người thương',
            pairedAt: '2023-11-20',
          },
          messages: INITIAL_MESSAGES,
        });
      },
    }),
    {
      name: 'our-date-night-mock-session',
    }
  )
);
