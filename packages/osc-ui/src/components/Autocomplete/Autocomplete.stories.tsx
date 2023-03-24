import type { AutocompleteOptions } from '@algolia/autocomplete-core';
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { AutocompleteItem } from './Autocomplete';
import { Autocomplete } from './Autocomplete';

export default {
    title: 'osc-ui/Autocomplete',
    component: Autocomplete,
    parameters: {
        docs: {
            description: {
                component:
                    'Autocomplete is an open source, production-ready JavaScript library for building autocomplete experiences.',
            },
        },
    },
    argTypes: {
        placeholder: {
            description: 'The placeholder text to show in the search input when there’s no query.',
        },
        openOnFocus: { description: 'Whether to open the panel on focus when there’s no query.' },
        autoFocus: {
            description: 'Whether to focus the search input or not when the page is loaded.',
        },
        resultsLimit: {
            description: 'The number of results to show in the panel',
        },
    },
} as Meta;

const Template: Story<Partial<AutocompleteOptions<AutocompleteItem>>> = (args) => {
    return (
        <>
            <Autocomplete
                ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS={
                    process.env.STORYBOOK_ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS
                }
                ALGOLIA_PRIMARY_INDEX_GROUPED={process.env.STORYBOOK_ALGOLIA_PRIMARY_INDEX_GROUPED}
                ALGOLIA_APP_ID={process.env.STORYBOOK_ALGOLIA_APP_ID}
                ALGOLIA_ID_SEARCH_ONLY_API_KEY={
                    process.env.STORYBOOK_ALGOLIA_ID_SEARCH_ONLY_API_KEY
                }
                {...args}
            />
        </>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    placeholder: 'Search...',
    autoFocus: false,
    openOnFocus: true,
};
