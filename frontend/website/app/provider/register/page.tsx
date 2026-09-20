'use client';

import React, { useState } from 'react';
import { UserCheck, ShieldCheck, Car, Flame, Hotel, ShoppingBag, Map, Wrench, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { UserStore } from '@/lib/userStore';

export default function ProviderRegisterPage() {
  const [selectedRole, setSelectedRole] = useState<'DRIVER' | 'PANDIT' | 'HOTEL'>('DRIVER');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UserStore.addUser({
      name: name || 'New Partner',
      email: email || `${phone}@provider.gayaseva.org`,
      phone: phone || '+91 9876543210',
      role: selectedRole,
      status: 'PENDING',
      city: city || 'Gaya Ji',
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-[#2A180B] text-white p-6 sm:p-8 rounded-3xl border border-[#F58220]/20 shadow-xl space-y-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2">
          <UserCheck className="w-8 h-8 text-[#F6C343]" /> GayaSeva Partner Registration
        </h1>
        <p className="text-xs text-[#F8F6EF]/80">Register as a Verified Pandit, Driver, or Hotel operator to connect with Yatri pilgrims.</p>
      </div>

      {submitted ? (
        <div className="bg-white p-8 rounded-3xl border border-emerald-200 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-[#4A2E1A]">Registration Submitted Successfully!</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Your application is now <strong className="text-amber-600 font-bold">PENDING VERIFICATION</strong> in the GayaSeva Admin Portal.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link href="/auth/login" className="px-6 py-2.5 bg-[#F58220] text-white text-xs font-bold rounded-xl shadow-md">
              Go to Partner Login
            </Link>
            <Link href="/" className="px-6 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold rounded-xl">
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-serif font-bold text-base text-[#4A2E1A]">Select Your Service Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { role: 'DRIVER' as const, label: 'Taxi & Transport Driver', icon: Car },
              { role: 'PANDIT' as const, label: 'Purohit & Pandit Ji', icon: Flame },
              { role: 'HOTEL' as const, label: 'Hotel & Dharamshala', icon: Hotel },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => setSelectedRole(item.role)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col items-center justify-center gap-2 ${
                    selectedRole === item.role
                      ? 'bg-[#4A2E1A] text-white border-[#4A2E1A] shadow-md'
                      : 'bg-[#F8F6EF] text-[#4A2E1A] border-gray-200 hover:border-[#F58220]'
                  }`}
                >
                  <Icon className="w-6 h-6 text-[#F58220]" />
                  <span className="text-xs font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-gray-100 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Full Name / Business Title *</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#F58220]"
                  placeholder="e.g. Pandit Rakesh Shastri"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Mobile / WhatsApp Number *</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#F58220]"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#F58220]"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Operating Location / City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#F58220]"
                  placeholder="e.g. Vishnupad Temple Gate, Gaya"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#F58220] hover:bg-[#E07210] text-white font-bold text-xs rounded-xl shadow-md transition-all">
              Submit Partner Registration
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

