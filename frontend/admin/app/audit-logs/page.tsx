'use client';

import React from 'react';
import { Activity } from 'lucide-react';

export default function AuditLogsPage() {
  const LOGS = [
    {
      id: 'log_1',
      actor: 'Vikramaditya Sharma (Super Admin)',
      action: 'admin.create',
      section: 'users',
      ip: '157.38.190.42',
      time: '19 Sept 2026, 21:40:12',
    },
    {
      id: 'log_2',
      actor: 'Pandit Alok Nath (Admin)',
      action: 'provider.verify',
      section: 'verification',
      ip: '49.36.210.15',
      time: '19 Sept 2026, 20:15:45',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <span className="text-xs font-semibold text-[#F58220] uppercase">SECURITY AUDIT TRAIL</span>
        <h1 className="font-serif text-3xl font-bold text-[#4A2E1A] mt-1">System Activity Audit Logs</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-card border overflow-hidden">
        <table className="w-full text-left text-xs text-[#4A2E1A]">
          <thead className="bg-[#2A180B] text-white uppercase text-[10px]">
            <tr>
              <th className="px-6 py-4">Actor Profile</th>
              <th className="px-6 py-4">Action Key</th>
              <th className="px-6 py-4">Section</th>
              <th className="px-6 py-4">IP Address</th>
              <th className="px-6 py-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-xs">{log.actor}</td>
                <td className="px-6 py-4"><span className="text-[10px] bg-amber-50 text-amber-900 border px-2 py-0.5 rounded font-mono">{log.action}</span></td>
                <td className="px-6 py-4 font-mono text-xs">{log.section}</td>
                <td className="px-6 py-4 font-mono text-[11px] text-gray-500">{log.ip}</td>
                <td className="px-6 py-4 text-right text-gray-500 font-mono text-[11px]">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
