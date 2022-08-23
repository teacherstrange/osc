import createCache from '@emotion/cache';

export default function createEmotionCache() {
    const insertionPoint =
        typeof document === 'undefined'
            ? undefined
            : document.getElementById('insertionPoint') ?? undefined;

    return createCache({ key: 'css', insertionPoint: insertionPoint });
}
