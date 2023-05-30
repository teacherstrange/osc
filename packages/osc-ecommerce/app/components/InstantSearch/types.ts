import type { Hit, BaseHit } from 'instantsearch.js';

export type AlgoliaHit = Hit<
    BaseHit & {
        meta?: { osc: { product_variants?: string } };
        id?: string;
        image?: string;
        subtitle?: string;
        title?: string;
        tags?: string[];
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
