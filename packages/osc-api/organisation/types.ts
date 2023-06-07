import type { Organisation } from '@prisma/client';

export type GetOrgByIdFn = (id: number) => Promise<Organisation | null>;
export type GetOrgByNameFn = (name: string) => Promise<Organisation | null>;
