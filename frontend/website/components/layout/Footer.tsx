import React from 'react';
import Link from 'next/link';
import { Phone, ShieldCheck, Heart } from 'lucide-react';
import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';

export function Footer() {
  return (
    <footer className="bg-[#2A180B] text-[#F8F6EF] border-t border-[#F58220]/20">
      <div className="bg-[#4A2E1A] py-6 px-4 border-b border-[#F8F6EF]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#F58220]" />
            <div>
              <h4 className="font-semibold text-sm text-white">100% Verified Providers</h4>
              <p className="text-xs text-[#F8F6EF]/70">Strict background and document verification</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Phone className="w-6 h-6 text-[#1E88E5]" />
            <div>
              <h4 className="font-semibold text-sm text-white">Instant Call & WhatsApp</h4>
              <p className="text-xs text-[#F8F6EF]/70">Connect directly without mandatory app download</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Heart className="w-6 h-6 text-[#F6C343]" />
            <div>
              <h4 className="font-semibold text-sm text-white">Dedicated to Gaya Pilgrims</h4>
              <p className="text-xs text-[#F8F6EF]/70">Pinddaan, Pick & Drop, Stay & Emergency support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#F8F6EF]/80">
        <div>
          <div className="mb-3">
            <GayaSevaLogo size={52} showText={true} textColor="text-white" subtextColor="text-[#F6C343]" />
          </div>
          <p className="leading-relaxed">The official mobile-first local service marketplace for Gaya Ji, Bihar.</p>
        </div>

        <div>
          <h4 className="font-serif font-semibold text-base text-[#F6C343] mb-3">Services</h4>
          <ul className="space-y-1.5">
            <li><Link href="/travel" className="hover:text-[#F58220]">Pick & Drop Taxi</Link></li>
            <li><Link href="/religious" className="hover:text-[#F58220]">Pinddaan & Pandits</Link></li>
            <li><Link href="/stay" className="hover:text-[#F58220]">Hotels & Dharamshalas</Link></li>
            <li><Link href="/help" className="hover:text-[#F58220]">Emergency Helplines</Link></li>
            <li><Link href="/help/lost-and-found" className="hover:text-[#F58220]">Lost & Found Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-semibold text-base text-[#F6C343] mb-3">Gaya Guide</h4>
          <ul className="space-y-1.5">
            <li><Link href="/guide/vishnupad-temple" className="hover:text-[#F58220]">Vishnupad Temple</Link></li>
            <li><Link href="/guide/falgu-river" className="hover:text-[#F58220]">Falgu River</Link></li>
            <li><Link href="/guide/bodh-gaya" className="hover:text-[#F58220]">Bodh Gaya</Link></li>
          </ul>
        </div>
      </div>

      <div className="bg-[#1C1007] py-4 text-center text-xs text-[#F8F6EF]/60">
        <p>© 2026 GayaSeva Platform. All rights reserved. Gaya Ji, Bihar.</p>
      </div>
    </footer>
  );
}
