import type { BaseContext } from '@apollo/server';
import type { userJWT } from 'osc-api';

export interface SettingsContext extends BaseContext {
    readonly user: userJWT;
}
