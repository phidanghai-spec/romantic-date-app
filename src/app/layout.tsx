import type { Metadata } from "next";
import { Quicksand, Inter } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "🎀 Our Romantic Date Plan | Happy Anniversary! 🎀",
  description: "Một trang web hẹn hò ngọt ngào dành cho ngày kỷ niệm của chúng mình. Cùng nhau lên kế hoạch cho buổi hẹn hò hoàn hảo nhé! ❤️",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${quicksand.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gradient-to-br from-pink-50 via-white to-purple-50 text-gray-800 font-sans flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
