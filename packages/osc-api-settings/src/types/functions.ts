import type { Preference, UserPreference } from '@prisma/client';

export type getPreferenceDetailsFn = (id: number) => Promise<Preference | null>;
export type getPreferenceDetailsByKeyFn = (key: string) => Promise<Preference | null>;

export type userPreferenceFinal = UserPreference & {
    details: Preference;
};

export type GetAllPreferencesFn = (userId: number) => Promise<userPreferenceFinal[]>;

export type GetPreferenceByKeyFn = (
    userId: number,
    key: string
) => Promise<Error | userPreferenceFinal | null>;

export type GetPreferenceFn = (
    userId: number,
    preferenceId: number
) => Promise<userPreferenceFinal | null>;

export type savePrefererenceFn = (
    userId: number,
    preferenceId: number,
    value: string
) => Promise<UserPreference | Error>;

export type savePrefererenceByKeyFn = (
    userId: number,
    key: string,
    value: string
) => Promise<UserPreference | Error>;
