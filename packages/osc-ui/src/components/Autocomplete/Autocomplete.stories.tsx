import type { Meta, Story } from '@storybook/react';
import algoliasearch from 'algoliasearch';
import React, { useRef, useState } from 'react';

import { OscAutocomplete } from './AutocompleteContainer';
import type { OscAutocompleteProps } from './types/autoComplete';

export default {
    title: 'osc-ui/Autocomplete',
    component: OscAutocomplete,
    parameters: {
        docs: {
            description: {
                component: 'A control that allows the user to calculator the expenses.',
            },
        },
    },
} as Meta;

const Template: Story<OscAutocompleteProps> = (args) => {
    const [data, setData] = useState(null);
    const containerRef = useRef(null);
    const [setVariants] = useState(null);
    const [title, setTitle] = useState(null);
    const searchClient = algoliasearch('CMEG2XKNP8', '45b007891e2e306b97a88d7da87afac8');

    return (
        <>
            <OscAutocomplete
                {...args}
                data={data}
                searchClient={searchClient}
                containerRef={containerRef}
            />
            <h1>{title}</h1>
        </>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES: ['tags'],
    INSTANT_SEARCH_INDEX_NAME: 'shopify_products_grouped_by_id',
    INSTANT_SEARCH_QUERY_SUGGESTIONS: 'shopify_products_grouped_by_id_query_suggestions',
};
