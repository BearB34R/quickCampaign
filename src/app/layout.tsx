import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick Campaign - AI D&D Campaign Generator",
  description:
    "Generate custom D&D campaigns quickly and easily using AI. Create unique adventures based on your preferred theme, player count, and difficulty level.",
  keywords: [
    "D&D",
    "Dungeons & Dragons",
    "Campaign Generator",
    "AI",
    "RPG",
    "Game Master",
    "DM Tools",
  ],
  authors: [{ name: "Quick Campaign" }],
  creator: "Quick Campaign",
  openGraph: {
    title: "Quick Campaign - AI D&D Campaign Generator",
    description: "Generate custom D&D campaigns quickly and easily using AI",
    type: "website",
    siteName: "Quick Campaign",
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
