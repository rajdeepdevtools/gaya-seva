import http from 'http';
import https from 'https';
import { Pool } from 'pg';

export class KeepAliveService {
  private static timer: NodeJS.Timeout | null = null;
  private static dbPool: Pool | null = null;

  static initDbPool(connectionString?: string) {
    if (!this.dbPool && connectionString) {
      this.dbPool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false },
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      });
    }
  }

  static async pingDatabase(): Promise<{ status: string; latencyMs: number }> {
    const start = Date.now();
    if (!this.dbPool) {
      return { status: 'DISCONNECTED', latencyMs: 0 };
    }
    try {
      await this.dbPool.query('SELECT 1;');
      const latencyMs = Date.now() - start;
      return { status: 'CONNECTED', latencyMs };
    } catch (error: any) {
      console.error('[KeepAlive] Database ping error:', error?.message || error);
      return { status: 'ERROR', latencyMs: Date.now() - start };
    }
  }

  static startAutoPing(options?: {
    serverUrl?: string;
    intervalMinutes?: number;
    dbUrl?: string;
  }) {
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
        const client = targetUrl.startsWith('https') ? https : http;
        client.get(targetUrl, (res) => {
          console.log(`[KeepAlive] Self-ping HTTP GET ${targetUrl} status: ${res.statusCode}`);
        }).on('error', (err) => {
          console.warn(`[KeepAlive] Self-ping HTTP GET warning:`, err.message);
        });
      } catch (e: any) {
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
