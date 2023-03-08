import type { AutocompleteOptions } from '@algolia/autocomplete-core';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import type { Hit } from '@algolia/client-search';
import algoliasearch from 'algoliasearch/lite';
import type { BaseSyntheticEvent, KeyboardEvent, MouseEvent } from 'react';
import React, { useMemo, useRef, useState } from 'react';
import { TextInput } from '../TextInput/TextInput';
import './autocomplete.scss';
import { NoResult, ProductItem, ProductItemCustom, ResultsHeader } from './components/Templates';
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
                onStateChange({ prevState, state }) {
                    // (2) Synchronize the Autocomplete state with the React state.
                    // setAutocompleteState(state);
                    // DOESN'T SEEM TO WORK IF WRAPPED IN THE IF STATEMENT
                    if (prevState.query !== state.query) {
                        setAutocompleteState({
                            ...state,
                            query: state.query,
                        });
                    }
                },
                getSources({ query, refresh, setQuery }) {
                    return [
                        // (3) Use an Algolia index source.
                        {
                            // This is the data-autocomplete-source-id
                            sourceId: 'hits',
                            // Query that returns items from source index
                            getItems({ query }) {
                                const results = getAlgoliaResults({
                                    searchClient,
                                    queries: [
                                        {
                                            indexName: 'shopify_products_grouped_by_id',
                                            query,
                                            params: {
                                                hitsPerPage: 10,
                                            },
                                        },
                                    ],
                                });

                                return results;
                            },
                            // The JSX that is rendered from the results
                            templates: {
                                noResults() {
                                    return <NoResult />;
                                },
                                header() {
                                    return <ResultsHeader title="Results" />;
                                },
                                item: ({ components, item }) => (
                                    <ProductItem
                                        components={components}
                                        item={item}
                                        // onParentStateChange={onParentStateChange}
                                        query={query}
                                        setQuery={setQuery}
                                    />
                                ),
                            },
                            // The initial state if a query is passed in
                            initialState: { query },
                            // This resets the query
                            onReset: () => {
                                setAutocompleteState({ query: '' });
                            },
                            // TODO- Work out if this is needed
                            onSubmit: ({ state }) => {
                                setAutocompleteState({ query: state.query });
                            },

                            // Pull the following back in for use with plugins eg Popular Search
                            // render: ({ children }, root) => {
                            //     render(children, root);
                            // },
                            // renderer: {
                            //     createElement,
                            //     Fragment,
                            //     render: render as unknown as Render,
                            // },
                            // reshape: ({ sourcesBySourceId }) => {
                            //     const { recentSearchesPlugin, querySuggestionsPlugin, ...rest } =
                            //         sourcesBySourceId;

                            //     return [
                            //         limitSuggestions(
                            //             removeDuplicates(
                            //                 recentSearchesPlugin,
                            //                 querySuggestionsPlugin
                            //             )
                            //         ),
                            //         Object.values(rest),
                            //     ] as unknown as AutocompleteReshapeSource<BaseItem>[];
                            // },

                            // Used for Keyboard controls - see docs for more info
                            // navigator: {
                            //     async navigate({ item }) {
                            //         // await getVariants(item);
                            //         onParentStateChange(item as any);
                            //     },
                            // },

                            getItemInputValue({ item }) {
                                return item.query;
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
    console.log('autocomplete.getInputProps({})', autocomplete.getInputProps({}));
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
