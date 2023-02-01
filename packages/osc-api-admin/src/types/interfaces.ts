import type { BaseContext } from '@apollo/server';
import type { userJWT } from 'osc-api';

export interface AdminContext extends BaseContext {
    readonly user: userJWT;
}
