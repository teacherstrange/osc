import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { PriceProps } from './Price';
import { Price } from './Price';

export default {
    title: 'osc-ui/Price',
    component: Price,
    parameters: {
        docs: {
            description: {
                component:
                    'A component that displays the price and sku of a product.<br>This is most likely going to be used as a wrapper around the Hydrogen Money component.',
            },
        },
    },
} as Meta;

const Template: Story<PriceProps> = ({ ...args }) => <Price {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: <span>£1,149 in full</span>,
    sku: 'AAT056',
};

export const HasSalePrice = Template.bind({});
HasSalePrice.args = {
    children: <span>£1,149 in full</span>,
    sku: 'AAT056',
    compareAtPrice: <span>£1600</span>,
};
