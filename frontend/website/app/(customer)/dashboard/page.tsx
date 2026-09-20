'use client';

import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Bell, 
  Star, 
  User, 
  Navigation,
  ShieldCheck,
  Phone,
  MessageSquare
} from 'lucide-react';

export default function CustomerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'ACTIVE_RIDE' | 'REQUESTS' | 'BOOKINGS' | 'HISTORY'>('ACTIVE_RIDE');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Customer Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#4A2E1A]/10 shadow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F58220] flex items-center justify-center text-white font-serif font-bold text-2xl shadow-sm">
            R
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#4A2E1A]">Welcome back, Rahul Kumar</h1>
            <p className="text-xs text-[#4A2E1A]/70 flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified GayaSeva Customer • +91 98765 43210
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#F8F6EF] p-1.5 rounded-2xl text-xs font-semibold overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setActiveTab('ACTIVE_RIDE')}
            className={`px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ACTIVE_RIDE' ? 'bg-[#4A2E1A] text-white shadow-sm' : 'text-[#4A2E1A]/70 hover:text-[#4A2E1A]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-[#F58220]" />
            Active Ride Tracking
          </button>
          <button
            onClick={() => setActiveTab('REQUESTS')}
            className={`px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'REQUESTS' ? 'bg-[#4A2E1A] text-white shadow-sm' : 'text-[#4A2E1A]/70 hover:text-[#4A2E1A]'
            }`}
          >
            My Requests
          </button>
          <button
            onClick={() => setActiveTab('BOOKINGS')}
            className={`px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'BOOKINGS' ? 'bg-[#4A2E1A] text-white shadow-sm' : 'text-[#4A2E1A]/70 hover:text-[#4A2E1A]'
            }`}
          >
            Confirmed Bookings
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      {activeTab === 'ACTIVE_RIDE' && (
        <div className="space-y-6">
          {/* Active Live Ride Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#F58220]/30 shadow-card space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
                  RIDE IN PROGRESS
                </span>
                <h2 className="text-lg font-serif font-bold text-[#4A2E1A] mt-2">Pick & Drop Ride #RD-84920</h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">ETA</span>
                <span className="text-xl font-serif font-bold text-[#F58220]">8 Mins</span>
              </div>
            </div>

            {/* Driver & Vehicle Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#F8F6EF] p-4 rounded-2xl border border-[#4A2E1A]/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#4A2E1A] text-white font-serif font-bold flex items-center justify-center">
                  DK
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#4A2E1A] flex items-center gap-1.5">
                    Dinesh Kumar
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded font-semibold">GayaSeva Verified</span>
                  </h3>
                  <p className="text-xs text-gray-600">Maruti DZire • BR-02-AB-1234</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Driver
                </a>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Dinesh,%20I%20am%20waiting%20at%20Gaya%20Station"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] text-white text-xs font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Map Placeholder Container */}
            <div className="relative w-full h-72 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-center items-center text-center p-4">
              <Navigation className="w-10 h-10 text-[#F58220] animate-bounce mb-2" />
              <p className="text-sm font-bold text-[#4A2E1A]">Live GPS Location Active</p>
              <p className="text-xs text-gray-500 max-w-md mt-1">
                Realtime tracking channel <code className="bg-gray-200 px-1 rounded">ride:RD-84920</code> active via Leaflet maps.
              </p>

              {/* iOS / PWA Background Geolocation Limitation Notice */}
              <div className="absolute bottom-3 left-3 right-3 bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[11px] text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>iOS PWA Notice:</strong> Apple iOS Safari limits background location when screen locks. Keep screen active for continuous updates.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'REQUESTS' && (
        <div className="bg-white p-6 rounded-3xl border border-[#4A2E1A]/10 shadow-card">
          <h2 className="text-lg font-serif font-bold text-[#4A2E1A] mb-4">My Service Requests</h2>
          <div className="space-y-3">
            <div className="p-4 bg-[#F8F6EF] rounded-2xl flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-[#4A2E1A]">Pandit Booking for Pinda Daan Rites</p>
                <p className="text-gray-500">Vishnupad Temple • Tomorrow 8:00 AM</p>
              </div>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded-full text-[10px]">SEARCHING</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
