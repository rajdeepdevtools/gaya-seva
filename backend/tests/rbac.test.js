"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const service_1 = require("../lib/email/service");
const rbac_1 = require("../lib/auth/rbac");
(0, vitest_1.describe)('Backend RBAC & Permission Matrix Unit Tests', () => {
    (0, vitest_1.it)('should grant full permission access to Super Admin role', () => {
        const superAdmin = {
            id: 'adm_1',
            userId: 'usr_1',
            role: 'SUPER_ADMIN',
            status: 'ACTIVE',
            assignedSections: ['ALL'],
            permissions: ['ALL'],
        };
        (0, vitest_1.expect)((0, rbac_1.hasPermission)(superAdmin, 'settings.manage')).toBe(true);
        (0, vitest_1.expect)((0, rbac_1.hasPermission)(superAdmin, 'email.send')).toBe(true);
    });
    (0, vitest_1.it)('should restrict Section Admin to explicitly granted permissions', () => {
        const transportAdmin = {
            id: 'adm_2',
            userId: 'usr_2',
            role: 'ADMIN',
            status: 'ACTIVE',
            assignedSections: ['drivers', 'service_requests'],
            permissions: ['drivers.read', 'drivers.create', 'drivers.update'],
        };
        (0, vitest_1.expect)((0, rbac_1.hasPermission)(transportAdmin, 'drivers.read')).toBe(true);
        (0, vitest_1.expect)((0, rbac_1.hasPermission)(transportAdmin, 'pandits.verify')).toBe(false);
        (0, vitest_1.expect)((0, rbac_1.hasPermission)(transportAdmin, 'email.send')).toBe(false);
    });
});
(0, vitest_1.describe)('Backend SMTP Email Template Compiler Unit Tests', () => {
    (0, vitest_1.it)('should correctly substitute {{variable_name}} tokens in templates', () => {
        const rawTemplate = 'Namaste {{user_name}}, your request #{{request_id}} is confirmed at {{location}}.';
        const variables = {
            user_name: 'Suresh Sharma',
            request_id: 'REQ_108',
            location: 'Vishnupad Temple',
        };
        const compiled = (0, service_1.compileTemplate)(rawTemplate, variables);
        (0, vitest_1.expect)(compiled).toBe('Namaste Suresh Sharma, your request #REQ_108 is confirmed at Vishnupad Temple.');
    });
    (0, vitest_1.it)('should gracefully handle missing variables with empty strings', () => {
        const rawTemplate = 'Hello {{user_name}}, welcome to {{service_name}}.';
        const compiled = (0, service_1.compileTemplate)(rawTemplate, { user_name: 'Amit' });
        (0, vitest_1.expect)(compiled).toBe('Hello Amit, welcome to .');
    });
});
