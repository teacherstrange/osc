import type { AppLoadContext } from '@remix-run/node';
import type {
    Cart,
    CartBuyerIdentityInput,
    CartInput,
    CartLineInput,
    CartLineUpdateInput,
    CartUserError,
    Product,
    ProductVariant,
    SelectedOptionInput,
    UserError,
} from '@shopify/hydrogen/storefront-api-types';
import invariant from 'tiny-invariant';
import { getClient } from '~/lib/sanity/getClient.server';
import { LINE_ITEM_QUERY } from '~/queries/sanity/lineItemData';
import {
    ADD_LINES_MUTATION,
    CART_QUERY,
    CREATE_CART_MUTATION,
    DISCOUNT_CODES_UPDATE,
    LINES_UPDATE_MUTATION,
    REMOVE_LINE_ITEMS_MUTATION,
    UPDATE_CART_BUYER_ID,
} from '~/queries/shopify/cart';
import { SELECTED_PRODUCT_VARIANT_ID } from '~/queries/shopify/product';
import type { SanityProduct, SanityProductExcerpt } from '~/types/sanity';
import type { CartLineWithSanityData } from '~/types/shopify';
import { createSanityProductID, extractIdFromGid, isGiftVoucher } from './storefront.helpers';

/* -------------------------------------------------------------------------------------------------
 * Insert Sanity data into line item
 * -----------------------------------------------------------------------------------------------*/
/**
 * Insert the description from Sanity into the cart line item.
 * @param cart - The cart object to insert the description into.
 * @throws An error if the query fails.
 */
export const insertSanityDataIntoLineItem = async (cart: Cart) => {
    invariant(cart, 'Cart object not passed to `insertSanityDataIntoLineItem`');

    // Push the product ids into an array so we can query them in Sanity
    const ids = [];
    for (const line of cart.lines.edges) {
        const id = extractIdFromGid(line.node.merchandise.product.id);
        if (!id) continue;

        ids.push(createSanityProductID(id));
    }

    // Query Sanity for the products in the cart
    const querySanityDataset = await getClient()
        .fetch(LINE_ITEM_QUERY, { ids })
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
        ) as SanityProductExcerpt;

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

    const cart = await getCart({ storefront } as AppLoadContext, cartId);

    // If the cart already has an item that matches the merchandiseId then return true
    const hasExistingItem = cart?.lines.edges.some((line) => {
        if (isGiftVoucher(line.node.merchandise)) return false;

        return line.node.merchandise.id === lines[0].merchandiseId;
    });

    const { cartLinesAdd } = await storefront.mutate<{
        cartLinesAdd: {
            cart: Cart;
            errors: CartUserError[];
        };
    }>(ADD_LINES_MUTATION, {
        variables: {
            cartId,
            // Don't update the quantity if the cart already has an item that matches the merchandiseId
            lines: hasExistingItem
                ? [
                      {
                          ...lines[0],
                          quantity: 0,
                      },
                  ]
                : lines,
        },
    });

    invariant(cartLinesAdd, 'No data returned from cartLinesAdd mutation');

    return cartLinesAdd;
}

/* -------------------------------------------------------------------------------------------------
 * Remove lines from cart
 * -----------------------------------------------------------------------------------------------*/
interface RemoveLines {
    cartId: string;
    lineIds: Cart['id'][];
    storefront: AppLoadContext['storefront'];
}

/**
 * Create a cart with line(s) mutation
 * @param cartId the current cart id
 * @param lineIds [ID!]! an array of cart line ids to remove
 * @see https://shopify.dev/api/storefront/2022-07/mutations/cartlinesremove
 * @returns mutated cart
 * @preserve
 */
export async function removeLinesFromCart(args: RemoveLines) {
    const { cartId, lineIds, storefront } = args;

    const { cartLinesRemove } = await storefront.mutate<{
        cartLinesRemove: {
            cart: Cart;
            errors: UserError[];
        };
    }>(REMOVE_LINE_ITEMS_MUTATION, {
        variables: { cartId, lineIds },
    });

    invariant(cartLinesRemove, 'No data returned from remove lines mutation');

    return cartLinesRemove;
}

