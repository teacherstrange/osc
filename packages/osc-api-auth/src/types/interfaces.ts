import type { BaseContext } from '@apollo/server';
import type { userJWT } from './general';

export interface AuthContext extends BaseContext {
    user?: userJWT;
}

export interface permissionsProps {
    [key: string]: string[];
}
