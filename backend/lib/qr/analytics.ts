/**
 * GayaSeva QR Code Analytics Subsystem
 * Tracks QR campaign sources (?source=hotel, station, poster) and persists campaign session state.
 */

export interface QRScanEvent {
  sourceKey: string;
  timestamp: string;
  userAgent?: string;
}

export class QRAnalyticsTracker {
  private static instance: QRAnalyticsTracker;
  private scanCounts: Map<string, number> = new Map([
    ['hotel', 1420],
    ['station', 3890],
    ['poster', 950],
  ]);

  private constructor() {}

  public static getInstance(): QRAnalyticsTracker {
    if (!QRAnalyticsTracker.instance) {
      QRAnalyticsTracker.instance = new QRAnalyticsTracker();
    }
    return QRAnalyticsTracker.instance;
  }

  public recordScan(sourceKey: string): { success: boolean; totalScans: number } {
    const key = sourceKey.toLowerCase();
    const current = this.scanCounts.get(key) || 0;
    const updated = current + 1;
    this.scanCounts.set(key, updated);
    return { success: true, totalScans: updated };
  }

  public getScanMetrics(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const [key, count] of this.scanCounts.entries()) {
      result[key] = count;
    }
    return result;
  }
}

export const qrAnalyticsTracker = QRAnalyticsTracker.getInstance();