/* -------------------------------------------------------------------------------------------------
 * Update lines in cart
 * -----------------------------------------------------------------------------------------------*/
interface UpdateLine {
    cartId: string;
    linesIds: Cart['id'][];
    productId: Product['id'];
    selectedOptions: SelectedOptionInput[];
    storefront: AppLoadContext['storefront'];
}

/**
 * Update cart line(s) mutation
 *
 * @param cartId the current cart id
 * @param lineIds [ID!]! an array of cart line ids to update
 * @param productId [Product['id']] the product id to update
 * @param selectedOptions [SelectedOptionInput!]! an array of selected options
 * @param storefront the storefront object used to make the mutation
 * @see https://shopify.dev/api/storefront/2022-07/mutations/cartlinesremove
 * @returns mutated cart
 * @preserve
 */
export async function updateLinesInCart(args: UpdateLine) {
    const { cartId, linesIds, productId, selectedOptions, storefront } = args;
    const lines: CartLineUpdateInput[] = [{ id: linesIds[0] }];

    // In order to get the updated product variant id we first need to query the product variant id from the product
    const { product } = await storefront.query<{
        product: Product & { selectedVariant?: ProductVariant };
    }>(SELECTED_PRODUCT_VARIANT_ID, {
        variables: {
            productId,
            selectedOptions,
        },
    });

    // Pass the updated product variant id to the lines array
    lines[0].merchandiseId = product?.selectedVariant?.id;

    const { cartLinesUpdate } = await storefront.mutate<{
        cartLinesUpdate: {
            cart: Cart;
            errors: UserError[];
        };
    }>(LINES_UPDATE_MUTATION, {
        variables: { cartId, lines },
    });

    invariant(cartLinesUpdate, 'No data returned from update lines items mutation');

    return cartLinesUpdate;
}

/* -------------------------------------------------------------------------------------------------
 * Discounts
 * -----------------------------------------------------------------------------------------------*/
interface UpdateCartDiscounts {
    cartId: string;
    discountCodes: string[];
    storefront: AppLoadContext['storefront'];
}

/**
 * Mutation that updates the cart discounts
 * @param discountCodes Array of discount codes
 * @returns mutated cart
 * @preserve
 */
export async function updateCartDiscounts(args: UpdateCartDiscounts) {
    const { cartId, discountCodes, storefront } = args;

    const { cartDiscountCodesUpdate } = await storefront.mutate<{
        cartDiscountCodesUpdate: {
            cart: Cart;
            errors: UserError[];
        };
    }>(DISCOUNT_CODES_UPDATE, {
        variables: {
            cartId,
            discountCodes,
        },
    });

    invariant(
        cartDiscountCodesUpdate,
        'No data returned from the cartDiscountCodesUpdate mutation'
    );

    return cartDiscountCodesUpdate;
}

/* -------------------------------------------------------------------------------------------------
 * Update Buyer Identity
 * cartBuyerIdentityUpdate is used to associate customer info with a cart and is used to determine international pricing.
 * -----------------------------------------------------------------------------------------------*/
/**
 * Mutation to update a cart buyerIdentity
 * @param cartId  Cart['id']
 * @param buyerIdentity CartBuyerIdentityInput
 * @returns {cart: Cart; errors: UserError[]}
 * @see API https://shopify.dev/api/storefront/2022-10/mutations/cartBuyerIdentityUpdate
 * @preserve
 */
export async function updateCartBuyerIdentity({
    cartId,
    buyerIdentity,
    storefront,
}: {
    cartId: string;
    buyerIdentity: CartBuyerIdentityInput;
    storefront: AppLoadContext['storefront'];
}) {
    const { cartBuyerIdentityUpdate } = await storefront.mutate<{
        cartBuyerIdentityUpdate: {
            cart: Cart;
            errors: UserError[];
        };
    }>(UPDATE_CART_BUYER_ID, {
        variables: {
            cartId,
            buyerIdentity,
        },
    });

    invariant(cartBuyerIdentityUpdate, 'No data returned from cart buyer identity update mutation');

    return cartBuyerIdentityUpdate;
}
