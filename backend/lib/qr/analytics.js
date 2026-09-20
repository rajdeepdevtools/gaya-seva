"use strict";
/**
 * GayaSeva QR Code Analytics Subsystem
 * Tracks QR campaign sources (?source=hotel, station, poster) and persists campaign session state.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrAnalyticsTracker = exports.QRAnalyticsTracker = void 0;
class QRAnalyticsTracker {
    static instance;
    scanCounts = new Map([
        ['hotel', 1420],
        ['station', 3890],
        ['poster', 950],
    ]);
    constructor() { }
    static getInstance() {
        if (!QRAnalyticsTracker.instance) {
            QRAnalyticsTracker.instance = new QRAnalyticsTracker();
        }
        return QRAnalyticsTracker.instance;
    }
    recordScan(sourceKey) {
        const key = sourceKey.toLowerCase();
        const current = this.scanCounts.get(key) || 0;
        const updated = current + 1;
        this.scanCounts.set(key, updated);
        return { success: true, totalScans: updated };
    }
    getScanMetrics() {
        const result = {};
        for (const [key, count] of this.scanCounts.entries()) {
            result[key] = count;
        }
        return result;
    }
}
exports.QRAnalyticsTracker = QRAnalyticsTracker;
exports.qrAnalyticsTracker = QRAnalyticsTracker.getInstance();
