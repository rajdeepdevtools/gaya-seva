'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Phone, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';
import { UserStore, UserAccount } from '@/lib/userStore';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'PILGRIM' | 'PANDIT' | 'DRIVER' | 'HOTEL'>('PILGRIM');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
      }, 1200);
      return;
    }

    // Demo account creation on first login if not found
    const createdUser = UserStore.addUser({
      name: identifier.includes('@') ? identifier.split('@')[0] : 'Gaya Yatri',
      email: identifier.includes('@') ? identifier : `${identifier}@gayaseva.org`,
      phone: identifier.includes('@') ? '+919876543200' : identifier,
      role: role,
      status: 'VERIFIED',
      city: 'Gaya Ji',
    });

    localStorage.setItem('GAYASEVA_CURRENT_USER', JSON.stringify(createdUser));
    setSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-1">
            <GayaSevaLogo size={72} showText={false} className="drop-shadow-md" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#4A2E1A]">GayaSeva Login</h1>
          <p className="text-xs text-gray-500">
            Log in to access your Teerth bookings, Pandit contacts &amp; Yatri services.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-gray-100 rounded-2xl text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setRole('PILGRIM')}
            className={`py-2 rounded-xl transition-all ${
              role === 'PILGRIM' ? 'bg-[#2A180B] text-[#F6C343] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🙏 Yatri
          </button>
          <button
            type="button"
            onClick={() => setRole('PANDIT')}
            className={`py-2 rounded-xl transition-all ${
              role === 'PANDIT' ? 'bg-[#2A180B] text-[#F6C343] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🪔 Pandit
          </button>
          <button
            type="button"
            onClick={() => setRole('DRIVER')}
            className={`py-2 rounded-xl transition-all ${
              role === 'DRIVER' ? 'bg-[#2A180B] text-[#F6C343] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🚕 Driver
          </button>
          <button
            type="button"
            onClick={() => setRole('HOTEL')}
            className={`py-2 rounded-xl transition-all ${
              role === 'HOTEL' ? 'bg-[#2A180B] text-[#F6C343] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🏨 Hotel
          </button>
        </div>

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
            <span>सफलतापूर्वक लॉगिन हुआ! Redirecting to homepage...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Mobile Number or Email</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="+91 98765 43210 or pilgrim@gayaseva.org"
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
            <span>Login to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center border-t border-gray-100 pt-4 text-xs text-gray-600 space-y-2">
          <p>
            New to GayaSeva?{' '}
            <Link href="/auth/register" className="font-bold text-[#F58220] hover:underline">
              Create New Account
            </Link>
          </p>
          <p>
            Are you a Pandit or Driver?{' '}
            <Link href="/provider/register" className="font-bold text-emerald-600 hover:underline">
              Register as Service Partner
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
