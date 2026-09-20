"use strict";
/**
 * GayaSeva Provider Verification & Audit Subsystem
 * Manages provider statuses (PENDING | VERIFIED | REJECTED | SUSPENDED) and audit logging.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerVerificationEngine = exports.ProviderVerificationEngine = void 0;
class ProviderVerificationEngine {
    static instance;
    auditLogs = [];
    constructor() { }
    static getInstance() {
        if (!ProviderVerificationEngine.instance) {
            ProviderVerificationEngine.instance = new ProviderVerificationEngine();
        }
        return ProviderVerificationEngine.instance;
    }
    /**
     * Only VERIFIED providers display the public "GayaSeva Verified" badge
     */
    isVerifiedProvider(status) {
        return status === 'VERIFIED';
    }
    /**
     * Update provider verification status with RBAC permission check and audit log creation
     */
    updateVerificationStatus(input) {
        // Permission check
        if (!input.adminPermissions.includes('providers.verify') && !input.adminPermissions.includes('SUPER_ADMIN')) {
            return {
                success: false,
                status: 'PENDING',
                auditLogId: '',
                error: 'Unauthorized: Missing required provider.verify permission.',
            };
        }
        const auditLogId = `log_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        const log = {
            adminUserId: input.adminUserId,
            action: `VERIFICATION_STATUS_CHANGED_TO_${input.newStatus}`,
            section: 'PROVIDERS',
            targetId: input.providerId,
            metadata: {
                newStatus: input.newStatus,
                rejectionReason: input.rejectionReason || null,
            },
            timestamp: new Date().toISOString(),
        };
        this.auditLogs.push(log);
        return {
            success: true,
            status: input.newStatus,
            auditLogId,
        };
    }
    getAuditLogs() {
        return [...this.auditLogs];
    }
}
exports.ProviderVerificationEngine = ProviderVerificationEngine;
exports.providerVerificationEngine = ProviderVerificationEngine.getInstance();
