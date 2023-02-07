import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import * as React from 'react';
import { useEffect } from 'react';
import { graphQLClient } from '~/lib/apollo/getClient.server';

import { createUserSession, getUserToken } from '~/session.server';

const DASHBOARD_ROUTE = '/dashboard';

export const loader: LoaderFunction = async ({ request }) => {
    const userAccessToken = await getUserToken(request);
    // TODO: need to change redirect based on user type (student goes to student route, for example)
    if (userAccessToken) return redirect(DASHBOARD_ROUTE);

    return json({});
};

interface ActionData {
    error?: {
        graphQLErrors: {
            message: string;
        }[];
    };
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    // TODO: need to capture previous page if timed out & redirect to that
    // TODO: if login required to access a link provided by someone else, redirect to original destination after login
    const redirectTo = DASHBOARD_ROUTE;

    const mutation = gql`
        mutation Login($input: loginInput!) {
            login(input: $input) {
                accessToken
            }
        }
    `;

    try {
        const { data, errors } = await graphQLClient.mutate({
            mutation,
            variables: {
                input: {
                    email,
                    password,
                },
            },
        });

        if (errors) throw new Error(String(errors));

        return createUserSession({
            request,
            accessToken: data.login.accessToken,
            redirectTo,
        });
    } catch (error) {
        return json({
            error,
        });
    }
};

export const meta: MetaFunction = () => {
    return {
        title: 'Login',
    };
};

export default function LoginPage() {
    const actionData = useActionData() as ActionData;
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const errorMessage = actionData?.error?.graphQLErrors[0].message;

    useEffect(() => {
        if (errorMessage) {
            emailRef.current?.focus();
        }
    }, [errorMessage]);

    return (
        <Form method="post">
            <div>
                {errorMessage ? <div>{errorMessage}</div> : null}

                <label htmlFor="email">Email address</label>
                <div>
                    {/* // TODO: Replace with input components from osc-ui */}
                    <input
                        ref={emailRef}
                        id="email"
                        required
                        autoFocus={true}
                        name="email"
                        type="email"
                        autoComplete="email"
                        aria-invalid={errorMessage ? true : undefined}
                        aria-describedby="email-error"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <div>
                    <input
                        id="password"
                        ref={passwordRef}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={errorMessage ? true : undefined}
                        aria-describedby="password-error"
                    />
                </div>
            </div>

            <button type="submit">Log in</button>

            <div>
                Don't have an account? <Link to={'/register'}>Sign up</Link>
            </div>
        </Form>
    );
}
