import { PrismaClient } from '@prisma/client';
import { settingsMisc } from 'osc-api';
import type { GetAllPreferencesFn, GetSpecificByIdFn, GetSpecificByKeyFn } from '~/types/functions';

const prisma = new PrismaClient();

/**
 * Retrieves all preferences for the given user ID and returns minimal data.
 *
 * @param userId - The ID of the user to retrieve preferences for.
 * @return A promise that resolves to an array of UserPreference objects or null.
 */
export const getAll: GetAllPreferencesFn = async (userId) => {
    // Get all preferences for the given user ID
    // Return minimal data
    return await prisma.userPreference.findMany({
        where: {
            userId,
        },
        include: {
            details: true,
        },
    });
};

/**
 * Returns a specific preference for a given user ID and key. Throws an error if the key is not found.
 *
 * @param userId - The ID of the user.
 * @param key - The preference key to search for.
 * @return A promise that resolves with the specific preference requested, or rejects with an error if the key is not found.
 */
export const getSpecificByKey: GetSpecificByKeyFn = async (userId, key) => {
    // Get the preference record to get the ID
    const preference = await settingsMisc.getPreferenceByKey(key);

    // If we didnt match based on key, throw an error
    if (!preference) {
        return new Error('Unknown preference key.');
    }

    // Return preference based on ID
    return await getSpecificById(userId, preference.id);
};

/**
 * Returns a specific preference for a given user ID and key. Throws an error if the key is not found.
 *
 * @param userId - The ID of the user.
 * @param preferenceId - The preference key to search for.
 * @return A promise that resolves with the specific preference requested, or null.
 */
export const getSpecificById: GetSpecificByIdFn = async (userId, preferenceId) => {
    // Return specific preference for user
    return await prisma.userPreference.findFirst({
        where: {
            userId,
            preferenceId: preferenceId,
        },
        include: {
            details: true,
        },
    });
};
