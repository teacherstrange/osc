import { createCookieSessionStorage } from '@remix-run/node'; // or cloudflare/deno
import invariant from 'tiny-invariant';

invariant(process.env.PREVIEW_SESSION_SECRET, 'PREVIEW_SESSION_SECRET must be set');

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: '__sanityPreviewSession',
        httpOnly: true,
        sameSite: 'lax',
        secrets: [process.env.PREVIEW_SESSION_SECRET!],
    },
});

export { getSession, commitSession, destroySession };
