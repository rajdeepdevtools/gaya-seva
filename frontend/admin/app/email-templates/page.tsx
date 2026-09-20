'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Settings } from 'lucide-react';

export default function EmailTemplatesPage() {
  const [activeTab, setActiveTab] = useState<'TEMPLATES' | 'LOGS'>('TEMPLATES');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <span className="text-xs font-semibold text-[#1E88E5] uppercase">SERVER SMTP EMAIL SYSTEM</span>
          <h1 className="font-serif text-3xl font-bold text-[#4A2E1A] mt-1">Email Templates & Delivery Logs</h1>
        </div>

        <div className="flex bg-white p-1 rounded-xl border">
          <button onClick={() => setActiveTab('TEMPLATES')} className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeTab === 'TEMPLATES' ? 'bg-[#4A2E1A] text-white' : 'text-gray-600'}`}>
            Templates
          </button>
          <button onClick={() => setActiveTab('LOGS')} className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeTab === 'LOGS' ? 'bg-[#4A2E1A] text-white' : 'text-gray-600'}`}>
            Delivery Logs
          </button>
        </div>
      </div>

      {activeTab === 'TEMPLATES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-card border space-y-3">
            <span className="text-[10px] bg-blue-100 text-blue-800 font-mono px-2 py-0.5 rounded">welcome_user</span>
            <h3 className="font-serif font-bold text-base text-[#4A2E1A]">Welcome New User</h3>
            <p className="text-xs text-gray-600">Subject: Welcome to GayaSeva — Gaya Ji Local Services</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-card border space-y-3">
            <span className="text-[10px] bg-blue-100 text-blue-800 font-mono px-2 py-0.5 rounded">provider_approved</span>
            <h3 className="font-serif font-bold text-base text-[#4A2E1A]">Provider Verification Approved</h3>
            <p className="text-xs text-gray-600">Subject: Congratulations! Your GayaSeva Provider Profile is Verified</p>
          </div>
        </div>
      )}

      {activeTab === 'LOGS' && (
        <div className="bg-white rounded-3xl shadow-card border overflow-hidden">
          <table className="w-full text-left text-xs text-[#4A2E1A]">
            <thead className="bg-[#2A180B] text-white uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4">Event Key</th>
                <th className="px-6 py-4">Recipient</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Sent Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-xs">welcome_user</td>
                <td className="px-6 py-4 font-mono text-xs">devotee108@gmail.com</td>
                <td className="px-6 py-4"><span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">SENT</span></td>
                <td className="px-6 py-4 text-right text-gray-500">Today, 21:42</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
