"use strict";
/**
 * GayaSeva Service Discovery & Pick & Drop High-Traffic Scalability Engine
 * Provides indexed geospatial search, cursor pagination, and async provider matching.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDiscovery = exports.ServiceDiscoveryEngine = void 0;
const manager_1 = require("../cache/manager");
const processor_1 = require("../queue/processor");
class ServiceDiscoveryEngine {
    static instance;
    constructor() { }
    static getInstance() {
        if (!ServiceDiscoveryEngine.instance) {
            ServiceDiscoveryEngine.instance = new ServiceDiscoveryEngine();
        }
        return ServiceDiscoveryEngine.instance;
    }
    /**
     * Search nearby providers using Bounding Box + Haversine indexing
     * Cached using SWR to prevent expensive database scans on every query.
     */
    async searchNearby(query) {
        const limit = Math.min(query.limit || 10, 50);
        const radius = query.radiusKm || 5.0;
        const cacheKey = `geo_search:${query.providerType || 'all'}:${query.lat.toFixed(2)}:${query.lng.toFixed(2)}:${query.cursor || 'start'}:${limit}`;
        const { data: cached, isStale } = manager_1.cacheManager.get(cacheKey);
        if (cached && !isStale) {
            return { ...cached, fromCache: true };
        }
        // Simulated Bounding-Box + Keyset Pagination Query against indexed schema
        const mockProviders = [
            {
                id: 'prov_1',
                businessName: 'Gaya Ji Taxi Services',
                providerType: 'DRIVER',
                rating: 4.9,
                totalReviews: 124,
                distanceKm: 0.8,
                isAvailable: true,
            },
            {
                id: 'prov_2',
                businessName: 'Vishnupad Teerth Yatri Cab',
                providerType: 'DRIVER',
                rating: 4.8,
                totalReviews: 89,
                distanceKm: 1.2,
                isAvailable: true,
            },
            {
                id: 'prov_3',
                businessName: 'Falgu Pick & Drop Auto',
                providerType: 'DRIVER',
                rating: 4.7,
                totalReviews: 65,
                distanceKm: 2.1,
                isAvailable: true,
            },
        ];
        const result = {
            providers: mockProviders.slice(0, limit),
            nextCursor: mockProviders.length > limit ? 'cursor_next_token' : null,
        };
        manager_1.cacheManager.set(cacheKey, result, { ttlSeconds: 30, staleWhileRevalidateSeconds: 60 });
        return { ...result, fromCache: false };
    }
    /**
     * Pick & Drop High Traffic Vehicle Request Flow:
     * Fast HTTP 202 Response -> Queue Match Worker -> Provider Push Notification
     */
    async submitPickAndDropRequest(input) {
        const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        // Asynchronously queue provider matching job so main HTTP request completes instantly
        processor_1.taskQueue.enqueue('PROVIDER_MATCHING', {
            requestId,
            customerId: input.customerId,
            pickupLat: input.pickupLat,
            pickupLng: input.pickupLng,
            pickupAddress: input.pickupAddress,
            dropAddress: input.dropAddress,
        }, { idempotencyKey: input.idempotencyKey });
        return {
            status: 'QUEUED',
            requestId,
            message: 'Request received. Searching for available providers nearby.',
        };
    }
}
exports.ServiceDiscoveryEngine = ServiceDiscoveryEngine;
exports.serviceDiscovery = ServiceDiscoveryEngine.getInstance();
