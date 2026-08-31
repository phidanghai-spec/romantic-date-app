import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloralBackground from "@/components/ui/FloralBackground";

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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://romantic-date-app.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Our Date Night 🌸 | Không Gian Hẹn Hò & Lên Lịch Cho Cặp Đôi",
    template: "%s | Our Date Night 💕",
  },
  description: "Website lên lịch hẹn hò riêng tư, vòng quay ẩm thực hôm nay ăn gì, thiệp VIP Date Pass và sổ kỷ niệm tình yêu dành riêng cho hai đứa mình.",
  keywords: [
    "hẹn hò",
    "kế hoạch hẹn hò",
    "cặp đôi",
    "date night",
    "hôm nay ăn gì",
    "vòng quay ẩm thực",
    "date pass",
    "kỷ niệm tình yêu",
    "our date night",
  ],
  authors: [{ name: "Our Date Night Team" }],
  creator: "Our Date Night",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    title: "Our Date Night 🌸 | Không Gian Hẹn Hò & Lên Lịch Cho Cặp Đôi",
    description: "Không gian hẹn hò ngọt ngào, vòng quay ẩm thực 5 quốc gia, thiệp mời VIP Date Pass và sổ kỷ niệm tình yêu dành riêng cho 2 người.",
    siteName: "Our Date Night",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Our Date Night Preview Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Date Night 🌸 | Không Gian Hẹn Hò & Lên Lịch Cho Cặp Đôi",
    description: "Không gian hẹn hò ngọt ngào, vòng quay ẩm thực 5 quốc gia, thiệp mời VIP Date Pass và sổ kỷ niệm tình yêu dành riêng cho 2 người.",
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Our Date Night',
    description: 'Private Dating & Romantic Activity Planner for Couples',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'All',
    url: siteUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'VND',
    },
  };

  return (
    <html lang="vi" className={`${serifFont.variable} ${sansFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#FAF6EE] text-[#2D1E2F] font-sans relative antialiased min-h-screen selection:bg-rose-200 selection:text-rose-900">
        <FloralBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
