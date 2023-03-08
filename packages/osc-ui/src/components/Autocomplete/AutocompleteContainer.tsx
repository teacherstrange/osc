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

    return <AutocompleteCustom placeholder="Search..." />;
}
