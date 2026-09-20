'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';

export default function AdminBannersLandingPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3">
        <h1 className="text-2xl font-serif font-bold text-[#4A2E1A]">Promotional Banners & Advertisements Management</h1>
        <p className="text-xs text-gray-500">
          Select the specific advertisement format you would like to manage.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/popup-ads"
          className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:border-[#F58220] transition-all space-y-4 group block"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg text-[#4A2E1A] group-hover:text-[#F58220] transition-colors">
              📢 Website Opening Popup Ads
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Manage modal ads that trigger automatically when yatris open the GayaSeva website.
            </p>
          </div>
          <div className="text-xs font-bold text-[#F58220] flex items-center gap-1">
            Manage Popup Ads <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/slider-banners"
          className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:border-[#F58220] transition-all space-y-4 group block"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg text-[#4A2E1A] group-hover:text-[#F58220] transition-colors">
              🖼️ Homepage Rectangular Slider Banners
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Manage auto-sliding rectangular promo banners displayed below the Hero section on the homepage.
            </p>
          </div>
          <div className="text-xs font-bold text-[#F58220] flex items-center gap-1">
            Manage Slider Banners <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
