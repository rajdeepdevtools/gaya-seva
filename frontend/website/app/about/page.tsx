'use client';

import React from 'react';
import { ShieldCheck, Heart, MapPin, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="bg-[#2A180B] text-white p-8 rounded-3xl border border-[#F58220]/20 shadow-xl space-y-4 text-center">
        <span className="px-3.5 py-1.5 bg-[#F58220] text-white rounded-full text-xs font-extrabold uppercase tracking-wider">
          About GayaSeva Platform
        </span>
        <h1 className="text-3xl font-serif font-bold">Connecting Pilgrims with Verified Gaya Ji Services</h1>
        <p className="text-xs text-[#F8F6EF]/80 max-w-xl mx-auto">
          GayaSeva is the official, mobile-first local service network dedicated exclusively to Gaya Ji, Vishnupad, and Bodh Gaya.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <h2 className="text-xl font-serif font-bold text-[#4A2E1A]">Our Mission</h2>
        <p>
          Every year, millions of pilgrims arrive in Gaya Ji for Pinda Daan and ancestor salvation. GayaSeva ensures that every teerth yatri can find trustworthy, background-checked local drivers, licensed Pandits, clean guest houses, Satvik food, and 24/7 emergency assistance without middleman exploitation.
        </p>
      </div>
    </div>
  );
}
