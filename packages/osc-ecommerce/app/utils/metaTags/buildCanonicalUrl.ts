export function buildCanonicalUrl({
    canonical,
    request
}: {
    canonical?: string | null | undefined;
    request: Request;
}) {
    if (canonical) {
        return canonical;
    } else {
        const url = new URL(request?.url);
        const canonicalUrl = url?.href;

        return canonicalUrl;
    }
}
