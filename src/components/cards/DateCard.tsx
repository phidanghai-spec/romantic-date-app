'use client';

import React, { useRef, useState } from 'react';
import { domToPng, domToBlob } from 'modern-screenshot';
import { 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Heart, 
  Calendar, 
  MapPin, 
  Utensils, 
  Award,
  Flower2,
  Mail,
  Send,
  Loader2,
  CalendarPlus,
  FileDown
} from 'lucide-react';
import { useCoupleStore } from '@/lib/coupleStore';
import { useChatStore } from '@/store/chatStore';
import { generateICSContent } from '@/lib/ics';
import { generateGoogleCalendarUrl } from '@/lib/googleCalendar';
import { downloadICSFile } from '@/lib/calendarDownload';

interface DateCardProps {
  partnerName?: string;
  senderName?: string;
  dateTime: string;
  dateStr: string;
  timeStr: string;
  cuisine: string;
  location: string;
  specialNote?: string;
  onResetPlan?: () => void;
}

export const DateCard: React.FC<DateCardProps> = ({
  partnerName: propPartnerName,
  senderName: propSenderName,
  dateTime,
  dateStr,
  timeStr,
  cuisine,
  location,
  specialNote = 'Em chỉ cần chuẩn bị một nụ cười thật xinh thôi ❤️',
  onResetPlan,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { profile } = useCoupleStore();
  const { sendMessage } = useChatStore();

  // Dynamic user & partner names from Single Source of Truth
  const realSenderName = propSenderName || profile.yourName || 'Anh iu';
  const realPartnerName = propPartnerName || profile.partnerName || 'Bé iu';

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  // Email sending states
  const [partnerEmail, setPartnerEmail] = useState<string>('');
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [emailSentStatus, setEmailSentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailMessage, setEmailMessage] = useState<string>('');

  // 1. Google Calendar URL
  const googleCalUrl = generateGoogleCalendarUrl({
    title: `💖 Hẹn Hò Cùng ${realPartnerName} (${cuisine})`,
    description: `Buổi hẹn hò lãng mạn do ${realSenderName} chuẩn bị.\nThực đơn: ${cuisine}\nLời nhắn: ${specialNote}`,
    location,
    startDate: dateStr,
    startTime: timeStr,
    durationHours: 3,
  });

  // 2. Download .ICS file directly
  const handleDownloadICS = () => {
    const icsString = generateICSContent({
      title: `💖 Hẹn Hò Cùng ${realPartnerName} (${cuisine})`,
      description: `Buổi hẹn hò lãng mạn do ${realSenderName} chuẩn bị.\nThực đơn: ${cuisine}\nLời nhắn: ${specialNote}`,
      location,
      startDate: dateStr,
      startTime: timeStr,
      durationHours: 3,
    });

    downloadICSFile(icsString, `Hen-Ho-${realPartnerName.replace(/\s+/g, '-')}`);
  };

  // Capture using modern-screenshot (avoids lab color parser bugs)
  const captureCardBlob = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;

    if (typeof document !== 'undefined' && 'fonts' in document) {
      await document.fonts.ready;
    }

    try {
      const blob = await domToBlob(cardRef.current, {
        scale: 2, // 2x Retina resolution
        backgroundColor: '#FFFDF9',
        quality: 1.0,
        type: 'image/png',
      });
      return blob;
    } catch (err) {
      console.error('modern-screenshot blob error, trying dataUrl:', err);
      const dataUrl = await domToPng(cardRef.current, {
        scale: 2,
        backgroundColor: '#FFFDF9',
      });
      const res = await fetch(dataUrl);
      return await res.blob();
    }
  };

  // Download image trigger
  const handleDownloadImage = async () => {
    try {
      setIsExporting(true);
      const blob = await captureCardBlob();
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `VIP-Date-Pass-${realPartnerName.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading date pass:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Send email invitation via /api/send-invitation endpoint
  const handleSendEmailInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerEmail.trim() || !partnerEmail.includes('@')) {
      setEmailSentStatus('error');
      setEmailMessage('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    try {
      setIsSendingEmail(true);
      setEmailSentStatus('idle');

      const res = await fetch('/api/send-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: partnerEmail.trim(),
          senderName: realSenderName,
          partnerName: realPartnerName,
          dateStr,
          timeStr,
          cuisine,
          location,
          specialNote,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setEmailSentStatus('success');
        setEmailMessage(data.message || `Đã gửi thiệp mời thành công đến ${partnerEmail}!`);
        
        // Dispatch to realtime couple chat
        sendMessage({
          sender: 'me',
          senderName: realSenderName,
          text: `Anh vừa gửi vé hẹn hò "${cuisine}" tới email ${partnerEmail} nè! 💌✨`,
          type: 'date_invite',
          invitationData: {
            partnerName: realPartnerName,
            senderName: realSenderName,
            dateTime: `${dateStr} vào lúc ${timeStr}`,
            dateStr,
            timeStr,
            location,
            cuisine,
            specialNote,
            status: 'pending',
          },
        });
      } else {
        setEmailSentStatus('error');
        setEmailMessage(data.error || 'Gửi email thất bại');
      }
    } catch (err) {
      console.error('Error sending invite:', err);
      setEmailSentStatus('error');
      setEmailMessage('Lỗi kết nối khi gửi email');
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Web Share API with File fallback
  const handleShareImage = async () => {
    try {
      setIsExporting(true);
      const blob = await captureCardBlob();
      if (!blob) return;

      const file = new File([blob], `VIP-Date-Pass-${realPartnerName}.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `💌 Thiệp Mời Hẹn Hò Dành Riêng Cho ${realPartnerName}`,
          text: `Anh gửi em tấm vé VIP Date Pass cho buổi hẹn sắp tới nè! ✨`,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } else if (navigator.share) {
        await navigator.share({
          title: `💌 Thiệp Mời Hẹn Hò Dành Riêng Cho ${realPartnerName}`,
          text: `💌 LỜI MỜI HẸN HÒ ĐẶC BIỆT 💌\n✨ Dành cho: ${realPartnerName}\n📅 Thời gian: ${dateTime}\n🍽️ Món ăn: ${cuisine}\n📍 Địa điểm: ${location}\n💬 "${specialNote}"`,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } else {
        await handleDownloadImage();
      }
    } catch (err) {
      console.warn('Share dismissed or failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy text invitation
  const handleCopyText = () => {
    const inviteText = `💌 LỜI MỜI HẸN HÒ ĐẶC BIỆT 💌\n\n✨ Người gửi: ${realSenderName}\n💖 Dành cho: ${realPartnerName}\n📅 Thời gian: ${dateStr} vào lúc ${timeStr}\n🍽️ Món ăn: ${cuisine}\n📍 Địa điểm: ${location}\n💌 Lời nhắn: "${specialNote}"\n\n👉 Em hãy cùng anh xác nhận buổi hẹn ngọt ngào này nhé! ✨`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full space-y-6 flex flex-col items-center">
      {/* Visual Celebration Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-mono tracking-wider uppercase border border-rose-200 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Chuyến Hẹn Hò Chính Thức! 🎉</span>
        </div>
        <h3 className="font-serif-italic text-3xl sm:text-4xl text-[#2D1E2F] font-bold">
          VIP Romantic Date Pass 🎟️💖
        </h3>
        <p className="text-xs text-[#715A75] font-light max-w-sm mx-auto">
          Tấm vé đặc quyền được thiết kế riêng với hoa tulip và những điều tuyệt vời nhất dành cho {realPartnerName}.
        </p>
      </div>

      {/* THE VIP FLORAL CREAM DATE PASS */}
      <div
        id="vip-date-pass"
        ref={cardRef}
        className="relative w-full max-w-md rounded-3xl p-6 sm:p-7 text-[#2D1E2F] shadow-2xl overflow-hidden select-none"
        style={{
          backgroundColor: '#FFFDF9',
          border: '2px solid #FDA4AF',
          boxShadow: '0 20px 40px -15px rgba(244, 114, 182, 0.25), 0 0 0 1px rgba(244, 114, 182, 0.1)',
        }}
      >
        {/* Background Floral Watermark Pattern */}
        <div
          className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(253, 164, 175, 0.35) 0%, rgba(255, 255, 255) 0) 70%)',
          }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(253, 230, 138, 0.3) 0%, rgba(255, 255, 255) 0) 70%)',
          }}
        />

        {/* Decorative Tulip Corners */}
        <svg className="absolute top-2.5 left-2.5 w-7 h-7 text-rose-300 opacity-80" viewBox="0 0 24 24" fill="#F472B6">
          <path d="M12 2C10.5 5 8 7 8 10c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-2.5-5-4-8zM5 8c0 3 2 5.5 5 6.5-1.5 2-2 4.5-2 6.5h2c0-2.5 1-4.5 2-6 1 1.5 2 3.5 2 6h2c0-2-.5-4.5-2-6.5 3-1 5-3.5 5-6.5-1.5 0-3 .5-4.5 1.5C13.5 8.5 12.8 8 12 8s-1.5.5-2.5 1.5C8 8.5 6.5 8 5 8z"/>
        </svg>
        <svg className="absolute bottom-2.5 right-2.5 w-7 h-7 text-blue-300 opacity-80" viewBox="0 0 24 24" fill="#60A5FA">
          <path d="M12 2l2.4 6.6L21 11l-5.6 4.4L17 22l-5-4.2-5 4.2 1.6-6.6L3 11l6.6-2.4z"/>
        </svg>

        {/* Ticket Top Ribbon */}
        <div
          className="flex items-center justify-between pb-4 mb-4"
          style={{ borderBottom: '2px dashed #FECDD3' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md"
              style={{ background: 'linear-gradient(135deg, #F43F5E 0%, #EC4899 100%)' }}
            >
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="text-[9.5px] uppercase font-mono tracking-widest text-[#E11D48] font-bold block">
                ✦ OFFICIAL COUPLE PASS ✦
              </span>
              <h4 className="font-serif-italic text-2xl text-[#2D1E2F] font-bold leading-tight">
                VIP Romantic Date Pass
              </h4>
            </div>
          </div>

          <div className="text-right">
            <span
              className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold"
              style={{
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                border: '1px solid #FDE68A',
              }}
            >
              NO. 2026-VIP
            </span>
          </div>
        </div>

        {/* Ticket Body Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs py-1">
          {/* Receiver */}
          <div
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: 'rgba(255, 241, 242, 0.85)', border: '1px solid #FECDD3' }}
          >
            <span className="text-[10px] text-[#715A75] font-medium flex items-center gap-1">
              <Flower2 className="w-3 h-3 text-rose-500" />
              Dành riêng cho:
            </span>
            <span className="font-serif-italic text-lg font-bold text-[#9F1239] block truncate mt-0.5">
              {realPartnerName}
            </span>
          </div>

          {/* Sender */}
          <div
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: 'rgba(255, 241, 242, 0.85)', border: '1px solid #FECDD3' }}
          >
            <span className="text-[10px] text-[#715A75] font-medium flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500" />
              Người mời:
            </span>
            <span className="font-serif-italic text-lg font-bold text-[#2D1E2F] block truncate mt-0.5">
              {realSenderName}
            </span>
          </div>

          {/* Date & Time */}
          <div
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: 'rgba(254, 243, 199, 0.7)', border: '1px solid #FDE68A' }}
          >
            <span className="text-[10px] text-[#715A75] font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-600" />
              Thời gian hẹn:
            </span>
            <span className="font-bold text-[#2D1E2F] text-xs block mt-0.5">
              {dateStr} • {timeStr}
            </span>
          </div>

          {/* Location */}
          <div
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: 'rgba(239, 246, 255, 0.8)', border: '1px solid #BFDBFE' }}
          >
            <span className="text-[10px] text-[#715A75] font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-500" />
              Địa điểm / Khu vực:
            </span>
            <span className="font-bold text-[#2D1E2F] text-xs block truncate mt-0.5">
              {location}
            </span>
          </div>
        </div>

        {/* Selected Cuisine Banner */}
        <div
          className="mt-3.5 p-3 rounded-2xl flex items-start gap-2.5"
          style={{
            background: 'linear-gradient(90deg, #FFE4E6 0%, #FFF1F2 50%, #FEF3C7 100%)',
            border: '1px solid #FECDD3',
          }}
        >
          <Utensils className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#E11D48] font-bold block">
              Thực đơn khoái khẩu:
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#2D1E2F] block leading-snug">
              {cuisine}
            </span>
          </div>
        </div>

        {/* Special Note Quote */}
        <div
          className="mt-3 text-center px-4 py-2 rounded-xl text-xs italic text-[#5E4761]"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #FEE2E2' }}
        >
          &ldquo;{specialNote}&rdquo;
        </div>

        {/* Ticket Bottom Barcode Stub & Gold Seal */}
        <div
          className="mt-4 pt-3.5 flex items-center justify-between"
          style={{ borderTop: '2px dashed #FECDD3' }}
        >
          <div className="space-y-0.5">
            <div className="font-mono text-[9px] tracking-widest text-[#A08DA3]">
              ||| | |||| | ||||| ||| |||| |
            </div>
            <div className="text-[8.5px] font-mono text-[#E11D48]">
              SECRET-DATE-PASS-AUTHENTIC
            </div>
          </div>

          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[10px] font-bold shadow-xs"
            style={{ background: 'linear-gradient(90deg, #F59E0B 0%, #FB7185 100%)' }}
          >
            <Award className="w-3 h-3" />
            <span>VIP ONLY</span>
          </div>
        </div>
      </div>

      {/* ── CALENDAR INTEGRATION ROW (Google Calendar & .ICS Download) ── */}
      <div className="w-full max-w-md grid grid-cols-2 gap-2.5">
        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 rounded-2xl bg-white border border-blue-200 text-blue-800 hover:bg-blue-50/80 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <CalendarPlus className="w-4 h-4 text-blue-600" />
          <span>Google Calendar 📅</span>
        </a>

        <button
          type="button"
          onClick={handleDownloadICS}
          className="py-3 px-4 rounded-2xl bg-white border border-amber-200 text-amber-900 hover:bg-amber-50/80 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FileDown className="w-4 h-4 text-amber-600" />
          <span>Tải file .ics ⏰</span>
        </button>
      </div>

      {/* EMAIL INVITATION VIA GMAIL WIDGET */}
      <form
        onSubmit={handleSendEmailInvite}
        className="w-full max-w-md p-4 sm:p-5 rounded-3xl bg-white/95 border border-rose-200 shadow-lg space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#4A1D2F]">
                Gửi Thư Mời Trực Tiếp Cho {realPartnerName} 💌
              </h4>
              <span className="text-[10px] text-[#886A8B] block">
                Tự động đính kèm file .ics thêm lịch và đồng bộ tin nhắn đôi
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="email"
            required
            value={partnerEmail}
            onChange={(e) => setPartnerEmail(e.target.value)}
            placeholder={`Nhập email của ${realPartnerName}...`}
            className="flex-1 px-3.5 py-2.5 rounded-2xl bg-rose-50/50 border border-rose-200 text-xs text-[#2D1E2F] focus:outline-rose-400 placeholder:text-[#A08DA3] shadow-inner font-medium"
          />

          <button
            type="submit"
            disabled={isSendingEmail || !partnerEmail.trim()}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-md disabled:opacity-50 flex items-center gap-1.5 cursor-pointer hover:opacity-95 transition-all"
          >
            {isSendingEmail ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Gửi</span>
              </>
            )}
          </button>
        </div>

        {emailSentStatus === 'success' && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{emailMessage}</span>
          </div>
        )}

        {emailSentStatus === 'error' && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold animate-fadeIn">
            {emailMessage}
          </div>
        )}
      </form>

      {/* Action Buttons Hub */}
      <div className="w-full max-w-md space-y-2.5">
        <button
          onClick={handleDownloadImage}
          disabled={isExporting}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:opacity-95 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-500/25 transition-all flex items-center justify-center gap-2 border border-white/40 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Đang tạo ảnh HD...' : 'Tải Thiệp VIP Về Máy (PNG Retina 2x) 📸'}</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleShareImage}
            disabled={isExporting}
            className="py-3 px-4 rounded-full cream-glass-pill hover:bg-white text-rose-700 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 border border-rose-300 shadow-xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{shareSuccess ? 'Đã mở chia sẻ!' : 'Chia Sẻ Ảnh 💬'}</span>
          </button>

          <button
            onClick={handleCopyText}
            className="py-3 px-4 rounded-full cream-glass-pill hover:bg-white text-[#4A3B4E] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 border border-rose-200 shadow-xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#715A75]" />
                <span>Sao Chép Chữ 📋</span>
              </>
            )}
          </button>
        </div>

        {onResetPlan && (
          <button
            onClick={onResetPlan}
            className="text-xs text-[#886A8B] hover:text-rose-700 font-medium flex items-center justify-center gap-1 mx-auto pt-2 transition-colors cursor-pointer"
          >
            <span>Lên lại kế hoạch hẹn hò khác ➔</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DateCard;
