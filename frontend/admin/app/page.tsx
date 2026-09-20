import React from 'react';
import Link from 'next/link';
import { Users, Car, Flame, Hotel, ShieldCheck, Mail, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
  const STATS = [
    { title: 'Total Users', count: '1,248', label: 'Registered Customers', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Verified Providers', count: '342', label: 'Pandits, Drivers, Hotels', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Active Taxis & Drivers', count: '120', label: 'Pick & Drop Fleet', icon: Car, color: 'text-[#1E88E5]', bg: 'bg-blue-50' },
    { title: 'Gaya Pandas & Pandits', count: '85', label: 'Vishnupad & Falgu', icon: Flame, color: 'text-[#F58220]', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-[#4A2E1A] text-white p-8 rounded-3xl shadow-xl border border-[#F58220]/30 flex justify-between items-center">
        <div>
          <span className="text-xs text-[#F6C343] font-semibold uppercase tracking-wider">SUPER ADMIN CONSOLE</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">GayaSeva Administration</h1>
          <p className="text-xs text-[#F8F6EF]/80 mt-1">Section-wise Admin RBAC, CRUD Permission Matrix & SMTP Email System</p>
        </div>
        <Link href="/admins" className="px-5 py-2.5 bg-[#F58220] text-white font-semibold text-xs rounded-xl shadow-md">
          Manage Admins
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">{stat.title}</span>
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}><Icon className="w-5 h-5" /></div>
              </div>
              <p className="font-serif text-3xl font-bold text-[#4A2E1A]">{stat.count}</p>
              <p className="text-[11px] text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
