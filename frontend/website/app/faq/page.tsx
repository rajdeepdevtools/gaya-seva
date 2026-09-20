'use client';

import React from 'react';

export default function FAQPage() {
  const faqs = [
    { q: 'How do I book Pick & Drop from Gaya Railway Station?', a: 'Visit /pick-drop, select your date, time, passengers, and vehicle type, then click Find Available Vehicles to connect directly with verified drivers via Call or WhatsApp.' },
    { q: 'Are all Pandits and drivers verified on GayaSeva?', a: 'Yes. Only service providers displaying the green "GayaSeva Verified" badge have completed document verification and background checks.' },
    { q: 'What is the best time for Pinda Daan at Vishnupad?', a: 'Early morning from 5:30 AM to 11:00 AM is ideal for Pinda Daan oblations at Vishnupad Temple and Falgu River Ghats.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="bg-[#2A180B] text-white p-8 rounded-3xl border border-[#F58220]/20 shadow-xl text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold">Frequently Asked Questions (FAQ)</h1>
        <p className="text-xs text-[#F8F6EF]/80">Common questions about Gaya Ji Teerth Yatra, Pandits, Taxis & Stay.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <h3 className="font-serif font-bold text-base text-[#4A2E1A]">Q: {faq.q}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">A: {faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
