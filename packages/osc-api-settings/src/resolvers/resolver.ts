import type {
    getUserPreferenceByIdArgs,
    getUserPreferenceArgs as getUserPreferenceByKeyArgs,
} from '~/types/arguments';
import type { getAllPreferencesReturn } from '~/types/functions';
import type { SettingsContext } from '~/types/interfaces';
import * as preferences from '~/utils/preferences';

export const resolvers = {
    Query: {
        userPreferences: async (_: undefined, __: undefined, { user }: SettingsContext) => {
            return await preferences.getAll(user.id);
        },
        userPreferenceByKey: async (
            _: undefined,
            { key }: getUserPreferenceByKeyArgs,
            { user }: SettingsContext
        ) => {
            return await preferences.getSpecificByKey(user.id, key);
        },
        userPreferenceByIdy: async (
            _: undefined,
            { id }: getUserPreferenceByIdArgs,
            { user }: SettingsContext
        ) => {
            return await preferences.getSpecificById(user.id, id);
        },
    },
    Preference: {
        // Overriding default in the case of JSON data
        value: async (preference: getAllPreferencesReturn) => {
            // Allowing for JSON formatted data here
            // This will allow for flexibility to store widget data for dashboards
            return preference.valueJson ? JSON.stringify(preference.valueJson) : preference.value;
        },
        default: async (preference: getAllPreferencesReturn) => {
            // Allowing for JSON formatted data here
            // This will allow for flexibility to store widget data for dashboards
            return preference.details.defaultJson
                ? JSON.stringify(preference.details.defaultJson)
                : preference.details.default;
        },
    },
    Mutation: {},
};
