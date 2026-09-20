"use strict";
/**
 * GayaSeva Circuit Breaker Pattern Implementation
 * Protects platform against cascading external service outages (AI, SMTP, Razorpay, Maps, Web Push).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushCircuitBreaker = exports.razorpayCircuitBreaker = exports.smtpCircuitBreaker = exports.aiCircuitBreaker = exports.CircuitBreaker = void 0;
class CircuitBreaker {
    name;
    state = 'CLOSED';
    failureCount = 0;
    successCount = 0;
    nextAttempt = Date.now();
    failureThreshold;
    resetTimeoutMs;
    halfOpenSuccessThreshold;
    constructor(name, options = {}) {
        this.name = name;
        this.failureThreshold = options.failureThreshold || 5;
        this.resetTimeoutMs = options.resetTimeoutMs || 10000;
        this.halfOpenSuccessThreshold = options.halfOpenSuccessThreshold || 2;
    }
    async execute(fn, fallback) {
        if (this.state === 'OPEN') {
            if (Date.now() >= this.nextAttempt) {
                this.state = 'HALF_OPEN';
                this.successCount = 0;
            }
            else {
                // Fast fallback during OPEN state
                return await fallback();
            }
        }
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        }
        catch (err) {
            this.onFailure();
            return await fallback();
        }
    }
    onSuccess() {
        if (this.state === 'HALF_OPEN') {
            this.successCount++;
            if (this.successCount >= this.halfOpenSuccessThreshold) {
                this.state = 'CLOSED';
                this.failureCount = 0;
            }
        }
        else {
            this.failureCount = 0;
        }
    }
    onFailure() {
        this.failureCount++;
        if (this.failureCount >= this.failureThreshold || this.state === 'HALF_OPEN') {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.resetTimeoutMs;
        }
    }
    getStatus() {
        return {
            name: this.name,
            state: this.state,
            failureCount: this.failureCount,
            resetTimeoutMs: this.resetTimeoutMs,
            nextAttemptInMs: Math.max(0, this.nextAttempt - Date.now()),
        };
    }
}
exports.CircuitBreaker = CircuitBreaker;
// Pre-initialized Circuit Breakers for core external dependencies
exports.aiCircuitBreaker = new CircuitBreaker('AI_ASSISTANT_SERVICE', { failureThreshold: 3, resetTimeoutMs: 15000 });
exports.smtpCircuitBreaker = new CircuitBreaker('SMTP_EMAIL_SERVICE', { failureThreshold: 5, resetTimeoutMs: 10000 });
exports.razorpayCircuitBreaker = new CircuitBreaker('RAZORPAY_PAYMENT_SERVICE', { failureThreshold: 3, resetTimeoutMs: 20000 });
exports.pushCircuitBreaker = new CircuitBreaker('WEB_PUSH_SERVICE', { failureThreshold: 5, resetTimeoutMs: 10000 });
