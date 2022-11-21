import type { BaseContext } from '@apollo/server';
import type { JwtPayload } from 'jsonwebtoken';
import type { refreshTokenUser, userJWT } from './general';

export interface AuthContext extends BaseContext {
    readonly user?: userJWT;
}

export interface PermissionsProps {
    readonly [key: string]: string[];
}

export interface RefreshToken extends JwtPayload {
    readonly user: refreshTokenUser;
}
