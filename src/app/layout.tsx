import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChatForge — Hyper-Realistic Fake Chat Studio",
  description:
    "Create stunning, pixel-perfect fake conversations for storytelling, memes, UI mockups, and cinematic social media content. Support for WhatsApp, iMessage, Instagram, Telegram, Discord, and more.",
  keywords: [
    "fake chat generator",
    "chat mockup",
    "whatsapp generator",
    "imessage generator",
    "conversation maker",
    "chat screenshot",
    "social media content",
  ],
  openGraph: {
    title: "ChatForge — Hyper-Realistic Fake Chat Studio",
    description:
      "The world's most advanced fake chat conversation studio. Create pixel-perfect mockups for any messaging platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[family-name:var(--font-inter)] antialiased">
        <div className="animated-bg" />
        {children}
      </body>
    </html>
  );
}
