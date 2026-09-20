'use client';

import React, { useState, useEffect } from 'react';
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
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { UserStore, UserAccount } from '@/lib/userStore';

export default function RoleProviderDashboardPage({ params }: { params: { role: string } }) {
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const role = params.role ? params.role.toLowerCase() : 'driver';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSession = localStorage.getItem('GAYASEVA_CURRENT_USER');
      if (storedSession) {
        try {
          const sessionObj: UserAccount = JSON.parse(storedSession);
          // Refresh from UserStore
          const freshUser = UserStore.getUsers().find((u) => u.id === sessionObj.id) || sessionObj;
          setCurrentUser(freshUser);
        } catch {
          // Fallback to first matching role in UserStore
          const fallback = UserStore.getUsers().find((u) => u.role.toLowerCase() === role);
          if (fallback) setCurrentUser(fallback);
        }
      } else {
        const fallback = UserStore.getUsers().find((u) => u.role.toLowerCase() === role);
        if (fallback) setCurrentUser(fallback);
      }
    }
  }, [role]);

  const isVerified = currentUser?.status === 'VERIFIED';
  const isPending = currentUser?.status === 'PENDING';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-sans text-slate-900">
      
      {/* Header Banner */}
      <div className="bg-[#2A180B] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-[#F58220]/30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F58220] to-[#E07210] flex items-center justify-center font-bold text-2xl text-white shadow-md">
            {currentUser?.name ? currentUser.name.substring(0, 1).toUpperCase() : role.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-white capitalize">
                {currentUser?.name || `${role} Partner Console`}
              </h1>
              
              {isVerified && (
                <span className="px-3 py-1 text-[11px] font-black uppercase rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED PARTNER
                </span>
              )}

              {isPending && (
                <span className="px-3 py-1 text-[11px] font-black uppercase rounded-full bg-amber-500 text-black flex items-center gap-1 animate-pulse shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-black" /> PENDING ADMIN APPROVAL
                </span>
              )}
            </div>

            <p className="text-xs text-[#F8F6EF]/80 mt-1 font-medium">
              Role: <strong className="text-amber-300 font-bold">{currentUser?.customRole || role.toUpperCase()}</strong> • Location: {currentUser?.city || 'Gaya Ji Central & Vishnupad Zone'}
            </p>
          </div>
        </div>

        {/* Availability Toggle */}
        <button
          onClick={() => setIsAvailable(!isAvailable)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs shadow-sm transition-all cursor-pointer ${
            isAvailable 
              ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          <Power className="w-4 h-4" />
          {isAvailable ? 'STATUS: ONLINE & AVAILABLE' : 'STATUS: OFFLINE'}
        </button>
      </div>

      {/* Verification Status Notice Banner */}
      {isPending && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 text-amber-950 space-y-2 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2 font-black text-sm text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>PARTNER APPLICATION PENDING VERIFICATION (सत्यापन प्रक्रिया जारी है)</span>
          </div>
          <p className="text-xs text-amber-900 font-bold leading-relaxed">
            Your profile & verification documents are currently undergoing administrative review by GayaSeva Admin. Once verified, your <strong className="underline text-emerald-800">Verified Tick Badge</strong> will automatically appear on all public service cards and search listings.
          </p>
        </div>
      )}

      {isVerified && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-emerald-950 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>PARTNER ACCOUNT FULLY VERIFIED (आपका खाता सत्यापित है)</span>
          </div>
          <p className="text-xs text-emerald-900 font-medium leading-relaxed">
            Congratulations! Your account is background-verified. Your service card in public listings displays the green Verified Tick Badge.
          </p>
        </div>
      )}

      {/* Role-Specific Metric & Action View */}
      {role === 'driver' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-[#F58220]" /> Active Ride Request
            </h2>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start text-xs">
                <div>
                  <p className="font-black text-slate-900">Pick & Drop: Station → Vishnupad</p>
                  <p className="text-slate-700 font-medium">Customer: Rahul Kumar • 2 Passengers</p>
                </div>
                <span className="font-black text-base text-[#F58220]">₹350</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 py-2.5 bg-[#2A180B] text-white font-black text-xs rounded-xl hover:bg-[#3A2314] transition-colors cursor-pointer">
                  ACCEPT RIDE
                </button>
                <button className="px-4 py-2.5 bg-slate-200 text-slate-800 font-black text-xs rounded-xl hover:bg-slate-300 transition-colors cursor-pointer">
                  REJECT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {role === 'pandit' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#F58220]" /> Pandit Ritual Bookings
          </h2>
          <p className="text-xs text-slate-700 font-medium">Manage Pinda Daan, Tripindi Shradh, and Teerth Puja requests.</p>
        </div>
      )}

      {role === 'hotel' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Hotel className="w-5 h-5 text-blue-600" /> Hotel & Guest House Management
          </h2>
          <p className="text-xs text-slate-700 font-medium">Manage room capacity, parking, and teerth yatri room bookings.</p>
        </div>
      )}
    </div>
  );
}

