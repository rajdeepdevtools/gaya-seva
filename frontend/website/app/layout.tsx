import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#4A2E1A',
};

export const metadata: Metadata = {
  title: 'GayaSeva — Gaya Ji Local Services, Pick & Drop, Pandits & Stay',
  description: 'Premium, trustworthy, mobile-first local service network for Gaya Ji, Bihar.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icongaya.jpeg',
    shortcut: '/icongaya.jpeg',
    apple: '/icongaya.jpeg',
  },
};

import { LanguageProvider } from '@/context/LanguageContext';
import { LocationProvider } from '@/context/LocationContext';
import { LocationBanner } from '@/components/layout/LocationBanner';
import { StickyActionButtons } from '@/components/layout/StickyActionButtons';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F8F6EF] text-[#4A2E1A] antialiased pb-16 md:pb-0">
        <LanguageProvider>
          <LocationProvider>
            <LocationBanner />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <MobileBottomNav />
            <StickyActionButtons />
          </LocationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
