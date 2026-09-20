'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserCheck, ShieldCheck, ArrowRight, User, Phone, Mail, MapPin, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';
import { UserStore, UserAccount } from '@/lib/userStore';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'PILGRIM' | 'PANDIT' | 'DRIVER' | 'HOTEL'>('PILGRIM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('कृपया नाम दर्ज करें / Please enter your name');
      return;
    }
    if (!phone.trim()) {
      setError('कृपया मोबाइल नंबर दर्ज करें / Please enter phone number');
      return;
    }
    if (!password || password.length < 4) {
      setError('पासवर्ड कम से कम 4 अक्षरों का होना चाहिए / Password must be at least 4 characters');
      return;
    }

    const existingUser = UserStore.findUserByIdentifier(phone);
    if (existingUser) {
      setError('यह मोबाइल नंबर पहले से पंजीकृत है / Phone number already registered');
      return;
    }

    const newUser = UserStore.addUser({
      name,
      email: email || `${phone.replace(/\s+/g, '')}@gayaseva.org`,
      phone,
      role,
      status: role === 'PILGRIM' ? 'VERIFIED' : 'PENDING',
      city: city || 'Gaya Ji',
    });

    localStorage.setItem('GAYASEVA_CURRENT_USER', JSON.stringify(newUser));
    setSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-1">
            <GayaSevaLogo size={72} showText={false} className="drop-shadow-md" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#4A2E1A]">Join GayaSeva</h1>
          <p className="text-xs text-gray-500">
            Create an account for Gaya Ji Teerth Yatra or Service Partner listing.
          </p>
        </div>

        {/* Account Role Selection */}
        <div className="space-y-2 text-xs">
          <label className="font-bold text-[#4A2E1A] block">खाता प्रकार / Account Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('PILGRIM')}
              className={`p-3 rounded-2xl border text-center font-bold transition-all text-xs flex flex-col items-center gap-1 ${
                role === 'PILGRIM'
                  ? 'bg-[#2A180B] text-[#F6C343] border-[#2A180B] shadow-sm'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span>🙏 Teerth Yatri</span>
              <span className="text-[10px] opacity-75 font-normal">Pilgrim / Traveler</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('PANDIT')}
              className={`p-3 rounded-2xl border text-center font-bold transition-all text-xs flex flex-col items-center gap-1 ${
                role === 'PANDIT'
                  ? 'bg-[#2A180B] text-[#F6C343] border-[#2A180B] shadow-sm'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span>🪔 Teerth Pandit</span>
              <span className="text-[10px] opacity-75 font-normal">Pind Daan Priest</span>
            </button>
          </div>
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
            <span>खाता सफलता पूर्वक बनाया गया! Redirecting to homepage...</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sunita Banerjee"
                className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F58220]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Mobile Phone Number *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F58220]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Email Address (Optional)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yatri@example.com"
                className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F58220]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">City / Home Location</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Kolkata / Gaya Ji"
                className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F58220]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Create Password *</label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
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
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center border-t border-gray-100 pt-4 text-xs text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-bold text-[#F58220] hover:underline">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}
