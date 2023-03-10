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
