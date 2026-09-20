'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, ShieldCheck, MapPin, Languages, Phone, MessageSquare } from 'lucide-react';
import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';

export default function PanditDirectoryPage() {
  const pandits = [
    {
      id: 'pnd_1',
      name: 'Pandit Rajesh Shastri',
      languages: ['Hindi', 'Sanskrit', 'Bengali'],
      services: ['Pind Daan', 'Tripindi Shradh', 'Veda Puja'],
      area: 'Vishnupad Temple Zone',
      rating: 4.9,
      experience: '22+ Years Experience',
    },
    {
      id: 'pnd_2',
      name: 'Pandit Suresh Tiwari',
      languages: ['Hindi', 'Sanskrit', 'Maithili'],
      services: ['Pind Daan', 'Kalsarp Dosh Puja'],
      area: 'Falgu Ghat Zone',
      rating: 4.8,
      experience: '18+ Years Experience',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-[#2A180B] text-white p-6 sm:p-8 rounded-3xl border border-[#F58220]/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2">
            <Flame className="w-8 h-8 text-[#F6C343]" /> अपनी धार्मिक सेवा की planning पहले करें।
          </h1>
          <p className="text-xs text-[#F8F6EF]/80 mt-1">Book verified Gaya Ji Teerth Pandits for Pinda Daan and Shradh Rites.</p>
        </div>
        <GayaSevaLogo size={64} className="shrink-0 drop-shadow-md" />
      </div>

      {/* Pandit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pandits.map((pnd) => (
          <div key={pnd.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2E1A]">{pnd.name}</h3>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded inline-flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3 h-3" /> GayaSeva Verified
                </span>
              </div>
              <span className="text-xs font-bold text-amber-600">⭐ {pnd.rating}</span>
            </div>

            <div className="text-xs text-gray-600 space-y-1.5 bg-[#F8F6EF] p-4 rounded-2xl">
              <p className="font-semibold text-[#4A2E1A]">Languages: {pnd.languages.join(' • ')}</p>
              <p>Services: {pnd.services.join(' • ')}</p>
              <p>📍 {pnd.area}</p>
              <p className="text-gray-500">{pnd.experience}</p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/pandit/${pnd.id}`}
                className="flex-1 py-2.5 bg-[#4A2E1A] text-white text-xs font-bold rounded-xl text-center hover:bg-[#3A2314]"
              >
                View Profile & Request
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
