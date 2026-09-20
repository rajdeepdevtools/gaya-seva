'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';

export function Navbar() {
  const { t, language } = useLanguage();
  const { locationName, requestLocation } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const isHindi = language === 'hi';

  return (
    <div className="w-full sticky top-0 z-50 shadow-md bg-white">
      {/* 1. Top Announcement & GPS Location Bar (Full Width) */}
      <div className="w-full bg-gradient-to-r from-[#2A180B] via-[#4A2E1A] to-[#3D2310] text-xs py-2 px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-[#F6C343] font-medium tracking-wide flex items-center justify-between border-b border-[#F58220]/20">
        <div className="flex items-center gap-2 truncate max-w-[70%] sm:max-w-none">
          <span className="flex items-center gap-1.5 truncate">
            <Megaphone className="w-3.5 h-3.5 text-[#F58220] animate-pulse shrink-0" />
            <span className="truncate">{t('topBarWelcome')}</span>
          </span>
          <span className="hidden md:inline text-amber-500/40">|</span>
          <button 
            onClick={requestLocation}
            className="hidden md:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-700/50 text-[11px] transition-all shrink-0"
            title={isHindi ? 'लाइव जीपीएस लोकेशन अपडेट करें' : 'Update Live GPS Location'}
          >
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate max-w-[160px] lg:max-w-[220px]">{locationName}</span>
          </button>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
          <LanguageSelector variant="topbar" />
        </div>
      </div>

      {/* 2. Main Navigation Bar (Full Width & Fluid Adjustable) */}
      <nav className="relative w-full h-[72px] flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-3 bg-white text-gray-900 transition-all border-b border-gray-100">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <GayaSevaLogo size={44} showText={true} textColor="text-gray-900" subtextColor="text-[#F58220]" />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-5 lg:space-x-8 xl:space-x-10 font-medium text-sm text-gray-700">
          <li>
            <Link href="/" className="hover:text-[#F58220] transition-colors py-2 block font-semibold">
              {t('navHome')}
            </Link>
          </li>

          {/* Services Dropdown */}
          <li className="relative group">
            <button 
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 hover:text-[#F58220] transition-colors py-2"
            >
              <span>{t('navServices')}</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#F58220] transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white border border-gray-100 rounded-2xl shadow-xl w-64 p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2">
              <Link href="/pick-drop" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F58220] rounded-xl font-medium transition-colors">
                <Car className="w-4 h-4 text-[#F58220]" /> {t('navPickDrop')}
              </Link>
              <Link href="/pandit" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F58220] rounded-xl font-medium transition-colors">
                <Flame className="w-4 h-4 text-[#F6C343]" /> {t('navPindDaanPandits')}
              </Link>
              <Link href="/stay" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F58220] rounded-xl font-medium transition-colors">
                <Hotel className="w-4 h-4 text-[#1E88E5]" /> {t('navStaysHotels')}
              </Link>
              <Link href="/food" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F58220] rounded-xl font-medium transition-colors">
                <Utensils className="w-4 h-4 text-emerald-500" /> {t('navSatvikFood')}
              </Link>
              <Link href="/puja-material" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F58220] rounded-xl font-medium transition-colors">
                <ShoppingBag className="w-4 h-4 text-pink-500" /> {t('navPujaMaterial')}
              </Link>
              <Link href="/help/lost-and-found" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F58220] rounded-xl font-medium transition-colors">
                <Search className="w-4 h-4 text-purple-500" /> {isHindi ? '🔎 खोया और पाया पोर्टल' : '🔎 Lost & Found Portal'}
              </Link>
              <Link href="/help" className="flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl font-bold transition-colors">
                <LifeBuoy className="w-4 h-4 text-red-600" /> {isHindi ? '🆘 24/7 आपातकालीन सहायता' : '🆘 24/7 Emergency Help'}
              </Link>
            </div>
          </li>

          {/* Explore Gaya Dropdown */}
          <li className="relative group">
            <button 
              onClick={() => setGuideOpen(!guideOpen)}
              className="flex items-center gap-1 hover:text-[#F58220] transition-colors py-2"
            >
              <span>{t('navGayaGuide')}</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#F58220] transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white border border-gray-100 rounded-2xl shadow-xl w-60 p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2">
              <Link href="/gaya-guide" className="block px-3 py-2 text-xs font-bold text-gray-900 hover:bg-amber-50 rounded-xl">
                🗺️ {t('navAboutGayaJi')}
              </Link>
              <Link href="/gaya-guide/vishnupad" className="block px-3 py-2 text-xs text-gray-600 hover:bg-amber-50 hover:text-[#F58220] rounded-xl">
                📍 {t('navPitruPakshaGuide')}
              </Link>
              <Link href="/gaya-guide/falgu-river" className="block px-3 py-2 text-xs text-gray-600 hover:bg-amber-50 hover:text-[#F58220] rounded-xl">
                📍 {t('navSacredFalguRiver')}
              </Link>
              <Link href="/gaya-guide/bodh-gaya" className="block px-3 py-2 text-xs text-gray-600 hover:bg-amber-50 hover:text-[#F58220] rounded-xl">
                📍 Bodh Gaya Mahabodhi
              </Link>
            </div>
          </li>

          <li>
            <Link href="/ai" className="flex items-center gap-1 text-[#F58220] font-semibold hover:text-[#3D2310] transition-colors py-2">
              <Sparkles className="w-4 h-4" /> {t('navAiAssistant')}
            </Link>
          </li>

          <li>
            <Link href="/help" className="flex items-center gap-1 text-red-600 font-semibold hover:text-red-700 transition-colors py-2">
              <LifeBuoy className="w-4 h-4" /> {t('navHelp')}
            </Link>
          </li>
        </ul>
        
        {/* Right Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" className="px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-[#F58220] transition-colors">
            {t('navLogin')}
          </Link>
          <Link 
            href="/auth/register"
            className="bg-[#F58220] hover:bg-[#E07210] text-white font-bold text-xs px-6 py-2.5 rounded-full active:scale-95 transition-all shadow-md hover:shadow-lg inline-block"
          >
            {t('navGetStarted')}
          </Link>
        </div>

        {/* Mobile Header Icons: Location Pill + Hamburger Menu */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={requestLocation}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-semibold max-w-[130px] truncate"
          >
            <MapPin className="w-3 h-3 text-[#F58220] shrink-0" />
            <span className="truncate">{locationName}</span>
          </button>

          <Link href="/search" className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:text-[#F58220]">
            <Search className="w-4 h-4" />
          </Link>

          {/* Hamburger Menu Toggle Button */}
          <button 
            aria-label="menu-btn" 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="menu-btn p-2 rounded-xl text-gray-800 hover:bg-gray-100 active:scale-90 transition"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#F58220]" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 30 30" fill="currentColor">
                <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Backdrop & Adjustable Full Width Drawer */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Drawer Menu */}
            <div className="mobile-menu absolute top-[72px] left-0 right-0 w-full bg-white shadow-2xl border-b border-gray-200 p-5 md:hidden z-50 max-h-[85vh] overflow-y-auto space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Services</span>
                <LanguageSelector variant="topbar" />
              </div>

              <ul className="flex flex-col space-y-3 text-sm font-medium text-gray-800">
                <li>
                  <Link 
                    href="/" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/80 font-bold text-[#F58220]"
                  >
                    <span>{t('navHome')}</span>
                    <span className="text-xs font-normal">🏠</span>
                  </Link>
                </li>
                <li>
                  <Link href="/pick-drop" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50">
                    <Car className="w-4 h-4 text-[#F58220]" /> {t('navPickDrop')}
                  </Link>
                </li>
                <li>
                  <Link href="/pandit" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50">
                    <Flame className="w-4 h-4 text-[#F6C343]" /> {t('navPindDaanPandits')}
                  </Link>
                </li>
                <li>
                  <Link href="/stay" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50">
                    <Hotel className="w-4 h-4 text-[#1E88E5]" /> {t('navStaysHotels')}
                  </Link>
                </li>
                <li>
                  <Link href="/food" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50">
                    <Utensils className="w-4 h-4 text-emerald-500" /> {t('navSatvikFood')}
                  </Link>
                </li>
                <li>
                  <Link href="/gaya-guide" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50">
                    🗺️ {t('navGayaGuide')}
                  </Link>
                </li>
                <li>
                  <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 text-[#F58220] font-bold">
                    <Sparkles className="w-4 h-4" /> {t('navAiAssistant')}
                  </Link>
                </li>
                <li>
                  <Link href="/help" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 text-red-600 font-bold">
                    <LifeBuoy className="w-4 h-4" /> 🆘 {t('navHelp')}
                  </Link>
                </li>
              </ul>

              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                <Link 
                  href="/auth/register" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#F58220] text-white text-center font-bold py-3 text-xs rounded-full shadow hover:bg-[#E07210] active:scale-95 transition-all w-full block"
                >
                  {t('navGetStarted')}
                </Link>

                <Link 
                  href="/auth/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-gray-100 text-gray-800 text-center font-semibold py-2.5 text-xs rounded-full hover:bg-gray-200 transition-colors w-full block"
                >
                  {t('navLogin')}
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
