import type { BaseContext } from '@apollo/server';
import type { SearchClient } from 'algoliasearch';
import type { JwtPayload } from 'jsonwebtoken';
import type { userJWT } from 'osc-api';
import type Shopify from 'shopify-api-node';

export interface EcommerceContext extends BaseContext {
    readonly algolia: SearchClient;
    readonly shopify: Shopify;
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
