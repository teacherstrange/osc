// learn more: https://fly.io/docs/reference/configuration/#services-http_checks
import type { LoaderFunction } from '@remix-run/node';

import { prisma } from '~/db.server';

export const loader: LoaderFunction = async ({ request }) => {
    try {
        // if we can connect to the database and make a simple query
        // and make a HEAD request to ourselves, then we're good.
        await Promise.all([prisma.user.count()]);
        return new Response('OK');
    } catch (error: unknown) {
        console.log('healthcheck ❌', { error });
        return new Response('ERROR', { status: 500 });
    }
};
