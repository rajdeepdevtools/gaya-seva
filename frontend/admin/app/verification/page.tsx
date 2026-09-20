'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle, XCircle, PauseCircle, FileText, Car, User } from 'lucide-react';

export default function AdminVerificationPage() {
  const [providers, setProviders] = useState([
    {
      id: 'prov_101',
      name: 'Ramesh Kumar (Taxi Service)',
      role: 'DRIVER',
      phone: '+91 98765 43210',
      status: 'PENDING',
      vehicle: 'Maruti DZire (BR-02-AB-1234)',
      documentType: 'Aadhaar Card & Commercial Driving License',
    },
    {
      id: 'prov_102',
      name: 'Pandit Rajesh Shastri',
      role: 'PANDIT',
      phone: '+91 98765 43211',
      status: 'PENDING',
      vehicle: 'N/A',
      documentType: 'Gaya Purohit Sabha Identity Certificate',
    },
  ]);

  const [notification, setNotification] = useState('');

  const handleAction = (id: string, newStatus: 'VERIFIED' | 'REJECTED' | 'SUSPENDED') => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    setNotification(`Provider ${id} status updated to ${newStatus}. Action recorded in audit logs.`);
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#4A2E1A]">Provider Verification Portal</h1>
          <p className="text-xs text-gray-500 mt-1">Review provider applications, submitted IDs, and vehicle papers.</p>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          {notification}
        </div>
      )}

      <div className="space-y-6">
        {providers.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2E1A] flex items-center gap-2">
                  {p.name}
                  <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-amber-100 text-amber-800">
                    STATUS: {p.status}
                  </span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Role: {p.role} • Contact: {p.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-[#F8F6EF] p-4 rounded-xl border border-gray-200">
              <div>
                <p className="font-bold text-[#4A2E1A] flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#F58220]" /> Submitted Documents
                </p>
                <p className="text-gray-600 mt-0.5">{p.documentType}</p>
              </div>
              <div>
                <p className="font-bold text-[#4A2E1A] flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-[#1E88E5]" /> Vehicle Details
                </p>
                <p className="text-gray-600 mt-0.5">{p.vehicle}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleAction(p.id, 'VERIFIED')}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckCircle className="w-4 h-4" /> 🟢 Verify & Award Badge
              </button>
              <button
                onClick={() => handleAction(p.id, 'REJECTED')}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <XCircle className="w-4 h-4" /> 🔴 Reject
              </button>
              <button
                onClick={() => handleAction(p.id, 'SUSPENDED')}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <PauseCircle className="w-4 h-4" /> ⏸️ Suspend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
