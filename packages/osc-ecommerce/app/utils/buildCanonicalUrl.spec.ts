import { buildCanonicalUrl } from './buildCanonicalUrl';
import { mockHomeRequest } from '../../mocks/requests';

test('creates a canonical url for a homepage', () => {
    const request = mockHomeRequest('http://localhost/');
    const canonicalUrl = buildCanonicalUrl(request);

    expect(canonicalUrl).toEqual('http://localhost/');
});

test('creates a canonical url for a page one level deep', () => {
    const request = mockHomeRequest('http://localhost/page');
    const canonicalUrl = buildCanonicalUrl(request);

    expect(canonicalUrl).toEqual('http://localhost/page');
});

test('creates a canonical url for a page two levels deep', () => {
    const request = mockHomeRequest('http://localhost/level/two');
    const canonicalUrl = buildCanonicalUrl(request);

    expect(canonicalUrl).toEqual('http://localhost/level/two');
});
