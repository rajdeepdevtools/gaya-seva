"use strict";
/**
 * GayaSeva Asynchronous Task & Background Worker Subsystem
 * High-concurrency job processor preventing main customer HTTP requests from waiting on background operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskQueue = exports.TaskQueueProcessor = void 0;
class TaskQueueProcessor {
    static instance;
    queue = [];
    deadLetterQueue = [];
    handlers = new Map();
    processedKeys = new Set();
    isProcessing = false;
    concurrencyLimit = 20; // Concurrent background workers
    metrics = {
        totalEnqueued: 0,
        totalProcessed: 0,
        totalFailed: 0,
        totalRetries: 0,
    };
    constructor() {
        this.startWorkerLoop();
    }
    static getInstance() {
        if (!TaskQueueProcessor.instance) {
            TaskQueueProcessor.instance = new TaskQueueProcessor();
        }
        return TaskQueueProcessor.instance;
    }
    registerHandler(type, handler) {
        this.handlers.set(type, handler);
    }
    enqueue(type, payload, options = {}) {
        const idempotencyKey = options.idempotencyKey || payload.idempotencyKey;
        if (idempotencyKey && this.processedKeys.has(idempotencyKey)) {
            return `duplicate:${idempotencyKey}`;
        }
        const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const job = {
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
    async startWorkerLoop() {
        setInterval(async () => {
            if (this.isProcessing || this.queue.length === 0)
                return;
            this.isProcessing = true;
            const jobsToProcess = this.queue.splice(0, this.concurrencyLimit);
            await Promise.allSettled(jobsToProcess.map((job) => this.processSingleJob(job)));
            this.isProcessing = false;
        }, 100);
    }
    async processSingleJob(job) {
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
        }
        catch (err) {
            if (job.attempts < job.maxAttempts) {
                this.metrics.totalRetries++;
                job.error = err.message || 'Unknown error';
                // Exponential backoff re-queueing
                setTimeout(() => {
                    this.queue.push(job);
                }, Math.pow(2, job.attempts) * 1000);
            }
            else {
                this.metrics.totalFailed++;
                job.error = err.message || 'Max attempts reached';
                this.deadLetterQueue.push(job);
            }
        }
    }
    getMetrics() {
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
    getDeadLetterQueue() {
        return [...this.deadLetterQueue];
    }
}
exports.TaskQueueProcessor = TaskQueueProcessor;
exports.taskQueue = TaskQueueProcessor.getInstance();
