import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Price } from '../Price/Price';
import type { LineItemProps } from './LineItem';
import { LineItem, LineItemHeader, LineItemPrice } from './LineItem';

export default {
    title: 'osc-ui/Cart/LineItem',
    component: LineItem,
    subcomponents: { LineItemHeader, LineItemPrice },
    parameters: {
        docs: {
            description: {
                component: '',
            },
        },
    },
} as Meta;

const Template: Story<LineItemProps> = ({ ...args }) => (
    <div style={{ maxWidth: '340px' }}>
        <LineItem {...args}>
            <div>
                <LineItemHeader className="u-mb-0">A level Biology</LineItemHeader>
                <Button variant="quaternary" className="u-text-underline">
                    Remove
                </Button>
            </div>

            <LineItemPrice asChild>
                <Price>
                    <p className="t-font-m u-mb-0">£15.00</p>
                    <p className="t-font-s u-color-neutral-600 u-mb-0">Pay monthly</p>
                </Price>
            </LineItemPrice>
        </LineItem>
    </div>
);

export const Primary = Template.bind({});
Primary.args = {};
