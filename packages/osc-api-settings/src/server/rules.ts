import { rule } from 'graphql-shield';
import type { SettingsContext } from '~/types/interfaces';

export const isAuthenticated = rule()((_: undefined, __: undefined, { user }: SettingsContext) => {
    return user !== null;
});
