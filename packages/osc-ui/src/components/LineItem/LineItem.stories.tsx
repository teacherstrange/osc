import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
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
                    <p className="t-font-s u-color-neutral-700 u-mb-0">Pay monthly</p>
                </Price>
            </LineItemPrice>
        </LineItem>
    </div>
);

const TemplateSecondary: Story<LineItemProps> = ({ ...args }) => (
    <div style={{ maxWidth: '340px' }}>
        <LineItem {...args}>
            <LineItemHeader>Additional options</LineItemHeader>

            <div className="o-flex o-flex--between">
                <Checkbox
                    id="checkbox-1"
                    name="Career kickstart package"
                    value="Career kickstart package"
                    defaultChecked
                    variants={['secondary']}
                    icon={{ id: 'check', className: 'c-checkbox__is-checked' }}
                />
                <Price>
                    <span className="t-font-m">£29.99</span>
                </Price>
            </div>

            <div className="o-flex o-flex--between">
                <Checkbox
                    id="checkbox-2"
                    name="Course replacement cover"
                    value="Course replacement cover"
                    variants={['secondary']}
                    icon={{ id: 'check', className: 'c-checkbox__is-checked' }}
                />
                <Price>
                    <span className="t-font-m">£29.99</span>
                </Price>
            </div>
        </LineItem>
    </div>
);

const TemplateTertiary: Story<LineItemProps> = ({ ...args }) => (
    <div style={{ maxWidth: '340px' }}>
        <LineItem {...args}>
            <LineItemHeader className="t-font-m u-mb-0 u-color-neutral-700 u-text-reg">
                Delivery
            </LineItemHeader>

            <LineItemPrice asChild>
                <Price>
                    <span className="t-font-m u-text-bold u-color-neutral-700">Free</span>
                </Price>
            </LineItemPrice>
        </LineItem>
        <LineItem {...args}>
            <LineItemHeader className="t-font-l u-text-bold u-mb-0">Total</LineItemHeader>

            <LineItemPrice asChild>
                <Price>
                    <span className="t-font-l u-text-bold">£59.99</span>
                </Price>
            </LineItemPrice>
        </LineItem>
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    variant: 'primary',
};

export const Secondary = TemplateSecondary.bind({});
Secondary.args = {
    ...Primary.args,
    variant: 'secondary',
};

export const Tertiary = TemplateTertiary.bind({});
Tertiary.args = {
    ...Primary.args,
    variant: 'tertiary',
};
