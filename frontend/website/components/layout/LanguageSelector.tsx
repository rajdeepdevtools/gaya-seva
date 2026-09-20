'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../lib/translations';

export function LanguageSelector({ variant = 'navbar' }: { variant?: 'topbar' | 'navbar' | 'compact' }) {
  const { language, setLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'hi', label: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'en', label: 'English (Eng)', flag: '🇬🇧' },
  ];

  const current = languages.find((l) => l.code === language) || languages[0];

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1 bg-[#2A180B]/60 p-1 rounded-lg border border-[#F6C343]/30">
        <button
          onClick={() => setLanguage('hi')}
          className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
            language === 'hi' ? 'bg-[#F58220] text-white' : 'text-[#F8F6EF]/70 hover:text-white'
          }`}
        >
          हिंदी
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
            language === 'en' ? 'bg-[#F58220] text-white' : 'text-[#F8F6EF]/70 hover:text-white'
          }`}
        >
          Eng
        </button>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
          variant === 'topbar'
            ? 'bg-[#F6C343]/20 text-[#F6C343] hover:bg-[#F6C343]/30 border border-[#F6C343]/40'
            : 'bg-[#2A180B] text-[#F8F6EF] hover:bg-[#F58220]/20 border border-[#F58220]/30 hover:border-[#F58220]'
        }`}
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#F58220]" />
        <span>{current.flag}</span>
        <span className="font-medium">{language === 'hi' ? 'हिंदी' : 'English'}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-1 w-40 rounded-xl bg-[#4A2E1A] border border-[#F58220]/40 shadow-2xl z-50 overflow-hidden py-1">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#F6C343] tracking-wider border-b border-[#F58220]/20">
            भाषा चुनें / Choose Language
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setDropdownOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors text-left ${
                language === lang.code
                  ? 'bg-[#F58220] text-white'
                  : 'text-[#F8F6EF] hover:bg-[#2A180B] hover:text-[#F6C343]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
              {language === lang.code && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
