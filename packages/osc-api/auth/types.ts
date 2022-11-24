import type { userJWT } from '../user';

export type UserCanFn = (user: userJWT, desiredPermission: string | string[]) => boolean;
