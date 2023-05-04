import type { ActionFunction, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { commitSession, destroySession, getSession } from '~/previewSession.server';

// Visitors to this route will receive a “session cookie” and be redirected to the home page.

// A `POST` request to this route will exit preview mode
export const action: ActionFunction = async ({ request }) => {
    if (request.method !== 'POST') {
        return json({ message: 'Method not allowed' }, 405);
    }

    const session = await getSession(request.headers.get('Cookie'));

    return redirect('/', {
        headers: {
            'Set-Cookie': await destroySession(session),
        },
    });
};

// A `GET` request to this route will enter preview mode
export const loader = async ({ request }: LoaderArgs) => {
    const session = await getSession(request.headers.get('Cookie'));

    // Grab the page slug from the search parameters
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    // Write viewer token to session so that every route can authenticate by it
    session.set(`preview`, process.env.SANITY_STUDIO_API_TOKEN);

    // Redirect to the slug if it exists otherwise default to homepage
    return redirect(slug ? `/${slug}` : `/`, {
        headers: {
            'Set-Cookie': await commitSession(session),
        },
    });
};
