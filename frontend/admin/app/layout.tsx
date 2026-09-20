import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { 
  Users, 
  Car, 
  Flame, 
  Hotel, 
  ShieldCheck, 
  Mail, 
  Settings, 
  Activity, 
  LayoutDashboard,
  LogOut,
  Sparkles,
  MapPin,
  Sliders,
  Layers
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: 'GayaSeva Administrative Console — Super Admin & Section RBAC',
  description: 'Super Admin, Section-wise Admin, CRUD permissions matrix, and SMTP Email management console.',
  icons: {
    icon: '/icongaya.jpeg',
    shortcut: '/icongaya.jpeg',
    apple: '/icongaya.jpeg',
  },
};

const ADMIN_NAV = [
  { key: 'dashboard', name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { key: 'popup_ads', name: '📢 Popup Advertisements', href: '/popup-ads', icon: Sparkles },
  { key: 'slider_banners', name: '🖼️ Slider Banners', href: '/slider-banners', icon: Layers },
  { key: 'places', name: '📍 Sacred Places & Markets', href: '/places', icon: MapPin },
  { key: 'services_config', name: '🛠️ Service Catalog & Fares', href: '/services-config', icon: Sliders },
  { key: 'verification', name: '🔍 Provider Verification', href: '/verification', icon: ShieldCheck },
  { key: 'analytics', name: '📊 Analytics & Conversion', href: '/analytics', icon: Activity },
  { key: 'users', name: 'Users & Admins', href: '/users', icon: Users },
  { key: 'drivers', name: 'Drivers', href: '/drivers', icon: Car },
  { key: 'pandits', name: 'Pandits', href: '/pandits', icon: Flame },
  { key: 'hotels', name: 'Hotels', href: '/hotels', icon: Hotel },
  { key: 'email_smtp', name: 'Email & SMTP', href: '/email-templates', icon: Mail },
  { key: 'qr_analytics', name: 'QR Campaign Analytics', href: '/qr-sources', icon: Flame },
  { key: 'system_health', name: '100k System Health', href: '/system-health', icon: ShieldCheck },
  { key: 'audit_logs', name: 'Audit Logs', href: '/audit-logs', icon: Activity },
];

import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex bg-gray-100 text-[#4A2E1A] antialiased">
        <aside className="w-64 bg-[#2A180B] text-white flex flex-col justify-between hidden md:flex border-r border-[#F58220]/20">
          <div className="p-6 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <GayaSevaLogo size={42} showText={false} className="group-hover:scale-105 transition-transform" />
              <div>
                <span className="font-serif font-bold text-xl text-white group-hover:text-[#F6C343] transition-colors">
                  Gaya<span className="text-[#F58220]">Seva</span>
                </span>
                <span className="block text-[10px] text-[#F6C343] font-semibold uppercase tracking-wider">ADMIN PORTAL</span>
              </div>
            </Link>

            <div className="p-3 bg-[#3D2310] rounded-xl border border-[#F8F6EF]/10 text-xs space-y-1">
              <p className="font-semibold text-white">Super Admin User</p>
              <p className="text-[11px] text-[#F8F6EF]/70">superadmin@gayaseva.org</p>
            </div>

            <nav className="space-y-1 text-xs">
              {ADMIN_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-[#F8F6EF]/80 hover:text-white hover:bg-[#4A2E1A] transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#F58220]" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 sm:p-10">{children}</main>
      </body>
    </html>
  );
}
