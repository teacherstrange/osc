import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button, ButtonGroup } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Price } from '../Price/Price';
import { Select, SelectItem } from '../Select/Select';
import type { CardProps } from './Card';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardPriceTag,
    CardTitle,
} from './Card';

export default {
    title: 'osc-ui/Cards/Cart Card',
    component: Card,
    subcomponents: { CardInner, CardImage, CardHeader, CardTitle, CardBody, CardFooter },
    parameters: {
        docs: {
            description: {
                component:
                    'The cart variant of the card is mainly used for product info in the cart.',
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

const Template: Story<CardProps> = ({ ...args }) => (
    <Card {...args} style={{ maxWidth: '610px' }}>
        <CardInner>
            <CardHeader>
                <CardTitle isUnderlined>AAT Level 3 Diploma in Accounting</CardTitle>
                <CardTitle as="h3" subtitle isSmall isThemeable position="bottom">
                    Single course
                </CardTitle>
            </CardHeader>

            <CardBody isNarrow>
                <p>
                    Offer information Lorem ipsum dolor sit amet, consectetur. Offer information
                    Lorem ipsum dolor sit amet, consectetur.
                </p>

                <Select
                    description={{ label: 'Course Options' }}
                    name="Course Options"
                    defaultValue="Course Material + Practical Training"
                    groupVariants={['secondary', 'inline-wrap']}
                    hasDarkLabel
                    triggerWidth="70"
                    className="u-justify-between u-pt-l"
                >
                    <SelectItem value="Course Material + Practical Training">
                        Course Material + Practical Training
                    </SelectItem>
                </Select>
                <Select
                    description={{ label: 'Study Option' }}
                    name="Study Option"
                    defaultValue="Study pack"
                    groupVariants={['secondary', 'inline-wrap']}
                    hasDarkLabel
                    triggerWidth="70"
                    className="u-justify-between u-pt-xs"
                >
                    <SelectItem value="Study pack">Study pack</SelectItem>
                </Select>
                <Select
                    description={{ label: 'Payment Option' }}
                    name="Payment Option"
                    defaultValue="Pay monthly"
                    groupVariants={['secondary', 'inline-wrap']}
                    hasDarkLabel
                    triggerWidth="70"
                    className="u-justify-between u-pt-xs"
                >
                    <SelectItem value="Pay monthly">Pay monthly</SelectItem>
                </Select>
            </CardBody>

            <CardFooter className="u-pt-xl">
                <ButtonGroup direction="column">
                    <Button variant="tertiary" className="u-hidden-until@tab">
                        Save for later <Icon id="heart" />
                    </Button>
                    <Button variant="quaternary" className="u-text-underline">
                        Remove
                    </Button>
                </ButtonGroup>

                <CardPriceTag className="u-self-end u-mt-0">
                    <Price sku="OSC1279">£23/month</Price>
                </CardPriceTag>
            </CardFooter>
        </CardInner>
    </Card>
);

export const Primary = Template.bind({});
Primary.args = {
    hasBorder: true,
    isTransparent: true,
};
