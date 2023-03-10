import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import invariant from 'tiny-invariant';

invariant(process.env.API_GATEWAY_URL, `process.env.API_GATEWAY_URL must be set`);

export const graphQLClient = new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: createHttpLink({
        uri: process.env.API_GATEWAY_URL,
    }),
});
