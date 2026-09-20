'use client';

import React, { useState } from 'react';
import { Navigation, MapPin, CheckCircle2, AlertCircle, RefreshCw, X, Compass } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { useLanguage } from '@/context/LanguageContext';

export const LocationBanner: React.FC = () => {
  const { locationStatus, locationName, requestLocation, hasUserSetLocation, errorMessage } = useLocation();
  const { language } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed && locationStatus !== 'locating') return null;

  const isHindi = language === 'hi';

  return (
    <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 text-amber-100 border-b border-amber-800/40 px-3 py-2 text-xs transition-all shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left min-w-0">
          <div className="p-1.5 rounded-full bg-amber-500/20 text-amber-400 shrink-0">
            <Compass className="w-4 h-4 animate-spin-slow text-amber-400" />
          </div>

          <div className="min-w-0">
            <span className="font-semibold text-white tracking-wide flex items-center gap-1.5 flex-wrap">
              <span>{isHindi ? '📍 नजदीकी सेवा और स्थान पहचान' : '📍 Live Proximity & Nearby Services'}</span>
              <span className="text-amber-300/80 font-normal">
                • {locationName}
              </span>
            </span>

            {errorMessage && (
              <p className="text-[11px] text-amber-300/70 truncate">{errorMessage}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={requestLocation}
            disabled={locationStatus === 'locating'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow transition-all hover:scale-105 active:scale-95 text-xs disabled:opacity-50"
          >
            {locationStatus === 'locating' ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{isHindi ? 'स्थान खोजा जा रहा है...' : 'Locating GPS...'}</span>
              </>
            ) : hasUserSetLocation ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-stone-950" />
                <span>{isHindi ? 'स्थान अपडेट करें' : 'Update GPS Location'}</span>
              </>
            ) : (
              <>
                <Navigation className="w-3.5 h-3.5 fill-current" />
                <span>{isHindi ? '🎯 लाइव लोकेशन एक्सेस दें' : '🎯 Enable Live Location'}</span>
              </>
            )}
          </button>

          {!hasUserSetLocation && (
            <button
              onClick={() => setDismissed(true)}
              className="p-1 hover:bg-amber-900/50 rounded text-amber-300 hover:text-white transition"
              title={isHindi ? 'बंद करें' : 'Dismiss'}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
