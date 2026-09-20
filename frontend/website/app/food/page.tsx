'use client';

import React from 'react';
import { Utensils, Phone, MessageSquare, MapPin, ShieldCheck } from 'lucide-react';

export default function FoodPage() {
  const restaurants = [
    { id: '1', name: 'Shree Ram Satvik Bhojanalaya', type: '🥗 Satvik Pure Veg', area: 'Vishnupad Road', rating: 4.8, phone: '+919876543230' },
    { id: '2', name: 'Gaya Ji Elderly Friendly Meals', type: '👴 Elderly Friendly Thali', area: 'Station Road', rating: 4.9, phone: '+919876543231' },
    { id: '3', name: 'Teerth Yatri Annapurna', type: '🍚 Simple Pure Veg', area: 'Falgu Ghat Area', rating: 4.7, phone: '+919876543232' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-[#2A180B] text-white p-6 sm:p-8 rounded-3xl border border-[#F58220]/20 shadow-xl space-y-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2">
          <Utensils className="w-8 h-8 text-[#F6C343]" /> Gaya mein khaana kahan milega?
        </h1>
        <p className="text-xs text-[#F8F6EF]/80">Verified Satvik, Pure Veg & Elderly-Friendly Food Providers in Gaya Ji.</p>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {restaurants.map((res) => (
          <div key={res.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif font-bold text-base text-[#4A2E1A]">{res.name}</h3>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded inline-flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3 h-3" /> GayaSeva Verified
                </span>
              </div>
              <span className="text-xs font-bold text-amber-600">⭐ {res.rating}</span>
            </div>

            <div className="text-xs text-gray-600 space-y-1 bg-[#F8F6EF] p-3 rounded-xl">
              <p>🍽️ {res.type}</p>
              <p>📍 {res.area}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={`tel:${res.phone}`}
                className="flex-1 py-2 bg-[#4A2E1A] text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <a
                href={`https://wa.me/${res.phone.replace('+', '')}?text=Food%20Inquiry`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-[#25D366] text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
