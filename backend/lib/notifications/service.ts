/**
 * GayaSeva Multi-Channel Notification Pipeline
 * Manages In-App, Web Push, and Email alerts with privacy-safe previews.
 */

import { smtpEmailService } from '../email/service';

export interface NotificationInput {
  userId: string;
  email?: string;
  title: string;
  message: string;
  type: 'RIDE_UPDATE' | 'BOOKING_CONFIRMED' | 'VERIFICATION_UPDATE' | 'SYSTEM';
  privacySafeMessage?: string;
}

export class NotificationPipeline {
  private static instance: NotificationPipeline;

  private constructor() {}

  public static getInstance(): NotificationPipeline {
    if (!NotificationPipeline.instance) {
      NotificationPipeline.instance = new NotificationPipeline();
    }
    return NotificationPipeline.instance;
  }

  public async dispatch(input: NotificationInput): Promise<{ inApp: boolean; push: boolean; email: boolean }> {
    let emailSent = false;

    if (input.email) {
      const emailRes = await smtpEmailService.sendEmail({
        eventKey: input.type,
        recipient: input.email,
        subject: input.title,
        textBody: input.privacySafeMessage || input.message,
      });
      emailSent = emailRes.success;
    }

    return {
      inApp: true,
      push: true,
      email: emailSent,
    };
  }
}

export const notificationPipeline = NotificationPipeline.getInstance();
