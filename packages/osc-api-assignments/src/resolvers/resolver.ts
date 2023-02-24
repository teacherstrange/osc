import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { AssignmentsContext } from '~/types/interfaces';
import { baseParams, getSignedUrlParams } from '~/utils/s3';

export const resolvers = {
    Query: {
        uploadUrl: async (_: undefined, __: undefined, { s3Client }: AssignmentsContext) => {
            // Generate AWS PUT object command
            const command = new PutObjectCommand(baseParams);
            // Request a signed URL for client to upload the file to S3
            return await getSignedUrl(s3Client, command, getSignedUrlParams);
        },
    },
};
