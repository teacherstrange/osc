import type {
    AutocompleteOptions,
    AutocompleteSource,
    AutocompleteState,
} from '@algolia/autocomplete-core';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { createAlgoliaInsightsPlugin } from '@algolia/autocomplete-plugin-algolia-insights';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import type { BaseSyntheticEvent, KeyboardEvent, MouseEvent } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import insightsClient from 'search-insights';
import { TextInput } from '../TextInput/TextInput';
import './autocomplete.scss';
import { SearchResultItem } from './components/Templates';
import { popularCoursesPlugin } from './plugins/popularCoursesPlugin';
import { recentSearchesPlugin } from './plugins/recentSearchesPlugin';
import { searchClient } from './searchClient';
import type { AutocompleteItem } from './types/autoComplete';
import { debounced } from './utils/debounced';

// TODO - Refactor this out of the component and put credentials into env vars

export function Autocomplete(props: Partial<AutocompleteOptions<AutocompleteItem>>) {
    const [autocompleteUiState, setAutocompleteUiState] = useState<
        AutocompleteState<AutocompleteItem>
    >({
        activeItemId: null,
        collections: [],
        completion: null,
        context: {},
        isOpen: false,
        query: '',
        status: 'idle',
    });

    insightsClient('init', {
        appId: 'CMEG2XKNP8',
        apiKey: '45b007891e2e306b97a88d7da87afac8',
    });
    const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({ insightsClient });

    // TODO - Add Plugins - Popular Searches and Recently Searched - done
    // TODO - Add Debouncing and Insights
    // TODO - Create a Close button for the query
    // TODO - Add NoResult and ResultHeader components back into the search results

    // TODO - Think about other things to add to autocomplete instance - e.g. Navigator,
    // TODO - Finish adding all the arg types for AutoComplete into Storybook
    // TODO - Work out how to integrate the reshape function
    // TODO - Look at whether it's useful to add 'Reacting to the Network' stuff in and the mobile experience stuff - see docs- https://www.algolia.com/doc/ui-libraries/autocomplete/guides/creating-a-renderer/

    const autocomplete = useMemo(
        () =>
            createAutocomplete<AutocompleteItem, BaseSyntheticEvent, MouseEvent, KeyboardEvent>({
                onStateChange({ state }) {
                    setAutocompleteUiState(state);
                },
                getSources() {
                    return debounced([
                        {
                            sourceId: 'Results',
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
                            getItemInputValue({ item }) {
                                return item.title;
                            },
                        },
                    ]) as Promise<(boolean | AutocompleteSource<AutocompleteItem>)[]>;
                },
                plugins: [recentSearchesPlugin, popularCoursesPlugin, algoliaInsightsPlugin],
                ...props,
            }),
        [props]
    );

    const inputRef = React.useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const panelRef = React.useRef<HTMLDivElement>(null);

    const { getEnvironmentProps } = autocomplete;

    // TODO - Work out exactly what this is doing..!
    useEffect(() => {
        if (!formRef.current || !panelRef.current || !inputRef.current) {
            return undefined;
        }

        const { onTouchStart, onTouchMove, onMouseDown } = getEnvironmentProps({
            formElement: formRef.current,
            inputElement: inputRef.current,
            panelElement: panelRef.current,
        });

        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('touchstart', onTouchStart);
        window.addEventListener('touchmove', onTouchMove);

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
        };
    }, [getEnvironmentProps, autocompleteUiState.isOpen]);

    return (
        <div className="c-autocomplete__container" {...autocomplete.getRootProps({})}>
            <form
                className="c-autocomplete__form"
                ref={formRef}
                {...autocomplete.getFormProps({ inputElement: inputRef.current })}
            >
                <div className="c-autocomplete__input-wrapper">
                    <TextInput
                        action={{ iconId: 'search', size: 'sm', variant: 'quaternary' }}
                        className="c-input c-input__text c-input__text--quaternary"
                        id="search"
                        name="Search"
                        ref={inputRef}
                        variants={['quaternary']}
                        {...autocomplete.getInputProps({ inputElement: inputRef.current })}
                        // Overriding to type "text" from type "search" as we don't want the styled cancel button
                        type="text"
                    />
                </div>
            </form>

            {autocompleteUiState.isOpen ? (
                <div
                    className="c-autocomplete__panel"
                    ref={panelRef}
                    {...autocomplete.getPanelProps({})}
                >
                    <div className="c-autocomplete__panel--scrollable">
                        {autocompleteUiState?.collections?.find(
                            (q) => q.source.sourceId === 'Results'
                        ).items.length === 0 && <p>Sorry, no results.</p>}
                        {autocompleteUiState?.collections?.map((collection, index) => {
                            const { source, items } = collection;
                            const { sourceId } = source;

                            return (
                                <>
                                    {items.length > 0 && (
                                        <p>
                                            <strong>{sourceId}</strong>
                                        </p>
                                    )}
                                    <section key={`source-${index}`}>
                                        {items.length > 0 ? (
                                            <ul {...autocomplete.getListProps()}>
                                                {items?.map((item) => {
                                                    return (
                                                        <li
                                                            className="c-autocomplete__item"
                                                            key={item.objectID}
                                                            {...autocomplete.getItemProps({
                                                                item,
                                                                source,
                                                            })}
                                                        >
                                                            <SearchResultItem item={item} />
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        ) : null}
                                    </section>
                                </>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
