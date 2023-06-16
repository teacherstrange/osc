import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import { permissions } from 'osc-api';
import { env } from '~/types/environment';
// If we're in local development we're going to bypass the managed federation and use Introspect and Compose
// We do not want to provide a routing url to apollo studio pointing at our local as it's not really built for it
const gateway =
    env.NODE_ENV === 'development'
        ? new ApolloGateway({
              supergraphSdl: new IntrospectAndCompose({
                  subgraphs: [
                      { name: 'OSC-Auth', url: env.AUTH_API_URL },
                      { name: 'OSC-Ecommerce', url: env.ECOMMERCE_API_URL },
                      { name: 'OSC-CRM', url: env.CRM_API_URL },
                      { name: 'OSC-Admin', url: env.ADMIN_API_URL },
                      { name: 'OSC-LMS', url: env.LMS_API_URL },
                      { name: 'OSC-Assignments', url: env.ASSIGNMENTS_API_URL },
                      { name: 'OSC-Settings', url: env.SETTINGS_API_URL },
                  ],
              }),
              buildService({ name, url }) {
                  return new RemoteGraphQLDataSource({
                      url,
                      willSendRequest({ request, context }) {
                          request?.http?.headers.set(
                              'user',
                              context.user ? JSON.stringify(context.user) : ''
                          );
                      },
                  });
              },
          })
        : new ApolloGateway({
              buildService({ name, url }) {
                  return new RemoteGraphQLDataSource({
                      url,
                      willSendRequest({ request, context }) {
                          request?.http?.headers.set(
                              'user',
                              context.user ? JSON.stringify(context.user) : ''
                          );
                      },
                  });
              },
          });

export const server = new ApolloServer({
    gateway,
    context: async ({ req }) => {
        // @ts-ignore
        const user = req.auth?.user || null;
        if (user != null) {
            const permissionCheck = await permissions(user.id);
            user.permissions = permissionCheck;
        }
        return { user };
    },
});
