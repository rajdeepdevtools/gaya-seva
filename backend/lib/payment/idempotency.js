"use strict";
/**
 * GayaSeva Idempotency & Razorpay Payment State Machine Subsystem
 * Guarantees duplicate-safe payment & booking processing under high concurrency.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMachine = exports.RazorpayPaymentStateMachine = exports.idempotencyEngine = exports.IdempotencyEngine = void 0;
const crypto_1 = __importDefault(require("crypto"));
class IdempotencyEngine {
    static instance;
    records = new Map();
    inFlightKeys = new Set();
    ttlMs = 24 * 60 * 60 * 1000; // 24 Hours TTL
    constructor() { }
    static getInstance() {
        if (!IdempotencyEngine.instance) {
            IdempotencyEngine.instance = new IdempotencyEngine();
        }
        return IdempotencyEngine.instance;
    }
    getRecord(key) {
        const record = this.records.get(key);
        if (record && Date.now() - record.createdAt > this.ttlMs) {
            this.records.delete(key);
            return undefined;
        }
        return record;
    }
    startExecution(key) {
        const record = this.getRecord(key);
        if (record) {
            return { isDuplicate: true, cachedResponse: record };
        }
        if (this.inFlightKeys.has(key)) {
            return {
                isDuplicate: true,
                cachedResponse: {
                    statusCode: 409,
                    responseBody: { error: 'Request is currently processing concurrently.' }
                }
            };
        }
        this.inFlightKeys.add(key);
        return { isDuplicate: false };
    }
    saveRecord(key, statusCode, responseBody) {
        this.inFlightKeys.delete(key);
        this.records.set(key, {
            key,
            statusCode,
            responseBody,
            createdAt: Date.now(),
        });
    }
    clearInFlight(key) {
        this.inFlightKeys.delete(key);
    }
}
exports.IdempotencyEngine = IdempotencyEngine;
exports.idempotencyEngine = IdempotencyEngine.getInstance();
class RazorpayPaymentStateMachine {
    webhookSecret;
    constructor(secret = 'test_webhook_secret_gayaseva') {
        this.webhookSecret = secret;
    }
    createOrder(input) {
        const execution = exports.idempotencyEngine.startExecution(input.idempotencyKey);
        if (execution.isDuplicate) {
            return { isDuplicate: true, cachedResponse: execution.cachedResponse };
        }
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        const orderData = {
            orderId,
            requestId: input.requestId,
            customerId: input.customerId,
            amount: input.amountInRupees * 100, // In Paise
            currency: 'INR',
            status: 'CREATED',
            createdAt: new Date().toISOString(),
        };
        const response = { isDuplicate: false, statusCode: 200, responseBody: orderData };
        exports.idempotencyEngine.saveRecord(input.idempotencyKey, 200, response);
        return response;
    }
    verifyWebhookSignature(payload) {
        const text = `${payload.razorpay_order_id}|${payload.razorpay_payment_id}`;
        const expectedSignature = crypto_1.default
            .createHmac('sha256', this.webhookSecret)
            .update(text)
            .digest('hex');
        // Constant time comparison to prevent timing attacks
        return crypto_1.default.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(payload.razorpay_signature));
    }
}
exports.RazorpayPaymentStateMachine = RazorpayPaymentStateMachine;
exports.paymentMachine = new RazorpayPaymentStateMachine();
