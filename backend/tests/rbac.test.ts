import { describe, it, expect } from 'vitest';
import { compileTemplate } from '../lib/email/service';
import { hasPermission, AdminUserRecord } from '../lib/auth/rbac';

describe('Backend RBAC & Permission Matrix Unit Tests', () => {
  it('should grant full permission access to Super Admin role', () => {
    const superAdmin: AdminUserRecord = {
      id: 'adm_1',
      userId: 'usr_1',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      assignedSections: ['ALL'],
      permissions: ['ALL'],
    };

    expect(hasPermission(superAdmin, 'settings.manage')).toBe(true);
    expect(hasPermission(superAdmin, 'email.send')).toBe(true);
  });

  it('should restrict Section Admin to explicitly granted permissions', () => {
    const transportAdmin: AdminUserRecord = {
      id: 'adm_2',
      userId: 'usr_2',
      role: 'ADMIN',
      status: 'ACTIVE',
      assignedSections: ['drivers', 'service_requests'],
      permissions: ['drivers.read', 'drivers.create', 'drivers.update'],
    };

    expect(hasPermission(transportAdmin, 'drivers.read')).toBe(true);
    expect(hasPermission(transportAdmin, 'pandits.verify')).toBe(false);
    expect(hasPermission(transportAdmin, 'email.send')).toBe(false);
  });
});

describe('Backend SMTP Email Template Compiler Unit Tests', () => {
  it('should correctly substitute {{variable_name}} tokens in templates', () => {
    const rawTemplate = 'Namaste {{user_name}}, your request #{{request_id}} is confirmed at {{location}}.';
    const variables = {
      user_name: 'Suresh Sharma',
      request_id: 'REQ_108',
      location: 'Vishnupad Temple',
    };

    const compiled = compileTemplate(rawTemplate, variables);
    expect(compiled).toBe('Namaste Suresh Sharma, your request #REQ_108 is confirmed at Vishnupad Temple.');
  });

  it('should gracefully handle missing variables with empty strings', () => {
    const rawTemplate = 'Hello {{user_name}}, welcome to {{service_name}}.';
    const compiled = compileTemplate(rawTemplate, { user_name: 'Amit' });
    expect(compiled).toBe('Hello Amit, welcome to .');
  });
});
