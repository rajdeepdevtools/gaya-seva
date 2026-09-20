/**
 * GayaSeva AI Assistant Protection & Knowledge Base Cache
 * Protects AI APIs against resource exhaustion and provides fast static answers for common Gaya queries.
 */

import { rateLimiter } from '../resilience/rate_limiter';
import { aiCircuitBreaker } from '../resilience/circuit_breaker';
import { cacheManager } from '../cache/manager';

const STATIC_FAQ_KNOWLEDGE_BASE: Record<string, string> = {
  'vishnupad': 'Vishnupad Temple is an ancient holy temple in Gaya Ji dedicated to Lord Vishnu, featuring his 40-cm footprint stamped in solid basalt rock. It is the central hub for Pinda Daan rituals during Pitru Paksha.',
  'bodh gaya': 'Bodh Gaya is located 12 km south of Gaya Ji and is the sacred pilgrimage site where Lord Buddha attained enlightenment under the Mahabodhi Tree.',
  'falgu river': 'The Falgu River flows past Gaya Ji and holds deep spiritual significance for Pinda Daan rituals, where pilgrims offer sacred oblations for ancestor salvation.',
  'services': 'GayaSeva offers verified local services including Pick & Drop Taxis/Autos, Licensed Pandits for Pinda Daan, Hotel & Guest House Booking, and Local Guides.',
  'pitru paksha': 'Pitru Paksha is a 16-lunar day period in the Hindu calendar when homage is paid to ancestors through Pinda Daan offerings at Vishnupad Temple and Falgu River in Gaya Ji.',
};

export class AIAssistantProtectionEngine {
  private static instance: AIAssistantProtectionEngine;

  private constructor() {}

  public static getInstance(): AIAssistantProtectionEngine {
    if (!AIAssistantProtectionEngine.instance) {
      AIAssistantProtectionEngine.instance = new AIAssistantProtectionEngine();
    }
    return AIAssistantProtectionEngine.instance;
  }

  public async query(userId: string, prompt: string): Promise<{
    response: string;
    source: 'KNOWLEDGE_CACHE' | 'AI_MODEL' | 'FALLBACK';
  }> {
    // 1. Check Rate Limits
    const rateCheck = rateLimiter.check(userId, 'AI_CHAT');
    if (!rateCheck.allowed) {
      return {
        response: 'AI query rate limit reached. Please wait a moment or browse our Gaya Guide pages directly.',
        source: 'FALLBACK',
      };
    }

    // 2. Check Static Knowledge Base Cache for common queries
    const normalized = prompt.toLowerCase();
    for (const [topic, answer] of Object.entries(STATIC_FAQ_KNOWLEDGE_BASE)) {
      if (normalized.includes(topic)) {
        return { response: answer, source: 'KNOWLEDGE_CACHE' };
      }
    }

    // 3. Execute via Circuit Breaker with Fallback
    return await aiCircuitBreaker.execute<{ response: string; source: 'AI_MODEL' | 'FALLBACK' }>(
      async () => {
        // Simulated AI LLM Model Call
        return {
          response: `[GayaSeva AI Assistant]: Thank you for asking about "${prompt}". Gaya Ji is welcoming pilgrims with verified local services, Pandits, and Pick & Drop facilities.`,
          source: 'AI_MODEL',
        };
      },
      async () => {
        return {
          response: 'Our AI Assistant is currently experiencing high demand. Please explore the Gaya Guide section for comprehensive pilgrimage and local service information.',
          source: 'FALLBACK',
        };
      }
    );
  }
}

export const aiProtectionEngine = AIAssistantProtectionEngine.getInstance();
