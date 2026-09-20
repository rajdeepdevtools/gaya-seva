/**
 * GayaSeva Provider Verification & Audit Subsystem
 * Manages provider statuses (PENDING | VERIFIED | REJECTED | SUSPENDED) and audit logging.
 */

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';

export interface ProviderVerificationInput {
  providerId: string;
  adminUserId: string;
  newStatus: VerificationStatus;
  rejectionReason?: string;
  adminPermissions: string[];
}

export interface VerificationLogRecord {
  adminUserId: string;
  action: string;
  section: string;
  targetId: string;
  metadata: Record<string, any>;
  timestamp: string;
}

export class ProviderVerificationEngine {
  private static instance: ProviderVerificationEngine;
  private auditLogs: VerificationLogRecord[] = [];

  private constructor() {}

  public static getInstance(): ProviderVerificationEngine {
    if (!ProviderVerificationEngine.instance) {
      ProviderVerificationEngine.instance = new ProviderVerificationEngine();
    }
    return ProviderVerificationEngine.instance;
  }

  /**
   * Only VERIFIED providers display the public "GayaSeva Verified" badge
   */
  public isVerifiedProvider(status: VerificationStatus): boolean {
    return status === 'VERIFIED';
  }

  /**
   * Update provider verification status with RBAC permission check and audit log creation
   */
  public updateVerificationStatus(input: ProviderVerificationInput): {
    success: boolean;
    status: VerificationStatus;
    auditLogId: string;
    error?: string;
  } {
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
    const log: VerificationLogRecord = {
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

  public getAuditLogs(): VerificationLogRecord[] {
    return [...this.auditLogs];
  }
}

export const providerVerificationEngine = ProviderVerificationEngine.getInstance();
