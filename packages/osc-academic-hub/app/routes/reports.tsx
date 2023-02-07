import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { json, redirect } from '@remix-run/server-runtime';
import { getUserToken } from '~/session.server';

export const loader: LoaderFunction = async ({ request }) => {
    const userAccessToken = await getUserToken(request);
    if (!getUserToken) return redirect('/');

    return json({
        userAccessToken, // Only here for testing
    });
};

export default function Reports() {
    const { userAccessToken } = useLoaderData();
    console.log(userAccessToken);

    return (
        <div>
            <h1>This is the Reports page</h1>
        </div>
    );
}
