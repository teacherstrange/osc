import type { Preference, UserPreference } from '@prisma/client';

export type userPreferenceFinal = UserPreference & {
    details: Preference;
};

export type GetAllPreferencesFn = (userId: number) => Promise<userPreferenceFinal[]>;

export type GetSpecificByKeyFn = (
    userId: number,
    key: string
) => Promise<Error | userPreferenceFinal | null>;

export type GetSpecificByIdFn = (
    userId: number,
    preferenceId: number
) => Promise<userPreferenceFinal | null>;
