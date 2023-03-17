import type {
    AutocompleteOptions,
    AutocompleteSource,
    AutocompleteState,
} from '@algolia/autocomplete-core';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { createAlgoliaInsightsPlugin } from '@algolia/autocomplete-plugin-algolia-insights';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import type { Hit } from '@algolia/client-search';
import algoliasearch from 'algoliasearch/lite';
import type { BaseSyntheticEvent, KeyboardEvent, MouseEvent } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import insightsClient from 'search-insights';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { TextInput } from '../TextInput/TextInput';
import './autocomplete.scss';
import { NoResult, ResultsHeader, SearchResultItem } from './components/Templates';
import { popularCoursesPlugin } from './plugins/popularCoursesPlugin';
import { recentSearchesPlugin } from './plugins/recentSearchesPlugin';
import { debounced } from './utils/debounced';

export type AutocompleteItem = Hit<{
    categories: string[];
    image: string;
    label: string;
    name: string;
    objectID: string;
    title: string;
    url: string;
}>;

export type AutocompleteProps = Partial<AutocompleteOptions<AutocompleteItem>> & {
    resultsLimit?: number;
    ALGOLIA_APP_ID: string;
    ALGOLIA_ID_SEARCH_ONLY_API_KEY: string;
    ALGOLIA_PRIMARY_INDEX_GROUPED: string;
    ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS: string;
};

export const Autocomplete = (props: AutocompleteProps) => {
    const {
        resultsLimit = 3,
        ALGOLIA_APP_ID,
        ALGOLIA_ID_SEARCH_ONLY_API_KEY,
        ALGOLIA_PRIMARY_INDEX_GROUPED,
        ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS,
    } = props;

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
                                if (!query) {
                                    return [];
                                }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props]
    );

    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const { getEnvironmentProps, setQuery, setCollections } = autocomplete;

    // The use effect helps mirror the native mobile experience, see: https://www.algolia.com/doc/ui-libraries/autocomplete/guides/creating-a-renderer/#mirroring-a-native-mobile-experience
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
        <div className="c-autocomplete" {...autocomplete.getRootProps({})}>
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
                        type="search"
                    ></TextInput>
                    {autocomplete.getInputProps({ inputElement: inputRef.current }).value && (
                        <button
                            data-testid="clearButton"
                            onClick={() => {
                                const resultsIndex = autocompleteUiState.collections.findIndex(
                                    (q) => q.source.sourceId === 'Results'
                                );
                                delete autocompleteUiState.collections[resultsIndex];
                                setCollections(
                                    [...autocompleteUiState.collections].filter(
                                        (q) => q !== undefined
                                    )
                                );
                                setQuery('');
                            }}
                            className="c-autocomplete__input-clear-button"
                        >
                            <Icon id="close" />
                        </button>
                    )}
                </div>
            </form>
            {autocompleteUiState.isOpen ? (
                <div
                    ref={panelRef}
                    className={['', autocompleteUiState.status === 'stalled' && 'stalled']
                        .filter(Boolean)
                        .join(' ')}
                    {...autocomplete.getPanelProps({})}
                >
                    <div className="c-autocomplete__panel--scrollable">
                        {!autocompleteUiState?.collections?.find((q) => q.items.length > 0) && (
                            <NoResult />
                        )}
                        {autocompleteUiState?.collections?.map((collection, index) => {
                            const { source, items } = collection;
                            const { sourceId } = source;
                            return (
                                <>
                                    {items.length > 0 && <ResultsHeader title={sourceId} />}
                                    <section key={`source-${index}`}>
                                        {items.length > 0 ? (
                                            <ul {...autocomplete.getListProps()}>
                                                {items?.map((item, index) => {
                                                    return (
                                                        <li
                                                            className="c-autocomplete__item"
                                                            key={`${item.objectID}_${index}`}
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
};
