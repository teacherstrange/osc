import { startStandaloneServer } from '@apollo/server/standalone';
import { Client } from '@hubspot/api-client';
import * as dotenv from 'dotenv';
import { server } from './server';
import { env } from './types/environment';
dotenv.config();

async function startServer() {
    const { url } = await startStandaloneServer(server(), {
        context: async ({ req }) => {
            const hubspot = new Client({ accessToken: env.HUBSPOT_ACCESS_TOKEN });

            // @ts-ignore - Type 'string[]' is not assignable to type 'string'. user will never be an array (comes from gateway)
            const user = req.headers.user ? JSON.parse(req.headers.user) : null;
            return { hubspot, user };
        },
        listen: { port: 4003 },
    });
    console.info(`🚀 CRM Microservice ready at: ${url}`);
}

void startServer();
