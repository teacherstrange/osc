// Use this to create a new user
import { installGlobals } from '@remix-run/node';
import { createUser } from '~/models/user.server';

installGlobals();

export async function createNewUser(email: string) {
    if (!email) {
        throw new Error('email required for login');
    }
    if (!email.endsWith('@example.com')) {
        throw new Error('All test emails must end in @example.com');
    }

    const user = await createUser(email, 'myreallystrongpassword');

    return user;
}
