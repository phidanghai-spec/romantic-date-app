import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloralBackground from "@/components/ui/FloralBackground";
import { AuthProvider } from "@/context/AuthContext";
import { CoupleProvider } from "@/context/CoupleContext";

const serifFont = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["vietnamese", "latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Our Date Night 🌸 | Private Dating & Couple Planner",
  description: "Không gian hẹn hò riêng tư và gắn kết tình cảm dành riêng cho 2 người",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="bg-[#FAF6EE] text-[#2D1E2F] font-sans relative antialiased min-h-screen selection:bg-rose-200 selection:text-rose-900">
        <AuthProvider>
          <CoupleProvider>
            <FloralBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </CoupleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
