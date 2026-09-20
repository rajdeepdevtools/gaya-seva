'use client';

import React, { useState } from 'react';
import { Compass, Calendar, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function MyTripPage() {
  const [days, setDays] = useState(2);
  const [showItinerary, setShowItinerary] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-[#2A180B] text-white p-6 sm:p-8 rounded-3xl border border-[#F58220]/20 shadow-xl space-y-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2">
          <Compass className="w-8 h-8 text-[#F6C343]" /> अपनी Gaya यात्रा plan कीजिए।
        </h1>
        <p className="text-xs text-[#F8F6EF]/80">Customized 1-Day, 2-Day & 3-Day Teerth & Bodh Gaya Itinerary Planner.</p>
      </div>

      {/* Step Questions Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="font-serif font-bold text-base text-[#4A2E1A]">Trip Parameters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-semibold text-gray-700 block mb-1">Duration</label>
            <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full border border-gray-200 rounded-xl p-2.5">
              <option value={1}>1 Day Trip</option>
              <option value={2}>2 Days Trip (Recommended)</option>
              <option value={3}>3+ Days Teerth Yatra</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mb-1">Pinda Daan Required?</label>
            <select className="w-full border border-gray-200 rounded-xl p-2.5">
              <option>Yes (Vishnupad & Falgu)</option>
              <option>No (Sightseeing Only)</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mb-1">Bodh Gaya Visit?</label>
            <select className="w-full border border-gray-200 rounded-xl p-2.5">
              <option>Yes (Mahabodhi Temple)</option>
              <option>No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Suggested Itinerary Output */}
      {showItinerary && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-serif font-bold text-[#4A2E1A] border-b border-gray-100 pb-3">
            Your Suggested {days}-Day Gaya Trip Itinerary
          </h2>

          <div className="space-y-4 text-xs">
            <div className="bg-[#F8F6EF] p-4 rounded-2xl border border-gray-200 space-y-2">
              <h3 className="font-serif font-bold text-sm text-[#F58220]">Day 1: Arrival & Holy Pinda Daan Rites</h3>
              <p>📍 <strong>Morning:</strong> Station Arrival → Hotel Check-in → Vishnupad Temple</p>
              <p>🙏 <strong>Afternoon:</strong> Pinda Daan rites at Vishnupad & Falgu River Ghats</p>
              <p>🍛 <strong>Evening:</strong> Satvik Bhojan at Falgu Ghat → Akshayavat Tree</p>
            </div>

            {days >= 2 && (
              <div className="bg-[#F8F6EF] p-4 rounded-2xl border border-gray-200 space-y-2">
                <h3 className="font-serif font-bold text-sm text-[#F58220]">Day 2: Bodh Gaya & Local Sightseeing</h3>
                <p>🛺 <strong>Morning:</strong> Pick & Drop Cab to Bodh Gaya (12 km)</p>
                <p>🌸 <strong>Afternoon:</strong> Mahabodhi Temple & Bodhi Tree Meditation</p>
                <p>🚂 <strong>Evening:</strong> Local Souvenir Shopping → Departure Station</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
