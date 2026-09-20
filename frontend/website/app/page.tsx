'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Flame, 
  Hotel, 
  ShoppingBag, 
  Map, 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Bot, 
  ArrowRight,
  Star,
  Compass,
  Navigation,
  Sparkles,
  BookOpen,
  Waves,
  Utensils,
  CheckCircle2,
  Calendar,
  PhoneCall,
  ChevronDown,
  Info,
  ShieldAlert,
  Megaphone,
  Clock,
  Landmark,
  UserCheck,
  Languages,
  Heart,
  Zap,
  Check,
  Quote,
  MapPin,
  Users,
  Award,
  QrCode,
  HeartHandshake,
  Download,
  AlertTriangle,
  Hospital,
  Train,
  CheckSquare,
  Lock,
  BadgeCheck,
  ThumbsUp,
  FileText,
  Bus,
  Route,
  Globe,
  Trees,
  Layers,
  ShoppingBasket
} from 'lucide-react';

import { PopupAd } from '@/components/PopupAd';
import { RectangularBannerSlider } from '@/components/RectangularBannerSlider';
import { ContentStore, SacredPlace } from '@/lib/contentStore';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { GayaSevaLogo } from '@/components/ui/GayaSevaLogo';

export default function HomePage() {
  const { t, language } = useLanguage();
  const { sortByDistance, locationName, requestLocation } = useLocation();
  const [activeTab, setActiveTab] = useState<'TAXI' | 'PANDIT' | 'STAY' | 'FOOD' | 'MALLS' | 'HELP'>('TAXI');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [dynamicPlaces, setDynamicPlaces] = useState<SacredPlace[]>([]);
  const [activeItineraryDay, setActiveItineraryDay] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    setDynamicPlaces(ContentStore.getPlaces());
    const handleStorage = () => setDynamicPlaces(ContentStore.getPlaces());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const sortedPlaces = sortByDistance(
    dynamicPlaces.length > 0 ? dynamicPlaces : ContentStore.getPlaces()
  );

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const isHindi = language === 'hi';

  const stats = [
    { label: isHindi ? 'तीर्थयात्री सेवा' : 'Pilgrims Served', value: '50,000+', icon: Users, color: 'text-amber-500' },
    { label: isHindi ? 'सत्यापित सेवा प्रदाता' : 'Verified Providers', value: '100%', icon: ShieldCheck, color: 'text-emerald-500' },
    { label: isHindi ? 'औसत पिकअप समय' : 'Avg Pickup Time', value: '15 Mins', icon: Clock, color: 'text-blue-500' },
    { label: isHindi ? 'हेल्पलाइन सपोर्ट' : 'Helpline Support', value: '24 / 7', icon: PhoneCall, color: 'text-red-500' },
  ];

  const testimonials = [
    {
      name: 'Rameshwar Banerjee',
      location: 'Kolkata, West Bengal',
      text: isHindi ? 'गयासेवा के ज़रिये पंडितजी और टैक्सी पहले से ही बुक कर ली थी। फल्गु घाट पर पिंड दान का अनुभव बहुत सुगम और पारदर्शी रहा।' : 'Booked Panditji and Taxi pre-arrival through GayaSeva. Pind Daan at Falgu Ghat was completely seamless with transparent pricing.',
      rating: 5,
      date: 'Pitru Paksha Pilgrim'
    },
    {
      name: 'Sunita Sharma',
      location: 'Varanasi, UP',
      text: isHindi ? 'विष्णुपद मंदिर के पास स्वच्छ धर्मशाला और सात्विक भोजन मिला। बुजुर्गों के लिए व्हीलचेयर सहायता भी तुरंत मिली।' : 'Found a clean, verified dharamshala near Vishnupad Temple with satvik food. Wheelchair assistance for elderly parents was provided instantly.',
      rating: 5,
      date: 'Family Pilgrim'
    },
    {
      name: 'Vikramaditya Rao',
      location: 'Hyderabad, Telangana',
      text: isHindi ? 'गया जंक्शन से बोधगया के लिए रात 2 बजे भी तुरंत एसी कैब उपलब्ध हुई। बहुत ही सुरक्षित और आधिकारिक सेवा!' : 'Got a clean AC sedan cab at 2 AM from Gaya Junction to Bodh Gaya. Completely safe, official yatri service!',
      rating: 5,
      date: 'Teerth Yatri'
    }
  ];

  const faqs = [
    {
      q: isHindi ? 'गया जी में पिंडदान की सही प्रक्रिया क्या है?' : 'What is the complete Pind Daan process in Gaya Ji?',
      a: isHindi 
        ? 'पिंडदान मुख्य रूप से फल्गु नदी तट, विष्णुपद मंदिर और अक्षयवट वृक्ष पर संपन्न किया जाता है। गयासेवा के माध्यम से आप पहले ही अनुभवी एवं अधिकृत तीर्थ पुरोहितों से संपर्क कर सकते हैं।'
        : 'Pind Daan is traditionally performed at Falgu River banks, Vishnupad Temple, and Akshayavat. GayaSeva connects you directly with verified Teerth Pandits with fixed transparent rituals.'
    },
    {
      q: isHindi ? 'क्या गया जंक्शन या एयरपोर्ट से पिक एंड ड्रॉप की सुविधा उपलब्ध है?' : 'Is Pick & Drop available from Gaya Junction & Airport?',
      a: isHindi 
        ? 'हाँ! गयासेवा पर एसी / नॉन-एसी टैक्सी, ऑटो और ई-रिक्शा तुरंत लाइव बुकिंग एवं जीपीएस डिस्टेंस ट्रैकिंग के साथ उपलब्ध हैं।'
        : 'Yes! Instant pick & drop cabs, sedans, SUVs, and auto-rickshaws are available 24/7 directly with verified local drivers.'
    },
    {
      q: isHindi ? 'क्या होटल और धर्मशाला की ऑनलाइन प्री-बुकिंग सुरक्षित है?' : 'Is pre-booking hotels and dharamshalas safe?',
      a: isHindi 
        ? 'जी बिल्कुल! सभी सूचीबद्ध कमरे एवं गेस्ट हाउस गया प्रशासन एवं स्थानीय सत्यापन के बाद ही दिखाए जाते हैं।'
        : 'Absolutely. All listed hotels and dharamshalas are strictly background checked and physically verified.'
    },
    {
      q: isHindi ? 'आपातकालीन सहायता के लिए हेल्पलाइन नंबर क्या है?' : 'What is the emergency Yatri helpline number?',
      a: isHindi 
        ? 'किसी भी आपात स्थिति में 24/7 हेल्पलाइन नंबर +91 98765 43200 या 112 पर तुरंत संपर्क करें।'
        : 'For any emergency assistance, call our 24/7 dedicated Yatri helpline +91 98765 43200 immediately.'
    }
  ];

  return (
    <div className="space-y-16 pb-24 bg-[#FAFAF7] text-[#2D1A0E] overflow-x-hidden selection:bg-[#F58220] selection:text-white">
      {/* Active Popup Modal */}
      <PopupAd />

      {/* SECTION 1: 📢 TOP PITRU PAKSHA & TEERTH TICKER BAR */}
      <div className="bg-gradient-to-r from-[#180F08] via-[#2A180B] to-[#180F08] text-white py-2.5 px-4 text-center border-b border-[#F58220]/25 text-xs font-medium relative z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 mx-auto md:mx-0">
            <span className="px-2.5 py-0.5 bg-[#F58220] text-white font-extrabold rounded-full text-[10px] tracking-wider uppercase animate-pulse flex items-center gap-1 shadow-sm">
              <Megaphone className="w-3 h-3" /> PITRU PAKSHA 2026 SPECIAL
            </span>
            <span className="text-[#F6C343] font-semibold hidden sm:inline">
              {t('sec1Notice')}
            </span>
          </div>
          <div className="flex items-center gap-3 mx-auto md:mx-0">
            <a 
              href="tel:+919876543200" 
              className="text-[#F6C343] hover:text-white font-bold underline flex items-center gap-1.5 transition-colors text-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#F58220]" />
              <span>{isHindi ? '24/7 हेल्पलाइन: +91 98765 43200' : 'Helpline: +91 98765 43200'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 2: 🏛️ MASTER HERO SECTION */}
      <section className="relative min-h-[580px] bg-gradient-to-b from-[#1C0D02] via-[#2A180B] to-[#3D2310] text-white py-16 sm:py-24 px-4 sm:px-8 rounded-3xl mx-3 sm:mx-6 border border-[#F58220]/20 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#F58220]/20 via-[#F59E0B]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#F58220]/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#F58220] via-[#F6C343] to-[#D97706] opacity-75 blur group-hover:opacity-100 transition duration-500 animate-pulse" />
              <GayaSevaLogo 
                size={110} 
                className="relative drop-shadow-[0_12px_35px_rgba(245,130,32,0.5)] transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-[#F58220]/15 text-[#F6C343] font-bold text-xs uppercase tracking-widest border border-[#F58220]/30 inline-flex items-center gap-2 backdrop-blur-md shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
              <span>{t('heroBadge')}</span>
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight leading-tight text-white drop-shadow-md"
          >
            {t('heroTitle1')} — <span className="bg-gradient-to-r from-[#F6C343] via-[#F58220] to-[#FDE047] bg-clip-text text-transparent">{t('heroTitleHighlight')}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-lg lg:text-xl text-[#F8F6EF]/85 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            {t('heroSubtitle')}
          </motion.p>

          {/* SECTION 3: 🔍 INTERACTIVE 6-TAB QUICK SEARCH ENGINE */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-4"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-3 sm:p-5 text-gray-900 shadow-2xl border border-white/20 max-w-4xl mx-auto text-left">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 border-b border-gray-100 scrollbar-none">
                {[
                  { id: 'TAXI', label: isHindi ? '🚕 टैक्सी & ऑटो' : '🚕 Pick & Drop' },
                  { id: 'PANDIT', label: isHindi ? '🪔 तीर्थ पुरोहित' : '🪔 Pind Daan Pandit' },
                  { id: 'STAY', label: isHindi ? '🏨 होटल & धर्मशाला' : '🏨 Stays & Hotels' },
                  { id: 'FOOD', label: isHindi ? '🍱 सात्विक भोजन' : '🍱 Satvik Food' },
                  { id: 'HELP', label: isHindi ? '🆘 आपातकालीन मदद' : '🆘 Emergency Help' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? 'bg-[#2A180B] text-[#F6C343] shadow-md scale-105'
                        : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="py-4 px-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'TAXI' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Pickup Point</label>
                          <div className="relative">
                            <MapPin className="w-4 h-4 text-[#F58220] absolute left-3 top-3" />
                            <input 
                              type="text" 
                              placeholder="Gaya Junction / Airport / Hotel" 
                              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#F58220]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Destination</label>
                          <div className="relative">
                            <Navigation className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
                            <input 
                              type="text" 
                              placeholder="Vishnupad / Bodh Gaya / Falgu Ghat" 
                              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#F58220]"
                            />
                          </div>
                        </div>

                        <div className="pt-2 sm:pt-5">
                          <Link 
                            href="/pick-drop"
                            className="w-full bg-[#F58220] hover:bg-[#E07210] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                          >
                            <span>Search Cabs & Rates</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {activeTab === 'PANDIT' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Ritual Rites</label>
                          <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#F58220]">
                            <option>Ekoddishta Pind Daan</option>
                            <option>Tripindi Shradh Rites</option>
                            <option>Annual Shradh Ceremony</option>
                            <option>Kalsarp Dosh Shanti</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Preferred Location</label>
                          <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#F58220]">
                            <option>Vishnupad Temple Ghat</option>
                            <option>Falgu River Bank</option>
                            <option>Akshayavat Tree Site</option>
                            <option>Pretshila Hill Shrine</option>
                          </select>
                        </div>

                        <div className="pt-2 sm:pt-5">
                          <Link 
                            href="/pandit"
                            className="w-full bg-[#F58220] hover:bg-[#E07210] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                          >
                            <span>Find Verified Pandits</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {activeTab === 'STAY' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Stay Type</label>
                          <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#F58220]">
                            <option>Teerth Dharamshala</option>
                            <option>AC Guest House</option>
                            <option>3-Star Pilgrim Hotel</option>
                            <option>Family Ashram</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Proximity</label>
                          <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#F58220]">
                            <option>Near Vishnupad Temple (&lt; 500m)</option>
                            <option>Near Gaya Junction Railway Station</option>
                            <option>Near Bodh Gaya Mahabodhi Temple</option>
                          </select>
                        </div>

                        <div className="pt-2 sm:pt-5">
                          <Link 
                            href="/stay"
                            className="w-full bg-[#F58220] hover:bg-[#E07210] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                          >
                            <span>View Available Rooms</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {activeTab === 'FOOD' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Satvik Thali / Speciality</label>
                          <input 
                            type="text" 
                            placeholder="No-Onion-No-Garlic Yatri Thali, Gaya Tilkut, Anarsa" 
                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#F58220]"
                          />
                        </div>

                        <div className="pt-2 sm:pt-5">
                          <Link 
                            href="/food"
                            className="w-full bg-[#F58220] hover:bg-[#E07210] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                          >
                            <span>Order Pure Satvik Food</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {activeTab === 'HELP' && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-red-50 rounded-2xl border border-red-200">
                        <div className="flex items-center gap-3">
                          <ShieldAlert className="w-8 h-8 text-red-600 shrink-0 animate-bounce" />
                          <div>
                            <h4 className="font-extrabold text-sm text-red-950">24/7 Gaya Yatri Emergency Helpline</h4>
                            <p className="text-xs text-red-800">Medical emergency, lost belongings, police assistance & yatri shelter.</p>
                          </div>
                        </div>

                        <a 
                          href="tel:+919876543200"
                          className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>Call Emergency Helpline</span>
                        </a>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: 📊 LIVE YATRI KEY METRICS COUNTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center space-y-1 border-r last:border-r-0 border-gray-100 px-2"
              >
                <Icon className={`w-6 h-6 mx-auto ${st.color} mb-1`} />
                <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-gray-900">{st.value}</h3>
                <p className="text-xs text-gray-500 font-medium">{st.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: 🖼️ RECTANGULAR BANNER SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <RectangularBannerSlider />
      </section>

      {/* SECTION 6: 🪔 COMPLETE PIND DAAN RITUALS & PANDITS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="bg-gradient-to-r from-amber-950 via-[#3D2310] to-[#2A180B] text-white p-8 sm:p-12 rounded-3xl border border-[#F58220]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3 py-1 bg-[#F58220] text-white rounded-full text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> Authentic Teerth Pandits
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {isHindi ? 'गया जी में विधि-विधानपूर्वक पिंडदान एवं श्राद्ध कर्म' : 'Complete Authentic Pind Daan & Shradh Rites'}
            </h2>
            <p className="text-xs sm:text-sm text-[#F8F6EF]/80 leading-relaxed">
              Book traditional Gaya Gayawal Teerth Pandits with fixed transparent rituals at Vishnupad, Falgu River, and Akshayavat.
            </p>
          </div>
          <Link
            href="/pandit"
            className="bg-[#F6C343] hover:bg-amber-400 text-gray-950 font-extrabold text-xs px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0"
          >
            <span>Book Verified Pandit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 7: 🚕 PICK & DROP TAXI & AUTO RATES CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">Pick & Drop Services</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              {isHindi ? 'गया जंक्शन, एयरपोर्ट एवं बोधगया टैक्सी दरें' : 'Verified Taxi & Auto Fares'}
            </h2>
          </div>
          <Link href="/pick-drop" className="text-xs font-bold text-[#F58220] hover:underline flex items-center gap-1">
            <span>View All Cab Types</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="p-3 bg-amber-50 text-[#F58220] rounded-2xl"><Car className="w-6 h-6" /></span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Instant 15 Mins</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900">Gaya Junction &rarr; Vishnupad</h3>
            <p className="text-xs text-gray-500">AC Sedan / Hatchback / Auto-Rickshaw available 24/7.</p>
            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-sm font-extrabold text-gray-900">₹300 - ₹600</span>
              <Link href="/pick-drop" className="text-xs font-bold text-[#F58220]">Book Cab &rarr;</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Car className="w-6 h-6" /></span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Airport Pickup</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900">Gaya Airport (GAY) &rarr; Bodh Gaya</h3>
            <p className="text-xs text-gray-500">Spacious SUV & AC Sedans for international & domestic Yatri arrival.</p>
            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-sm font-extrabold text-gray-900">₹500 - ₹900</span>
              <Link href="/pick-drop" className="text-xs font-bold text-blue-600">Book Cab &rarr;</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Car className="w-6 h-6" /></span>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">Full Day Sightseeing</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900">Gaya Teerth Circuit Full Day</h3>
            <p className="text-xs text-gray-500">Covers Vishnupad, Falgu, Akshayavat, Pretshila & Bodh Gaya.</p>
            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-sm font-extrabold text-gray-900">₹1,800 / day</span>
              <Link href="/pick-drop" className="text-xs font-bold text-purple-600">Reserve Day &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: 🏨 YATRI STAYS, DHARAMSHALAS & HOTELS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Stays & Accommodation</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              {isHindi ? 'सत्यापित होटल एवं धर्मशालाएं' : 'Verified Pilgrim Stays & Dharamshalas'}
            </h2>
          </div>
          <Link href="/stay" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>View All Stays</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full">Near Vishnupad (&lt; 300m)</span>
            <h3 className="font-serif font-bold text-lg text-gray-900">Sri Vishnupad Yatri Dharamshala</h3>
            <p className="text-xs text-gray-600">Clean AC / Non-AC rooms with hot water, lift & pure satvik kitchen.</p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900">From ₹450 / night</span>
              <Link href="/stay" className="text-xs font-bold text-blue-600">Book Room &rarr;</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-full">Near Gaya Station</span>
            <h3 className="font-serif font-bold text-lg text-gray-900">Hotel Teerth Residency</h3>
            <p className="text-xs text-gray-600">3-Star comfortable rooms with free station pickup & 24hr room service.</p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900">From ₹1,200 / night</span>
              <Link href="/stay" className="text-xs font-bold text-blue-600">Book Room &rarr;</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-purple-50 text-purple-700 rounded-full">Bodh Gaya Temple Zone</span>
            <h3 className="font-serif font-bold text-lg text-gray-900">Mahabodhi Heritage Guest House</h3>
            <p className="text-xs text-gray-600">Peaceful garden guest house with meditation space & airport transport.</p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900">From ₹950 / night</span>
              <Link href="/stay" className="text-xs font-bold text-blue-600">Book Room &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: 🍱 PURE SATVIK FOOD & GAYA TILKUT SWEET DELIVERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-700/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Utensils className="w-4 h-4" /> Pure Satvik Kitchen
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold">
              {isHindi ? 'बिना लहसुन-प्याज का शुद्ध सात्विक भोजन एवं गया तिलकुट' : 'Pure No-Onion No-Garlic Satvik Thali & Gaya Tilkut'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Order hygiene-certified Yatri food delivered directly to your Hotel, Dharamshala, or Vishnupad Ghat.
            </p>
          </div>
          <Link
            href="/food"
            className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-extrabold text-xs px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0"
          >
            <span>Order Satvik Thali</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 10: 🛍️ COMPLETE PUJA SAMAGRI KIT BOOKING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600">Puja Items</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              {isHindi ? 'पिंडदान एवं पूजा सामग्री किट' : 'Pind Daan Samagri & Puja Kits'}
            </h2>
          </div>
          <Link href="/puja-material" className="text-xs font-bold text-pink-600 hover:underline flex items-center gap-1">
            <span>View All Kits</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <span className="p-3 bg-pink-50 text-pink-600 rounded-2xl inline-block"><ShoppingBag className="w-6 h-6" /></span>
            <h3 className="font-serif font-bold text-lg text-gray-900">Complete Pind Daan Kit</h3>
            <p className="text-xs text-gray-600">Includes pure sesame, barley flour, kusha grass, brass diya, honey, and sacred thread.</p>
            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-sm font-extrabold text-gray-900">₹350</span>
              <Link href="/puja-material" className="text-xs font-bold text-pink-600">Order Kit &rarr;</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <span className="p-3 bg-amber-50 text-amber-600 rounded-2xl inline-block"><Flame className="w-6 h-6" /></span>
            <h3 className="font-serif font-bold text-lg text-gray-900">Tripindi Shradh Special Kit</h3>
            <p className="text-xs text-gray-600">Complete items for Tripindi Shradh rites with pure cow ghee and samidha wood.</p>
            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-sm font-extrabold text-gray-900">₹550</span>
              <Link href="/puja-material" className="text-xs font-bold text-pink-600">Order Kit &rarr;</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <span className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl inline-block"><ShoppingBasket className="w-6 h-6" /></span>
            <h3 className="font-serif font-bold text-lg text-gray-900">Original Gaya Tilkut Pack</h3>
            <p className="text-xs text-gray-600">Fresh Ramna Road traditional white sesame & jaggery Tilkut gift boxes.</p>
            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-sm font-extrabold text-gray-900">₹280 / kg</span>
              <Link href="/puja-material" className="text-xs font-bold text-emerald-600">Order Pack &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: 📍 SACRED TEERTH SHRINES DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">Teerth Darshan</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              {isHindi ? 'गया जी के प्रमुख पवित्र स्थल' : 'Sacred Shrines & Holy Teerth Sites'}
            </h2>
          </div>
          <Link href="/gaya-guide" className="text-xs font-bold text-[#F58220] hover:underline flex items-center gap-1">
            <span>{isHindi ? 'सभी स्थल देखें' : 'View Full Guide'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedPlaces.slice(0, 3).map((pl) => (
            <div key={pl.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-amber-50 text-amber-900 rounded-full border border-amber-200">
                    📍 {pl.distanceKm != null ? `${pl.distanceKm} km away` : pl.category}
                  </span>
                  <span className="text-xs text-gray-400">🕒 05:00 AM - 09:00 PM</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-gray-900">{pl.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{pl.description}</p>
              </div>
              <Link href={`/gaya-guide/${pl.id}`} className="text-xs font-bold text-[#F58220] hover:underline pt-2 inline-block">
                Read Yatri Guide &amp; Timings &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 12: 🗺️ LIVE DISTANCE MATRIX & GPS MAP LOCATOR WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#F58220] uppercase tracking-wider">GPS Live Location</span>
            <h3 className="font-serif font-bold text-xl text-gray-900">
              {isHindi ? 'लाइव जीपीएस दूरी गणक' : 'Live GPS Yatri Distance Matrix'}
            </h3>
            <p className="text-xs text-gray-500">Currently active location: <span className="font-bold text-gray-800">{locationName}</span></p>
          </div>
          <button
            onClick={requestLocation}
            className="bg-[#2A180B] hover:bg-[#3D2310] text-[#F6C343] font-bold text-xs px-6 py-3 rounded-2xl shadow-sm transition-all flex items-center gap-2 shrink-0"
          >
            <MapPin className="w-4 h-4 text-[#F58220]" />
            <span>Update Live GPS Distance</span>
          </button>
        </div>
      </section>

      {/* SECTION 13: 📜 GAYA TEERTH HISTORY & SPIRITUAL SIGNIFICANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
        <div className="bg-[#2A180B] text-white p-8 sm:p-12 rounded-3xl border border-[#F58220]/20 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6C343]">
            {isHindi ? 'गया जी महात्म्य एवं पिंड दान का महत्व' : 'Spiritual Significance of Gaya Ji Pind Daan'}
          </h2>
          <p className="text-xs sm:text-sm text-[#F8F6EF]/85 leading-relaxed">
            According to the Vayu Purana and Garuda Purana, Gaya Ji is the supreme holy land where Lord Vishnu stamped His footstep on solid basalt rock at Vishnupad Temple to bless Gayasura. Performing Pind Daan oblations at Falgu River, Vishnupad, and Akshayavat grants permanent liberation (Moksha) to seven generations of departed ancestors.
          </p>
        </div>
      </section>

      {/* SECTION 14: 🤖 AI YATRI ASSISTANT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-amber-900 via-[#4A2E1A] to-[#2A180B] text-white rounded-3xl p-8 sm:p-12 border border-[#F6C343]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 bg-[#F6C343] text-gray-950 rounded-full text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-gray-950" /> AI Yatri Companion
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold">
              {isHindi ? 'गयासेवा एआई तीर्थ गाइड से कुछ भी पूछें' : 'Instant AI Guidance for Gaya Pilgrims'}
            </h2>
            <p className="text-xs sm:text-sm text-[#F8F6EF]/80 leading-relaxed">
              Ask questions about Pind Daan vidhi, temple muhurat timings, local transport fares, or family dharamshala bookings.
            </p>
          </div>
          <Link
            href="/ai"
            className="bg-[#F58220] hover:bg-[#E07210] text-white font-extrabold text-xs px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#F6C343]" />
            <span>Start AI Yatri Chat</span>
          </Link>
        </div>
      </section>

      {/* SECTION 15: 🆘 24/7 EMERGENCY HELPLINES & AMBULANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-red-950 text-white rounded-3xl p-6 sm:p-8 border border-red-700/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Hospital className="w-10 h-10 text-red-500 shrink-0" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xl">24/7 Yatri Medical & Ambulance Helpline</h3>
              <p className="text-xs text-red-200">ANMMCH Government Medical College & Hospital Gaya & Verified Ambulance Support.</p>
            </div>
          </div>
          <a href="tel:108" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md shrink-0">
            Call Ambulance 108
          </a>
        </div>
      </section>

      {/* SECTION 16: 👵 SPECIAL YATRI CARE & WHEELCHAIR ASSISTANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <HeartHandshake className="w-10 h-10 text-[#F58220] shrink-0" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xl text-gray-900">Elderly & Wheelchair Assistance</h3>
              <p className="text-xs text-gray-600">Special assistance for senior citizen Yatris at Vishnupad Temple & Falgu Ghat.</p>
            </div>
          </div>
          <a href="tel:+919876543200" className="bg-[#2A180B] text-[#F6C343] font-bold text-xs px-6 py-3 rounded-xl shrink-0">
            Book Wheelchair Support
          </a>
        </div>
      </section>

      {/* SECTION 17: 🔎 LOST & FOUND RELATIVES PORTAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-purple-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-700/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Search className="w-10 h-10 text-purple-400 shrink-0" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xl">Lost & Found Relatives & Belongings Portal</h3>
              <p className="text-xs text-purple-200">Report or search missing family members or belongings during Pitru Paksha Mela.</p>
            </div>
          </div>
          <Link href="/help/lost-and-found" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-3 rounded-xl shrink-0">
            Open Lost & Found Portal
          </Link>
        </div>
      </section>

      {/* SECTION 18: 📋 STEP-BY-STEP PIND DAAN RITUAL TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">Ritual Workflow</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            {isHindi ? 'गया जी पिंड दान चरण-दर-चरण गाइड' : 'Step-by-Step Pind Daan Ritual Guide'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
            <span className="w-8 h-8 rounded-full bg-amber-100 text-[#F58220] font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="font-serif font-bold text-sm text-gray-900">Falgu River Bath</h4>
            <p className="text-xs text-gray-500">Holy dip and Sankalp oblations at Falgu River banks.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
            <span className="w-8 h-8 rounded-full bg-amber-100 text-[#F58220] font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="font-serif font-bold text-sm text-gray-900">Vishnupad Footstep</h4>
            <p className="text-xs text-gray-500">Offering Pinda at Lord Vishnu basalt footstep shrine.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
            <span className="w-8 h-8 rounded-full bg-amber-100 text-[#F58220] font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="font-serif font-bold text-sm text-gray-900">Akshayavat Tree</h4>
            <p className="text-xs text-gray-500">Completing final oblations under immortal Banyan tree.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
            <span className="w-8 h-8 rounded-full bg-amber-100 text-[#F58220] font-bold text-xs flex items-center justify-center">4</span>
            <h4 className="font-serif font-bold text-sm text-gray-900">Brahmin Bhojan</h4>
            <p className="text-xs text-gray-500">Offering Yatri Dakshina & Satvik meal to Gayawal Panda.</p>
          </div>
        </div>
      </section>

      {/* SECTION 19: 🤝 VERIFIED LOCAL SERVICE PROVIDER REGISTRATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">For Local Providers</span>
            <h3 className="font-serif font-bold text-xl text-gray-900">
              Are you a Gaya Ji Teerth Pandit, Taxi Driver, or Hotel Owner?
            </h3>
            <p className="text-xs text-gray-600">Register on GayaSeva platform to receive direct yatri bookings with zero commission.</p>
          </div>
          <Link href="/provider/register" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shrink-0">
            Register as Provider &rarr;
          </Link>
        </div>
      </section>

      {/* SECTION 20: 🏷️ ZERO MIDDLEMAN COMMISSION & TRANSPARENT PRICE GUARANTEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200 flex items-center gap-4">
          <BadgeCheck className="w-8 h-8 text-[#F58220] shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-amber-950">Zero Middleman Commission & Transparent Pricing</h4>
            <p className="text-xs text-amber-900">All rates displayed on GayaSeva are fixed directly by local providers without hidden fees.</p>
          </div>
        </div>
      </section>

      {/* SECTION 21: 🌐 MULTILINGUAL YATRI SUPPORT MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#4A2E1A] text-xs font-extrabold uppercase tracking-wider">
            <Languages className="w-4 h-4 text-[#F58220]" />
            <span>Multilingual Yatri Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900">
            {isHindi ? '🌐 भारत के सभी राज्यों के लिए बहुभाषी सहायता' : '🌐 Multilingual Yatri Support Matrix'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {isHindi
              ? 'गया जी पिंडदान एवं तीर्थयात्रा हेतु हिंदी, बंगाली, अंग्रेजी, तेलुगु एवं तमिल भाषी पंडे, ड्राइवर एवं 24/7 हेल्पलाइन सहायता।'
              : 'Dedicated pilgrimage assistance & verified local pandits available across 5 primary Indian languages for seamless Yatra.'}
          </p>
        </div>

        {/* 5 Language Support Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              code: 'HI',
              name: 'हिंदी (Hindi)',
              region: 'North & Central India',
              greeting: '🙏 गया जी पिंडदान एवं पंडित सेवा',
              desc: 'समस्त पिंडदान विधान, फल्गु स्नान एवं विष्णुपद दर्शन सहायता।',
              badge: 'Primary Language',
              badgeBg: 'bg-amber-100 text-amber-900',
            },
            {
              code: 'BN',
              name: 'বাংলা (Bengali)',
              region: 'West Bengal & Tripura',
              greeting: '🙏 গয়া ধাম পিন্ডদান ও তীর্থ সহায়তা',
              desc: 'বাংলা ভাষী অভিজ্ঞ পুরোহিত ও স্থান পরিষেবা ব্যবস্থা।',
              badge: 'Bengali Special',
              badgeBg: 'bg-rose-100 text-rose-900',
            },
            {
              code: 'EN',
              name: 'English',
              region: 'Pan-India & Global NRI',
              greeting: '🙏 Official Gaya Pilgrim Portal',
              desc: 'Comprehensive English guides, cab bookings & instant support.',
              badge: 'Global & NRI',
              badgeBg: 'bg-blue-100 text-blue-900',
            },
            {
              code: 'TE',
              name: 'తెలుగు (Telugu)',
              region: 'Andhra & Telangana',
              greeting: '🙏 గయా క్షేత్ర పిండ ప్రదాన సేవలు',
              desc: 'తెలుగు మాట్లాడే తీర్థ పురోహితులు మరియు రవాణా సేవలు.',
              badge: 'Telugu Yatri',
              badgeBg: 'bg-emerald-100 text-emerald-900',
            },
            {
              code: 'TA',
              name: 'தமிழ் (Tamil)',
              region: 'Tamil Nadu & South',
              greeting: '🙏 கயா தீர்த்த யாத்திரை சேவைகள்',
              desc: 'தமிழ் பேசும் புரோகிதர்கள் மற்றும் தங்கும் வசதிகள்.',
              badge: 'Tamil Yatri',
              badgeBg: 'bg-purple-100 text-purple-900',
            },
          ].map((langItem) => (
            <div
              key={langItem.code}
              className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#F58220]/40 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#F58220] group-hover:text-white font-black text-xs flex items-center justify-center text-gray-800 transition-colors">
                    {langItem.code}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${langItem.badgeBg}`}>
                    {langItem.badge}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-[#F58220] transition-colors">
                  {langItem.name}
                </h3>
                <p className="text-[11px] font-bold text-gray-800">{langItem.greeting}</p>
                <p className="text-[11px] text-gray-500 leading-normal">{langItem.desc}</p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-400 font-medium">{langItem.region}</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Active
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Support Matrix Capability Badges */}
        <div className="bg-[#2A180B] text-white p-6 sm:p-8 rounded-3xl border border-[#F58220]/30 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#F58220]/20 rounded-2xl shrink-0">
              <Languages className="w-6 h-6 text-[#F6C343]" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Native Speaking Purohits</h4>
              <p className="text-[#F8F6EF]/70 text-[11px]">Pandits available for Hindi, Bengali, Telugu & Tamil rituals.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 rounded-2xl shrink-0">
              <PhoneCall className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Multilingual Phone Line</h4>
              <p className="text-[#F8F6EF]/70 text-[11px]">Helpline support in your native spoken language.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-2xl shrink-0">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Regional Pind Daan Guides</h4>
              <p className="text-[#F8F6EF]/70 text-[11px]">Step-by-step rituals explained in 5 major languages.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Verified Local Assistance</h4>
              <p className="text-[#F8F6EF]/70 text-[11px]">Language-matched drivers & hotel concierge staff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 22: 📱 MOBILE WEB APP (PWA) & QR DOWNLOAD BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#180F08] text-white rounded-3xl p-8 border border-[#F58220]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-[#F6C343]">Install GayaSeva Web App</h3>
            <p className="text-xs text-[#F8F6EF]/70">Add GayaSeva to your mobile home screen for offline access during Yatra.</p>
          </div>
          <button className="bg-[#F58220] hover:bg-[#E07210] text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 shrink-0">
            <Download className="w-4 h-4" /> Install App
          </button>
        </div>
      </section>

      {/* SECTION 23: 💬 REAL YATRI REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">Verified Pilgrim Experiences</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            {isHindi ? 'तीर्थयात्रियों के विचार एवं अनुभव' : 'What Gaya Pilgrims Say'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((tst, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  {'★'.repeat(tst.rating)}
                </div>
                <p className="text-xs text-gray-600 italic">"{tst.text}"</p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">{tst.name}</h4>
                  <span className="text-[10px] text-gray-400">{tst.location}</span>
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{tst.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 24: 🛡️ BACKGROUND VERIFICATION & SAFETY AUDIT SHIELD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-gray-900">Background Checked & Verified Network</h4>
            <p className="text-xs text-gray-500">Every driver, pandit, and hotel partner undergoes strict identity & document verification.</p>
          </div>
        </div>
      </section>

      {/* SECTION 25: 🗺️ 1-DAY, 2-DAY & 3-DAY YATRA ITINERARY GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">Yatra Planning</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            {isHindi ? 'गया जी यात्रा समय-सारणी योजना' : 'Custom Yatra Itinerary Planner'}
          </h2>
        </div>

        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((day) => (
            <button
              key={day}
              onClick={() => setActiveItineraryDay(day as any)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeItineraryDay === day
                  ? 'bg-[#2A180B] text-[#F6C343]'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {day}-Day Plan
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 text-xs text-gray-700 space-y-2 max-w-2xl mx-auto">
          {activeItineraryDay === 1 && (
            <p><strong>1-Day Express Plan:</strong> Morning Falgu River bath &rarr; Vishnupad Temple Pind Daan &rarr; Afternoon Akshayavat final oblations &rarr; Evening departure.</p>
          )}
          {activeItineraryDay === 2 && (
            <p><strong>2-Day Complete Plan:</strong> Day 1: Vishnupad & Falgu rituals &rarr; Day 2: Bodh Gaya Mahabodhi Temple & Thai Monastery tour.</p>
          )}
          {activeItineraryDay === 3 && (
            <p><strong>3-Day Teerth Circuit:</strong> Day 1: Gaya Pind Daan &rarr; Day 2: Pretshila & Ramshila Hills &rarr; Day 3: Bodh Gaya & Rajgir excursion.</p>
          )}
        </div>
      </section>

      {/* SECTION 26: 🏛️ OFFICIAL BIHAR TOURISM & DISTRICT HELPLINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gray-100 rounded-2xl p-4 text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2">
          <span>Official Bihar Tourism Helpline: <strong>1800-345-6345</strong></span>
          <span>Gaya District Police Helpline: <strong>+91 631 2220004</strong></span>
        </div>
      </section>

      {/* SECTION 27: ❓ FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#F58220] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-4 sm:px-5 pb-5 text-xs text-gray-600 border-t border-gray-100 pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 28: ✉️ YATRI UPDATES & PITRU PAKSHA SUBSCRIPTION BOX */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 text-center space-y-4 shadow-sm">
          <h3 className="font-serif font-bold text-xl text-gray-900">
            {isHindi ? 'गया जी तीर्थ अपडेट एवं पितृ पक्ष सूचनाएं प्राप्त करें' : 'Get Pitru Paksha & Gaya Teerth Updates'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Enter WhatsApp / Mobile Number" 
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#F58220]"
            />
            <button className="bg-[#F58220] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-sm">
              Subscribe Free
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 29: 🏆 AWARDS, RECOGNITION & TRUST BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all text-xs text-gray-500">
          <span className="font-extrabold flex items-center gap-1">🏆 Bihar Local Innovation Award 2026</span>
          <span className="font-extrabold flex items-center gap-1">🛡️ 100% SSL Encrypted Yatri Safety</span>
        </div>
      </section>

      {/* SECTION 30: 🚀 FINAL HIGH-IMPACT CONVERSION CALL-TO-ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-[#180F08] via-[#2A180B] to-[#3D2310] text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl border border-[#F58220]/30 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F58220]/15 blur-3xl pointer-events-none rounded-full" />
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
              {isHindi ? 'अपनी गया जी यात्रा की योजना आज ही शुरू करें' : 'Plan Your Gaya Ji Teerth Yatra Today'}
            </h2>
            <p className="text-xs sm:text-base text-[#F8F6EF]/85">
              Direct connection with verified Pandits, Cabs, Dharamshalas & 24/7 Helpline.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link 
                href="/pandit"
                className="bg-[#F58220] hover:bg-[#E07210] text-white font-extrabold text-xs px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center gap-2"
              >
                <span>Book Pind Daan Pandit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="tel:+919876543200"
                className="bg-white/10 hover:bg-white/20 text-[#F6C343] font-bold text-xs px-8 py-4 rounded-2xl border border-[#F6C343]/30 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#F58220]" />
                <span>Call Helpline: +91 98765 43200</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
