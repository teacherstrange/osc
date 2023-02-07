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

export default function StudentList() {
    const { userAccessToken } = useLoaderData();
    console.log(userAccessToken);

    return (
        <div>
            <h1>This is the StudentList page</h1>
        </div>
    );
}
