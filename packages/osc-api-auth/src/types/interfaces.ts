import type { BaseContext } from '@apollo/server';
import type { JwtPayload } from 'jsonwebtoken';
import type { refreshTokenUser, userJWT } from './general';

export interface AuthContext extends BaseContext {
    user?: userJWT;
}

export interface PermissionsProps {
    [key: string]: string[];
}

export interface RefreshToken extends JwtPayload {
    user: refreshTokenUser;
}
