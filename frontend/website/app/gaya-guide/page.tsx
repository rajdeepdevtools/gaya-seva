'use client';

import React from 'react';
import Link from 'next/link';
import { Map, ArrowRight } from 'lucide-react';
import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';

export default function GayaGuideDirectoryPage() {
  const places = [
    { slug: 'vishnupad', name: 'Vishnupad Temple', tag: 'Lord Vishnu Footprint', desc: 'Central holy site for Pinda Daan rites stamped in solid basalt rock.' },
    { slug: 'falgu-river', name: 'Falgu River', tag: 'Sacred Pinda Daan River', desc: 'Holy river flowing past Gaya Ji for ancestor oblations.' },
    { slug: 'akshayavat', name: 'Akshayavat Tree', tag: 'Immortal Banyan Tree', desc: 'Ancient sacred tree where final Pinda Daan oblations are completed.' },
    { slug: 'pretshila', name: 'Pretshila Hill', tag: 'Ancestor Salvation Shrine', desc: 'Sacred hill shrine dedicated to peace for departed ancestors.' },
    { slug: 'ramshila', name: 'Ramshila Hill', tag: 'Ancient Teerth Hill', desc: 'Holy hill where Lord Rama performed sacred oblations.' },
    { slug: 'sitakund', name: 'Sitakund', tag: 'Goddess Sita Shrine', desc: 'Sacred spot on Falgu bank associated with Goddess Sita.' },
    { slug: 'bodh-gaya', name: 'Bodh Gaya & Mahabodhi', tag: 'Buddha Enlightenment Site', desc: 'World heritage site where Lord Buddha attained enlightenment.' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-[#2A180B] text-white p-6 sm:p-8 rounded-3xl border border-[#F58220]/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2">
            <Map className="w-8 h-8 text-emerald-400" /> Gaya को सिर्फ देखिए नहीं… समझिए।
          </h1>
          <p className="text-xs text-[#F8F6EF]/80">Comprehensive Teerth Guide, Timings, How to Reach & Nearby Services.</p>
        </div>
        <GayaSevaLogo size={64} className="shrink-0 drop-shadow-md" />
      </div>

      {/* Places Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.map((p) => (
          <div key={p.slug} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#F8F6EF] text-[#4A2E1A] rounded">
                {p.tag}
              </span>
              <h3 className="font-serif font-bold text-lg text-[#4A2E1A]">{p.name}</h3>
              <p className="text-xs text-gray-600">{p.desc}</p>
            </div>

            <Link
              href={`/gaya-guide/${p.slug}`}
              className="py-2.5 bg-[#4A2E1A] text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 hover:bg-[#3A2314] transition-colors"
            >
              Explore {p.name} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
