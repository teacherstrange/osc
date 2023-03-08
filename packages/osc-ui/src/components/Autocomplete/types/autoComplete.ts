import type { BaseItem } from '@algolia/autocomplete-core';
import type { AutocompleteOptions } from '@algolia/autocomplete-js';
import type { Hit } from '@algolia/client-search';
import type { SearchClient } from 'algoliasearch/lite';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

export interface Data {
    title: string;
    updated_at: string;
    _tags: string[];
    handle: string;
    vendor: string;
    product_type: string;
    template_suffix: string;
    sku: string;
    barcode?: string | number;
    position: number;
    requires_shipping: boolean;
    taxable: boolean;
    inventory_quantity: number;
    option1: string;
    option2: string;
    option3?: string;
    id: number;
    option_names: string[];
    variants_count: number;
    variants_min_price: number;
    variants_max_price: number;
    variants_inventory_count: number;
    product_image: string;
    published_at: string;
    body_html_safe: null;
    variant_title: string;
    inventory_policy: string;
    inventory_management: string;
    inventory_management_shopify: number;
    inventory_available: boolean;
    options: {
        format: string;
        'study-method': string;
    };
    price: number;
    compare_at_price: number;
    price_ratio: number;
    price_range: string;
    grams: number;
    weight: string;
    image: string;
    named_tags: {};
    named_tags_names: [];
    created_at: string;
    meta: {};
    objectID: string;
}

export type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
    setAutocompleteUiState: Dispatch<SetStateAction<any>>;
    searchClient: SearchClient; // used to connect
    autocompleteUiState: any;
    className: string;
    data?: Data[] | (() => Data[]); // pass in data to autocompletex
    containerRef?: MutableRefObject<HTMLDivElement>; // the container ref
    setCategory?: Dispatch<SetStateAction<string>>;
    setQuery?: Dispatch<SetStateAction<string>>;
    setPage?: Dispatch<SetStateAction<number>>;
};

// TODO - What's this for
export type SetAutocompleteUiStateOptions = {
    collections?: [];
    isOpen?: boolean;
    query: string;
    category?: string;
};

export type AutocompleteItem = Hit<{
    brand: string;
    categories: string[];
    image: string;
    name: string;
    objectID: string;
    url: string;
}>;
