import React from 'react';
import { Icon } from '../../Icon/Icon';
import type { AutocompleteItem as AutocompleteItemTypes } from '../Autocomplete';
import { Highlight } from './Highlight';

//-------------------------------------------------- //
// No results
// ------------------------------------------------- //

export const NoResult = () => {
    return <p>Sorry, No Results.</p>;
};

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
            <span>{title}</span>
            <br />
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

    const calcItemIcon = () => {
        if (item.image) {
            return (
                item.image && (
                    <div className="c-autocomplete__item-image">
                        <img src={item.image} alt={item.title ?? ''} width="40" height="40" />
                    </div>
                )
            );
        } else if (item[ALGOLIA_PRIMARY_INDEX_GROUPED])
            return (
                <div className="c-autocomplete__item-image">
                    <img
                        src={
                            item[ALGOLIA_PRIMARY_INDEX_GROUPED].facets.exact_matches
                                .product_image[0].value
                        }
                        alt={item.title ?? ''}
                        width="40"
                        height="40"
                    />
                </div>
            );
        else {
            return (
                <div className="c-autocomplete__item-image">
                    <Icon id="search" />
                </div>
            );
        }
    };

    return (
        <div className="c-autocomplete__item-wrapper">
            <div className="c-autocomplete__item-content">
                {calcItemIcon()}
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
