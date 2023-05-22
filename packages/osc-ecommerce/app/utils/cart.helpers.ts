import type { AppLoadContext } from '@remix-run/node';
import type {
    Cart,
    CartInput,
    CartLineInput,
    CartUserError,
    UserError,
} from '@shopify/hydrogen/storefront-api-types';
import invariant from 'tiny-invariant';
import { getClient } from '~/lib/sanity/getClient.server';
import { ADD_LINES_MUTATION, CART_QUERY, CREATE_CART_MUTATION } from '~/queries/shopify/cart';
import type { SanityProduct } from '~/types/sanity';
import type { CartLineWithSanityData } from '~/types/shopify';
import { createSanityProductID, extractIdFromGid } from './storefront.helpers';

/* -------------------------------------------------------------------------------------------------
 * Insert Sanity data into line item
 * -----------------------------------------------------------------------------------------------*/
/**
 * Insert the description from Sanity into the cart line item.
 * @param cart - The cart object to insert the description into.
 * @throws An error if the query fails.
 */
export const insertSanityDataIntoLineItem = async (cart: Cart) => {
    // Push the product ids into an array so we can query them in Sanity
    const ids = [];
    for (const line of cart.lines.edges) {
        const id = extractIdFromGid(line.node.merchandise.product.id);
        if (!id) continue;

        ids.push(createSanityProductID(id));
    }

    // Query Sanity for the products in the cart
    const querySanityDataset = await getClient()
        .fetch(
            '*[_id in $ids] { _id, "gid": store.gid, "description": upperContent[0] { (_type == "module.content") => { body[0] } } }',
            { ids }
        )
        .catch((error) => {
            throw new Response(error, {
                status: 500,
            });
        });

    // Find the matching product id and insert the description into the cart line
    for (const line of cart.lines.edges) {
        const productID = line.node.merchandise.product.id;

        // Find matching sanity product data
        const sanityProductData = querySanityDataset.find(
            (product: SanityProduct) => product.gid === productID
        );

        // Insert description if sanity product data exists
        if (sanityProductData && sanityProductData.description) {
            const node = line.node as CartLineWithSanityData;

            node.sanityData = { description: sanityProductData.description };
        }
    }

    return cart;
};

/* -------------------------------------------------------------------------------------------------
 * Query Cart
 * -----------------------------------------------------------------------------------------------*/
/**
 * Retrieve a cart object by ID from a Storefront instance.
 *
 * @param context - The app load context containing the storefront client.
 * @param cartId - The ID of the cart to retrieve.
 * @returns A Promise that resolves to the Cart or undefined if it doesn't exist.
 * @throws An error if the storefront is missing or the query fails.
 */
export const getCart = async (context: AppLoadContext, cartId: string) => {
    const { storefront } = context;

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

    if (!cart) return;

    const cartWithSanityData = await insertSanityDataIntoLineItem(cart);

    return cartWithSanityData;
};

/* -------------------------------------------------------------------------------------------------
 * Create new cart
 * -----------------------------------------------------------------------------------------------*/
interface CreateCart {
    input: CartInput;
    storefront: AppLoadContext['storefront'];
}
/**
 * Creates a new cart using the given input and storefront.
 *
 * @param {Object} args - An object containing the input and storefront.
 * @param args.input - CartInput https://shopify.dev/api/storefront/2022-01/input-objects/CartInput
 * @param args.storefront - The storefront object used to make the mutation.
 * @see https://shopify.dev/api/storefront/2022-01/mutations/cartcreate
 * @returns result {cart, errors}
 * @preserve
 */
export async function createCart(args: CreateCart) {
    const { input, storefront } = args;

    const { cartCreate } = await storefront.mutate<{
        cartCreate: {
            cart: Cart;
            errors: CartUserError[];
        };
        errors: UserError[];
    }>(CREATE_CART_MUTATION, {
        variables: { input },
    });

    invariant(cartCreate, 'No data returned from cartCreate mutation');

    return cartCreate;
}

/* -------------------------------------------------------------------------------------------------
 * Add lines to cart
 * -----------------------------------------------------------------------------------------------*/

interface AddLines {
    cartId: string;
    lines: CartLineInput[];
    storefront: AppLoadContext['storefront'];
}
/**
 * Adds a new line to the cart using the cartId and the storefront.
 *
 * @param {Object} args - An object containing the cartId, input and storefront.
 * @param args.cartId - The ID of the cart to retrieve.
 * @param args.lines - CartLineInput[] https://shopify.dev/api/storefront/2022-01/input-objects/CartLineInput
 * @param args.storefront - The storefront object used to make the mutation.
 * @see https://shopify.dev/api/storefront/2022-01/mutations/cartLinesAdd
 * @returns result {cart, errors}
 * @preserve
 */
export async function addLinesToCart(args: AddLines) {
    const { cartId, lines, storefront } = args;

    const { cartLinesAdd } = await storefront.mutate<{
        cartLinesAdd: {
            cart: Cart;
            errors: CartUserError[];
        };
    }>(ADD_LINES_MUTATION, {
        variables: { cartId, lines },
    });

    invariant(cartLinesAdd, 'No data returned from cartLinesAdd mutation');

    return cartLinesAdd;
}
