"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const healthRouter_1 = __importDefault(require("./routes/healthRouter"));
const keepAliveService_1 = require("./lib/keepAliveService");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Enable CORS and JSON Middleware
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
// Mount Health Check & Keep-Alive Router
app.use('/', healthRouter_1.default);
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
    keepAliveService_1.KeepAliveService.startAutoPing({
        serverUrl: process.env.RENDER_EXTERNAL_URL ? `${process.env.RENDER_EXTERNAL_URL}/health` : `http://localhost:${PORT}/health`,
        intervalMinutes,
        dbUrl: process.env.DATABASE_URL,
    });
});
// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: Closing server and stopping KeepAlive.');
    keepAliveService_1.KeepAliveService.stopAutoPing();
    server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
    console.log('SIGINT signal received: Closing server and stopping KeepAlive.');
    keepAliveService_1.KeepAliveService.stopAutoPing();
    server.close(() => process.exit(0));
});
