'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Sparkles, 
  Copy, 
  Check, 
  KeyRound, 
  ArrowRight, 
  Users, 
  ShieldCheck,
  Zap,
  Loader2
} from 'lucide-react';
import { useCoupleAuth } from '@/context/AuthContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { couple, createInviteCode, pairWithInviteCode, startSoloDemoMode } = useCoupleAuth();

  const [activeMode, setActiveMode] = useState<'create' | 'join'>('create');
  const [generatedCode, setGeneratedCode] = useState<string>(couple?.inviteCode || 'LOVE-520');
  const [inputCode, setInputCode] = useState<string>('');
  const [partnerInputName, setPartnerInputName] = useState<string>(couple?.partnerName || 'Bé iu');
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pairSuccess, setPairSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const code = await createInviteCode();
      setGeneratedCode(code);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleJoinWithCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    setErrorMessage('');
    setLoading(true);

    try {
      const result = await pairWithInviteCode(inputCode, partnerInputName);
      if (result.success) {
        setPairSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 1200);
      } else {
        setErrorMessage(result.message || 'Mã ghép đôi không hợp lệ');
      }
    } catch (err) {
      setErrorMessage('Lỗi kết nối khi ghép đôi');
    } finally {
      setLoading(false);
    }
  };

  const handleStartDemo = () => {
    startSoloDemoMode();
    router.push('/');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 pb-24">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-rose-200/40 via-pink-200/30 to-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-100/90 text-rose-800 text-xs font-mono tracking-wider uppercase border border-rose-300 font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Ghép Đôi Không Gian Hẹn Hò</span>
          </div>

          <h1 className="font-serif-italic text-4xl sm:text-5xl text-[#2D1E2F] font-bold">
            Chào Mừng Đến Với &ldquo;Our Date Night&rdquo; 🌸
          </h1>

          <p className="text-xs sm:text-sm text-[#715A75] font-light max-w-md mx-auto">
            Không gian riêng tư 100% dành cho 2 người để cùng quyết định hôm nay ăn gì, lên lịch hẹn hò và lưu giữ kỷ niệm.
          </p>
        </div>

        {/* Main Card */}
        <div className="cream-glass-card rounded-[2.5rem] p-6 sm:p-8 border-2 border-rose-300 shadow-2xl space-y-6">
          {/* Tab Selector: Tạo mã vs Nhập mã */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-full bg-rose-100/60 border border-rose-200">
            <button
              type="button"
              onClick={() => {
                setActiveMode('create');
                setErrorMessage('');
              }}
              className={`py-2.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeMode === 'create'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                  : 'text-[#6B5B6E] hover:text-[#2D1E2F]'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>1. Tạo Mã Ghép Đôi</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMode('join');
                setErrorMessage('');
              }}
              className={`py-2.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeMode === 'join'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                  : 'text-[#6B5B6E] hover:text-[#2D1E2F]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>2. Nhập Mã Người Ấy</span>
            </button>
          </div>

          {/* MODE 1: CREATE CODE */}
          {activeMode === 'create' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-3xl bg-white/95 border border-rose-200 text-center space-y-3 shadow-sm">
                <span className="text-[11px] font-mono text-[#886A8B] uppercase tracking-wider block font-semibold">
                  Mã Ghép Đôi Riêng Tư Của Bạn
                </span>

                <div className="font-mono text-3xl sm:text-4xl font-black text-[#831843] tracking-widest py-2 bg-rose-50/70 rounded-2xl border border-rose-200/80">
                  {generatedCode}
                </div>

                <p className="text-xs text-[#715A75] font-light leading-relaxed">
                  Hãy gửi mã này cho người yêu của bạn để đối phương nhập vào và kết nối hai tài khoản.
                </p>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã sao chép mã!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép mã gửi Zalo / Messenger 💌</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={loading}
                    className="px-4 py-2.5 rounded-full bg-white border border-rose-300 text-[#831843] text-xs font-bold hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Đổi mã khác 🔄'}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-500/25 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/40"
                >
                  <span>Bắt đầu trải nghiệm ngay ➔</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: ENTER CODE */}
          {activeMode === 'join' && (
            <form onSubmit={handleJoinWithCode} className="space-y-4 animate-fadeIn">
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[#5E4761] block mb-1 font-bold">Tên / Biệt danh của người ấy:</label>
                  <input
                    type="text"
                    required
                    value={partnerInputName}
                    onChange={(e) => setPartnerInputName(e.target.value)}
                    placeholder="VD: Bé iu, Em yêu, Công chúa nhỏ..."
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-rose-200 text-sm font-semibold text-[#2D1E2F] focus:outline-rose-400 shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-[#5E4761] block mb-1 font-bold">Nhập mã ghép đôi đối phương gửi:</label>
                  <input
                    type="text"
                    required
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    placeholder="VD: LOVE-9821"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-rose-200 text-lg font-mono font-bold tracking-widest text-[#831843] focus:outline-rose-400 shadow-inner uppercase"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold animate-fadeIn">
                  {errorMessage}
                </div>
              )}

              {pairSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-bold text-xs flex items-center justify-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Ghép đôi thành công! Đang chuyển hướng... ✨</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !inputCode.trim()}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-500/25 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/40 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Xác nhận kết nối cặp đôi 💕</span>
                    </>
                  )}
                </button>
              )}
            </form>
          )}

          {/* Quick Demo Bypass */}
          <div className="pt-4 border-t border-rose-200/80 flex items-center justify-between text-xs text-[#886A8B]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bảo mật 100% riêng tư</span>
            </span>

            <button
              type="button"
              onClick={handleStartDemo}
              className="text-rose-700 hover:text-rose-900 font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Chạy thử Solo Demo Mode ➔</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
