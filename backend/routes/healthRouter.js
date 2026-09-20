"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const keepAliveService_1 = require("../lib/keepAliveService");
const router = (0, express_1.Router)();
const startTime = Date.now();
const handleHealthCheck = async (req, res) => {
    // Disable HTTP cache so external monitoring tools get fresh response every time
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    const memoryUsageMB = Math.round((process.memoryUsage().rss / (1024 * 1024)) * 10) / 10;
    const dbStatus = await keepAliveService_1.KeepAliveService.pingDatabase();
    res.status(200).json({
        status: 'HEALTHY',
        service: 'GayaSeva Central Backend',
        renderKeepAlive: 'ACTIVE',
        preventSleep: true,
        uptimeSeconds,
        memoryUsageMB,
        database: {
            status: dbStatus.status,
            latencyMs: dbStatus.latencyMs,
        },
        timestamp: new Date().toISOString(),
        renderExternalUrl: process.env.RENDER_EXTERNAL_URL || 'Not Configured (Using Localhost)',
    });
};
// Registered routes for health check
router.get('/health', handleHealthCheck);
router.get('/api/health', handleHealthCheck);
router.get('/ping', handleHealthCheck);
router.get('/keep-alive', handleHealthCheck);
exports.default = router;
