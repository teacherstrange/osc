import type { AutocompleteOptions } from '@algolia/autocomplete-core';
import type { Meta, Story } from '@storybook/react';
import React from 'react';

import { Autocomplete } from './Autocomplete';
import type { AutocompleteItem } from './types/autoComplete';

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
} as Meta;

const Template: Story<Partial<AutocompleteOptions<AutocompleteItem>>> = (args) => {
    return (
        <>
            <Autocomplete
                ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS={
                    process.env.ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS
                }
                ALGOLIA_PRIMARY_INDEX_GROUPED={process.env.ALGOLIA_PRIMARY_INDEX_GROUPED}
                ALGOLIA_APP_ID={process.env.ALGOLIA_APP_ID}
                ALGOLIA_ID_SEARCH_ONLY_API_KEY={process.env.ALGOLIA_ID_SEARCH_ONLY_API_KEY}
                {...args}
            />
        </>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    placeholder: 'Search...',
    openOnFocus: true,
};
