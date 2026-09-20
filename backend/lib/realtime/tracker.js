"use strict";
/**
 * GayaSeva Scoped Realtime GPS Tracking Engine
 * Restricts live GPS broadcasts exclusively to active ride channels (ride:{rideId}) and auto-cleans on completion.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.realtimeGPSTracker = exports.RealtimeGPSTracker = void 0;
class RealtimeGPSTracker {
    static instance;
    activeChannels = new Map(); // rideId -> Set of socket/userIds
    rideStates = new Map();
    constructor() { }
    static getInstance() {
        if (!RealtimeGPSTracker.instance) {
            RealtimeGPSTracker.instance = new RealtimeGPSTracker();
        }
        return RealtimeGPSTracker.instance;
    }
    registerRide(ride) {
        this.rideStates.set(ride.rideId, ride);
        this.activeChannels.set(ride.rideId, new Set());
    }
    subscribeToRideChannel(rideId, userId) {
        const ride = this.rideStates.get(rideId);
        if (!ride) {
            return { success: false, reason: 'Ride channel not found.' };
        }
        if (userId !== ride.customerId && userId !== ride.driverId) {
            return { success: false, reason: 'Unauthorized access to private ride channel.' };
        }
        const channel = this.activeChannels.get(rideId);
        if (channel) {
            channel.add(userId);
        }
        return { success: true };
    }
    publishLocation(update) {
        const ride = this.rideStates.get(update.rideId);
        if (!ride || ride.status !== 'IN_PROGRESS') {
            return { publishedCount: 0, success: false };
        }
        if (update.driverId !== ride.driverId) {
            return { publishedCount: 0, success: false };
        }
        const subscribers = this.activeChannels.get(update.rideId);
        const count = subscribers ? subscribers.size : 0;
        return { publishedCount: count, success: true };
    }
    completeRide(rideId) {
        const ride = this.rideStates.get(rideId);
        if (ride) {
            ride.status = 'COMPLETED';
        }
        // Clean up channel subscribers immediately
        this.activeChannels.delete(rideId);
        this.rideStates.delete(rideId);
    }
    getActiveChannelCount() {
        return this.activeChannels.size;
    }
}
exports.RealtimeGPSTracker = RealtimeGPSTracker;
exports.realtimeGPSTracker = RealtimeGPSTracker.getInstance();
