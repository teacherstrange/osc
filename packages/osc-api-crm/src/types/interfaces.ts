import type { BaseContext } from '@apollo/server';
import type { Client } from '@hubspot/api-client';
import type { userJWT } from 'osc-api';

export interface CrmContext extends BaseContext {
    readonly hubspot: Client;
    readonly user?: userJWT;
}
