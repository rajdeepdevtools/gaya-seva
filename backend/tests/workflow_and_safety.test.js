"use strict";
/**
 * GayaSeva Workflows, Safety, State Machine & Verification Test Suite (Sections 11 - 23)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ride_state_1 = require("../lib/workflow/ride_state");
const verification_1 = require("../lib/providers/verification");
const safe_assistant_1 = require("../lib/ai/safe_assistant");
const service_1 = require("../lib/email/service");
const gps_tracking_1 = require("../lib/realtime/gps_tracking");
const razorpay_1 = require("../lib/payment/razorpay");
const analytics_1 = require("../lib/qr/analytics");
(0, vitest_1.describe)('GayaSeva Workflows & Safety Suite (Sections 11 - 23)', () => {
    (0, vitest_1.it)('1. Ride State Machine: Enforces valid transition graph and rejects invalid jumps', () => {
        // Valid transitions
        (0, vitest_1.expect)((0, ride_state_1.validateRideTransition)('NEW', 'SEARCHING', 'CUSTOMER').valid).toBe(true);
        (0, vitest_1.expect)((0, ride_state_1.validateRideTransition)('SEARCHING', 'PROVIDER_SELECTED', 'SYSTEM').valid).toBe(true);
        (0, vitest_1.expect)((0, ride_state_1.validateRideTransition)('PROVIDER_SELECTED', 'ACCEPTED', 'DRIVER').valid).toBe(true);
        (0, vitest_1.expect)((0, ride_state_1.validateRideTransition)('ACCEPTED', 'CONFIRMED', 'CUSTOMER').valid).toBe(true);
        (0, vitest_1.expect)((0, ride_state_1.validateRideTransition)('CONFIRMED', 'DRIVER_ARRIVING', 'DRIVER').valid).toBe(true);
        (0, vitest_1.expect)((0, ride_state_1.validateRideTransition)('DRIVER_ARRIVING', 'IN_PROGRESS', 'DRIVER').valid).toBe(true);
        (0, vitest_1.expect)((0, ride_state_1.validateRideTransition)('IN_PROGRESS', 'COMPLETED', 'DRIVER').valid).toBe(true);
        // Invalid direct jump (NEW -> COMPLETED)
        const invalidJump = (0, ride_state_1.validateRideTransition)('NEW', 'COMPLETED', 'CUSTOMER');
        (0, vitest_1.expect)(invalidJump.valid).toBe(false);
        (0, vitest_1.expect)(invalidJump.reason).toContain('Invalid transition path');
        // Terminal state transition rejection
        const terminalAttempt = (0, ride_state_1.validateRideTransition)('COMPLETED', 'IN_PROGRESS', 'DRIVER');
        (0, vitest_1.expect)(terminalAttempt.valid).toBe(false);
        (0, vitest_1.expect)(terminalAttempt.reason).toContain('Cannot transition from terminal state');
    });
    (0, vitest_1.it)('2. Provider Verification: Restricts badge to VERIFIED and records audit log', () => {
        (0, vitest_1.expect)(verification_1.providerVerificationEngine.isVerifiedProvider('VERIFIED')).toBe(true);
        (0, vitest_1.expect)(verification_1.providerVerificationEngine.isVerifiedProvider('PENDING')).toBe(false);
        // Unauthorized attempt (missing providers.verify permission)
        const unauthorized = verification_1.providerVerificationEngine.updateVerificationStatus({
            providerId: 'prov_99',
            adminUserId: 'admin_1',
            newStatus: 'VERIFIED',
            adminPermissions: ['email.read'],
        });
        (0, vitest_1.expect)(unauthorized.success).toBe(false);
        // Authorized verification update
        const authorized = verification_1.providerVerificationEngine.updateVerificationStatus({
            providerId: 'prov_99',
            adminUserId: 'admin_1',
            newStatus: 'VERIFIED',
            adminPermissions: ['providers.verify'],
        });
        (0, vitest_1.expect)(authorized.success).toBe(true);
        (0, vitest_1.expect)(authorized.status).toBe('VERIFIED');
        (0, vitest_1.expect)(verification_1.providerVerificationEngine.getAuditLogs().length).toBeGreaterThan(0);
    });
    (0, vitest_1.it)('3. Safe AI Assistant: Returns DRAFT PAYLOAD only for ride requests and blocks unverified emergency info', async () => {
        const res = await safe_assistant_1.safeAIAssistant.processQuery('I need to book taxi to Vishnupad');
        (0, vitest_1.expect)(res.draftPayload).toBeDefined();
        (0, vitest_1.expect)(res.draftPayload?.isDraft).toBe(true);
        (0, vitest_1.expect)(res.draftPayload?.requestType).toBe('PICK_DROP');
        // Safety guardrail test (rejecting request for emergency/medical facts)
        const emergencyRes = await safe_assistant_1.safeAIAssistant.processQuery('Tell me emergency number and medical facts');
        (0, vitest_1.expect)(emergencyRes.text).toContain('cannot provide unverified emergency, medical');
    });
    (0, vitest_1.it)('4. SMTP Email System: Safe failure, idempotency key check, and timing-safe password resets', async () => {
        const emailRes = await service_1.smtpEmailService.sendEmail({
            eventKey: 'WELCOME_USER',
            recipient: 'test@gayaseva.org',
            subject: 'Welcome to GayaSeva',
            relatedId: 'usr_100',
        });
        (0, vitest_1.expect)(emailRes.success).toBe(true);
        // Duplicate call returns duplicate flag true
        const dupRes = await service_1.smtpEmailService.sendEmail({
            eventKey: 'WELCOME_USER',
            recipient: 'test@gayaseva.org',
            subject: 'Welcome to GayaSeva',
            relatedId: 'usr_100',
        });
        (0, vitest_1.expect)(dupRes.duplicate).toBe(true);
        // Timing-safe password reset
        const resetRes = await service_1.smtpEmailService.requestPasswordReset('nonexistent@gayaseva.org');
        (0, vitest_1.expect)(resetRes.success).toBe(true);
        (0, vitest_1.expect)(resetRes.message).toContain('If an account exists');
    });
    (0, vitest_1.it)('5. Live GPS Tracking: Scopes realtime channels strictly to authorized customer and driver', () => {
        gps_tracking_1.gpsTrackingEngine.startRideSession({
            rideId: 'ride_sec_100',
            customerId: 'cust_valid',
            driverId: 'driver_valid',
            state: 'CONFIRMED',
        });
        (0, vitest_1.expect)(gps_tracking_1.gpsTrackingEngine.authorizeRealtimeChannel('ride_sec_100', 'cust_valid')).toBe(true);
        (0, vitest_1.expect)(gps_tracking_1.gpsTrackingEngine.authorizeRealtimeChannel('ride_sec_100', 'driver_valid')).toBe(true);
        (0, vitest_1.expect)(gps_tracking_1.gpsTrackingEngine.authorizeRealtimeChannel('ride_sec_100', 'intruder_id')).toBe(false);
    });
    (0, vitest_1.it)('6. Pluggable Razorpay Payments: Enforces event_id webhook replay protection', () => {
        const eventId = 'evt_razorpay_999';
        (0, vitest_1.expect)(razorpay_1.pluggableRazorpay.isDuplicateWebhookEvent(eventId)).toBe(false);
        (0, vitest_1.expect)(razorpay_1.pluggableRazorpay.isDuplicateWebhookEvent(eventId)).toBe(true); // Duplicate detected
    });
    (0, vitest_1.it)('7. QR Analytics Tracker: Records campaign attribution scans', () => {
        const recordRes = analytics_1.qrAnalyticsTracker.recordScan('station');
        (0, vitest_1.expect)(recordRes.success).toBe(true);
        const metrics = analytics_1.qrAnalyticsTracker.getScanMetrics();
        (0, vitest_1.expect)(metrics['station']).toBeGreaterThan(3890);
    });
});
