import { env } from '~/types/environment';

export const baseParams = {
    Bucket: env.S3_BUCKET,
    Key: env.S3_KEY_ID,
} as const;

export const getSignedUrlParams = {
    expiresIn: 30,
} as const;
