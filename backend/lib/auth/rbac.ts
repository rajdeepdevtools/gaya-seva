export interface AdminUserRecord {
  id: string;
  userId: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED';
  assignedSections: string[];
  permissions: string[];
}

export function hasPermission(
  adminRecord: AdminUserRecord,
  permissionKey: string
): boolean {
  if (adminRecord.status !== 'ACTIVE') return false;
  if (adminRecord.role === 'SUPER_ADMIN') return true;
  return adminRecord.permissions.includes(permissionKey);
}

export function hasSectionAccess(
  adminRecord: AdminUserRecord,
  sectionKey: string
): boolean {
  if (adminRecord.status !== 'ACTIVE') return false;
  if (adminRecord.role === 'SUPER_ADMIN') return true;
  return adminRecord.assignedSections.includes(sectionKey);
}
