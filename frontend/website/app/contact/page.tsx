'use client';

import React from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="bg-[#2A180B] text-white p-8 rounded-3xl border border-[#F58220]/20 shadow-xl space-y-4 text-center">
        <h1 className="text-3xl font-serif font-bold">Contact GayaSeva Support</h1>
        <p className="text-xs text-[#F8F6EF]/80">24/7 Teerth Yatri Support & Local Admin Office.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-2">
          <Phone className="w-6 h-6 text-[#F58220] mx-auto" />
          <h3 className="font-bold text-[#4A2E1A]">Phone / WhatsApp Support</h3>
          <p className="text-gray-700 font-bold">+91 85444 91413</p>
          <p className="text-gray-500 text-[11px]">+91 92968 04705 • +91 73012 32069</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-2">
          <Mail className="w-6 h-6 text-[#1E88E5] mx-auto" />
          <h3 className="font-bold text-[#4A2E1A]">Official Email</h3>
          <p className="text-gray-700 font-bold">gayaseva84@gmail.com</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-2">
          <MapPin className="w-6 h-6 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-[#4A2E1A]">Office Address</h3>
          <p className="text-gray-600">Chandrachaud Line, Near Vishnupad Temple, Gaya Ji, Bihar - 823001</p>
        </div>
      </div>
    </div>
  );
}
