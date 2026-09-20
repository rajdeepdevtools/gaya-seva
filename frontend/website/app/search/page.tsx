'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Car, Flame, Hotel, ShoppingBag, MapPin, HelpCircle } from 'lucide-react';

export default function UniversalSearchPage() {
  const [query, setQuery] = useState('Vishnupad');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Search Header */}
      <div className="bg-[#2A180B] text-white p-6 rounded-3xl border border-[#F58220]/20 shadow-xl space-y-4">
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">Gaya में क्या खोज रहे हैं?</h1>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Services, Pandits, Hotels, Places..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl text-xs sm:text-sm text-[#4A2E1A] focus:outline-none"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
        </div>
      </div>

      {/* Categorized Search Results */}
      <div className="space-y-6">
        {/* Services Category */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-serif font-bold text-base text-[#4A2E1A] flex items-center gap-2">
            <Car className="w-5 h-5 text-[#F58220]" /> Matching Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link href="/pick-drop" className="p-3 bg-[#F8F6EF] rounded-xl hover:border-[#F58220] border border-gray-200">
              <p className="font-bold text-[#4A2E1A]">🚕 Pick & Drop Taxi to Vishnupad</p>
              <p className="text-gray-500">Fast station pickup & drop</p>
            </Link>
            <Link href="/pandit" className="p-3 bg-[#F8F6EF] rounded-xl hover:border-[#F58220] border border-gray-200">
              <p className="font-bold text-[#4A2E1A]">🙏 Vishnupad Pinda Daan Pandit</p>
              <p className="text-gray-500">Verified Purohits for Shradh</p>
            </Link>
          </div>
        </div>

        {/* Places Category */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-serif font-bold text-base text-[#4A2E1A] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" /> Places & Teerth Sites
          </h2>
          <div className="space-y-2 text-xs">
            <Link href="/gaya-guide/vishnupad" className="p-3 bg-[#F8F6EF] rounded-xl block border border-gray-200 hover:border-[#F58220]">
              <p className="font-bold text-[#4A2E1A]">📍 Vishnupad Temple</p>
              <p className="text-gray-500">Holy Basalt Footprint Site • Open 5:00 AM - 9:00 PM</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
