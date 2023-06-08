import type { Hit, BaseHit } from 'instantsearch.js';
import type { SortBy } from 'instantsearch.js';
import type { SearchResults } from 'algoliasearch-helper';

export type AlgoliaHit = Hit<
    BaseHit & {
        meta?: { osc: { product_variants?: string } };
        handle?: string;
        id?: string;
        image?: string;
        subtitle?: string;
        title?: string;
        tags?: string[];
        products_count?: string;
        product_image?: string;
    }
>;

export type BuiltInSendEventForHits = (
    eventType: string,
    hits: AlgoliaHit | AlgoliaHit[],
    eventName?: string
) => void;

export type CustomSendEventForHits = (customPayload: any) => void;

export type SendEventForHits = BuiltInSendEventForHits & CustomSendEventForHits;

export interface RefinementData {
    accordionItem: boolean;
    accordionValue?: string;
    attribute: string;
    prefix?: string;
    sortBy?: SortBy<SearchResults.FacetValue>;
    start?: number[];
    title: string;
    type: string;
    value?: string;
}
