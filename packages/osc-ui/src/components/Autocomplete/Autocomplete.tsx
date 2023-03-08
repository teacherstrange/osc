import type { AutocompleteOptions, AutocompleteState } from '@algolia/autocomplete-core';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import algoliasearch from 'algoliasearch/lite';
import React, {
    BaseSyntheticEvent,
    KeyboardEvent,
    MouseEvent,
    useMemo,
    useRef,
    useState,
} from 'react';
import { TextInput } from '../TextInput/TextInput';
import './autocomplete.scss';
import { ProductItemCustom } from './components/Templates';
import { AutocompleteItem } from './types/autoComplete';

const searchClient = algoliasearch('CMEG2XKNP8', '45b007891e2e306b97a88d7da87afac8');

export function Autocomplete(props: Partial<AutocompleteOptions<AutocompleteItem>>) {
    const [autocompleteUiState, setAutocompleteUiState] = useState<
        AutocompleteState<AutocompleteItem>
    >({
        collections: [],
        completion: null,
        context: {},
        isOpen: false,
        query: '',
        activeItemId: null,
        status: 'idle',
    });
    const inputRef = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const autocomplete = useMemo(
        () =>
            createAutocomplete<AutocompleteItem, BaseSyntheticEvent, MouseEvent, KeyboardEvent>({
                onStateChange({ state }) {
                    setAutocompleteUiState(state);
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
                    {autocompleteUiState?.isOpen &&
                        autocompleteUiState?.collections?.map((collection, index) => {
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
