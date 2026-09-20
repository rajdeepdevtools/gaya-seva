'use client';

import React from 'react';
import { ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-xs sm:text-sm text-gray-700">
      <h1 className="text-3xl font-serif font-bold text-[#4A2E1A]">Teerth Yatri Safety Guidelines</h1>
      <p>Your safety and comfort in Gaya Ji are our highest priorities. Always verify provider identity badges before commencing rides or rituals.</p>
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
        <h2 className="font-serif font-bold text-base text-[#4A2E1A]">Safety Essentials</h2>
        <p>• Only engage with providers displaying the <strong>GayaSeva Verified</strong> badge.</p>
        <p>• Use 24/7 Emergency Help at <a href="/help" className="text-red-600 font-bold underline">GayaSeva Help Center</a> for medical or police assistance.</p>
      </div>
    </div>
  );
}
