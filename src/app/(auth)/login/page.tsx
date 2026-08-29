'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Heart, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Loader2, 
  ShieldCheck,
  Zap,
  Flower2
} from 'lucide-react';
import { useCoupleAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, startSoloDemoMode, isConfigured } = useCoupleAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUpWithEmail(email, password, fullName);
        if (error) {
          setErrorMessage(error.message || 'Đăng ký không thành công');
        } else {
          setSuccessMessage('Đăng ký thành công! Vui lòng kiểm tra email hoặc đăng nhập để tiếp tục.');
          router.push('/onboarding');
        }
      } else {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMessage(error.message || 'Email hoặc mật khẩu không chính xác');
        } else {
          router.push('/');
        }
      }
    } catch (err) {
      setErrorMessage('Đã xảy ra lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const { error } = await signInWithGoogle();
      if (error) setErrorMessage(error.message);
    } catch (err) {
      setErrorMessage('Lỗi đăng nhập Google');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    startSoloDemoMode();
    router.push('/');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 pb-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-rose-200/50 via-pink-200/40 to-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-100/90 text-rose-800 text-xs font-mono tracking-wider uppercase border border-rose-300 font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Private Couple Portal</span>
          </div>

          <h1 className="font-serif-italic text-4xl sm:text-5xl text-[#2D1E2F] font-bold tracking-tight">
            Our Date Night 🌸
          </h1>

          <p className="text-xs sm:text-sm text-[#715A75] font-light max-w-xs mx-auto">
            {isSignUp
              ? 'Tạo tài khoản để cùng người thương kết nối và lên lịch hẹn hò'
              : 'Đăng nhập vào không gian hẹn hò riêng tư của hai bạn'}
          </p>
        </div>

        {/* Main Glass Card */}
        <div className="cream-glass-card rounded-[2.5rem] p-6 sm:p-8 border-2 border-rose-300 shadow-2xl space-y-5">
          {/* Tab Switcher: Đăng Nhập vs Đăng Ký */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-full bg-rose-100/60 border border-rose-200">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                !isSignUp
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                  : 'text-[#6B5B6E] hover:text-[#2D1E2F]'
              }`}
            >
              Đăng Nhập
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSignUp
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                  : 'text-[#6B5B6E] hover:text-[#2D1E2F]'
              }`}
            >
              Đăng Ký Mới
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {isSignUp && (
              <div>
                <label className="text-[#5E4761] block mb-1 font-bold flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-rose-500" />
                  Họ và tên / Biệt danh:
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="VD: Minh Hoàng (Anh iu)..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-xs sm:text-sm font-semibold text-[#2D1E2F] focus:outline-rose-400 shadow-inner"
                />
              </div>
            )}

            <div>
              <label className="text-[#5E4761] block mb-1 font-bold flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-rose-500" />
                Email:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="VD: yourname@gmail.com"
                className="w-full px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-xs sm:text-sm font-semibold text-[#2D1E2F] focus:outline-rose-400 shadow-inner"
              />
            </div>

            <div>
              <label className="text-[#5E4761] block mb-1 font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-rose-500" />
                Mật khẩu:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ít nhất 6 ký tự..."
                minLength={6}
                className="w-full px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-xs sm:text-sm font-semibold text-[#2D1E2F] focus:outline-rose-400 shadow-inner"
              />
            </div>

            {errorMessage && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 font-semibold animate-fadeIn">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-semibold animate-fadeIn">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-500/25 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/40 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{isSignUp ? 'Tạo Tài Khoản Cặp Đôi' : 'Đăng Nhập Ngay'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-rose-200 w-full" />
            <span className="bg-[#FFFDF9] px-3 text-[10px] text-[#886A8B] font-mono uppercase tracking-wider">
              Hoặc
            </span>
            <div className="border-t border-rose-200 w-full" />
          </div>

          {/* Social Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-rose-50/60 border border-rose-200/90 text-[#2D1E2F] font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Tiếp tục với Google</span>
          </button>

          {/* Quick Demo Mode */}
          <div className="pt-2 border-t border-rose-200/70 flex items-center justify-between text-xs text-[#886A8B]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bảo mật 100%</span>
            </span>

            <button
              type="button"
              onClick={handleDemoAccess}
              className="text-rose-700 hover:text-rose-900 font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Trải nghiệm nhanh (Demo) ➔</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
