'use client';

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-xs sm:text-sm text-gray-700">
      <h1 className="text-3xl font-serif font-bold text-[#4A2E1A]">Privacy Policy</h1>
      <p>GayaSeva is committed to protecting the privacy and personal data of pilgrims and service providers. This privacy policy outlines how personal details, phone numbers, and live location data are collected, processed, and secured.</p>
      <h2 className="text-lg font-serif font-bold text-[#4A2E1A] pt-4">Data Collection & Use</h2>
      <p>Phone numbers and names are collected solely for booking fulfillment and verification. Live GPS coordinates are recorded strictly during active ride sessions and pruned after 30 days.</p>
    </div>
  );
}
