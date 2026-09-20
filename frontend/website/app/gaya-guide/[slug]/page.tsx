'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, Navigation, Flame, Car, Hotel, Utensils, HelpCircle, ArrowRight } from 'lucide-react';

export default function PlaceDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug || 'vishnupad';
  const placeName = slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#2A180B] text-white p-6 sm:p-8 rounded-3xl border border-[#F58220]/20 shadow-xl space-y-4">
        <span className="px-3 py-1 bg-[#F58220] text-white text-[10px] font-extrabold uppercase rounded-full tracking-wider">
          Gaya Teerth Heritage Site
        </span>
        <h1 className="text-3xl font-serif font-bold text-white">{placeName}</h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#F8F6EF]/80">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#F6C343]" /> Chandrachaud Line, Gaya Ji</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#F6C343]" /> Open 5:00 AM - 9:00 PM</span>
        </div>
      </div>

      {/* Structured Content Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-lg font-serif font-bold text-[#4A2E1A] mb-2">About {placeName}</h2>
          <p>
            {placeName} is one of the most sacred pilgrimage destinations in Gaya Ji, Bihar. Thousands of teerth yatris visit daily to perform Pinda Daan rites for ancestral peace.
          </p>
        </div>

        <div className="bg-[#F8F6EF] p-5 rounded-2xl border border-[#4A2E1A]/10 space-y-2">
          <h3 className="font-serif font-bold text-sm text-[#4A2E1A] flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-[#F58220]" /> How to Reach
          </h3>
          <p>• <strong>From Gaya Railway Station:</strong> 4 km (15 mins via Pick & Drop Auto/Taxi)</p>
          <p>• <strong>From Bodh Gaya:</strong> 12 km via Main Teerth Bypass Road</p>
        </div>

        <div>
          <h3 className="font-serif font-bold text-sm text-[#4A2E1A] mb-2 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#F6C343]" /> Religious Significance
          </h3>
          <p>
            Mentioned in ancient Puranas, offering Pinda Daan at {placeName} grants eternal salvation to ancestors up to seven generations.
          </p>
        </div>

        {/* Nearby Verified Services */}
        <div className="border-t border-gray-100 pt-6 space-y-4">
          <h3 className="font-serif font-bold text-base text-[#4A2E1A]">Services Nearby {placeName}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link href="/pick-drop" className="p-3 bg-[#F8F6EF] hover:bg-amber-100 rounded-xl text-center border border-gray-200">
              <Car className="w-5 h-5 text-[#F58220] mx-auto mb-1" />
              <span className="text-xs font-bold text-[#4A2E1A] block">Taxi / Auto</span>
            </Link>
            <Link href="/pandit" className="p-3 bg-[#F8F6EF] hover:bg-amber-100 rounded-xl text-center border border-gray-200">
              <Flame className="w-5 h-5 text-[#F6C343] mx-auto mb-1" />
              <span className="text-xs font-bold text-[#4A2E1A] block">Book Pandit</span>
            </Link>
            <Link href="/food" className="p-3 bg-[#F8F6EF] hover:bg-amber-100 rounded-xl text-center border border-gray-200">
              <Utensils className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-xs font-bold text-[#4A2E1A] block">Satvik Food</span>
            </Link>
            <Link href="/stay" className="p-3 bg-[#F8F6EF] hover:bg-amber-100 rounded-xl text-center border border-gray-200">
              <Hotel className="w-5 h-5 text-[#1E88E5] mx-auto mb-1" />
              <span className="text-xs font-bold text-[#4A2E1A] block">Nearby Stay</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
