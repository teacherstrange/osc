import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { searchClient } from '../searchClient';

export const popularCoursesPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: 'shopify_products_grouped_by_id_query_suggestions',
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
