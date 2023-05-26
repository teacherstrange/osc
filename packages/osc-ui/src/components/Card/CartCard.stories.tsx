import type { Meta, Story } from '@storybook/react';
import { mediaQueries as mq } from 'osc-design-tokens';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { rem } from '../../utils/rem';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '../Accordion/Accordion';
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

const Selects = () => (
    <>
        <Select
            description={{ label: 'Course Options' }}
            name="Course Options"
            defaultValue="Course Material + Practical Training"
            groupVariants={['secondary', 'inline-wrap']}
            hasDarkLabel
            triggerWidth="70"
            className="u-justify-between"
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
    </>
);

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
                <p className="u-mb-l">
                    Offer information Lorem ipsum dolor sit amet, consectetur. Offer information
                    Lorem ipsum dolor sit amet, consectetur.
                </p>

                <Selects />
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
                    <Price sku="OSC1279">
                        <span className="u-text-bold">£23</span>/month
                    </Price>
                </CardPriceTag>
            </CardFooter>
        </CardInner>
    </Card>
);

const ResponsiveAccordionTemplate: Story<CardProps> = ({ ...args }) => {
    const isGreaterThanTab = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);
    const [showOnGreaterThanTab, setShowOnGreaterThanTab] = useState(false);

    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnGreaterThanTab(isGreaterThanTab);
    }, [isGreaterThanTab]);

    return (
        <Card {...args} style={{ maxWidth: '610px' }}>
            <CardInner>
                <CardHeader>
                    <CardTitle isUnderlined>AAT Level 3 Diploma in Accounting</CardTitle>
                    <CardTitle as="h3" subtitle isSmall isThemeable position="bottom">
                        Single course
                    </CardTitle>
                </CardHeader>

                <CardBody isNarrow>
                    {showOnGreaterThanTab ? (
                        <p className="u-mb-l">
                            Offer information Lorem ipsum dolor sit amet, consectetur. Offer
                            information Lorem ipsum dolor sit amet, consectetur.
                        </p>
                    ) : null}

                    {showOnGreaterThanTab ? (
                        <Selects />
                    ) : (
                        <Accordion collapsible type="single" variant="quaternary">
                            <AccordionItem value="0">
                                <AccordionHeader asChild as="h2" icon="chevron">
                                    View options
                                </AccordionHeader>
                                <AccordionPanel>
                                    <Selects />
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    )}
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
                        <Price sku="OSC1279">
                            <span className="u-text-bold">£23</span>/month
                        </Price>
                    </CardPriceTag>
                </CardFooter>
            </CardInner>
        </Card>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    hasBorder: true,
    isTransparent: true,
};

export const PrimaryWithResponsiveAccordion = ResponsiveAccordionTemplate.bind({});
PrimaryWithResponsiveAccordion.args = {
    ...Primary.args,
};
PrimaryWithResponsiveAccordion.parameters = {
    docs: {
        description: {
            story: 'The cart card can be used with an accordion and a breakpoint to show and hide the content on different screen sizes.<br>Resize your window to see the accordion in action.',
        },
    },
};
