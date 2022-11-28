import { startStandaloneServer } from '@apollo/server/standalone';
import algoliasearch from 'algoliasearch';
import * as dotenv from 'dotenv';
import Shopify from 'shopify-api-node';
import { server } from '~/server';
import { env } from '~/types/environment';
dotenv.config();

async function startServer() {
    const { url } = await startStandaloneServer(server(), {
        context: async ({ req }) => {
            const algolia = algoliasearch(env.ALGOLIA_APP_ID, env.ALGOLIA_SEARCH_KEY);

            const shopify = new Shopify({
                shopName: env.SHOPIFY_STORE_NAME,
                accessToken: env.SHOPIFY_ACCESS_TOKEN
            });

            // @ts-ignore - Type 'string[]' is not assignable to type 'string'. user will never be an array (comes from gateway)
            const user = req.headers.user ? JSON.parse(req.headers.user) : null;

            return {
                algolia,
                shopify,
                user
            };
        },
        listen: { port: 4002 }
    });
    console.info(`🚀 E-commerce Microservice ready at: ${url}`);
}

void startServer();
