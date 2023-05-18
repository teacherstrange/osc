import type { BaseContext } from '@apollo/server';
import type { JwtPayload } from 'jsonwebtoken';
import type { userJWT } from 'osc-api';

export interface AuthContext extends BaseContext {
    readonly user?: userJWT;
}

export interface PermissionsProps {
    readonly [key: string]: string[];
}

export interface RefreshToken extends JwtPayload {
    readonly user: {
        readonly id: number;
    };
}

export interface MagicToken extends JwtPayload {
    readonly user: {
        readonly id: number;
    }
}
