import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Manrope, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navigation from "@/components/Navigation";
import { AnimationProvider } from "@/components/providers/AnimationContext";
import GlobalParticles from "@/components/GlobalParticles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import ServicesTransition from "@/components/ServicesTransition";

// ... existing imports

import ChatWithUs from "@/components/floating/chat-with-us";

// ... existing imports

export const metadata: Metadata = {
  title: "Fiasco Replica",
  description: "A interaction scaffold.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${manrope.variable} ${inter.variable} antialiased relative`}
      >
        <GlobalParticles />
        <div className="relative z-[2]">
          <SmoothScroll>
            <AnimationProvider>
              <ServicesTransition />
              <Navigation />
              {children}
              <ChatWithUs />
            </AnimationProvider>
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
