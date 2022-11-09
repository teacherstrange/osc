import * as dotenv from 'dotenv';
import { startStandaloneServer } from '@apollo/server/standalone';
import { server } from './server';
dotenv.config();

async function startServer() {
    const { url } = await startStandaloneServer(server(), {
        context: async ({ req }) => {
            // @ts-ignore - Type 'string[]' is not assignable to type 'string'. user will never be an array (comes from gateway)
            const user = req.headers.user ? await JSON.parse(req.headers.user) : null;
            return { user };
        },
        listen: { port: 4001 }
    });
    console.info(`🚀 Auth Microservice ready at: ${url}`);
}

void startServer();
