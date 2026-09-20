'use client';

import React from 'react';
import { Activity, TrendingUp, Users, Car, Phone, MessageSquare, QrCode, Search, MapPin } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const metrics = [
    { label: 'Daily Unique Visitors', value: '42,850', change: '+18.4%', icon: Users },
    { label: 'Service Searches', value: '184,200', change: '+24.1%', icon: Search },
    { label: 'Pick & Drop Requests', value: '12,450', change: '+15.2%', icon: Car },
    { label: 'WhatsApp Direct Clicks', value: '28,900', change: '+32.0%', icon: MessageSquare },
    { label: 'Call Provider Clicks', value: '14,200', change: '+12.8%', icon: Phone },
    { label: 'Station & Poster QR Scans', value: '6,260', change: '+45.0%', icon: QrCode },
  ];

  const popularServices = [
    { name: 'Pick & Drop Railway Station Taxi', count: 8940, pct: '42%' },
    { name: 'Vishnupad Pinda Daan Pandit', count: 5420, pct: '26%' },
    { name: 'Bodh Gaya Teerth Guest House', count: 3890, pct: '18%' },
    { name: 'Tilkut & Puja Samagri Kit', count: 2980, pct: '14%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#4A2E1A]">Platform Conversion & Traffic Analytics</h1>
          <p className="text-xs text-gray-500 mt-1">Real-time metrics for searches, WhatsApp leads, call attempts, and QR attribution.</p>
        </div>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center text-gray-500 text-xs font-semibold">
                <span>{m.label}</span>
                <Icon className="w-4 h-4 text-[#F58220]" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-serif font-bold text-[#4A2E1A]">{m.value}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {m.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popular Services Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="font-serif font-bold text-lg text-[#4A2E1A] flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#F58220]" /> Most Requested Services
        </h2>
        <div className="space-y-3 text-xs">
          {popularServices.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between font-semibold text-[#4A2E1A]">
                <span>{item.name}</span>
                <span>{item.count.toLocaleString()} requests ({item.pct})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#F58220] h-2 rounded-full" style={{ width: item.pct }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
