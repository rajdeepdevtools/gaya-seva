'use client';

import React from 'react';
import { QrCode, BarChart3, TrendingUp, ExternalLink } from 'lucide-react';

export default function AdminQRSourcesPage() {
  const sources = [
    { key: 'station', name: 'Gaya Railway Station Exit', scans: 3890, conversion: '34.2%' },
    { key: 'hotel', name: 'Partner Hotel Reception Posters', scans: 1420, conversion: '42.8%' },
    { key: 'poster', name: 'Vishnupad City Banners', scans: 950, conversion: '21.5%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#4A2E1A]">QR Campaign Analytics</h1>
          <p className="text-xs text-gray-500 mt-1">
            Track customer acquisition sources from offline QR posters, hotel stands, and station flyers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sources.map((item) => (
          <div key={item.key} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center text-gray-500 text-xs font-semibold">
              <span className="uppercase tracking-wider">{item.key} Source</span>
              <QrCode className="w-4 h-4 text-[#F58220]" />
            </div>
            <h3 className="font-bold text-[#4A2E1A] text-sm">{item.name}</h3>
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-2xl font-serif font-bold text-[#4A2E1A]">{item.scans.toLocaleString()}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {item.conversion}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
