import { startStandaloneServer } from '@apollo/server/standalone';
import * as dotenv from 'dotenv';
import { server } from '~/server';
dotenv.config();

async function startServer() {
    const { url } = await startStandaloneServer(server(), {
        context: async ({ req }) => {
            const isUser = req.headers?.user as string;
            const user = isUser ? JSON.parse(isUser) : null;

            return {
                user,
            };
        },
        listen: { port: 4007 },
    });
    console.info(`🚀 Settings Microservice ready at: ${url}`);
}

void startServer();
