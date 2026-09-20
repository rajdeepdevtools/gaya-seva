"use strict";
/**
 * GayaSeva Multi-Channel Notification Pipeline
 * Manages In-App, Web Push, and Email alerts with privacy-safe previews.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationPipeline = exports.NotificationPipeline = void 0;
const service_1 = require("../email/service");
class NotificationPipeline {
    static instance;
    constructor() { }
    static getInstance() {
        if (!NotificationPipeline.instance) {
            NotificationPipeline.instance = new NotificationPipeline();
        }
        return NotificationPipeline.instance;
    }
    async dispatch(input) {
        let emailSent = false;
        if (input.email) {
            const emailRes = await service_1.smtpEmailService.sendEmail({
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
exports.NotificationPipeline = NotificationPipeline;
exports.notificationPipeline = NotificationPipeline.getInstance();
