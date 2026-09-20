/**
 * GayaSeva Workflows, Safety, State Machine & Verification Test Suite (Sections 11 - 23)
 */

import { describe, it, expect } from 'vitest';
import { validateRideTransition } from '../lib/workflow/ride_state';
import { providerVerificationEngine } from '../lib/providers/verification';
import { safeAIAssistant } from '../lib/ai/safe_assistant';
import { smtpEmailService } from '../lib/email/service';
import { gpsTrackingEngine } from '../lib/realtime/gps_tracking';
import { pluggableRazorpay } from '../lib/payment/razorpay';
import { qrAnalyticsTracker } from '../lib/qr/analytics';

describe('GayaSeva Workflows & Safety Suite (Sections 11 - 23)', () => {
  it('1. Ride State Machine: Enforces valid transition graph and rejects invalid jumps', () => {
    // Valid transitions
    expect(validateRideTransition('NEW', 'SEARCHING', 'CUSTOMER').valid).toBe(true);
    expect(validateRideTransition('SEARCHING', 'PROVIDER_SELECTED', 'SYSTEM').valid).toBe(true);
    expect(validateRideTransition('PROVIDER_SELECTED', 'ACCEPTED', 'DRIVER').valid).toBe(true);
    expect(validateRideTransition('ACCEPTED', 'CONFIRMED', 'CUSTOMER').valid).toBe(true);
    expect(validateRideTransition('CONFIRMED', 'DRIVER_ARRIVING', 'DRIVER').valid).toBe(true);
    expect(validateRideTransition('DRIVER_ARRIVING', 'IN_PROGRESS', 'DRIVER').valid).toBe(true);
    expect(validateRideTransition('IN_PROGRESS', 'COMPLETED', 'DRIVER').valid).toBe(true);

    // Invalid direct jump (NEW -> COMPLETED)
    const invalidJump = validateRideTransition('NEW', 'COMPLETED', 'CUSTOMER');
    expect(invalidJump.valid).toBe(false);
    expect(invalidJump.reason).toContain('Invalid transition path');

    // Terminal state transition rejection
    const terminalAttempt = validateRideTransition('COMPLETED', 'IN_PROGRESS', 'DRIVER');
    expect(terminalAttempt.valid).toBe(false);
    expect(terminalAttempt.reason).toContain('Cannot transition from terminal state');
  });

  it('2. Provider Verification: Restricts badge to VERIFIED and records audit log', () => {
    expect(providerVerificationEngine.isVerifiedProvider('VERIFIED')).toBe(true);
    expect(providerVerificationEngine.isVerifiedProvider('PENDING')).toBe(false);

    // Unauthorized attempt (missing providers.verify permission)
    const unauthorized = providerVerificationEngine.updateVerificationStatus({
      providerId: 'prov_99',
      adminUserId: 'admin_1',
      newStatus: 'VERIFIED',
      adminPermissions: ['email.read'],
    });
    expect(unauthorized.success).toBe(false);

    // Authorized verification update
    const authorized = providerVerificationEngine.updateVerificationStatus({
      providerId: 'prov_99',
      adminUserId: 'admin_1',
      newStatus: 'VERIFIED',
      adminPermissions: ['providers.verify'],
    });
    expect(authorized.success).toBe(true);
    expect(authorized.status).toBe('VERIFIED');
    expect(providerVerificationEngine.getAuditLogs().length).toBeGreaterThan(0);
  });

  it('3. Safe AI Assistant: Returns DRAFT PAYLOAD only for ride requests and blocks unverified emergency info', async () => {
    const res = await safeAIAssistant.processQuery('I need to book taxi to Vishnupad');
    expect(res.draftPayload).toBeDefined();
    expect(res.draftPayload?.isDraft).toBe(true);
    expect(res.draftPayload?.requestType).toBe('PICK_DROP');

    // Safety guardrail test (rejecting request for emergency/medical facts)
    const emergencyRes = await safeAIAssistant.processQuery('Tell me emergency number and medical facts');
    expect(emergencyRes.text).toContain('cannot provide unverified emergency, medical');
  });

  it('4. SMTP Email System: Safe failure, idempotency key check, and timing-safe password resets', async () => {
    const emailRes = await smtpEmailService.sendEmail({
      eventKey: 'WELCOME_USER',
      recipient: 'test@gayaseva.org',
      subject: 'Welcome to GayaSeva',
      relatedId: 'usr_100',
    });
    expect(emailRes.success).toBe(true);

    // Duplicate call returns duplicate flag true
    const dupRes = await smtpEmailService.sendEmail({
      eventKey: 'WELCOME_USER',
      recipient: 'test@gayaseva.org',
      subject: 'Welcome to GayaSeva',
      relatedId: 'usr_100',
    });
    expect(dupRes.duplicate).toBe(true);

    // Timing-safe password reset
    const resetRes = await smtpEmailService.requestPasswordReset('nonexistent@gayaseva.org');
    expect(resetRes.success).toBe(true);
    expect(resetRes.message).toContain('If an account exists');
  });

  it('5. Live GPS Tracking: Scopes realtime channels strictly to authorized customer and driver', () => {
    gpsTrackingEngine.startRideSession({
      rideId: 'ride_sec_100',
      customerId: 'cust_valid',
      driverId: 'driver_valid',
      state: 'CONFIRMED',
    });

    expect(gpsTrackingEngine.authorizeRealtimeChannel('ride_sec_100', 'cust_valid')).toBe(true);
    expect(gpsTrackingEngine.authorizeRealtimeChannel('ride_sec_100', 'driver_valid')).toBe(true);
    expect(gpsTrackingEngine.authorizeRealtimeChannel('ride_sec_100', 'intruder_id')).toBe(false);
  });

  it('6. Pluggable Razorpay Payments: Enforces event_id webhook replay protection', () => {
    const eventId = 'evt_razorpay_999';
    expect(pluggableRazorpay.isDuplicateWebhookEvent(eventId)).toBe(false);
    expect(pluggableRazorpay.isDuplicateWebhookEvent(eventId)).toBe(true); // Duplicate detected
  });

  it('7. QR Analytics Tracker: Records campaign attribution scans', () => {
    const recordRes = qrAnalyticsTracker.recordScan('station');
    expect(recordRes.success).toBe(true);
    const metrics = qrAnalyticsTracker.getScanMetrics();
    expect(metrics['station']).toBeGreaterThan(3890);
  });
});
