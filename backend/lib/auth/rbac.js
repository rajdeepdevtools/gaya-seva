"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = hasPermission;
exports.hasSectionAccess = hasSectionAccess;
function hasPermission(adminRecord, permissionKey) {
    if (adminRecord.status !== 'ACTIVE')
        return false;
    if (adminRecord.role === 'SUPER_ADMIN')
        return true;
    return adminRecord.permissions.includes(permissionKey);
}
function hasSectionAccess(adminRecord, sectionKey) {
    if (adminRecord.status !== 'ACTIVE')
        return false;
    if (adminRecord.role === 'SUPER_ADMIN')
        return true;
    return adminRecord.assignedSections.includes(sectionKey);
}
