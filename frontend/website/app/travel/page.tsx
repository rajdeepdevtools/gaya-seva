'use client';

import React, { useState } from 'react';
import { Car, Navigation, ShieldCheck, PhoneCall, MessageSquare } from 'lucide-react';

const ROUTES = [
  { id: '1', name: 'Gaya Junction ➔ Vishnupad Temple', baseFare: 120 },
  { id: '2', name: 'Hotel ➔ Falgu River Ghats', baseFare: 100 },
  { id: '3', name: 'Gaya ➔ Bodh Gaya (Mahabodhi Temple)', baseFare: 350 },
];

export default function TravelPage() {
  const [selectedRoute, setSelectedRoute] = useState(ROUTES[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2 border-b pb-4">
        <h1 className="font-serif text-3xl font-bold text-[#4A2E1A]">Pick & Drop Taxi Service</h1>
        <p className="text-sm text-gray-600">Book verified Totos, Autos, Sedans & SUVs in Gaya Ji.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-card border space-y-4">
          <h3 className="font-serif font-bold text-lg">Select Destination Route</h3>
          <div className="space-y-2">
            {ROUTES.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRoute(r)}
                className={`w-full p-3 rounded-xl text-left border ${
                  selectedRoute.id === r.id ? 'border-[#1E88E5] bg-[#1E88E5]/5' : 'bg-gray-50'
                }`}
              >
                <p className="font-semibold text-xs text-[#4A2E1A]">{r.name}</p>
                <p className="text-xs text-[#1E88E5] font-bold mt-1">Est. Fare: ₹{r.baseFare}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#4A2E1A] text-white p-6 rounded-2xl space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#F6C343]">Fare Estimate</h3>
          <p className="text-3xl font-bold text-[#F58220]">₹{selectedRoute.baseFare}</p>
          <a
            href={`https://wa.me/919431200001?text=Namaste,%20I%20want%20to%20book%20taxi%20for%20${encodeURIComponent(selectedRoute.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-3 bg-emerald-600 text-white font-semibold rounded-xl text-center text-xs"
          >
            Connect via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
