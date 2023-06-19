import { PrismaClient } from '@prisma/client';
import { settingsMisc } from 'osc-api';
import type {
    GetAllPreferencesFn,
    GetPreferenceByKeyFn,
    GetPreferenceFn,
    getPreferenceDetailsByKeyFn,
    getPreferenceDetailsFn,
    savePrefererenceByKeyFn,
    savePrefererenceFn,
} from '~/types/functions';

const prisma = new PrismaClient();

/**
 * Retrieves the preference details for the given preferenceId.
 *
 * @param id - The ID of the preference to retrieve details for.
 * @return A promise resolving to the preference details.
 */
export const getDetails: getPreferenceDetailsFn = async (id) => {
    return await prisma.preference.findFirst({
        where: {
            id,
        },
    });
};

/**
 * Returns the preference details for a given key.
 *
 * @param key - The key to search for in the preference table.
 * @return Returns a Promise that resolves to the preference details for the given key.
 */
export const getDetailsByKey: getPreferenceDetailsByKeyFn = async (key) => {
    return await prisma.preference.findFirst({
        where: {
            key,
        },
    });
};

/**
 * Retrieves all preferences for the given user ID.
 *
 * @param userId - The ID of the user to retrieve preferences for.
 * @return A promise that resolves to an array of UserPreference objects or null.
 */
export const getAll: GetAllPreferencesFn = async (userId) => {
    // Get all preferences for the given user ID
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
 * Returns a specific preference for a given user ID and ID.
 *
 * @param userId - The ID of the user.
 * @param preferenceId - The preference key to search for.
 * @return A promise that resolves with the specific preference requested, or null.
 */
export const get: GetPreferenceFn = async (userId, preferenceId) => {
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

/**
 * Returns a specific preference for a given user ID and key. Throws an error if the key is not found.
 *
 * @param userId - The ID of the user.
 * @param key - The preference key to search for.
 * @return A promise that resolves with the specific preference requested, or rejects with an error if the key is not found.
 */
export const getByKey: GetPreferenceByKeyFn = async (userId, key) => {
    // Get the preference record to get the ID
    const preference = await settingsMisc.getPreferenceByKey(key);

    // If we didnt match based on key, throw an error
    if (!preference) {
        return new Error('Unknown preference key.');
    }

    // Return preference based on ID
    return await get(userId, preference.id);
};

/**
 * Saves a user's preference based on the given user ID, preference ID, and value.
 *
 * @param userId - The ID of the user whose preference is being saved.
 * @param preferenceId - The ID of the preference being saved.
 * @param value - The value of the preference being saved.
 * @return If successful, returns a Promise containing the updated UserPreference record. If unsuccessful, returns a Promise containing an Error.
 */
export const save: savePrefererenceFn = async (userId, preferenceId, value) => {
    // Get preference record
    const preference = await settingsMisc.getPreference(preferenceId);

    // If no match throw an error
    if (!preference) {
        return new Error('Unknown preference');
    }

    // Determine data to save
    const data = preference.isJson
        ? {
              userId,
              preferenceId,
              value: null,
              valueJson: JSON.parse(value),
          }
        : {
              userId,
              preferenceId,
              value,
              valueJson: {},
          };

    // Get existing user preference
    const userPreference = await get(userId, preferenceId);

    // If no existing record, create one
    if (!userPreference) {
        return await prisma.userPreference.create({
            data,
        });
    }

    // Update existing preference
    return await prisma.userPreference.update({
        where: {
            id: userPreference.id,
        },
        data,
    });
};

/**
 * Saves a user's preference by key. This is an extension of the existing Save function, that first resolves the key.
 *
 * @param userId - The ID of the user whose preference is being saved.
 * @param key - The key of the preference being saved.
 * @param value - The value of the preference being saved.
 * @return Returns the saved preference or an error if the key is not found.
 */
export const saveByKey: savePrefererenceByKeyFn = async (userId, key, value) => {
    // Get the preference record to get the ID
    const preference = await settingsMisc.getPreferenceByKey(key);

    // If we didnt match based on key, throw an error
    if (!preference) {
        return new Error('Unknown preference key.');
    }

    return await save(userId, preference.id, value);
};
