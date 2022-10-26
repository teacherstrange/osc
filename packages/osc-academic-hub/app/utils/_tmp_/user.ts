import type { User } from '~/models/user.server';
import { useMatchesData } from './useMatchesData';

function isUser(user: any): user is User {
    return user && typeof user === 'object' && typeof user.email === 'string';
}

// use this when you just want the value of user, ie to redirect
export function useOptionalUser(): User | undefined {
    const data = useMatchesData('root');
    if (!data || !isUser(data.user)) {
        return undefined;
    }
    return data.user;
}

// use this when you want to ensure there is a user on the page, or it throws an error
export function useUser(): User {
    const maybeUser = useOptionalUser();
    if (!maybeUser) {
        throw new Error(
            'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.'
        );
    }
    return maybeUser;
}
