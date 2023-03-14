import type { AutocompleteOptions } from '@algolia/autocomplete-core';
import type { Meta, Story } from '@storybook/react';
import React from 'react';

import { Autocomplete } from './Autocomplete';
import { searchClient } from './searchClient';
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
            <Autocomplete searchClient={searchClient} {...args} />
        </>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    placeholder: 'Search...',
    openOnFocus: true,
};
