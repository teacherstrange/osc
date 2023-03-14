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

export type AutocompleteProps = Partial<AutocompleteOptions<AutocompleteItem>> & {
    resultsLimit?: number;
    // TODO change this
    searchClient: any;
};
