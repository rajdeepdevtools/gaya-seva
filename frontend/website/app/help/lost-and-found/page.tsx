'use client';

import React, { useState } from 'react';
import { Search, PlusCircle, CheckCircle2, PhoneCall } from 'lucide-react';

export default function LostAndFoundPage() {
  const [items, setItems] = useState([
    {
      id: '1',
      type: 'LOST',
      title: 'Black Wallet with Aadhaar Card',
      category: 'Document',
      description: 'Lost near Falgu River Ghat during morning Tarpan.',
      location: 'Falgu River Ghat 3',
      reporterName: 'Suresh Kumar',
      reporterPhone: '9431200030',
    },
    {
      id: '2',
      type: 'FOUND',
      title: 'Samsung Phone Found',
      category: 'Electronics',
      description: 'Found near Vishnupad temple gate.',
      location: 'Vishnupad Gate',
      reporterName: 'Volunteer Desk',
      reporterPhone: '9431200031',
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b pb-4 space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[#4A2E1A]">Lost & Found Portal</h1>
        <p className="text-sm text-gray-600">Report lost belongings, documents, or missing persons during pilgrimage in Gaya Ji.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-card border space-y-3">
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${item.type === 'LOST' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}`}>
              {item.type}
            </span>
            <h3 className="font-serif font-bold text-base text-[#4A2E1A]">{item.title}</h3>
            <p className="text-xs text-gray-600">{item.description}</p>
            <p className="text-xs font-semibold text-gray-500">📍 {item.location} • Reporter: {item.reporterName}</p>
            <a href={`tel:${item.reporterPhone}`} className="block py-2 bg-[#4A2E1A] text-white text-center rounded-xl text-xs font-semibold">
              Contact Reporter
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
