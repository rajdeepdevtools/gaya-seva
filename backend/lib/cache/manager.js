"use strict";
/**
 * GayaSeva Tiered Cache Manager
 * Designed for 100,000 Concurrent Active Users with SWR & Emergency High Traffic TTL Scaling
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheManager = exports.TieredCacheManager = void 0;
class TieredCacheManager {
    static instance;
    memoryCache = new Map();
    maxMemoryItems = 10000; // LRU boundary
    highTrafficMultiplier = 1;
    metrics = {
        hits: 0,
        misses: 0,
        staleHits: 0,
        invalidations: 0,
    };
    constructor() { }
    static getInstance() {
        if (!TieredCacheManager.instance) {
            TieredCacheManager.instance = new TieredCacheManager();
        }
        return TieredCacheManager.instance;
    }
    setHighTrafficMode(enabled, multiplier = 5) {
        this.highTrafficMultiplier = enabled ? multiplier : 1;
    }
    set(key, value, options = {}) {
        const ttl = (options.ttlSeconds || 60) * this.highTrafficMultiplier;
        const swr = options.staleWhileRevalidateSeconds || 30;
        const now = Date.now();
        // Evict LRU items if capacity reached
        if (this.memoryCache.size >= this.maxMemoryItems) {
            const oldestKey = this.memoryCache.keys().next().value;
            if (oldestKey)
                this.memoryCache.delete(oldestKey);
        }
        this.memoryCache.set(key, {
            value,
            expiresAt: now + ttl * 1000,
            staleAt: now + (ttl + swr) * 1000,
            tags: options.tags || [],
        });
    }
    get(key) {
        const entry = this.memoryCache.get(key);
        if (!entry) {
            this.metrics.misses++;
            return { data: null, isStale: false };
        }
        const now = Date.now();
        if (now <= entry.expiresAt) {
            this.metrics.hits++;
            return { data: entry.value, isStale: false };
        }
        else if (now <= entry.staleAt) {
            this.metrics.staleHits++;
            return { data: entry.value, isStale: true };
        }
        else {
            this.memoryCache.delete(key);
            this.metrics.misses++;
            return { data: null, isStale: false };
        }
    }
    async getOrSet(key, fetcher, options = {}) {
        const cached = this.get(key);
        if (cached.data !== null && !cached.isStale) {
            return cached.data;
        }
        // If stale, return stale data immediately and revalidate asynchronously in background
        if (cached.data !== null && cached.isStale) {
            fetcher()
                .then((fresh) => this.set(key, fresh, options))
                .catch(() => { });
            return cached.data;
        }
        // Miss: Fetch fresh data synchronously
        const fresh = await fetcher();
        this.set(key, fresh, options);
        return fresh;
    }
    invalidateTag(tag) {
        for (const [key, entry] of this.memoryCache.entries()) {
            if (entry.tags && entry.tags.includes(tag)) {
                this.memoryCache.delete(key);
                this.metrics.invalidations++;
            }
        }
    }
    invalidateKey(key) {
        if (this.memoryCache.delete(key)) {
            this.metrics.invalidations++;
        }
    }
    clear() {
        this.memoryCache.clear();
    }
    getMetrics() {
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
exports.TieredCacheManager = TieredCacheManager;
exports.cacheManager = TieredCacheManager.getInstance();
