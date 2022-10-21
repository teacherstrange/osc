// Use this to delete a user by their email and that user will get deleted
import { installGlobals } from '@remix-run/node';
import { prisma } from '~/db.server';

installGlobals();

export async function deleteUser(email: string) {
    if (!email) {
        throw new Error('email required for login');
    }
    if (!email.endsWith('@example.com')) {
        throw new Error('All test emails must end in @example.com');
    }

    await prisma.user.delete({ where: { email } });
}
