/**
 * GayaSeva Tiered Cache Manager
 * Designed for 100,000 Concurrent Active Users with SWR & Emergency High Traffic TTL Scaling
 */

export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  staleAt: number;
  tags?: string[];
}

export interface CacheOptions {
  ttlSeconds?: number;
  staleWhileRevalidateSeconds?: number;
  tags?: string[];
}

export class TieredCacheManager {
  private static instance: TieredCacheManager;
  private memoryCache: Map<string, CacheEntry<any>> = new Map();
  private maxMemoryItems: number = 10000; // LRU boundary
  private highTrafficMultiplier: number = 1;
  private metrics = {
    hits: 0,
    misses: 0,
    staleHits: 0,
    invalidations: 0,
  };

  private constructor() {}

  public static getInstance(): TieredCacheManager {
    if (!TieredCacheManager.instance) {
      TieredCacheManager.instance = new TieredCacheManager();
    }
    return TieredCacheManager.instance;
  }

  public setHighTrafficMode(enabled: boolean, multiplier: number = 5): void {
    this.highTrafficMultiplier = enabled ? multiplier : 1;
  }

  public set<T>(key: string, value: T, options: CacheOptions = {}): void {
    const ttl = (options.ttlSeconds || 60) * this.highTrafficMultiplier;
    const swr = options.staleWhileRevalidateSeconds || 30;
    const now = Date.now();

    // Evict LRU items if capacity reached
    if (this.memoryCache.size >= this.maxMemoryItems) {
      const oldestKey = this.memoryCache.keys().next().value;
      if (oldestKey) this.memoryCache.delete(oldestKey);
    }

    this.memoryCache.set(key, {
      value,
      expiresAt: now + ttl * 1000,
      staleAt: now + (ttl + swr) * 1000,
      tags: options.tags || [],
    });
  }

  public get<T>(key: string): { data: T | null; isStale: boolean } {
    const entry = this.memoryCache.get(key);
    if (!entry) {
      this.metrics.misses++;
      return { data: null, isStale: false };
    }

    const now = Date.now();
    if (now <= entry.expiresAt) {
      this.metrics.hits++;
      return { data: entry.value as T, isStale: false };
    } else if (now <= entry.staleAt) {
      this.metrics.staleHits++;
      return { data: entry.value as T, isStale: true };
    } else {
      this.memoryCache.delete(key);
      this.metrics.misses++;
      return { data: null, isStale: false };
    }
  }

  public async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const cached = this.get<T>(key);
    
    if (cached.data !== null && !cached.isStale) {
      return cached.data;
    }

    // If stale, return stale data immediately and revalidate asynchronously in background
    if (cached.data !== null && cached.isStale) {
      fetcher()
        .then((fresh) => this.set(key, fresh, options))
        .catch(() => {});
      return cached.data;
    }

    // Miss: Fetch fresh data synchronously
    const fresh = await fetcher();
    this.set(key, fresh, options);
    return fresh;
  }

  public invalidateTag(tag: string): void {
    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.tags && entry.tags.includes(tag)) {
        this.memoryCache.delete(key);
        this.metrics.invalidations++;
      }
    }
  }

  public invalidateKey(key: string): void {
    if (this.memoryCache.delete(key)) {
      this.metrics.invalidations++;
    }
  }

  public clear(): void {
    this.memoryCache.clear();
  }

  public getMetrics() {
    const totalRequests = this.metrics.hits + this.metrics.staleHits + this.metrics.misses;
    const hitRate = totalRequests > 0 
      ? Number((((this.metrics.hits + this.metrics.staleHits) / totalRequests) * 100).toFixed(2)) 
      : 100;
      
    return {
      size: this.memoryCache.size,
      maxItems: this.maxMemoryItems,
      highTrafficMultiplier: this.highTrafficMultiplier,
      hits: this.metrics.hits,
      staleHits: this.metrics.staleHits,
      misses: this.metrics.misses,
      hitRatePercent: hitRate,
      invalidations: this.metrics.invalidations,
    };
  }
}

export const cacheManager = TieredCacheManager.getInstance();
