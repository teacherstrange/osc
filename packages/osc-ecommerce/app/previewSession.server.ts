import { createCookieSessionStorage } from '@remix-run/node'; // or cloudflare/deno

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: '__sanityPreviewSession',
        httpOnly: true,
        sameSite: 'lax',
        secrets: ['s3cret1'],
    },
});

export { getSession, commitSession, destroySession };
