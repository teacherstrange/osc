import type { Cart } from '@shopify/hydrogen/storefront-api-types';
import type { AppLoadContext } from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';
import { CART_QUERY } from '~/queries/shopify/cart';

/* -------------------------------------------------------------------------------------------------
 * Query Cart
 * -----------------------------------------------------------------------------------------------*/
/**
 * Retrieve a cart object by ID from a Storefront instance.
 *
 * @param storefront - The Storefront instance to use for the query.
 * @param cartId - The ID of the cart to retrieve.
 * @returns A Promise that resolves to the Cart or undefined if it doesn't exist.
 * @throws An error if the storefront is missing or the query fails.
 */
export const getCart = async ({ storefront }: AppLoadContext, cartId: string) => {
    invariant(storefront, 'missing storefront client in cart query');

    const { cart } = await storefront.query<{ cart?: Cart }>(CART_QUERY, {
        variables: {
            cartId,
            country: storefront.i18n.country,
            language: storefront.i18n.language,
        },
        // TODO: Enable cache once caching is setup
        // cache: storefront.CacheNone(),
    });

    return cart;
};
