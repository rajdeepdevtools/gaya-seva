/**
 * GayaSeva Scoped Realtime GPS Tracking Engine
 * Restricts live GPS broadcasts exclusively to active ride channels (ride:{rideId}) and auto-cleans on completion.
 */

export interface LocationUpdate {
  rideId: string;
  driverId: string;
  lat: number;
  lng: number;
  timestamp: number;
}

export interface RideParticipant {
  rideId: string;
  customerId: string;
  driverId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export class RealtimeGPSTracker {
  private static instance: RealtimeGPSTracker;
  private activeChannels: Map<string, Set<string>> = new Map(); // rideId -> Set of socket/userIds
  private rideStates: Map<string, RideParticipant> = new Map();

  private constructor() {}

  public static getInstance(): RealtimeGPSTracker {
    if (!RealtimeGPSTracker.instance) {
      RealtimeGPSTracker.instance = new RealtimeGPSTracker();
    }
    return RealtimeGPSTracker.instance;
  }

  public registerRide(ride: RideParticipant): void {
    this.rideStates.set(ride.rideId, ride);
    this.activeChannels.set(ride.rideId, new Set());
  }

  public subscribeToRideChannel(rideId: string, userId: string): { success: boolean; reason?: string } {
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

  public publishLocation(update: LocationUpdate): { publishedCount: number; success: boolean } {
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

  public completeRide(rideId: string): void {
    const ride = this.rideStates.get(rideId);
    if (ride) {
      ride.status = 'COMPLETED';
    }
    // Clean up channel subscribers immediately
    this.activeChannels.delete(rideId);
    this.rideStates.delete(rideId);
  }

  public getActiveChannelCount(): number {
    return this.activeChannels.size;
  }
}

export const realtimeGPSTracker = RealtimeGPSTracker.getInstance();
