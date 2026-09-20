"use strict";
/**
 * GayaSeva Pick & Drop Ride State Machine Subsystem
 * Single Source of Truth for valid state transitions validated in ONE server function.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RIDE_TRANSITIONS = void 0;
exports.validateRideTransition = validateRideTransition;
/**
 * Immutable Single Source of Truth Table for Ride Transitions
 */
exports.RIDE_TRANSITIONS = [
    { from: 'NEW', to: 'SEARCHING', allowedRoles: ['CUSTOMER', 'SYSTEM', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'SEARCHING', to: 'PROVIDER_SELECTED', allowedRoles: ['SYSTEM', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'PROVIDER_SELECTED', to: 'ACCEPTED', allowedRoles: ['DRIVER', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'ACCEPTED', to: 'CONFIRMED', allowedRoles: ['CUSTOMER', 'SYSTEM', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'CONFIRMED', to: 'DRIVER_ARRIVING', allowedRoles: ['DRIVER', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'DRIVER_ARRIVING', to: 'IN_PROGRESS', allowedRoles: ['DRIVER', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'IN_PROGRESS', to: 'COMPLETED', allowedRoles: ['DRIVER', 'ADMIN', 'SUPER_ADMIN'] },
    // Terminal Cancellation Transitions
    { from: 'NEW', to: 'CANCELLED', allowedRoles: ['CUSTOMER', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'SEARCHING', to: 'CANCELLED', allowedRoles: ['CUSTOMER', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'PROVIDER_SELECTED', to: 'CANCELLED', allowedRoles: ['CUSTOMER', 'DRIVER', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'ACCEPTED', to: 'CANCELLED', allowedRoles: ['CUSTOMER', 'DRIVER', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'CONFIRMED', to: 'CANCELLED', allowedRoles: ['CUSTOMER', 'DRIVER', 'ADMIN', 'SUPER_ADMIN'] },
    // Expiration Transitions
    { from: 'NEW', to: 'EXPIRED', allowedRoles: ['SYSTEM', 'ADMIN', 'SUPER_ADMIN'] },
    { from: 'SEARCHING', to: 'EXPIRED', allowedRoles: ['SYSTEM', 'ADMIN', 'SUPER_ADMIN'] },
];
/**
 * SINGLE SERVER FUNCTION VALIDATOR.
 * Validates if a transition from currentState to nextState is permitted for a given user role.
 */
function validateRideTransition(fromState, toState, role) {
    // Check if terminal state is already reached
    if (fromState === 'COMPLETED' || fromState === 'CANCELLED' || fromState === 'EXPIRED') {
        return { valid: false, reason: `Cannot transition from terminal state ${fromState}.` };
    }
    const match = exports.RIDE_TRANSITIONS.find((rule) => rule.from === fromState && rule.to === toState);
    if (!match) {
        return {
            valid: false,
            reason: `Invalid transition path from ${fromState} to ${toState}.`
        };
    }
    if (!match.allowedRoles.includes(role)) {
        return {
            valid: false,
            reason: `Role ${role} is not authorized to transition ride from ${fromState} to ${toState}.`
        };
    }
    return { valid: true };
}
