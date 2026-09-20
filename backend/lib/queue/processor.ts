/**
 * GayaSeva Asynchronous Task & Background Worker Subsystem
 * High-concurrency job processor preventing main customer HTTP requests from waiting on background operations.
 */

export type JobType = 
  | 'EMAIL' 
  | 'PUSH_NOTIFICATION' 
  | 'PROVIDER_MATCHING' 
  | 'ANALYTICS_EVENT' 
  | 'AI_BACKGROUND_TASK';

export interface JobData {
  id: string;
  type: JobType;
  payload: Record<string, any>;
  attempts: number;
  maxAttempts: number;
  idempotencyKey?: string;
  createdAt: number;
  error?: string;
}

export type JobHandler = (payload: Record<string, any>) => Promise<void>;

export class TaskQueueProcessor {
  private static instance: TaskQueueProcessor;
  private queue: JobData[] = [];
  private deadLetterQueue: JobData[] = [];
  private handlers: Map<JobType, JobHandler> = new Map();
  private processedKeys: Set<string> = new Set();
  private isProcessing: boolean = false;
  private concurrencyLimit: number = 20; // Concurrent background workers
  private metrics = {
    totalEnqueued: 0,
    totalProcessed: 0,
    totalFailed: 0,
    totalRetries: 0,
  };

  private constructor() {
    this.startWorkerLoop();
  }

  public static getInstance(): TaskQueueProcessor {
    if (!TaskQueueProcessor.instance) {
      TaskQueueProcessor.instance = new TaskQueueProcessor();
    }
    return TaskQueueProcessor.instance;
  }

  public registerHandler(type: JobType, handler: JobHandler): void {
    this.handlers.set(type, handler);
  }

  public enqueue(
    type: JobType, 
    payload: Record<string, any>, 
    options: { maxAttempts?: number; idempotencyKey?: string } = {}
  ): string {
    const idempotencyKey = options.idempotencyKey || payload.idempotencyKey;

    if (idempotencyKey && this.processedKeys.has(idempotencyKey)) {
      return `duplicate:${idempotencyKey}`;
    }

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const job: JobData = {
      id: jobId,
      type,
      payload,
      attempts: 0,
      maxAttempts: options.maxAttempts || 3,
      idempotencyKey,
      createdAt: Date.now(),
    };

    if (idempotencyKey) {
      this.processedKeys.add(idempotencyKey);
    }

    this.queue.push(job);
    this.metrics.totalEnqueued++;
    return jobId;
  }

  private async startWorkerLoop(): Promise<void> {
    setInterval(async () => {
      if (this.isProcessing || this.queue.length === 0) return;
      this.isProcessing = true;

      const jobsToProcess = this.queue.splice(0, this.concurrencyLimit);
      await Promise.allSettled(jobsToProcess.map((job) => this.processSingleJob(job)));

      this.isProcessing = false;
    }, 100);
  }

  private async processSingleJob(job: JobData): Promise<void> {
    const handler = this.handlers.get(job.type);

    if (!handler) {
      // Default dummy handler for unhandled jobs
      this.metrics.totalProcessed++;
      return;
    }

    try {
      job.attempts++;
      await handler(job.payload);
      this.metrics.totalProcessed++;
    } catch (err: any) {
      if (job.attempts < job.maxAttempts) {
        this.metrics.totalRetries++;
        job.error = err.message || 'Unknown error';
        // Exponential backoff re-queueing
        setTimeout(() => {
          this.queue.push(job);
        }, Math.pow(2, job.attempts) * 1000);
      } else {
        this.metrics.totalFailed++;
        job.error = err.message || 'Max attempts reached';
        this.deadLetterQueue.push(job);
      }
    }
  }

  public getMetrics() {
    return {
      queueLength: this.queue.length,
      deadLetterQueueLength: this.deadLetterQueue.length,
      concurrencyLimit: this.concurrencyLimit,
      totalEnqueued: this.metrics.totalEnqueued,
      totalProcessed: this.metrics.totalProcessed,
      totalFailed: this.metrics.totalFailed,
      totalRetries: this.metrics.totalRetries,
    };
  }

  public getDeadLetterQueue(): JobData[] {
    return [...this.deadLetterQueue];
  }
}

export const taskQueue = TaskQueueProcessor.getInstance();
