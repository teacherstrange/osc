import type { BaseContext } from '@apollo/server';
import type { AxiosInstance } from 'axios';
import type { JwtPayload } from 'jsonwebtoken';
import type { userJWT } from 'osc-api';

export interface LmsContext extends BaseContext {
    readonly lms: AxiosInstance;
    readonly user: userJWT;
}

export interface RefreshToken extends JwtPayload {
    readonly user: {
        readonly id: number;
    };
}
