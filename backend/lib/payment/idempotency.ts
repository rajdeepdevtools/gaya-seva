/**
 * GayaSeva Idempotency & Razorpay Payment State Machine Subsystem
 * Guarantees duplicate-safe payment & booking processing under high concurrency.
 */

import crypto from 'crypto';

export interface IdempotencyRecord {
  key: string;
  statusCode: number;
  responseBody: any;
  createdAt: number;
}

export class IdempotencyEngine {
  private static instance: IdempotencyEngine;
  private records: Map<string, IdempotencyRecord> = new Map();
  private inFlightKeys: Set<string> = new Set();
  private ttlMs: number = 24 * 60 * 60 * 1000; // 24 Hours TTL

  private constructor() {}

  public static getInstance(): IdempotencyEngine {
    if (!IdempotencyEngine.instance) {
      IdempotencyEngine.instance = new IdempotencyEngine();
    }
    return IdempotencyEngine.instance;
  }

  public getRecord(key: string): IdempotencyRecord | undefined {
    const record = this.records.get(key);
    if (record && Date.now() - record.createdAt > this.ttlMs) {
      this.records.delete(key);
      return undefined;
    }
    return record;
  }

  public startExecution(key: string): { isDuplicate: boolean; cachedResponse?: any } {
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

  public saveRecord(key: string, statusCode: number, responseBody: any): void {
    this.inFlightKeys.delete(key);
    this.records.set(key, {
      key,
      statusCode,
      responseBody,
      createdAt: Date.now(),
    });
  }

  public clearInFlight(key: string): void {
    this.inFlightKeys.delete(key);
  }
}

export const idempotencyEngine = IdempotencyEngine.getInstance();

export interface RazorpayOrderInput {
  requestId: string;
  customerId: string;
  amountInRupees: number;
  idempotencyKey: string;
}

export interface RazorpayWebhookPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export class RazorpayPaymentStateMachine {
  private webhookSecret: string;

  constructor(secret: string = 'test_webhook_secret_gayaseva') {
    this.webhookSecret = secret;
  }

  public createOrder(input: RazorpayOrderInput) {
    const execution = idempotencyEngine.startExecution(input.idempotencyKey);
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
    idempotencyEngine.saveRecord(input.idempotencyKey, 200, response);
    return response;
  }

  public verifyWebhookSignature(payload: RazorpayWebhookPayload): boolean {
    const text = `${payload.razorpay_order_id}|${payload.razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(text)
      .digest('hex');
    
    // Constant time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature), 
      Buffer.from(payload.razorpay_signature)
    );
  }
}

export const paymentMachine = new RazorpayPaymentStateMachine();
