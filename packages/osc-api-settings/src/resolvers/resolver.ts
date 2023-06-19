import type { Preference } from '@prisma/client';
import type {
    getPreferenceArgs,
    getPreferenceByKeyArgs,
    getUserPreferenceByIdArgs,
    getUserPreferenceArgs as getUserPreferenceByKeyArgs,
    savePreferenceArgs,
    savePreferenceByKeyArgs,
} from '~/types/arguments';
import type { userPreferenceFinal } from '~/types/functions';
import type { SettingsContext } from '~/types/interfaces';
import * as preferences from '~/utils/preferences';

export const resolvers = {
    Query: {
        preference: async (_: undefined, { id }: getPreferenceArgs) => {
            return await preferences.getDetails(id);
        },
        preferenceByKey: async (_: undefined, { key }: getPreferenceByKeyArgs) => {
            return await preferences.getDetailsByKey(key);
        },
        userPreferences: async (_: undefined, __: undefined, { user }: SettingsContext) => {
            return await preferences.getAll(user.id);
        },
        userPreferenceByKey: async (
            _: undefined,
            { key }: getUserPreferenceByKeyArgs,
            { user }: SettingsContext
        ) => {
            return await preferences.getByKey(user.id, key);
        },
        userPreference: async (
            _: undefined,
            { id }: getUserPreferenceByIdArgs,
            { user }: SettingsContext
        ) => {
            return await preferences.get(user.id, id);
        },
    },
    UserPreference: {
        // Stringify JSON value
        valueJson: async (preference: userPreferenceFinal) => {
            return preference.valueJson ? JSON.stringify(preference.valueJson) : '';
        },
    },
    Preference: {
        // Stringify JSON value
        defaultJson: async (preference: Preference) => {
            return preference.defaultJson ? JSON.stringify(preference.defaultJson) : '';
        },
    },
    Mutation: {
        savePreference: async (
            _: undefined,
            { input }: savePreferenceArgs,
            { user }: SettingsContext
        ) => {
            return await preferences.save(user.id, input.preferenceId, input.value);
        },
        savePreferenceByKey: async (
            _: undefined,
            { input }: savePreferenceByKeyArgs,
            { user }: SettingsContext
        ) => {
            return await preferences.saveByKey(user.id, input.key, input.value);
        },
    },
};
