import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { PaginationProps } from './Pagination';
import { Pagination } from './Pagination';

export default {
    title: 'osc-ui/Pagination',
    component: Pagination,
    parameters: {
        docs: {
            description: {
                component:
                    'Enables a user to load more results and see current/total number of results',
            },
        },
    },
    argTypes: {
        className: {
            description: 'Custom class',
        },
        numberLoaded: {
            description: 'Number of items loaded',
        },
        total: {
            description: 'Total number of items',
        },
        itemTypeDescription: {
            description: 'Description of item type',
        },
    },
} as Meta;

const PaginationTemplate: Story<PaginationProps> = (args) => {
    return (
        <div style={{ width: '300px' }}>
            <Pagination
                colorVariant={args.colorVariant}
                isLoading={args.isLoading}
                numberLoaded={args.numberLoaded}
                total={args.total}
                itemTypeDescription="blog posts"
            />
        </div>
    );
};

export const Primary = PaginationTemplate.bind({});
export const IsLoading = PaginationTemplate.bind({});

Primary.args = {
    numberLoaded: 20,
    total: 30,
    itemTypeDescription: 'blog posts',
};
IsLoading.args = {
    colorVariant: 'quaternary-gradient',
    numberLoaded: 25,
    total: 30,
    itemTypeDescription: 'courses',
    isLoading: true,
};

IsLoading.parameters = {
    docs: {
        description: {
            story: 'Displays an animated loading icon while pending more results',
        },
    },
};
