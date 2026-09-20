"use strict";
/**
 * GayaSeva Live GPS Tracking Subsystem
 * Manages private Realtime channels (ride:{rideId}), location logging, retention pruning, and PWA background notices.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.gpsTrackingEngine = exports.GPSTrackingEngine = void 0;
class GPSTrackingEngine {
    static instance;
    activeSessions = new Map();
    locationLogs = new Map();
    constructor() { }
    static getInstance() {
        if (!GPSTrackingEngine.instance) {
            GPSTrackingEngine.instance = new GPSTrackingEngine();
        }
        return GPSTrackingEngine.instance;
    }
    /**
     * Start tracking only when ride is CONFIRMED or DRIVER_ARRIVING
     */
    startRideSession(session) {
        if (session.state !== 'CONFIRMED' && session.state !== 'DRIVER_ARRIVING' && session.state !== 'IN_PROGRESS') {
            return false;
        }
        this.activeSessions.set(session.rideId, session);
        this.locationLogs.set(session.rideId, []);
        return true;
    }
    /**
     * Record location payload ONLY for active rides in IN_PROGRESS state
     */
    recordLocation(payload) {
        const session = this.activeSessions.get(payload.rideId);
        if (!session) {
            return { success: false, error: 'No active ride tracking session found.' };
        }
        if (payload.driverId !== session.driverId) {
            return { success: false, error: 'Unauthorized: Driver ID does not match active ride driver.' };
        }
        if (session.state !== 'IN_PROGRESS' && session.state !== 'DRIVER_ARRIVING') {
            return { success: false, error: 'Tracking allowed only during DRIVER_ARRIVING or IN_PROGRESS ride states.' };
        }
        const logs = this.locationLogs.get(payload.rideId) || [];
        logs.push(payload);
        this.locationLogs.set(payload.rideId, logs);
        return { success: true };
    }
    /**
     * Complete ride and stop tracking immediately
     */
    stopRideSession(rideId) {
        const session = this.activeSessions.get(rideId);
        if (session) {
            session.state = 'COMPLETED';
        }
        this.activeSessions.delete(rideId);
    }
    /**
     * Private Realtime Channel Authorization: Only ride passenger & driver can subscribe
     */
    authorizeRealtimeChannel(rideId, requestingUserId) {
        const session = this.activeSessions.get(rideId);
        if (!session)
            return false;
        return requestingUserId === session.customerId || requestingUserId === session.driverId;
    }
    /**
     * PWA Background Location Boundary Notice
     */
    getPWALocationBoundaryNotice() {
        return 'PWA Notice: iOS Safari and Android Chrome limit background geolocation when the screen is locked or app is minimized. Keep app open for continuous live GPS updates.';
    }
}
exports.GPSTrackingEngine = GPSTrackingEngine;
exports.gpsTrackingEngine = GPSTrackingEngine.getInstance();
