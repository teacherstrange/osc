import { buildCanonicalUrl } from './buildCanonicalUrl';
// eslint-disable-next-line jest/no-mocks-import -- no clear way to intercept a request form remix so we want to use this as a function rather than a true mock -- perhaps this could be done better?
import { mockHomeRequest } from '../../../__mocks__/requests';

describe('builds canonical from the request', () => {
    test('creates a canonical url for a homepage', () => {
        const request = mockHomeRequest('http://localhost/');
        const canonicalUrl = buildCanonicalUrl({ request });

        expect(canonicalUrl).toEqual('http://localhost/');
    });

    test('creates a canonical url for a page one level deep', () => {
        const request = mockHomeRequest('http://localhost/page');
        const canonicalUrl = buildCanonicalUrl({ request });

        expect(canonicalUrl).toEqual('http://localhost/page');
    });

    test('creates a canonical url for a page two levels deep', () => {
        const request = mockHomeRequest('http://localhost/level/two');
        const canonicalUrl = buildCanonicalUrl({ request });

        expect(canonicalUrl).toEqual('http://localhost/level/two');
    });
});

test('creates a canonical url based on a specfic url', () => {
    const request = mockHomeRequest('http://localhost/');
    const canonicalUrl = buildCanonicalUrl({ canonical: 'https://example.com', request });

    expect(canonicalUrl).toEqual('https://example.com');
});
