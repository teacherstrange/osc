import * as dotenv from 'dotenv';
import express from 'express';
import { expressjwt } from 'express-jwt';
import { server } from '~/server';
import { env } from '~/types/environment';

dotenv.config();
const app = express();

app.use(
    expressjwt({
        secret: env.JWT_SECRET!,
        audience: env.JWT_AUDIENCE!,
        algorithms: ['HS256'],
        credentialsRequired: false
    })
);

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Gateway ready at http://localhost:4000${server.graphqlPath}`)
    );
}

void startServer();
