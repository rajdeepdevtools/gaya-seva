'use client';

import React, { useState } from 'react';
import { 
  Car, 
  Flame, 
  Hotel, 
  ShoppingBag, 
  Map, 
  CheckCircle, 
  Clock, 
  Star, 
  Power, 
  Navigation, 
  ShieldCheck,
  Phone,
  MessageSquare
} from 'lucide-react';

export default function RoleProviderDashboardPage({ params }: { params: { role: string } }) {
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const role = params.role ? params.role.toLowerCase() : 'driver';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#2A180B] text-white p-6 rounded-3xl shadow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F58220] flex items-center justify-center font-serif font-bold text-2xl text-white">
            {role.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif font-bold text-white capitalize">{role} Partner Console</h1>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-500 text-white flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> GayaSeva Verified
              </span>
            </div>
            <p className="text-xs text-[#F8F6EF]/70 mt-0.5">
              Service Area: Gaya Ji Central & Vishnupad Teerth Zone
            </p>
          </div>
        </div>

        {/* Availability Toggle */}
        <button
          onClick={() => setIsAvailable(!isAvailable)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs shadow-sm transition-all ${
            isAvailable 
              ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          <Power className="w-4 h-4" />
          {isAvailable ? 'STATUS: ONLINE & AVAILABLE' : 'STATUS: OFFLINE'}
        </button>
      </div>

      {/* Role-Specific Metric & Action View */}
      {role === 'driver' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-serif font-bold text-[#4A2E1A] flex items-center gap-2">
              <Car className="w-5 h-5 text-[#F58220]" /> Active Ride Request
            </h2>

            <div className="p-4 bg-[#F8F6EF] rounded-2xl border border-[#4A2E1A]/10 space-y-3">
              <div className="flex justify-between items-start text-xs">
                <div>
                  <p className="font-bold text-[#4A2E1A]">Pick & Drop: Station → Vishnupad</p>
                  <p className="text-gray-500">Customer: Rahul Kumar • 2 Passengers</p>
                </div>
                <span className="font-serif font-bold text-base text-[#F58220]">₹350</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 py-2.5 bg-[#4A2E1A] text-white font-bold text-xs rounded-xl hover:bg-[#3A2314] transition-colors">
                  ACCEPT RIDE
                </button>
                <button className="px-4 py-2.5 bg-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-300 transition-colors">
                  REJECT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {role === 'pandit' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#4A2E1A] flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#F58220]" /> Pandit Ritual Bookings
          </h2>
          <p className="text-xs text-gray-500">Manage Pinda Daan, Tripindi Shradh, and Teerth Puja requests.</p>
        </div>
      )}

      {role === 'hotel' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#4A2E1A] flex items-center gap-2">
            <Hotel className="w-5 h-5 text-[#1E88E5]" /> Hotel & Guest House Management
          </h2>
          <p className="text-xs text-gray-500">Manage room capacity, parking, and teerth yatri room bookings.</p>
        </div>
      )}
    </div>
  );
}
