import React from 'react';
import type { AutocompleteItem as AutocompleteItemTypes } from '../types/autoComplete';
import { Highlight } from './Highlight';

// TODO - Add No results back in
//-------------------------------------------------- //
// No results
// ------------------------------------------------- //

export const NoResult = () => {
    return <div>No Results</div>;
};

// TODO - Add Results Header back in
//-------------------------------------------------- //
// Results Header
// ------------------------------------------------- //

interface ResultsHeaderProps {
    title: string;
}

export const ResultsHeader = (props: ResultsHeaderProps) => {
    const { title } = props;
    return (
        <>
            <span className="aa-SourceHeaderTitle">{title}</span>
            <span className="aa-SourceHeaderLine" />
        </>
    );
};

// --------------------------------------------------
// Autocomplete SearchResultItem
// --------------------------------------------------

interface ItemProps {
    item: AutocompleteItemTypes;
    ALGOLIA_PRIMARY_INDEX_GROUPED: string;
}

export const SearchResultItem = (props: ItemProps) => {
    const { item, ALGOLIA_PRIMARY_INDEX_GROUPED } = props;

    return (
        <div className="c-autocomplete__item-wrapper">
            <div className="c-autocomplete__item-content">
                {item.image && (
                    <div className="c-autocomplete__item-image">
                        <img src={item.image} alt={item.title} width="40" height="40" />
                    </div>
                )}
                {item[ALGOLIA_PRIMARY_INDEX_GROUPED] && (
                    <div className="c-autocomplete__item-image">
                        <img
                            src={
                                item[ALGOLIA_PRIMARY_INDEX_GROUPED].facets.exact_matches
                                    .product_image[0].value
                            }
                            alt={item.title}
                            width="40"
                            height="40"
                        />
                    </div>
                )}
                <div className="c-autocomplete__item-content-body">
                    <div className="c-autocomplete__item-title">
                        <Highlight hit={item} attribute="title" />
                        <Highlight hit={item} attribute="query" />
                        <Highlight hit={item} attribute="label" />
                    </div>
                    <div className="c-autocomplete__item-description">{item.title}</div>
                </div>
            </div>
        </div>
    );
};
