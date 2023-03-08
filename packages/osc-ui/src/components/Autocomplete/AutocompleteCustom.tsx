import type { AutocompleteOptions } from '@algolia/autocomplete-core';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import type { Hit } from '@algolia/client-search';
import algoliasearch from 'algoliasearch/lite';
import type { BaseSyntheticEvent, KeyboardEvent, MouseEvent } from 'react';
import React, { useMemo, useRef, useState } from 'react';
import { TextInput } from '../TextInput/TextInput';
import './autocomplete.scss';
import { ProductItemCustom } from './components/Templates';
import type { SetAutocompleteUiStateOptions } from './types/autoComplete';

const searchClient = algoliasearch('CMEG2XKNP8', '45b007891e2e306b97a88d7da87afac8');

type AutocompleteItem = Hit<{
    brand: string;
    categories: string[];
    image: string;
    name: string;
    objectID: string;
    url: string;
}>;

export function AutocompleteCustom(props: Partial<AutocompleteOptions<AutocompleteItem>>) {
    // (1) Create a React state.
    const [query, setQuery] = useState(null);
    const [autocompleteState, setAutocompleteState] = useState<SetAutocompleteUiStateOptions>({
        query,
    });
    console.log('Props', props);
    const inputRef = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const autocomplete = useMemo(
        () =>
            createAutocomplete<AutocompleteItem, BaseSyntheticEvent, MouseEvent, KeyboardEvent>({
                onStateChange({ state }) {
                    setAutocompleteState(state);
                },
                getSources() {
                    return [
                        {
                            sourceId: 'hits',
                            getItems({ query }) {
                                return getAlgoliaResults({
                                    searchClient,
                                    queries: [
                                        {
                                            indexName: 'shopify_products_grouped_by_id',
                                            query,
                                            params: {
                                                hitsPerPage: 3,
                                            },
                                        },
                                    ],
                                });
                            },
                            getItemUrl({ item }) {
                                return item.url;
                            },
                        },
                    ];
                },
                ...props,
            }),
        []
    );
    return (
        <div
            className="aa-Autocomplete"
            {...autocomplete.getRootProps({})}
            style={{ width: '300px' }}
        >
            <form
                // className="aa-Form"
                ref={formRef}
                {...autocomplete.getFormProps({ inputElement: inputRef.current })}
            >
                <div className="aa-InputWrapper">
                    <TextInput
                        id="search"
                        className="c-input c-input__text c-input__text--quaternary"
                        name="Search"
                        variants={['quaternary']}
                        action={{ iconId: 'search', size: 'sm', variant: 'quaternary' }}
                        {...autocomplete.getInputProps({ inputElement: inputRef.current })}
                        // Overriding to type "text" from type "search" as we don't want the styled cancel button
                        type="text"
                    />
                </div>
                <div className="aa-Panel" {...autocomplete.getPanelProps({})}>
                    {autocompleteState?.isOpen &&
                        autocompleteState?.collections?.map((collection, index) => {
                            const { source, items } = collection;

                            return (
                                <div key={`source-${index}`} className="aa-Source">
                                    {items.length > 0 && (
                                        <ul className="aa-List" {...autocomplete.getListProps()}>
                                            {items.map((item) => (
                                                <ProductItemCustom
                                                    key={item.objectID}
                                                    item={item}
                                                />
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </form>
        </div>
    );
}
