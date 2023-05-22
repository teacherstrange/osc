import { createSanityProductID, extractIdFromGid } from './storefront.helpers';

describe('extractIdFromGid', () => {
    test('should return the id number from the Shopify id', () => {
        expect(extractIdFromGid('gid://shopify/Product/12345')).toBe('12345');
    });
});

describe('createSanityProductID', () => {
    test('should return a Sanity product ID from a Shopify ID', () => {
        expect(createSanityProductID('12345')).toBe('shopifyProduct-12345');
    });
});
