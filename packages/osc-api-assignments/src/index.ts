import { startStandaloneServer } from '@apollo/server/standalone';
import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import { server } from './server';
dotenv.config();

async function startServer() {
    const { url } = await startStandaloneServer(server(), {
        context: async ({ req }) => {
            const client = new S3Client({ region: 'eu-west-1' });

            // @ts-ignore - Type 'string[]' is not assignable to type 'string'. user will never be an array (comes from gateway)
            const user = req.headers.user ? JSON.parse(req.headers.user) : null;
            return { client, user };
        },
        listen: { port: 4006 },
    });
    console.info(`🚀 Assignments Microservice ready at: ${url}`);
}

void startServer();
