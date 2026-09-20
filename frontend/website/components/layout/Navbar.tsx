'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Car, 
  Flame, 
  Hotel, 
  MapPin, 
  LifeBuoy, 
  Menu, 
  X, 
  Search,
  Sparkles,
  ChevronDown,
  ShoppingBag,
  Utensils,
  Megaphone,
  PhoneCall,
  User,
  ShieldCheck,
  Globe,
  Compass,
  ArrowUpRight,
  Luggage
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';

export function Navbar() {
  const { t, language } = useLanguage();
  const { locationName, requestLocation } = useLocation();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHindi = language === 'hi';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300">
      
      {/* 1. Top Announcement & GPS Bar (Compact Height) */}
      <div className="w-full bg-gradient-to-r from-[#1C0D02] via-[#2A180B] to-[#3D2310] text-[11px] py-1 px-4 sm:px-8 xl:px-12 text-[#F6C343] font-medium tracking-wide flex items-center justify-between border-b border-amber-500/20 shadow-xs">
        <div className="flex items-center gap-2 truncate max-w-[75%] sm:max-w-none">
          <span className="flex items-center gap-1.5 truncate">
            <Megaphone className="w-3 h-3 text-[#F58220] animate-bounce shrink-0" />
            <span className="truncate text-amber-100 font-semibold">{t('topBarWelcome')}</span>
          </span>
          <span className="hidden md:inline text-amber-500/40">|</span>
          <button 
            onClick={requestLocation}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-700/50 text-[10px] font-semibold transition-all hover:scale-105 shrink-0"
            title={isHindi ? 'लाइव जीपीएस लोकेशन अपडेट करें' : 'Update Live GPS Location'}
          >
            <MapPin className="w-3 h-3 text-[#F58220] shrink-0 animate-pulse" />
            <span className="truncate max-w-[160px] lg:max-w-[220px]">{locationName}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <LanguageSelector variant="topbar" />
        </div>
      </div>

      {/* 2. Main Floating Glassmorphic Navbar (Full Max-Width & Compact Height) */}
      <nav 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-1.5 border-b border-slate-200' 
            : 'bg-white py-2 border-b border-slate-100 shadow-xs'
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 flex items-center justify-between gap-4">
          
          {/* Logo Brand (Compact Height) */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 transition-transform duration-200 hover:scale-102">
            <GayaSevaLogo size={36} showText={true} />
          </Link>

          {/* Desktop Navigation Links — Compact & Fully Responsive */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Home */}
            <Link 
              href="/" 
              className={`px-2.5 py-1 rounded-lg text-xs xl:text-sm font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                pathname === '/' 
                  ? 'text-[#F58220] bg-orange-50/80 shadow-2xs' 
                  : 'text-slate-800 hover:text-[#F58220] hover:bg-slate-50'
              }`}
            >
              <span>{t('navHome')}</span>
            </Link>

            {/* Services (Pill Badge) */}
            <Link 
              href="/services" 
              className={`px-3 py-1 rounded-full text-xs xl:text-sm font-extrabold transition-all duration-200 flex items-center gap-1.5 border shadow-2xs hover:-translate-y-0.5 ${
                pathname.startsWith('/services')
                  ? 'bg-[#F58220] text-white border-[#F58220] shadow-md' 
                  : 'bg-amber-50 text-[#C45E00] border-amber-200 hover:bg-amber-100 hover:border-amber-300'
              }`}
            >
              <span className="text-xs">🧰</span>
              <span>{t('navServices')}</span>
            </Link>

            {/* Famous Places */}
            <Link 
              href="/gaya-guide" 
              className={`px-2.5 py-1 rounded-lg text-xs xl:text-sm font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                pathname === '/gaya-guide' 
                  ? 'text-[#F58220] bg-orange-50/80' 
                  : 'text-slate-800 hover:text-[#F58220] hover:bg-slate-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#F58220]" />
              <span>{isHindi ? 'प्रसिद्ध स्थल' : 'Famous Places'}</span>
            </Link>

            {/* Trip Plan */}
            <Link 
              href="/my-trip" 
              className={`px-2.5 py-1 rounded-lg text-xs xl:text-sm font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                pathname === '/my-trip' 
                  ? 'text-blue-600 bg-blue-50/80' 
                  : 'text-slate-800 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <Luggage className="w-3.5 h-3.5 text-blue-500" />
              <span>{isHindi ? 'यात्रा प्लान' : 'Trip Plan'}</span>
            </Link>

            {/* External Link: Ultra-Premium Arrangeman Pill */}
            <a 
              href="https://arrangeman.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-3.5 py-1 rounded-full bg-gradient-to-r from-[#1C0D02] via-[#2A180B] to-[#1C0D02] text-[#F6C343] hover:text-white transition-all duration-300 font-extrabold text-xs flex items-center gap-1.5 border border-amber-400/50 shadow-xs hover:shadow-md hover:border-amber-300 hover:-translate-y-0.5 ml-1"
              title="Visit Arrangeman.com for multi-city travel & local services"
            >
              <Globe className="w-3.5 h-3.5 text-[#F58220] shrink-0 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="tracking-wide">Arrangeman (More Services)</span>
              <ArrowUpRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* AI Assistant */}
            <Link 
              href="/ai" 
              className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-[#C45E00] border border-[#F58220]/30 hover:border-[#F58220] hover:bg-[#F58220] hover:text-white transition-all duration-200 font-extrabold text-xs flex items-center gap-1 shadow-2xs hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F58220] group-hover:text-white shrink-0" />
              <span>{t('navAiAssistant')}</span>
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link 
              href="/auth/login" 
              className="px-3.5 py-1.5 text-xs font-bold text-slate-800 border border-slate-300 hover:border-[#F58220] hover:text-[#F58220] rounded-full transition-all duration-200 hover:shadow-2xs"
            >
              {t('navLogin')}
            </Link>

            <Link 
              href="/auth/register"
              className="bg-gradient-to-r from-[#D96B00] via-[#E07210] to-[#F58220] hover:from-[#C45E00] hover:to-[#D96B00] text-white font-extrabold text-xs px-4.5 py-1.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 border border-orange-400/30"
            >
              <span>{t('navGetStarted')}</span>
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <Link 
              href="/services" 
              className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1"
            >
              <span>🧰</span>
              <span>Services</span>
            </Link>

            <button 
              aria-label="Toggle Navigation Menu" 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-slate-800 hover:bg-slate-100 active:scale-90 transition-all border border-slate-200"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#F58220]" />
              ) : (
                <Menu className="w-5 h-5 text-slate-800" />
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* 3. Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute top-full left-0 right-0 w-full bg-white shadow-2xl border-b border-slate-200 p-5 lg:hidden z-50 max-h-[85vh] overflow-y-auto space-y-4 animate-in fade-in slide-in-from-top-3">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Navigation Menu</span>
              <LanguageSelector variant="topbar" />
            </div>

            <ul className="flex flex-col space-y-2.5 text-sm font-bold text-slate-800">
              <li>
                <Link 
                  href="/" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center justify-between p-3 rounded-2xl bg-orange-50/80 text-[#F58220]"
                >
                  <span>{t('navHome')}</span>
                  <span>🏠</span>
                </Link>
              </li>

              <li>
                <Link 
                  href="/services" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 text-[#C45E00] border border-amber-200"
                >
                  <span className="flex items-center gap-2">
                    <span>🧰</span> {t('navServices')}
                  </span>
                  <span className="text-xs font-extrabold bg-[#F58220] text-white px-2 py-0.5 rounded-full">All Services</span>
                </Link>
              </li>

              <li>
                <Link 
                  href="/gaya-guide" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center gap-2.5 p-3 rounded-2xl hover:bg-slate-50 border border-slate-100"
                >
                  <Compass className="w-5 h-5 text-[#F58220]" />
                  <span>{isHindi ? 'प्रसिद्ध स्थल' : 'Famous Places'}</span>
                </Link>
              </li>

              <li>
                <Link 
                  href="/my-trip" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center gap-2.5 p-3 rounded-2xl hover:bg-slate-50 border border-slate-100"
                >
                  <Luggage className="w-5 h-5 text-blue-500" />
                  <span>{isHindi ? 'यात्रा प्लान' : 'Trip Plan'}</span>
                </Link>
              </li>

              <li>
                <a 
                  href="https://arrangeman.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[#1C0D02] to-[#2A180B] text-[#F6C343] border border-amber-500/40"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#F58220]" /> Arrangeman.com
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-amber-400" />
                </a>
              </li>

              <li>
                <Link 
                  href="/ai" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-orange-50/50 text-[#F58220]"
                >
                  <Sparkles className="w-5 h-5 text-[#F58220]" />
                  <span>{t('navAiAssistant')}</span>
                </Link>
              </li>

              <li>
                <Link 
                  href="/help" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-red-50 text-red-600"
                >
                  <LifeBuoy className="w-5 h-5 text-red-600" />
                  <span>{t('navHelp')}</span>
                </Link>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link 
                href="/auth/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-gradient-to-r from-[#D96B00] via-[#E07210] to-[#F58220] text-white text-center font-extrabold py-3.5 text-sm rounded-2xl shadow-md w-full block active:scale-95 transition-all"
              >
                {t('navGetStarted')}
              </Link>

              <Link 
                href="/auth/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-slate-100 text-slate-800 text-center font-bold py-3 text-sm rounded-2xl hover:bg-slate-200 transition-colors w-full block"
              >
                {t('navLogin')}
              </Link>
            </div>
          </div>
        </>
      )}

    </header>
  );
}
