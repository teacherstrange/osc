import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

export const popularCoursesPlugin = (searchClient, ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS) => {
    return createQuerySuggestionsPlugin({
        searchClient,
        indexName: ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS,
        getSearchParams() {
            return {
                query: '',
                hitsPerPage: 3,
            };
        },
        transformSource({ source }) {
            return {
                ...source,
                sourceId: 'Popular Searches',
                getItemInputValue({ item }) {
                    return item.query;
                },
                onSelect({ setIsOpen }) {
                    setIsOpen(true);
                },
            };
        },
    });
};
