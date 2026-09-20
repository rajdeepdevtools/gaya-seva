import express from 'express';
import cors from 'cors';
import healthRouter from './routes/healthRouter';
import { KeepAliveService } from './lib/keepAliveService';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://gayaseva.com',
  'https://www.gayaseva.com',
  process.env.FRONTEND_URL,
  process.env.CORS_ORIGIN,
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean);

// Enable CORS and JSON Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
}));
app.use(express.json());

// Mount Health Check & Keep-Alive Router
app.use('/', healthRouter);

// Root Fallback Route
app.get('/api/info', (req, res) => {
  res.json({
    app: 'GayaSeva Backend Subsystem',
    version: '1.0.0',
    status: 'ACTIVE',
  });
});

// Start Express Server
const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 GayaSeva Backend Server running on port ${PORT}`);
  console.log(`🏥 Health Check Endpoints: http://localhost:${PORT}/health`);
  console.log(`=======================================================`);

  // Start Render Anti-Inactivity Keep-Alive Auto Ping (Every 5 minutes)
  const intervalMinutes = Number(process.env.KEEP_ALIVE_INTERVAL_MINUTES) || 5;
  KeepAliveService.startAutoPing({
    serverUrl: process.env.RENDER_EXTERNAL_URL ? `${process.env.RENDER_EXTERNAL_URL}/health` : `http://localhost:${PORT}/health`,
    intervalMinutes,
    dbUrl: process.env.DATABASE_URL,
  });
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: Closing server and stopping KeepAlive.');
  KeepAliveService.stopAutoPing();
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: Closing server and stopping KeepAlive.');
  KeepAliveService.stopAutoPing();
  server.close(() => process.exit(0));
});
