import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DateInvitationData {
  date: string;
  time: string;
  location: string;
  cuisine?: string;
  activity?: string;
  note?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'partner';
  senderName: string;
  text: string;
  timestamp: string;
  type?: 'text' | 'sticker' | 'date_invite';
  invitationData?: DateInvitationData;
}

interface ChatStoreState {
  messages: ChatMessage[];
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  sendMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => ChatMessage;
  receiveMessage: (message: ChatMessage) => void;
  clearChat: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'seed-msg-1',
    sender: 'partner',
    senderName: 'Bé iu',
    text: 'Tối nay mình đi ăn gì đó lãng mạn nha anh iu? 💖',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    type: 'text',
  },
  {
    id: 'seed-msg-2',
    sender: 'me',
    senderName: 'Anh iu',
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
        // Prevent duplicate message from BroadcastChannel or duplicate listeners
        if (currentMessages.some((m) => m.id === message.id)) {
          return;
        }

        set((state) => ({
          messages: [...state.messages, message],
        }));
      },

      clearChat: () => {
        set({ messages: [] });
      },
    }),
    {
      name: 'couple-chat-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
