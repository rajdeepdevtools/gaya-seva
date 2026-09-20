'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, PhoneCall, ShieldAlert, Train, Search, HeartHandshake, UserCheck, Hospital } from 'lucide-react';
import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';

export default function HelpPage() {
  const helpCategories = [
    { title: '🚑 Medical Assistance', desc: 'Verified 24/7 Ambulance & Emergency Medical Support', phone: '108', icon: Hospital },
    { title: '🚓 Police / Emergency', desc: 'Gaya Ji City Police Control Room & Security', phone: '112', icon: ShieldAlert },
    { title: '🚂 Railway Information', desc: 'Gaya Junction Enquiry & Yatri Help Desk', phone: '139', icon: Train },
    { title: '🔎 Lost & Found', desc: 'Report or Search Lost Belongings & Relatives', href: '/help/lost-and-found', icon: Search },
    { title: '👴 Elderly Assistance', desc: 'Wheelchair & Special Yatri Care Support', phone: '+919876543200', icon: HeartHandshake },
    { title: '🏥 Nearby Hospital', desc: 'ANMMCH Government Medical College & Hospital Gaya', phone: '+916312220000', icon: Hospital },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Prominent Emergency Hero */}
      <div className="bg-[#4A2E1A] text-white p-6 sm:p-10 rounded-3xl border border-red-500/30 shadow-xl space-y-4 text-center">
        <div className="flex justify-center mb-1">
          <GayaSevaLogo size={80} className="drop-shadow-lg" />
        </div>
        <span className="px-3.5 py-1.5 bg-red-600 text-white rounded-full text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1">
          <ShieldAlert className="w-4 h-4 animate-pulse" /> 24/7 Emergency Assistance
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold">🆘 मुझे मदद चाहिए</h1>
        <p className="text-xs sm:text-sm text-[#F8F6EF]/80 max-w-xl mx-auto">
          Gaya Ji Teerth Yatri Emergency Numbers & Admin-Verified Helpline Services.
        </p>
      </div>

      {/* Emergency Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpCategories.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#4A2E1A]">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>

              {item.phone ? (
                <a
                  href={`tel:${item.phone}`}
                  className="py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" /> Call {item.phone}
                </a>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="py-2.5 bg-[#4A2E1A] hover:bg-[#3A2314] text-white font-bold text-xs rounded-xl text-center block"
                >
                  Open {item.title}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
