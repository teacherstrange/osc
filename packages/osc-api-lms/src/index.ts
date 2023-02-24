import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { server } from '~/server';
import { env } from './types/environment';
dotenv.config();

async function startServer() {
    const { url } = await startStandaloneServer(server(), {
        context: async ({ req }) => {
            const lms = axios.create({
                baseURL: env.LMS_URL,
                timeout: 10000,
                headers: {
                    APIKey: env.LMS_API_KEY,
                    DataServiceVersion: '2.0',
                    Accept: 'application/json',
                },
            });

            // @ts-ignore - Type 'string[]' is not assignable to type 'string'. user will never be an array (comes from gateway)
            const user = req.headers.user ? JSON.parse(req.headers.user) : null;

            return {
                lms,
                user,
            };
        },
        listen: { port: 4004 },
    });
    console.info(`🚀 LMS Microservice ready at: ${url}`);
}

void startServer();
