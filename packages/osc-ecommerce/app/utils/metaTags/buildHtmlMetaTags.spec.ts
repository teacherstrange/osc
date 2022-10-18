import type { SanityPage } from '~/types/sanity';
import { buildHtmlMetaTags } from './buildHtmlMetaTags';

const fakeGlobalSeoSettings = {
    title: '',
    description: null,
    titleSeparator: '|',
    siteTile: 'Test global title',
    image: null
};

const fakeData: SanityPage = {
    _id: '1',
    _rev: '1',
    title: 'Test title',
    seo: {
        title: '',
        description: '',
        image: {
            url: 'https://example.com/image.png',
            dimensions: {
                width: '375',
                height: '375'
            }
        },
        canonicalUrl: 'https://example.com',
        robots: {
            noIndex: false
        }
    }
};

describe('page title', () => {
    test('adds the default page title to the meta object if seo.title is blank', async () => {
        const meta = buildHtmlMetaTags({
            pageData: fakeData,
            globalData: fakeGlobalSeoSettings,
            canonicalUrl: fakeData.seo.canonicalUrl
        });

        expect(meta.title).toEqual('Test title | Test global title');
    });

    test('adds the page title from seo.title', async () => {
        fakeData.seo.title = 'SEO Title';

        const meta = buildHtmlMetaTags({
            pageData: fakeData,
            globalData: fakeGlobalSeoSettings,
            canonicalUrl: fakeData.seo.canonicalUrl
        });

        expect(meta.title).toEqual('SEO Title | Test global title');

        // Cleanup
        fakeData.seo.title = '';
    });

    test('adds the default page title from store object if seo.title is blank', async () => {
        fakeData.store = {
            title: 'Store title'
        };

        const meta = buildHtmlMetaTags({
            pageData: fakeData,
            globalData: fakeGlobalSeoSettings,
            canonicalUrl: fakeData.seo.canonicalUrl
        });

        expect(meta.title).toEqual('Store title | Test global title');

        // Cleanup
        delete fakeData.store;
    });
});

test('adds the description', () => {
    fakeData.seo.description = 'This is a description!';

    const meta = buildHtmlMetaTags({
        pageData: fakeData,
        globalData: fakeGlobalSeoSettings,
        canonicalUrl: fakeData.seo.canonicalUrl
    });

    expect(meta.description).toEqual('This is a description!');

    // Cleanup
    fakeData.seo.description = '';
});

test('adds the og tags', () => {
    const meta = buildHtmlMetaTags({
        pageData: fakeData,
        globalData: fakeGlobalSeoSettings,
        canonicalUrl: fakeData.seo.canonicalUrl
    });

    expect(meta['og:url']).toEqual('https://example.com');
    expect(meta['og:image']).toEqual('https://example.com/image.png');
    expect(meta['og:image:width']).toEqual('375');
    expect(meta['og:image:height']).toEqual('375');
});

test('adds a noindex tag', () => {
    fakeData.seo.robots = {
        noIndex: true
    };

    const meta = buildHtmlMetaTags({
        pageData: fakeData,
        globalData: fakeGlobalSeoSettings,
        canonicalUrl: fakeData.seo.canonicalUrl
    });

    expect(meta.robots).toEqual('noindex');

    // Cleanup
    fakeData.seo.robots.noIndex = false;
});
