import type { AutocompleteOptions } from '@algolia/autocomplete-core';
import type { Hit } from '@algolia/client-search';

export type AutocompleteItem = Hit<{
    categories: string[];
    image: string;
    label: string;
    name: string;
    objectID: string;
    title: string;
    url: string;
}>;

// TODO - FIGURE OUT WHAT TO REPLACE THIS WITH
export type AutocompleteProps = Partial<AutocompleteOptions<AutocompleteItem>> & {
    resultsLimit?: number;
    ALGOLIA_APP_ID: string;
    ALGOLIA_ID_SEARCH_ONLY_API_KEY: string;
    ALGOLIA_PRIMARY_INDEX_GROUPED: string;
    ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS: string;
};
