"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeepAliveService = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const pg_1 = require("pg");
class KeepAliveService {
    static timer = null;
    static dbPool = null;
    static initDbPool(connectionString) {
        if (!this.dbPool && connectionString) {
            this.dbPool = new pg_1.Pool({
                connectionString,
                ssl: { rejectUnauthorized: false },
                max: 5,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 5000,
            });
        }
    }
    static async pingDatabase() {
        const start = Date.now();
        if (!this.dbPool) {
            return { status: 'DISCONNECTED', latencyMs: 0 };
        }
        try {
            await this.dbPool.query('SELECT 1;');
            const latencyMs = Date.now() - start;
            return { status: 'CONNECTED', latencyMs };
        }
        catch (error) {
            console.error('[KeepAlive] Database ping error:', error?.message || error);
            return { status: 'ERROR', latencyMs: Date.now() - start };
        }
    }
    static startAutoPing(options) {
        if (this.timer) {
            clearInterval(this.timer);
        }
        const intervalMs = (options?.intervalMinutes || 5) * 60 * 1000; // Default 5 minutes
        const targetUrl = options?.serverUrl || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}/health`;
        if (options?.dbUrl || process.env.DATABASE_URL) {
            this.initDbPool(options?.dbUrl || process.env.DATABASE_URL);
        }
        console.log(`[KeepAlive] Render anti-inactivity service started.`);
        console.log(`[KeepAlive] Self-ping target: ${targetUrl}`);
        console.log(`[KeepAlive] Ping Interval: Every ${options?.intervalMinutes || 5} minutes.`);
        // Perform initial DB warm-up
        this.pingDatabase();
        // Set recurring keep-alive timer
        this.timer = setInterval(async () => {
            console.log(`[KeepAlive] Executing scheduled anti-inactivity ping...`);
            // 1. Warm Database Pool
            const dbRes = await this.pingDatabase();
            console.log(`[KeepAlive] DB Status: ${dbRes.status} (${dbRes.latencyMs}ms)`);
            // 2. HTTP GET Self-Ping to prevent Render free instance spin-down
            try {
                const client = targetUrl.startsWith('https') ? https_1.default : http_1.default;
                client.get(targetUrl, (res) => {
                    console.log(`[KeepAlive] Self-ping HTTP GET ${targetUrl} status: ${res.statusCode}`);
                }).on('error', (err) => {
                    console.warn(`[KeepAlive] Self-ping HTTP GET warning:`, err.message);
                });
            }
            catch (e) {
                console.warn(`[KeepAlive] Self-ping error:`, e?.message || e);
            }
        }, intervalMs);
    }
    static stopAutoPing() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            console.log(`[KeepAlive] Auto-ping stopped.`);
        }
    }
}
exports.KeepAliveService = KeepAliveService;
