export function buildCanonicalUrl(request: Request) {
    const url = new URL(request?.url);
    const canonicalUrl = url?.href;

    return canonicalUrl;
}
