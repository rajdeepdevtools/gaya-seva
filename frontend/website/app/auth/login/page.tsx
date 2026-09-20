'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Phone, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle, CheckCircle2, User, Briefcase, Car, Flame, Hotel, Store } from 'lucide-react';
import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';
import { UserStore } from '@/lib/userStore';

export default function LoginPage() {
  const router = useRouter();
  const [loginCategory, setLoginCategory] = useState<'USER' | 'VENDOR'>('USER');
  const [vendorRole, setVendorRole] = useState<'PANDIT' | 'DRIVER' | 'HOTEL'>('PANDIT');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const activeRole = loginCategory === 'USER' ? 'PILGRIM' : vendorRole;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('कृपया मोबाइल नंबर या ईमेल दर्ज करें / Please enter Phone or Email');
      return;
    }

    if (!password) {
      setError('कृपया पासवर्ड या OTP दर्ज करें / Please enter Password or OTP');
      return;
    }

    const existingUser = UserStore.findUserByIdentifier(identifier);

    if (existingUser) {
      if (existingUser.status === 'SUSPENDED') {
        setError('आपका खाता निलंबित है। कृपया सहायता टीम से संपर्क करें / Account Suspended. Contact Helpline.');
        return;
      }
      localStorage.setItem('GAYASEVA_CURRENT_USER', JSON.stringify(existingUser));
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
      return;
    }

    // Auto-create demo account on login if identifier not found
    const createdUser = UserStore.addUser({
      name: identifier.includes('@') ? identifier.split('@')[0] : (loginCategory === 'USER' ? 'Gaya Yatri' : `${vendorRole} Partner`),
      email: identifier.includes('@') ? identifier : `${identifier}@gayaseva.org`,
      phone: identifier.includes('@') ? '+919876543200' : identifier,
      role: activeRole,
      status: loginCategory === 'USER' ? 'VERIFIED' : 'PENDING',
      city: 'Gaya Ji',
    });

    localStorage.setItem('GAYASEVA_CURRENT_USER', JSON.stringify(createdUser));
    setSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <GayaSevaLogo size={68} showText={false} className="drop-shadow-md" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#4A2E1A]">GayaSeva Portal</h1>
          <p className="text-xs text-gray-500">
            {loginCategory === 'USER'
              ? 'Log in to access your Teerth bookings, Pandit contacts & Yatri services.'
              : 'Log in to manage your Pandit bookings, Transport, or Dharamshala listings.'}
          </p>
        </div>

        {/* 2 Primary Login Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setLoginCategory('USER')}
            className={`py-3 px-3 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-2 ${
              loginCategory === 'USER'
                ? 'bg-[#2A180B] text-[#F6C343] shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            <User className="w-4 h-4 text-[#F58220]" />
            <span>User / Yatri Login</span>
          </button>
          <button
            type="button"
            onClick={() => setLoginCategory('VENDOR')}
            className={`py-3 px-3 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-2 ${
              loginCategory === 'VENDOR'
                ? 'bg-[#2A180B] text-[#F6C343] shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#F58220]" />
            <span>Vendor / Service Partner</span>
          </button>
        </div>

        {/* Vendor Sub-Role Selector Pills if Vendor Login is selected */}
        {loginCategory === 'VENDOR' && (
          <div className="space-y-1.5 text-xs animate-fade-in">
            <label className="font-semibold text-gray-600 block text-[11px]">Select Vendor Category:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setVendorRole('PANDIT')}
                className={`py-2 px-2 rounded-xl border font-bold text-[11px] flex items-center justify-center gap-1 transition-all ${
                  vendorRole === 'PANDIT'
                    ? 'bg-[#F58220] text-white border-[#F58220] shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Flame className="w-3.5 h-3.5" /> Pandit
              </button>
              <button
                type="button"
                onClick={() => setVendorRole('DRIVER')}
                className={`py-2 px-2 rounded-xl border font-bold text-[11px] flex items-center justify-center gap-1 transition-all ${
                  vendorRole === 'DRIVER'
                    ? 'bg-[#F58220] text-white border-[#F58220] shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Car className="w-3.5 h-3.5" /> Driver
              </button>
              <button
                type="button"
                onClick={() => setVendorRole('HOTEL')}
                className={`py-2 px-2 rounded-xl border font-bold text-[11px] flex items-center justify-center gap-1 transition-all ${
                  vendorRole === 'HOTEL'
                    ? 'bg-[#F58220] text-white border-[#F58220] shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Hotel className="w-3.5 h-3.5" /> Hotel
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>सफलतापूर्वक लॉगिन हुआ! Redirecting to home...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">
              {loginCategory === 'USER' ? 'Mobile Number or Email' : 'Vendor Mobile Number or Email'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={loginCategory === 'USER' ? '+91 98765 43210 or pilgrim@gmail.com' : '+91 98765 43210 or partner@gayaseva.org'}
                className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F58220]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Password or OTP</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F58220]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#F58220] hover:bg-[#E07210] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>{loginCategory === 'USER' ? 'Login as Yatri →' : 'Login as Vendor / Partner →'}</span>
          </button>
        </form>

        <div className="text-center border-t border-gray-100 pt-4 text-xs text-gray-600 space-y-2">
          <p>
            New User?{' '}
            <Link href="/auth/register" className="font-bold text-[#F58220] hover:underline">
              Create Yatri Account
            </Link>
          </p>
          <p>
            Service Provider / Vendor?{' '}
            <Link href="/provider/register" className="font-bold text-emerald-600 hover:underline">
              Register as Service Partner
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

