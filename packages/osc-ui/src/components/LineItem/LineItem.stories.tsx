import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Price } from '../Price/Price';
import type { LineItemProps } from './LineItem';
import { LineItem, LineItemGroup, LineItemHeader, LineItemPrice } from './LineItem';

export default {
    title: 'osc-ui/Cart/Line Item',
    component: LineItem,
    subcomponents: { LineItemGroup, LineItemHeader, LineItemPrice },
    parameters: {
        docs: {
            description: {
                component:
                    'The Line Item component is used to display an item in the cart or the deliver and total price.',
            },
        },
    },
    argTypes: {
        variant: {
            control: {
                type: 'select',
            },
        },
    },
} as Meta;

const Template: Story<LineItemProps> = ({ ...args }) => (
    <div style={{ maxWidth: '340px' }}>
        <LineItem {...args}>
            <LineItemGroup>
                <LineItemHeader className="u-mb-0">A level Biology</LineItemHeader>
                <Button variant="quaternary" className="u-text-underline">
                    Remove
                </Button>
            </LineItemGroup>

            <LineItemPrice asChild>
                <Price>
                    <p className="t-font-m u-mb-0 u-text-right">£15.00</p>
                    <p className="t-font-s u-color-neutral-700 u-mb-0 u-text-right">Pay monthly</p>
                </Price>
            </LineItemPrice>
        </LineItem>
    </div>
);

const TemplateSecondary: Story<LineItemProps> = ({ ...args }) => (
    <div style={{ maxWidth: '340px' }}>
        <LineItem {...args}>
            <LineItemHeader>Additional options</LineItemHeader>

            <LineItemGroup className="o-flex o-flex--between">
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
            </LineItemGroup>

            <LineItemGroup className="o-flex o-flex--between">
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
            </LineItemGroup>
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

const AsChildTemplate: Story<LineItemProps> = ({ ...args }) => (
    <ul style={{ maxWidth: '340px' }}>
        <LineItem asChild {...args}>
            <li>
                <LineItemGroup>
                    <LineItemHeader className="u-mb-0">A level Biology</LineItemHeader>
                    <Button variant="quaternary" className="u-text-underline">
                        Remove
                    </Button>
                </LineItemGroup>

                <LineItemPrice asChild>
                    <Price>
                        <p className="t-font-m u-mb-0 u-text-right">£15.00</p>
                        <p className="t-font-s u-color-neutral-700 u-mb-0 u-text-right">
                            Pay monthly
                        </p>
                    </Price>
                </LineItemPrice>
            </li>
        </LineItem>
        <LineItem asChild {...args}>
            <li>
                <LineItemGroup>
                    <LineItemHeader className="u-mb-0">AAT Level 2 and 3 Accounting</LineItemHeader>
                    <Button variant="quaternary" className="u-text-underline">
                        Remove
                    </Button>
                </LineItemGroup>

                <LineItemPrice asChild>
                    <Price>
                        <p className="t-font-m u-mb-0 u-text-right">£1,149.00</p>
                        <p className="t-font-s u-color-neutral-700 u-mb-0 u-text-right">
                            Pay in full
                        </p>
                    </Price>
                </LineItemPrice>
            </li>
        </LineItem>
    </ul>
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
Secondary.parameters = {
    docs: {
        description: {
            story: 'The secondary variant changes the direction of the children into a single column and makes the header smaller.',
        },
    },
};

export const Tertiary = TemplateTertiary.bind({});
Tertiary.args = {
    ...Primary.args,
    variant: 'tertiary',
};
Tertiary.parameters = {
    docs: {
        description: {
            story: 'Tertiary is a similar variant to primary, but simplifies some of the styles. This is better used in conjunction with utility classes to refine the look.',
        },
    },
};

export const AsListItem = AsChildTemplate.bind({});
AsListItem.args = {
    ...Primary.args,
};
AsListItem.parameters = {
    docs: {
        description: {
            story: 'Each component can use the `asChild` prop to change it into a different element type. For example, add a `li` as child and pass the `asChild` prop to convert it into a list item. This helps to reduce the amount of markup generated.',
        },
    },
};
