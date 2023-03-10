import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import React from 'react';
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
            templates: {
                item({ item }) {
                    return <PopularItem hit={item} />;
                },
            },
        };
    },
});

type PopularItemProps = {
    hit: any;
};

function PopularItem({ hit }: PopularItemProps) {
    return (
        <div className="aa-ItemWrapper">
            <div className="aa-ItemIcon aa-ItemIcon--noBorder"></div>
            <div className="aa-ItemContent">
                <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">{hit.query}</div>
                </div>
            </div>
        </div>
    );
}
