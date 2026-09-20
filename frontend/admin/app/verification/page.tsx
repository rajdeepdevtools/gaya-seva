'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  PauseCircle, 
  FileText, 
  Car, 
  User, 
  MapPin, 
  Flame, 
  Hotel, 
  ShoppingBag, 
  Compass, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';
import { UserStore, UserAccount } from '@/lib/userStore';

export default function AdminVerificationPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'SUSPENDED'>('ALL');
  const [notification, setNotification] = useState('');

  const reloadUsers = async () => {
    const latest = await UserStore.fetchUsersFromApi();
    setUsers(latest);
  };

  useEffect(() => {
    reloadUsers();
    window.addEventListener('storage', reloadUsers);
    return () => window.removeEventListener('storage', reloadUsers);
  }, []);

  // Filter out non-provider pilgrims to focus on service providers
  const providers = users.filter((u) => u.role !== 'PILGRIM');

  const filteredProviders = providers.filter((p) => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'PENDING') return p.status === 'PENDING';
    if (filterStatus === 'VERIFIED') return p.status === 'VERIFIED';
    if (filterStatus === 'SUSPENDED') return p.status === 'SUSPENDED' || (p.status as string) === 'REJECTED';
    return true;
  });

  const handleAction = (id: string, name: string, newStatus: 'VERIFIED' | 'REJECTED' | 'SUSPENDED') => {
    const updated = UserStore.updateUser(id, { status: newStatus as any });
    if (updated) {
      reloadUsers();
      if (newStatus === 'VERIFIED') {
        setNotification(`✅ ${name} has been APPROVED! Verified Tick Badge is now active on public service lists.`);
      } else if (newStatus === 'REJECTED') {
        setNotification(`🔴 ${name} application was REJECTED.`);
      } else {
        setNotification(`⏸️ ${name} account has been SUSPENDED.`);
      }
      setTimeout(() => setNotification(''), 5000);
    }
  };

  const pendingCount = providers.filter((p) => p.status === 'PENDING').length;
  const verifiedCount = providers.filter((p) => p.status === 'VERIFIED').length;
  const suspendedCount = providers.filter((p) => p.status === 'SUSPENDED' || (p.status as string) === 'REJECTED').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2E1A] flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-[#F58220]" />
            Provider Verification Portal
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review partner applications, verify submitted Aadhaar/PAN IDs, and approve verified tick badges.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200">
          <Clock className="w-4 h-4 text-[#F58220]" />
          <span className="text-xs font-bold text-amber-900">
            {pendingCount} Pending Applications
          </span>
        </div>
      </div>

      {/* Action Notification Feedback */}
      {notification && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-900 rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'ALL', label: `All Partners (${providers.length})` },
          { key: 'PENDING', label: `⏳ Pending Review (${pendingCount})` },
          { key: 'VERIFIED', label: `🟢 Verified (${verifiedCount})` },
          { key: 'SUSPENDED', label: `🔴 Rejected / Suspended (${suspendedCount})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
              filterStatus === tab.key
                ? 'bg-[#2A180B] text-[#F6C343] border-[#2A180B] shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#F58220]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Provider List Feed */}
      {filteredProviders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <AlertCircle className="w-10 h-10 text-gray-400 mx-auto" />
          <h3 className="font-bold text-lg text-gray-800">No Providers Found</h3>
          <p className="text-xs text-gray-500">No partner accounts currently match this filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProviders.map((p) => {
            const isPending = p.status === 'PENDING';
            const isVerified = p.status === 'VERIFIED';
            const isSuspended = p.status === 'SUSPENDED' || (p.status as string) === 'REJECTED';

            return (
              <div 
                key={p.id} 
                className={`bg-white p-6 sm:p-8 rounded-3xl border-2 shadow-sm space-y-6 transition-all ${
                  isPending ? 'border-amber-300 ring-2 ring-amber-400/20' : isVerified ? 'border-emerald-200' : 'border-red-200'
                }`}
              >
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    {/* Profile Picture */}
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 overflow-hidden shrink-0 flex items-center justify-center font-bold text-amber-900 text-xl shadow-xs">
                      {p.avatarUrl || p.profilePicUrl ? (
                        <img src={p.avatarUrl || p.profilePicUrl} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        p.name.substring(0, 2).toUpperCase()
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-bold text-xl text-[#2A180B]">{p.name}</h3>
                        
                        {isVerified && (
                          <span className="px-3 py-1 text-[11px] font-extrabold rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            VERIFIED PARTNER
                          </span>
                        )}

                        {isPending && (
                          <span className="px-3 py-1 text-[11px] font-extrabold rounded-full bg-amber-100 text-amber-950 border border-amber-300 flex items-center gap-1 animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            PENDING ADMIN APPROVAL
                          </span>
                        )}

                        {isSuspended && (
                          <span className="px-3 py-1 text-[11px] font-extrabold rounded-full bg-red-100 text-red-900 border border-red-300 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                            REJECTED / SUSPENDED
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-600 font-medium">
                        Role: <strong className="text-gray-900 font-bold">{p.customRole || p.role}</strong> • Applied: {new Date(p.createdAt).toLocaleDateString()}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
                        <span className="flex items-center gap-1 font-bold text-gray-800">
                          <Phone className="w-3.5 h-3.5 text-[#F58220]" /> {p.phone}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-gray-400" /> {p.email}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-gray-600">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {p.city || 'Gaya Ji'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                    ID: {p.id}
                  </span>
                </div>

                {/* Details & Documents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-[#F8F6EF] p-4 sm:p-5 rounded-2xl border border-gray-200">
                  <div className="space-y-1.5">
                    <p className="font-bold text-[#4A2E1A] flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#F58220]" /> Verification Document
                    </p>
                    {p.documentUrl ? (
                      <a 
                        href={p.documentUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-emerald-800 font-bold rounded-xl border border-emerald-200 hover:bg-emerald-50 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span>View Uploaded Govt Document</span>
                        <ExternalLink className="w-3 h-3 text-emerald-600" />
                      </a>
                    ) : (
                      <p className="text-gray-500 italic">No custom document URL uploaded during basic registration.</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-bold text-[#4A2E1A] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600" /> Shop / Office Location
                    </p>
                    {p.googleMapsUrl ? (
                      <a 
                        href={p.googleMapsUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-blue-800 font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors"
                      >
                        <span>Google Maps Share Link</span>
                        <ExternalLink className="w-3 h-3 text-blue-600" />
                      </a>
                    ) : (
                      <p className="text-gray-500 font-medium">
                        {p.lat && p.lng ? `GPS: ${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}` : 'Standard Gaya Ji Location'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Admin Verification Actions Bar */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => handleAction(p.id, p.name, 'VERIFIED')}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                      isVerified
                        ? 'bg-emerald-700 text-white cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" /> 
                    <span>{isVerified ? '✓ Already Approved & Verified' : '🟢 Verify & Approve Badge'}</span>
                  </button>

                  <button
                    onClick={() => handleAction(p.id, p.name, 'REJECTED')}
                    className="py-3 px-5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" /> 
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => handleAction(p.id, p.name, 'SUSPENDED')}
                    className="py-3 px-5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <PauseCircle className="w-4 h-4" /> 
                    <span>Suspend</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

