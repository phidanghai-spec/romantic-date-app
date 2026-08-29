import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DateInvitationPayload {
  id?: string;
  partnerName?: string;
  senderName?: string;
  dateTime: string;
  dateStr?: string;
  timeStr?: string;
  cuisine: string;
  location: string;
  specialNote?: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'partner';
  senderName: string;
  text: string;
  timestamp: string;
  type?: 'text' | 'sticker' | 'date_invite';
  invitationData?: DateInvitationPayload;
}

interface ChatStoreState {
  messages: ChatMessage[];
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  sendMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => ChatMessage;
  receiveMessage: (message: ChatMessage) => void;
  respondToInvitation: (messageId: string, status: 'accepted' | 'declined') => void;
  clearChat: () => void;
  resetToDefaults: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'seed-msg-1',
    sender: 'partner',
    senderName: 'Người thương',
    text: 'Tối nay mình đi ăn gì đó lãng mạn nha anh iu? 💖',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    type: 'text',
  },
  {
    id: 'seed-msg-2',
    sender: 'me',
    senderName: 'Người dùng',
    text: 'Anh đã chuẩn bị sẵn một danh sách quán ăn ngon đúng gu hai đứa mình luôn nè! 🍲✨',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    type: 'text',
  },
];

export const useChatStore = create<ChatStoreState>()(
  persist(
    (set, get) => ({
      messages: INITIAL_MESSAGES,
      _hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },

      sendMessage: (msgData) => {
        const newMsg: ChatMessage = {
          ...msgData,
          id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          messages: [...state.messages, newMsg],
        }));

        return newMsg;
      },

      receiveMessage: (message: ChatMessage) => {
        const currentMessages = get().messages;
        if (currentMessages.some((m) => m.id === message.id)) {
          return;
        }

        set((state) => ({
          messages: [...state.messages, message],
        }));
      },

      respondToInvitation: (messageId: string, status: 'accepted' | 'declined') => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId && msg.invitationData
              ? {
                  ...msg,
                  invitationData: {
                    ...msg.invitationData,
                    status,
                  },
                }
              : msg
          ),
        }));
      },

      clearChat: () => {
        set({ messages: [] });
      },

      resetToDefaults: () => {
        set({ messages: INITIAL_MESSAGES });
      },
    }),
    {
      name: 'our-date-night-chat-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
