/**
 * GayaSeva Circuit Breaker Pattern Implementation
 * Protects platform against cascading external service outages (AI, SMTP, Razorpay, Maps, Web Push).
 */

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitBreakerOptions {
  failureThreshold?: number; // Failures before opening circuit
  resetTimeoutMs?: number;   // Cooldown period in OPEN state before HALF_OPEN
  halfOpenSuccessThreshold?: number; // Successes in HALF_OPEN to re-close circuit
}

export class CircuitBreaker {
  private name: string;
  private state: CircuitState = 'CLOSED';
  private failureCount: number = 0;
  private successCount: number = 0;
  private nextAttempt: number = Date.now();

  private failureThreshold: number;
  private resetTimeoutMs: number;
  private halfOpenSuccessThreshold: number;

  constructor(name: string, options: CircuitBreakerOptions = {}) {
    this.name = name;
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeoutMs = options.resetTimeoutMs || 10000;
    this.halfOpenSuccessThreshold = options.halfOpenSuccessThreshold || 2;
  }

  public async execute<T>(fn: () => Promise<T>, fallback: () => Promise<T> | T): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() >= this.nextAttempt) {
        this.state = 'HALF_OPEN';
        this.successCount = 0;
      } else {
        // Fast fallback during OPEN state
        return await fallback();
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      return await fallback();
    }
  }

  private onSuccess(): void {
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= this.halfOpenSuccessThreshold) {
        this.state = 'CLOSED';
        this.failureCount = 0;
      }
    } else {
      this.failureCount = 0;
    }
  }

  private onFailure(): void {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold || this.state === 'HALF_OPEN') {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.resetTimeoutMs;
    }
  }

  public getStatus() {
    return {
      name: this.name,
      state: this.state,
      failureCount: this.failureCount,
      resetTimeoutMs: this.resetTimeoutMs,
      nextAttemptInMs: Math.max(0, this.nextAttempt - Date.now()),
    };
  }
}

// Pre-initialized Circuit Breakers for core external dependencies
export const aiCircuitBreaker = new CircuitBreaker('AI_ASSISTANT_SERVICE', { failureThreshold: 3, resetTimeoutMs: 15000 });
export const smtpCircuitBreaker = new CircuitBreaker('SMTP_EMAIL_SERVICE', { failureThreshold: 5, resetTimeoutMs: 10000 });
export const razorpayCircuitBreaker = new CircuitBreaker('RAZORPAY_PAYMENT_SERVICE', { failureThreshold: 3, resetTimeoutMs: 20000 });
export const pushCircuitBreaker = new CircuitBreaker('WEB_PUSH_SERVICE', { failureThreshold: 5, resetTimeoutMs: 10000 });
