import { shield } from 'graphql-shield';
import { isAuthenticated } from './rules';

export const shieldPermissions = shield({
    Query: {
        preference: isAuthenticated,
        preferenceByKey: isAuthenticated,
        userPreferences: isAuthenticated,
        userPreferenceByKey: isAuthenticated,
        userPreference: isAuthenticated,
    },
    Mutation: {
        savePreference: isAuthenticated,
        savePreferenceByKey: isAuthenticated,
    },
});
