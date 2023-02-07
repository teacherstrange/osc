import { createCookieSessionStorage, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set');

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        maxAge: 0,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === 'production',
    },
});

const USER_SESSION_KEY = 'accessToken';

export async function getSession(request: Request) {
    const cookie = request.headers.get('Cookie');
    return sessionStorage.getSession(cookie);
}

export async function getUserToken(request: Request) {
    const session = await getSession(request);
    const token = session.get(USER_SESSION_KEY);

    return token;
}

export async function createUserSession({
    request,
    accessToken,
    redirectTo,
}: {
    request: Request;
    accessToken: string;
    redirectTo: string;
}) {
    const session = await getSession(request);
    session.set(USER_SESSION_KEY, accessToken);

    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session, {
                maxAge: undefined, // not sure if undefined is correct, but need a maxAge & value to make this work
            }),
        },
    });
}

export async function logout(request: Request) {
    const session = await getSession(request);
    return redirect('/login', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session),
        },
    });
}
