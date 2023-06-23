import type { Preference } from '@prisma/client';

export type GetPreferenceFn = (id: number) => Promise<Preference | null>;
export type GetPreferenceByKeyFn = (key: string) => Promise<Preference | null>;
