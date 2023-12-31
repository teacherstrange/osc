import { parseAlgoliaHitHighlight } from '@algolia/autocomplete-preset-algolia';
import React, { Fragment } from 'react';

type HighlightHitParams<THit> = {
    /**
     * The Algolia hit whose attribute to retrieve the highlighted parts from.
     */
    hit: THit;
    /**
     * The attribute to retrieve the highlighted parts from.
     *
     * You can use the array syntax to reference nested attributes.
     */
    attribute: keyof THit | string[] | 'query';
};

export function Highlight<THit>({ hit, attribute }: HighlightHitParams<THit>): JSX.Element {
    return (
        <Fragment>
            {parseAlgoliaHitHighlight<THit>({
                hit,
                attribute: attribute as string[] | keyof THit,
            }).map(({ value, isHighlighted }, index) => {
                if (isHighlighted) {
                    return <mark key={index}>{value}</mark>;
                }

                return value;
            })}
        </Fragment>
    );
}
