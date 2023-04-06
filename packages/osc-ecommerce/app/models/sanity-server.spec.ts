import { PATHS } from '~/constants';
import { COLLECTION_QUERY } from '~/queries/sanity/collection';
import { HOME_QUERY } from '~/queries/sanity/home';
import { PRODUCT_QUERY } from '~/queries/sanity/product';
import getPageData, { buildUrlPath, shouldRedirect } from './sanity.server';
// eslint-disable-next-line jest/no-mocks-import -- no clear way to intercept a request form remix so we want to use this as a function rather than a true mock -- perhaps this could be done better?
import { mockHomeRequest } from '../../__mocks__/requests';

describe("Tests that getPageData doesn't hang", () => {
    test('returns data from a query to the homepage', async () => {
        const data = await getPageData({
            request: mockHomeRequest('http://localhost/'),
            query: HOME_QUERY,
        });

        if (!data) throw Error('Request failed');
        const { page, isPreview } = data;

        expect(page?._id).toBe('home');
        expect(isPreview).toBe(false);
    });

    test('returns store data from a query to a collection', async () => {
        const data = await getPageData({
            request: mockHomeRequest(`http://localhost/${PATHS.COLLECTIONS}/accounting`),
            params: { slug: 'accounting' },
            query: COLLECTION_QUERY,
        });

        if (!data) throw Error('Request failed');
        const { page } = data;

        expect(page?._type).toBe('collection');

        // Expect these key properties
        expect(page.store).toEqual(
            expect.objectContaining({
                descriptionHtml: expect.any(String),
                gid: expect.any(String),
                id: expect.any(Number),
                isDeleted: expect.any(Boolean),
                slug: {
                    _type: 'slug',
                    current: 'accounting',
                },
                title: expect.any(String),
            })
        );
    });

    test('returns store data from a query to a product', async () => {
        const data = await getPageData({
            request: mockHomeRequest(`http://localhost/${PATHS.PRODUCTS}/a-level-maths`),
            params: { slug: 'a-level-maths' },
            query: PRODUCT_QUERY,
        });

        if (!data) throw Error('Request failed');
        const { page } = data;

        expect(page?._type).toBe('product');

        // Expect these key properties
        expect(page.store).toEqual(
            expect.objectContaining({
                descriptionHtml: expect.any(String),
                gid: expect.any(String),
                id: expect.any(Number),
                isDeleted: expect.any(Boolean),
                options: expect.arrayContaining([
                    expect.objectContaining({
                        _key: expect.any(String),
                        _type: 'option',
                        name: expect.any(String),
                        // We expect the returned array to include at least some of these values
                        values: expect.arrayIncludesSome([
                            'Course Material',
                            'Course Material + Exams',
                            'Online',
                            'Study Pack'
                        ])
                    })
                ]),
                priceRange: {
                    maxVariantPrice: expect.any(Number),
                    minVariantPrice: expect.any(Number)
                },
                slug: {
                    _type: 'slug',
                    current: 'a-level-maths'
                },
                status: expect.any(String),
                title: expect.any(String),
                variants: expect.arrayContaining([
                    expect.objectContaining({
                        _key: expect.any(String),
                        _ref: expect.any(String),
                        _type: 'reference'
                    })
                ])
            })
        );
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
            slug: 'test-post',
        });

        expect(urlPath).toBe(`/${PATHS.BLOG}/test-post`);
    });

    test('builds the collection path', () => {
        const urlPath = buildUrlPath({
            type: 'collection',
            url,
            slug: 'test-collection',
        });

        expect(urlPath).toBe(`/${PATHS.COLLECTIONS}/test-collection`);
    });

    test('builds the product path', () => {
        const urlPath = buildUrlPath({
            type: 'product',
            url,
            slug: 'test-product',
        });

        expect(urlPath).toBe(`/${PATHS.PRODUCTS}/test-product`);
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
