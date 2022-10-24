import getPageData, { buildUrlPath, shouldRedirect } from './sanity.server';
// eslint-disable-next-line jest/no-mocks-import -- no clear way to intercept a request form remix so we want to use this as a function rather than a true mock -- perhaps this could be done better?
import { mockHomeRequest } from '../../__mocks__/requests';
import { HOME_QUERY } from '~/queries/sanity/home';
import { COLLECTION_QUERY } from '~/queries/sanity/collection';
import { PRODUCT_QUERY } from '~/queries/sanity/product';

describe("Tests that getPageData doesn't hang", () => {
    test('returns data from a query to the homepage', async () => {
        const data = await getPageData({
            request: mockHomeRequest('http://localhost/'),
            query: HOME_QUERY
        });

        if (!data) throw Error('Request failed');
        const { page, isPreview } = data;

        expect(page?._id).toBe('home');
        expect(isPreview).toBe(false);
    });

    test('returns store data from a query to a collection', async () => {
        const data = await getPageData({
            request: mockHomeRequest('http://localhost/collections/accounting'),
            params: { slug: 'accounting' },
            query: COLLECTION_QUERY
        });

        if (!data) throw Error('Request failed');
        const { page } = data;

        expect(page?._type).toBe('collection');
        // Should match _all_ of the store data
        expect(page?.store).toMatchObject({
            createdAt: '2022-09-30T10:19:56.409Z',
            descriptionHtml: '',
            disjunctive: false,
            gid: 'gid://shopify/Collection/387079045375',
            id: 387079045375,
            isDeleted: false,
            rules: [
                {
                    _key: '18c07fa0-e97e-54a7-af3f-76d1135f72bb',
                    _type: 'object',
                    column: 'TAG',
                    condition: 'Accounting',
                    relation: 'EQUALS'
                }
            ],
            slug: {
                _type: 'slug',
                current: 'accounting'
            },
            sortOrder: 'BEST_SELLING',
            title: 'Accounting'
        });
    });

    test('returns store data from a query to a product', async () => {
        const data = await getPageData({
            request: mockHomeRequest('http://localhost/products/a-level-maths'),
            params: { slug: 'a-level-maths' },
            query: PRODUCT_QUERY
        });

        if (!data) throw Error('Request failed');
        const { page } = data;

        expect(page?._type).toBe('product');
        expect(page?.store).toMatchObject({
            createdAt: '2021-11-09T00:00:40Z',
            descriptionHtml: '',
            gid: 'gid://shopify/Product/7438715551999',
            id: 7438715551999,
            isDeleted: false,
            options: [
                {
                    _key: 'Format',
                    _type: 'option',
                    name: 'Format',
                    values: ['Course Material', 'Course Material + Exams']
                },
                {
                    _key: 'Study-method',
                    _type: 'option',
                    name: 'Study-method',
                    values: ['Online', 'Study Pack']
                }
            ],
            previewImageUrl:
                'https://cdn.shopify.com/s/files/1/0609/0519/3727/products/OSC1289-category-image-e1599048301547.jpg?v=1636416440',
            priceRange: {
                maxVariantPrice: 899,
                minVariantPrice: 469
            },
            productType: '',
            slug: {
                _type: 'slug',
                current: 'a-level-maths'
            },
            status: 'active',
            tags: 'import_2021_11_08_234706, Mathematics & Economics',
            title: 'A Level Maths',
            variants: [
                {
                    _key: '89187a13-264d-5b62-9946-e366ca57aa51',
                    _ref: 'shopifyProductVariant-42016931414271',
                    _type: 'reference',
                    _weak: true
                },
                {
                    _key: 'd89e2615-e478-5827-a6c3-bc60e06fc999',
                    _ref: 'shopifyProductVariant-42016931447039',
                    _type: 'reference',
                    _weak: true
                },
                {
                    _key: 'fb900d42-b9a8-52fa-b4d7-20bf3e51c76a',
                    _ref: 'shopifyProductVariant-42016931479807',
                    _type: 'reference',
                    _weak: true
                },
                {
                    _key: 'c342a5c0-0353-51fd-9983-6a30913bef08',
                    _ref: 'shopifyProductVariant-42016931512575',
                    _type: 'reference',
                    _weak: true
                }
            ],
            vendor: 'openstudydev'
        });
    });
});

describe('buildUrlPath()', () => {
    const url = new URL('http://localhost/');

    test('builds the homepage path', () => {
        const urlPath = buildUrlPath({
            type: 'home',
            url,
            slug: '/'
        });

        expect(urlPath).toBe('/');
    });

    test('builds the deafult path', () => {
        const urlPath = buildUrlPath({
            type: 'page',
            url,
            slug: 'test-page'
        });

        expect(urlPath).toBe('/test-page');
    });

    test('builds the blog path', () => {
        const urlPath = buildUrlPath({
            type: 'post',
            url,
            slug: 'test-post'
        });

        expect(urlPath).toBe('/blog/test-post');
    });

    test('builds the collection path', () => {
        const urlPath = buildUrlPath({
            type: 'collection',
            url,
            slug: 'test-collection'
        });

        expect(urlPath).toBe('/collections/test-collection');
    });

    test('builds the product path', () => {
        const urlPath = buildUrlPath({
            type: 'product',
            url,
            slug: 'test-product'
        });

        expect(urlPath).toBe('/products/test-product');
    });
});

describe('shouldRedirect()', () => {
    test('returns a redirect object', async () => {
        // Mock a fake page, make sure the slug is an redirect in Sanity
        const request = mockHomeRequest('http://localhost/what-page');

        const redirect = await shouldRedirect(request);

        expect(redirect?.status).toBe(301);
    });

    test("returns undefined if redirect doesn't exist", async () => {
        const request = mockHomeRequest('http://localhost/');

        const redirect = await shouldRedirect(request);

        expect(redirect).toBe(undefined);
    });
});
