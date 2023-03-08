import { useState } from 'react';

import React from 'react';
import './autocomplete.scss';
import { AutocompleteCustom } from './AutocompleteCustom';
import type { OscAutocompleteProps, SetAutocompleteUiStateOptions } from './types/autoComplete';

export function OscAutocomplete(props: OscAutocompleteProps) {
    const { onParentStateChange, data, searchClient } = props;

    // state && hooks
    const [query, setQuery] = useState(null);
    const [autocompleteUiState, setAutocompleteUiState] = useState<SetAutocompleteUiStateOptions>({
        query,
    });

    return (
        <AutocompleteCustom placeholder="Search..." />
        // <Autocomplete
        //     autocompleteUiState={autocompleteUiState}
        //     className={''}
        //     detachedMediaQuery={'false'}
        //     // todo: fix types
        //     getSources={({ query, refresh, setQuery }) => {
        //         return [
        //             {
        //                 sourceId: 'hits',
        //                 async getItems({ query }) {
        //                     if (data) {
        //                         // TODO: AK - write a groupBy function that returns distinct courses
        //                         if (typeof data === 'function') {
        //                             return await data();
        //                         }
        //                         return data;
        //                     } else {
        //                         const results = getAlgoliaResults({
        //                             searchClient,
        //                             queries: [
        //                                 {
        //                                     indexName: 'shopify_products_grouped_by_id',
        //                                     query,
        //                                     params: {
        //                                         hitsPerPage: 10,
        //                                     },
        //                                 },
        //                             ],
        //                         });
        //                         return results;
        //                     }
        //                 },
        //                 templates: {
        //                     noResults() {
        //                         return <NoResult />;
        //                     },
        //                     header() {
        //                         return <ResultsHeader title="Results" />;
        //                     },
        //                     item: ({ components, item }) => (
        //                         <ProductItem
        //                             components={components}
        //                             item={item}
        //                             onParentStateChange={onParentStateChange}
        //                             query={query}
        //                             setQuery={setQuery}
        //                         />
        //                     ),
        //                 },
        //             },
        //         ];
        //     }}
        //     initialState={{ query }}
        //     // Not Needed - State gets reset without this
        //     // onReset={() => {
        //     //     setAutocompleteUiState({ query: '' });
        //     // }}
        //     onStateChange={({ prevState, state }) => {
        //         if (prevState.query !== state.query) {
        //             setAutocompleteUiState({
        //                 query: state.query,
        //             });
        //         }
        //     }}
        //     onSubmit={({ state }) => {
        //         setAutocompleteUiState({ query: state.query });
        //     }}
        //     // plugins={plugins}
        //     render={({ children }, root) => {
        //         render(children, root);
        //     }}
        //     renderer={{
        //         createElement,
        //         Fragment,
        //         render: render as unknown as Render,
        //     }}
        //     reshape={({ sourcesBySourceId }) => {
        //         const { recentSearchesPlugin, querySuggestionsPlugin, ...rest } = sourcesBySourceId;

        //         return [
        //             limitSuggestions(
        //                 removeDuplicates(recentSearchesPlugin, querySuggestionsPlugin)
        //             ),
        //             Object.values(rest),
        //         ] as unknown as AutocompleteReshapeSource<BaseItem>[];
        //     }}
        //     navigator={{
        //         async navigate({ item }) {
        //             // await getVariants(item);
        //             onParentStateChange(item as any);
        //         },
        //     }}
        //     placeholder={'Search for courses'}
        //     searchClient={searchClient}
        //     setAutocompleteUiState={setAutocompleteUiState}
        //     setQuery={setQuery}
        // />
    );
}
