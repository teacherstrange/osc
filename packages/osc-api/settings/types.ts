import type { Preference } from '@prisma/client';

export type GetPreferenceByKeyFn = (key: string) => Promise<Preference | null>;
