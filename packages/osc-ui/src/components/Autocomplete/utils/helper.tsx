const uniqBy = (predicate) => {
    return function runUniqBy(...rawSources) {
        const sources = rawSources.flat().filter(Boolean);
        const seen = new Set();

        return sources.map((source) => {
            const items = source.getItems().filter((item) => {
                const appliedItem = predicate({ source, item });
                const hasSeen = seen.has(appliedItem);

                seen.add(appliedItem);

                return !hasSeen;
            });

            return {
                ...source,
                getItems() {
                    return items;
                },
            };
        });
    };
};

const limit = (value) => {
    return function runLimit(...rawSources) {
        const sources = rawSources.flat().filter(Boolean);
        const limitPerSource = Math.ceil(value / sources.length);
        let sharedLimitRemaining = value;

        return sources.map((source, index) => {
            const isLastSource = index === sources.length - 1;
            const sourceLimit = isLastSource
                ? sharedLimitRemaining
                : Math.min(limitPerSource, sharedLimitRemaining);
            const items = source.getItems().slice(0, sourceLimit);
            sharedLimitRemaining = Math.max(sharedLimitRemaining - items.length, 0);

            return {
                ...source,
                getItems() {
                    return items;
                },
            };
        });
    };
};

export const limitSuggestions = limit(6);

export const removeDuplicates = uniqBy(({ source, item }) =>
    source.sourceId === 'querySuggestionsPlugin'
        ? item.query.replace('>', '').replace(/\s+/g, ' ').trim()
        : item.label.replace('>', '').replace(/\s+/g, ' ').trim()
);

// custom queries using JS API

// export const getVariants = async (item) => {
//     if (data && Array.isArray(data)) setVariants(data.filter((q) => q.id === item.id));
//     else if (variant === 'loanCalculator') {
//         const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ID_SEARCH_ONLY);
//         const hits = await client.search([{ query: item.id, indexName: 'shopify_products' }]);
//         setVariants(hits.results[0].hits as Data[]);
//     }
// };
