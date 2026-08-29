'use client';

import React, { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import {
  Send,
  Calendar,
  Smile,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { useChatStore, ChatMessage } from '@/store/chatStore';
import { useCoupleStore } from '@/lib/coupleStore';
import { DateInviteCard } from '@/components/chat/DateInviteCard';

const QUICK_STICKERS = ['🥰', '💖', '🍲', '🥩', '🍿', '🌹', '✨', '🥺'];

function useIsHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export const ChatContainer: React.FC = () => {
  const isHydrated = useIsHydrated();
  const { messages, sendMessage, receiveMessage, clearChat } = useChatStore();
  const { profile, getDaysTogether } = useCoupleStore();

  const [inputContent, setInputContent] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);

  // Setup BroadcastChannel for 2-tab realtime sync
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;

    const channel = new BroadcastChannel('our_date_night_chat_channel');
    broadcastChannelRef.current = channel;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'NEW_CHAT_MESSAGE' && event.data.payload) {
        const rawMsg: ChatMessage = event.data.payload;
        // Invert sender so Tab B sees this message as coming from partner
        const incomingMsg: ChatMessage = {
          ...rawMsg,
          sender: 'partner',
          senderName: rawMsg.senderName || profile.partnerName || 'Người thương',
        };
        receiveMessage(incomingMsg);
      } else if (event.data && event.data.type === 'CLEAR_CHAT') {
        clearChat();
      }
    };

    channel.addEventListener('message', handleMessage);

    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, [receiveMessage, clearChat, profile.partnerName]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async (text: string, type: ChatMessage['type'] = 'text') => {
    if (!text.trim() || isSending) return;

    try {
      setIsSending(true);
      const senderName = profile.yourName || 'Người dùng';
      const createdMsg = sendMessage({
        sender: 'me',
        senderName,
        text: text.trim(),
        type,
      });

      // Broadcast to other tab
      broadcastChannelRef.current?.postMessage({
        type: 'NEW_CHAT_MESSAGE',
        payload: createdMsg,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;
    const content = inputContent;
    setInputContent('');
    await handleSendMessage(content, 'text');
  };

  const handleSendSticker = async (sticker: string) => {
    setShowStickers(false);
    await handleSendMessage(sticker, 'sticker');
  };

  const handleClearChat = () => {
    if (confirm('Bạn có chắc muốn xóa lịch sử trò chuyện trên máy này không?')) {
      clearChat();
      broadcastChannelRef.current?.postMessage({ type: 'CLEAR_CHAT' });
    }
  };

  // SSR skeleton protection
  if (!isHydrated) {
    return (
      <div className="w-full max-w-2xl mx-auto cream-glass-card rounded-[2.5rem] border-2 border-rose-300 shadow-2xl p-8 flex flex-col items-center justify-center min-h-[500px] text-center space-y-4">
        <div className="w-12 h-12 border-3 border-rose-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-serif-italic text-[#831843]">
          Đang kết nối không gian trò chuyện riêng tư của hai bạn... 💕
        </p>
      </div>
    );
  }

  const daysTogether = getDaysTogether();

  return (
    <div className="w-full max-w-2xl mx-auto cream-glass-card rounded-[2.5rem] border-2 border-rose-300 shadow-2xl overflow-hidden flex flex-col h-[700px]">
      {/* ── Dynamic Chat Header ── */}
      <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border-b border-rose-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center font-serif font-bold text-xl shadow-md overflow-hidden">
              {profile.partnerAvatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.partnerAvatarUrl}
                  alt={profile.partnerName}
                  className="w-full h-full object-cover"
                />
              ) : (
                '🌸'
              )}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif font-bold text-lg text-[#4A1D2F]">
                {profile.partnerName || 'Người thương'}
              </h3>
              <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                Đang trực tuyến
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#886A8B]">
              <span>
                Cùng nhau: <strong className="font-bold text-rose-600">{daysTogether} ngày</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Đồng bộ Realtime
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleClearChat}
            title="Xóa lịch sử chat"
            className="p-2 rounded-full text-[#886A8B] hover:text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <Link
            href="/date-planner"
            className="px-3.5 py-1.5 rounded-full bg-white border border-rose-200 text-[#831843] text-xs font-bold shadow-xs hover:bg-rose-50 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Gửi thiệp hẹn</span>
          </Link>
        </div>
      </div>

      {/* ── Realtime Messages Stream ── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-[#FFFDF9]/70">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 opacity-80">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-3xl">
              💌
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-[#4A1D2F]">
                Chưa có tin nhắn nào
              </h4>
              <p className="text-xs text-[#715A75] max-w-xs">
                Hãy gửi một lời chúc ngọt ngào hoặc sticker yêu thương cho {profile.partnerName} nhé!
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender === 'me';
            const timeFormatted = new Date(msg.timestamp).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fadeIn`}
              >
                <span className="text-[10px] text-[#886A8B] font-medium px-1 mb-1">
                  {isMe ? profile.yourName || 'Bạn' : msg.senderName || profile.partnerName} • {timeFormatted}
                </span>

                {msg.type === 'date_invite' && msg.invitationData ? (
                  <DateInviteCard
                    messageId={msg.id}
                    invitation={msg.invitationData}
                    isSender={isMe}
                  />
                ) : msg.type === 'sticker' ? (
                  <div
                    className="text-5xl py-1 transform hover:scale-125 transition-transform"
                    title={msg.text}
                  >
                    {msg.text}
                  </div>
                ) : (
                  <div
                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed max-w-[82%] shadow-sm ${
                      isMe
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-br-xs'
                        : 'bg-white border border-rose-200 text-[#2D1E2F] rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Quick Stickers Drawer ── */}
      {showStickers && (
        <div className="p-2 border-t border-rose-200 bg-rose-50/90 flex items-center justify-around animate-fadeIn">
          {QUICK_STICKERS.map((stk, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendSticker(stk)}
              className="text-2xl sm:text-3xl p-1.5 hover:scale-125 active:scale-95 transition-transform cursor-pointer"
            >
              {stk}
            </button>
          ))}
        </div>
      )}

      {/* ── Chat Input Bar ── */}
      <form
        onSubmit={handleFormSubmit}
        className="p-3 sm:p-4 border-t border-rose-200 bg-white/95 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setShowStickers(!showStickers)}
          className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
            showStickers
              ? 'bg-rose-100 border-rose-300 text-rose-700'
              : 'border-rose-200 text-[#715A75] hover:bg-rose-50'
          }`}
          title="Stickers cảm xúc"
        >
          <Smile className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder={`Nhắn tin cho ${profile.partnerName || 'người thương'}...`}
          className="flex-1 px-4 py-2.5 rounded-full bg-rose-50/50 border border-rose-200 text-xs sm:text-sm text-[#2D1E2F] focus:outline-rose-400 placeholder:text-[#A08DA3] shadow-inner font-medium"
        />

        <button
          type="submit"
          disabled={!inputContent.trim() || isSending}
          className="p-2.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-md disabled:opacity-40 flex items-center gap-1.5 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Gửi</span>
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
