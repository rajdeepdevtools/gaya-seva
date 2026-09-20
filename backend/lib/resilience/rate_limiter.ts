/**
 * GayaSeva Multi-Level Rate Limiter
 * Sliding Window Token Bucket implementation protecting APIs, Auth, AI, and Admin against DDoS/surges.
 */

export type RateLimitCategory = 
  | 'PUBLIC_PAGE' 
  | 'API_SEARCH' 
  | 'AUTH_STRICT' 
  | 'AI_CHAT' 
  | 'ADMIN_PANEL';

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const DEFAULT_CONFIGS: Record<RateLimitCategory, RateLimitConfig> = {
  PUBLIC_PAGE: { windowMs: 60 * 1000, maxRequests: 120 },
  API_SEARCH: { windowMs: 60 * 1000, maxRequests: 40 },
  AUTH_STRICT: { windowMs: 60 * 1000, maxRequests: 5 },
  AI_CHAT: { windowMs: 60 * 1000, maxRequests: 10 },
  ADMIN_PANEL: { windowMs: 60 * 1000, maxRequests: 60 },
};

export class RateLimiter {
  private static instance: RateLimiter;
  private windows: Map<string, number[]> = new Map();
  private highTrafficMode: boolean = false;

  private constructor() {}

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  public setHighTrafficMode(enabled: boolean): void {
    this.highTrafficMode = enabled;
  }

  public check(
    identifier: string, 
    category: RateLimitCategory
  ): { allowed: boolean; current: number; limit: number; remaining: number; resetMs: number } {
    const config = DEFAULT_CONFIGS[category];
    let maxRequests = config.maxRequests;

    // Strict throttling during High Traffic Mode for heavy endpoints
    if (this.highTrafficMode && category === 'AI_CHAT') {
      maxRequests = 3; // Restrict expensive AI LLM queries during surges
    }

    const key = `${category}:${identifier}`;
    const now = Date.now();
    const windowStart = now - config.windowMs;

    let timestamps = this.windows.get(key) || [];
    // Remove expired timestamps outside the current sliding window
    timestamps = timestamps.filter((ts) => ts > windowStart);

    if (timestamps.length >= maxRequests) {
      const oldestTimestamp = timestamps[0];
      const resetMs = oldestTimestamp + config.windowMs - now;
      return {
        allowed: false,
        current: timestamps.length,
        limit: maxRequests,
        remaining: 0,
        resetMs: Math.max(resetMs, 0),
      };
    }

    timestamps.push(now);
    this.windows.set(key, timestamps);

    return {
      allowed: true,
      current: timestamps.length,
      limit: maxRequests,
      remaining: maxRequests - timestamps.length,
      resetMs: config.windowMs,
    };
  }

  public reset(identifier: string, category: RateLimitCategory): void {
    const key = `${category}:${identifier}`;
    this.windows.delete(key);
  }
}

export const rateLimiter = RateLimiter.getInstance();
