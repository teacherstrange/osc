import type { Location } from '@remix-run/react';
import { PATHS } from '~/constants';

/**
 * Return the name of the current page type
 *
 * @param location Location object containing information on the current page
 * @returns string representing the page type
 */
export const getPageType = (location: Location) => {
    const { pathname } = location;

    if (pathname === PATHS.HOME) {
        return 'home';
    }

    if (pathname.includes(PATHS.PRODUCTS)) {
        return PATHS.PRODUCTS;
    }

    if (pathname.includes(PATHS.COLLECTIONS)) {
        return PATHS.COLLECTIONS;
    }

    if (pathname.includes(PATHS.BLOG)) {
        return PATHS.BLOG;
    }

    if (pathname.includes(PATHS.AWARDS)) {
        return PATHS.AWARDS;
    }

    if (pathname.includes(PATHS.CART)) {
        return PATHS.CART;
    }

    if (pathname.includes(PATHS.WISHLIST)) {
        return PATHS.WISHLIST;
    }

    return undefined;
};
