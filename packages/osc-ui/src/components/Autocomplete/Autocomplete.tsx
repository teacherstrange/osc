import { autocomplete } from '@algolia/autocomplete-js';
import React, { useEffect, useRef } from 'react';
import type { AutocompleteProps } from './types/autoComplete';

export const Autocomplete = (props: AutocompleteProps) => {
    const { className, setQuery, setCategory, autocompleteUiState } = props;
    // container for autocomplete
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // set query when autocomplete state changes
        setQuery(autocompleteUiState.query);
        // set category when autocomplete state changes
        autocompleteUiState.category && setCategory(autocompleteUiState.category);
        // set the page when the query changes
        // setPage(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autocompleteUiState]);

    // Initalise autocomplete
    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        const autocompleteInstance = autocomplete({
            container: containerRef.current,
            ...props,
        });
        return () => autocompleteInstance.destroy();
    }, []);

    // return container div
    return <div className={className} ref={containerRef} />;
};
