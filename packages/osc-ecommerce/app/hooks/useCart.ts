import { useMatches } from '@remix-run/react';
import type { Cart } from '@shopify/hydrogen/storefront-api-types';

/**
 * A custom hook that returns the cart object from the root loader if it exists.
 *
 * The cart must exported from the loader.
 * The cart in the root loader will return undefined if no cart has been created by the user,
 * which is done in the cart route.
 *
 * @returns The cart object if it exists, otherwise undefined.
 */
export const useCart = () => {
    const [root] = useMatches();
    const cart = root.data?.cart as Cart;

    if (!cart) console.warn('No cart ID created');

    return cart;
};
