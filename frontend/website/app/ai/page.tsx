'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Send, 
  Car, 
  Flame, 
  Hotel, 
  Map, 
  HelpCircle, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Navigation, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Zap, 
  Utensils, 
  ShoppingBag, 
  BookOpen, 
  RotateCcw
} from 'lucide-react';
import { AIKnowledgeEngine, AIResponseCard } from '@/lib/aiKnowledgeEngine';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  card?: AIResponseCard;
  text?: string;
  timestamp: string;
}

export default function AIPage() {
  const [inputMsg, setInputMsg] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'AI',
      card: {
        text: '🙏 **Pranam! Welcome to AI GayaSeva Assistant.**\n\nMain Gaya Ji, Vishnupad Temple, Falgu River, Pinda Daan, Bodh Gaya Mahabodhi, Cabs, Pandits, Stays & Emergency Services me aapki kis tarah sahayata kar sakta hu?\n\nNiche diye gaye Quick Questions par click karein ya apna prashna likhein.',
        links: [
          { label: '🚕 Pick & Drop Cabs', url: '/pick-drop' },
          { label: '🙏 Verified Pandits', url: '/pandit' },
          { label: '🏨 Stays & Rooms', url: '/stay' },
          { label: '🗺️ Gaya Guide', url: '/gaya-guide' },
        ],
        phone: '+919876543200',
        whatsapp: '919876543200',
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean markdown text for speech
    const cleanText = text.replace(/[*#_•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'hi-IN';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textToSend?: string) => {
    const msg = textToSend || inputMsg;
    if (!msg.trim()) return;

    const userMessage: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'USER',
      text: msg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');

    // Query Knowledge Base Engine
    setTimeout(() => {
      const responseCard = AIKnowledgeEngine.queryAssistant(msg);
      const aiMessage: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'AI',
        card: responseCard,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      speakText(responseCard.text);
    }, 400);
  };

  const handleClearChat = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setMessages([
      {
        id: 'm-1',
        sender: 'AI',
        card: {
          text: '🙏 **Pranam! Welcome to AI GayaSeva Assistant.**\n\nMain Gaya Ji, Vishnupad, Bodh Gaya & Nearby teerths me aapki kis tarah sahayata kar sakta hu?',
          links: [
            { label: '🚕 Pick & Drop Cabs', url: '/pick-drop' },
            { label: '🙏 Verified Pandits', url: '/pandit' },
          ],
          phone: '+919876543200',
          whatsapp: '919876543200',
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#2A180B] via-[#3D2310] to-[#4A2E1A] text-white p-6 rounded-3xl border border-[#F58220]/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F58220] text-white flex items-center justify-center shadow-lg">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-xl text-white">AI GayaSeva Assistant</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F6C343] text-[#4A2E1A] font-extrabold text-[10px] uppercase">
                ADVANCED AI
              </span>
            </div>
            <p className="text-xs text-[#F8F6EF]/80 mt-1">
              Deep Knowledge of Gaya Ji, Bodh Gaya, 48 Vedis, Shradh Rites & Verified Services.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setSpeechEnabled(!speechEnabled)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              speechEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-gray-800 text-gray-400'
            }`}
          >
            {speechEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{speechEnabled ? 'Audio ON' : 'Audio OFF'}</span>
          </button>
          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
            title="Clear Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { label: '🚕 Station to Vishnupad Cab Fare', query: 'Station to Vishnupad cab fare' },
          { label: '🙏 Pinda Daan Ritual & Pandits', query: 'Pinda Daan process and Pandits' },
          { label: '🏨 Stays Near Vishnupad Temple', query: 'Hotels near Vishnupad temple' },
          { label: '📍 Bodh Gaya Mahabodhi Timings', query: 'Bodh Gaya Mahabodhi timings' },
          { label: '🛍️ Tilkut Bazaar & Shopping Malls', query: 'Famous Gaya Tilkut market' },
          { label: '🆘 Emergency & Hospital Helpline', query: 'Emergency hospital numbers' },
          { label: '🗺️ 1-Day & 2-Day Yatra Itinerary', query: 'Gaya 1 day trip plan' },
        ].map((chip) => (
          <button
            key={chip.label}
            onClick={() => handleSend(chip.query)}
            className="px-3.5 py-2 bg-white hover:bg-[#F8F6EF] border border-gray-200 hover:border-[#F58220] rounded-xl font-semibold text-[#4A2E1A] shadow-sm whitespace-nowrap transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-[#F58220]" />
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-sm h-[480px] overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm shadow-sm space-y-3 ${
              m.sender === 'USER' 
                ? 'bg-[#4A2E1A] text-white rounded-tr-none' 
                : 'bg-[#F8F6EF] text-[#4A2E1A] border border-gray-200 rounded-tl-none'
            }`}>
              {m.text && <p className="leading-relaxed whitespace-pre-line">{m.text}</p>}

              {m.card && (
                <div className="space-y-3">
                  <p className="leading-relaxed whitespace-pre-line">{m.card.text}</p>

                  {/* Inline Direct Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200/60">
                    {m.card.phone && (
                      <a
                        href={`tel:${m.card.phone}`}
                        className="px-3 py-1.5 bg-[#F58220] hover:bg-[#E07210] text-white font-extrabold text-[11px] rounded-lg shadow-sm flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" /> Call: {m.card.phone}
                      </a>
                    )}
                    {m.card.whatsapp && (
                      <a
                        href={`https://wa.me/${m.card.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-[11px] rounded-lg shadow-sm flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" /> WhatsApp
                      </a>
                    )}
                    {m.card.gpsQuery && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${m.card.gpsQuery}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-lg shadow-sm flex items-center gap-1"
                      >
                        <Navigation className="w-3 h-3" /> 1-Click GPS
                      </a>
                    )}
                  </div>

                  {/* Links */}
                  {m.card.links && m.card.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.card.links.map((link) => (
                        <Link
                          key={link.url}
                          href={link.url}
                          className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-200 text-[#4A2E1A] font-bold text-[11px] rounded-lg flex items-center gap-1 shadow-2xs"
                        >
                          {link.label} <ArrowRight className="w-3 h-3 text-[#F58220]" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <span className={`block text-[9px] ${m.sender === 'USER' ? 'text-gray-300 text-right' : 'text-gray-400'}`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <div className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-200 shadow-md">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Ask AI Assistant anything about Gaya Ji, Bodh Gaya, Cabs, Pandits..."
          className="flex-1 px-4 py-3 text-xs sm:text-sm focus:outline-none text-[#4A2E1A]"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={() => handleSend()}
          className="px-6 py-3 bg-[#F58220] hover:bg-[#E07210] text-white rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-md transition-all"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
}
