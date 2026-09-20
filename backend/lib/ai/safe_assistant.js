"use strict";
/**
 * GayaSeva Safe AI Assistant Subsystem
 * Grounded ONLY in ai_knowledge + controlled tools.
 * DRAFT-ONLY tools for createRideRequest and createServiceRequest.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeAIAssistant = exports.SafeAIAssistant = void 0;
class SafeAIAssistant {
    static instance;
    constructor() { }
    static getInstance() {
        if (!SafeAIAssistant.instance) {
            SafeAIAssistant.instance = new SafeAIAssistant();
        }
        return SafeAIAssistant.instance;
    }
    // --- CONTROLLED BACKEND TOOLS ---
    searchServices(category) {
        return [
            { id: 'srv_1', name: 'Pick & Drop Taxi Service', category: 'TRANSPORT' },
            { id: 'srv_2', name: 'Licensed Pandit Pinda Daan', category: 'PANDIT' },
            { id: 'srv_3', name: 'Verified Guest House & Hotel', category: 'HOTEL' },
        ];
    }
    findDrivers(pickup, drop) {
        return [
            { driverId: 'drv_1', name: 'Ramesh Kumar', vehicle: 'Sedan (AC)', rating: 4.9 },
            { driverId: 'drv_2', name: 'Sunil Singh', vehicle: 'Auto E-Rickshaw', rating: 4.8 },
        ];
    }
    findPandits(ritualType) {
        return [
            { panditId: 'pnd_1', name: 'Pandit Rajesh Shastri', area: 'Vishnupad', languages: ['Hindi', 'Sanskrit'] },
        ];
    }
    findHotels(area) {
        return [
            { hotelId: 'htl_1', name: 'Gaya Ji Teerth Guest House', type: 'Dharamshala/Hotel', parking: true },
        ];
    }
    getGuidePlace(placeName) {
        const info = {
            'vishnupad': 'Vishnupad Temple is an ancient holy temple in Gaya Ji dedicated to Lord Vishnu, featuring his 40-cm footprint stamped in solid basalt rock.',
            'falgu': 'Falgu River is the sacred river of Gaya Ji where pilgrims perform Pinda Daan rites for ancestral salvation.',
            'bodh gaya': 'Bodh Gaya is located 12 km from Gaya Ji town and is the world-renowned site where Lord Buddha attained enlightenment.',
        };
        return info[placeName.toLowerCase()] || 'Gaya Ji offers ancient sacred teerth sites, temples, and pilgrimage facilities.';
    }
    getHelpInfo() {
        return 'GayaSeva Support Helpline: Contact verified local providers directly through the official website or admin support.';
    }
    getProviderAvailability(providerId) {
        return { providerId, isAvailable: true, verifiedStatus: 'VERIFIED' };
    }
    // --- DRAFT-ONLY TOOLS (CRITICAL SAFETY REQUIREMENT) ---
    /**
     * CRITICAL: Returns a DRAFT PAYLOAD only. NEVER writes rows directly to DB tables!
     */
    createRideRequestDraft(input) {
        return {
            isDraft: true,
            requestType: 'PICK_DROP',
            formData: {
                pickupAddress: input.pickup,
                dropAddress: input.drop,
                bookingDate: input.date,
                bookingTime: input.time,
                passengerCount: input.passengers,
            },
            userNotice: 'Draft vehicle request prepared by AI Assistant. Please review and click "Submit Request" to confirm using your account.',
        };
    }
    /**
     * CRITICAL: Returns a DRAFT PAYLOAD only for general service requests.
     */
    createServiceRequestDraft(input) {
        return {
            isDraft: true,
            requestType: input.serviceType,
            formData: input.details,
            userNotice: `Draft ${input.serviceType} request generated. Review parameters before final submission.`,
        };
    }
    /**
     * Safe Query Evaluator enforcing guardrails against inventing official/medical/financial/religious claims
     */
    async processQuery(prompt) {
        const lower = prompt.toLowerCase();
        // Guardrail against safety violations (inventing government/medical/official data)
        if (lower.includes('emergency number') || lower.includes('government rule') || lower.includes('medical fact')) {
            return {
                text: 'I cannot provide unverified emergency, medical, or official government regulations. Please consult official government/medical resources or use getHelpInfo().',
            };
        }
        if (lower.includes('book taxi') || lower.includes('need ride') || lower.includes('cab to')) {
            const draft = this.createRideRequestDraft({
                pickup: 'Gaya Railway Station',
                drop: 'Vishnupad Temple',
                date: new Date().toISOString().split('T')[0],
                time: '10:00 AM',
                passengers: 2,
            });
            return {
                text: 'I have prepared a draft vehicle request form for you below. Please review the details and submit when ready.',
                draftPayload: draft,
            };
        }
        if (lower.includes('vishnupad')) {
            return { text: this.getGuidePlace('vishnupad') };
        }
        if (lower.includes('falgu')) {
            return { text: this.getGuidePlace('falgu') };
        }
        if (lower.includes('bodh gaya')) {
            return { text: this.getGuidePlace('bodh gaya') };
        }
        return { text: 'Welcome to GayaSeva Assistant! I can help you search verified local services, Pandits, Stay options, and Gaya Ji pilgrimage guide information.' };
    }
}
exports.SafeAIAssistant = SafeAIAssistant;
exports.safeAIAssistant = SafeAIAssistant.getInstance();
