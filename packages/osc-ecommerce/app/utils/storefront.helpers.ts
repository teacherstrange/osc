/**
 * Extract ID from Shopify GID string (all values after the last slash)
 * e.g. gid://shopify/Product/12345 => 12345
 *
 * @param gid - The GID string to extract the ID from.
 */
export const extractIdFromGid = (gid: string) => {
    if (!gid) return;

    const match = gid?.match(/[^/]+$/i);

    return match && match[0];
};

/**
 * Create a Sanity product ID from a Shopify ID.
 * e.g. 12345 => shopifyProduct-12345
 *
 * @param id - The Shopify ID to create a Sanity product ID from.
 */
export const createSanityProductID = (id: string) => {
    if (!id) return;
    const prefix = 'shopifyProduct-';

    return prefix + id;
};
