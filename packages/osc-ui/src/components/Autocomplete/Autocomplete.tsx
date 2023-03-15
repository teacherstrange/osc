import type { AutocompleteSource, AutocompleteState } from '@algolia/autocomplete-core';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { createAlgoliaInsightsPlugin } from '@algolia/autocomplete-plugin-algolia-insights';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import algoliasearch from 'algoliasearch/lite';
import type { BaseSyntheticEvent, KeyboardEvent, MouseEvent } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import insightsClient from 'search-insights';
import { Button } from '../Button/Button';
import { TextInput } from '../TextInput/TextInput';
import './autocomplete.scss';
import { SearchResultItem } from './components/Templates';
import { popularCoursesPlugin } from './plugins/popularCoursesPlugin';
import { recentSearchesPlugin } from './plugins/recentSearchesPlugin';
import type { AutocompleteItem, AutocompleteProps } from './types/autoComplete';
import { debounced } from './utils/debounced';

// TODO - Refactor this out of the component and put credentials into env vars

export function Autocomplete(props: AutocompleteProps) {
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
    const {
        resultsLimit = 3,
        ALGOLIA_APP_ID,
        ALGOLIA_ID_SEARCH_ONLY_API_KEY,
        ALGOLIA_PRIMARY_INDEX_GROUPED,
        ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS,
    } = props;

    insightsClient('init', {
        appId: ALGOLIA_APP_ID,
        apiKey: ALGOLIA_ID_SEARCH_ONLY_API_KEY,
    });
    const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ID_SEARCH_ONLY_API_KEY);
    const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({ insightsClient });

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
                            async getItems({ query }) {
                                return getAlgoliaResults({
                                    searchClient,
                                    queries: [
                                        {
                                            indexName: ALGOLIA_PRIMARY_INDEX_GROUPED,
                                            query,
                                            params: {
                                                hitsPerPage: resultsLimit,
                                            },
                                        },
                                    ],
                                });
                            },
                            getItemUrl({ item }) {
                                return `/courses/${item.handle}`;
                            },
                            getItemInputValue({ item }) {
                                return item.title;
                            },
                        },
                    ]) as Promise<(boolean | AutocompleteSource<AutocompleteItem>)[]>;
                },
                plugins: [
                    recentSearchesPlugin,
                    popularCoursesPlugin(searchClient, ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS),
                    algoliaInsightsPlugin,
                ],
                ...props,
            }),
        // eslint-disable-next-line
        [props]
    );

    const inputRef = React.useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const panelRef = React.useRef<HTMLDivElement>(null);

    const { getEnvironmentProps, setQuery } = autocomplete;

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
                    ></TextInput>
                    {autocomplete.getInputProps({ inputElement: inputRef.current }).value && (
                        <button
                            onClick={() => {
                                setQuery('');
                            }}
                            className="aa-ClearButton c-autocomplete__input_clear_button"
                        >
                            X
                        </button>
                    )}
                </div>
            </form>
            {autocompleteUiState.isOpen ? (
                <div
                    className={[
                        'aa-Panel',
                        autocompleteUiState.status === 'stalled' && 'aa-Panel--stalled',
                    ]
                        .filter(Boolean)
                        .join(' ')}
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
                                                {items?.map((item, index) => {
                                                    return (
                                                        <li
                                                            data-testid={'hits'}
                                                            className="c-autocomplete__item"
                                                            key={item.objectID + '_' + index}
                                                            {...autocomplete.getItemProps({
                                                                item,
                                                                source,
                                                            })}
                                                        >
                                                            <div
                                                                data-testid={
                                                                    sourceId === 'Results'
                                                                        ? 'results'
                                                                        : ''
                                                                }
                                                            >
                                                                <SearchResultItem
                                                                    item={item}
                                                                    ALGOLIA_PRIMARY_INDEX_GROUPED={
                                                                        ALGOLIA_PRIMARY_INDEX_GROUPED
                                                                    }
                                                                />
                                                            </div>
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
                    <div className="c-autocomplete__cta">
                        <Button isFull>View Detailed Search</Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
