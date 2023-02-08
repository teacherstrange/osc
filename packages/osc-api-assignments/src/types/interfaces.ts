import type { BaseContext } from '@apollo/server';
import type { S3Client } from '@aws-sdk/client-s3';
import type { userJWT } from 'osc-api';

export interface AssignmentsContext extends BaseContext {
    readonly client: S3Client;
    readonly user?: userJWT;
}
