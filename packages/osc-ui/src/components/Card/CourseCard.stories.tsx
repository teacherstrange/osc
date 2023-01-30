import { Cross2Icon } from '@radix-ui/react-icons';
import { Popover } from '@radix-ui/react-popover';
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { PopoverArrow, PopoverClose, PopoverContent, PopoverTrigger } from '../Popover/Popover';
import type { CardProps } from './Card';
import {
    Card,
    CardBody,
    CardCallout,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardPriceTag,
    CardTitle,
} from './Card';

export default {
    title: 'osc-ui/Cards/Course Card',
    component: Card,
    subcomponents: {
        CardInner,
        CardImage,
        CardHeader,
        CardTitle,
        CardBody,
        CardCallout,
        CardPriceTag,
        CardFooter,
    },
    parameters: {
        docs: {
            description: {
                component:
                    'The course variant of the card is mainly used for displaying course content from the cms.<br>Add the variant="course" to the <Card> to apply the modifier.',
            },
        },
    },
} as Meta;

const Template: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardInner>
            <CardHeader>
                <Button variant="quaternary">
                    {/* // TODO: replace with with `Icon` component */}
                    {/* // TODO: This also needs a tooltip see 'collection-design' in Figma */}
                    <Icon label="Save for later">
                        <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18.2093 9.11036L10.0425 17.4743L1.89385 9.12889C-0.0347669 7.15372 -0.0347669 3.93712 1.89385 1.95824C3.81523 -0.00951818 6.93793 -0.00951818 8.85931 1.95824L10.0425 3.17003L11.2077 1.97677C13.1363 0.00159907 16.2807 0.00159907 18.2093 1.97677C20.1307 3.94453 20.1307 7.1426 18.2093 9.11036ZM10.0425 15.1174L17.0587 7.93193C18.3432 6.61639 18.3432 4.47445 17.0587 3.1552C15.7633 1.82854 13.6537 1.82854 12.3583 3.1552L10.0425 5.52689L7.70865 3.13667C6.42411 1.82113 4.33267 1.82113 3.04451 3.13667C1.74911 4.46334 1.74911 6.6238 3.04451 7.95046L10.0425 15.1174Z"
                                fill="#062134"
                            />
                        </svg>
                    </Icon>
                </Button>
                <CardTitle>AAT Level 3 Diploma in Accounting</CardTitle>
                <CardTitle as="h3" subtitle isSmall>
                    Single course
                </CardTitle>
            </CardHeader>

            <CardBody>
                <h4>Course options available</h4>
                <ul>
                    <li>Course Material</li>
                    <li>Course Material + Exams</li>
                </ul>

                <CardPriceTag>
                    <p>
                        <span className="u-text-bold">From £23</span>/month
                    </p>
                    <p>
                        or from <span className="u-text-bold">£849 in full</span>
                    </p>
                </CardPriceTag>

                <Button as="link" to="/courses/aat-level-3-diploma-in-accounting" isFull>
                    View course
                </Button>
            </CardBody>
        </CardInner>
    </Card>
);

const HasCalloutTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardInner>
            <CardHeader>
                <Button variant="quaternary">
                    {/* // TODO: replace with with `Icon` component */}
                    {/* // TODO: This also needs a tooltip see 'collection-design' in Figma */}
                    <Icon label="Save for later">
                        <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18.2093 9.11036L10.0425 17.4743L1.89385 9.12889C-0.0347669 7.15372 -0.0347669 3.93712 1.89385 1.95824C3.81523 -0.00951818 6.93793 -0.00951818 8.85931 1.95824L10.0425 3.17003L11.2077 1.97677C13.1363 0.00159907 16.2807 0.00159907 18.2093 1.97677C20.1307 3.94453 20.1307 7.1426 18.2093 9.11036ZM10.0425 15.1174L17.0587 7.93193C18.3432 6.61639 18.3432 4.47445 17.0587 3.1552C15.7633 1.82854 13.6537 1.82854 12.3583 3.1552L10.0425 5.52689L7.70865 3.13667C6.42411 1.82113 4.33267 1.82113 3.04451 3.13667C1.74911 4.46334 1.74911 6.6238 3.04451 7.95046L10.0425 15.1174Z"
                                fill="#062134"
                            />
                        </svg>
                    </Icon>
                </Button>
                <CardTitle>AAT Level 3 Diploma in Accounting</CardTitle>
                <CardTitle as="h3" subtitle isSmall>
                    Single course
                </CardTitle>
            </CardHeader>

            <CardBody>
                <h4>Course options available</h4>
                <ul>
                    <li>Course Material</li>
                    <li>Course Material + Exams</li>
                </ul>

                <CardCallout>
                    Save up to £200
                    <Popover>
                        <PopoverTrigger className={args.className}>
                            {/* // TODO: replace with with `Icon` component */}
                            <Icon label="More information">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9 9V15H11V9H9ZM9 5V7H11V5H9Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </Icon>
                        </PopoverTrigger>
                        <PopoverContent side="top">
                            <PopoverArrow />

                            <PopoverClose className="c-popover__close" aria-label="Close">
                                {/* // TODO: Update with out Icon component */}
                                <Cross2Icon />
                            </PopoverClose>

                            <p>Save up to £200 when you purchase</p>
                            <p>Interior Design and Heritage Interior Design QLS Level 3 </p>
                        </PopoverContent>
                    </Popover>
                </CardCallout>

                <CardPriceTag>
                    <p>
                        <span className="u-text-bold">From £23</span>/month
                    </p>
                    <p>
                        or from <span className="u-text-bold">£849 in full</span>
                    </p>
                </CardPriceTag>

                <Button as="link" to="/courses/aat-level-3-diploma-in-accounting" isFull>
                    View course
                </Button>
            </CardBody>
        </CardInner>
    </Card>
);

const HasFooterTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardInner>
            <CardHeader>
                <CardTitle>AAT Level 3 Diploma in Accounting</CardTitle>
                <CardTitle as="h3" subtitle isSmall>
                    Single course
                </CardTitle>
            </CardHeader>

            <CardBody>
                <h4>Course options available</h4>
                <ul>
                    <li>Course Material</li>
                    <li>Course Material + Exams</li>
                    <li>Course Material + Exams + practical</li>
                </ul>

                <CardPriceTag>
                    <p>
                        <span className="u-text-bold">From £23</span>/month
                    </p>
                    <p>
                        or from <span className="u-text-bold">£849 in full</span>
                    </p>
                </CardPriceTag>

                <Button isFull>Add to bag</Button>
            </CardBody>

            <CardFooter>
                <Button variant="quaternary" className="u-text-underline">
                    Remove
                </Button>
                <Button variant="secondary" size="sm">
                    View course
                </Button>
            </CardFooter>
        </CardInner>
    </Card>
);

export const Primary = Template.bind({});
Primary.args = {
    variant: 'course',
    style: { maxWidth: '400px' },
};
export const HasCallout = HasCalloutTemplate.bind({});
HasCallout.args = {
    ...Primary.args,
};
HasCallout.parameters = {
    docs: {
        description: {
            story: 'Add the `<CardCallout>` component to the `<CardBody>` to add a callout with a popover to the card.',
        },
    },
};
export const IsThemed = HasCalloutTemplate.bind({});
IsThemed.args = {
    ...Primary.args,
    style: {
        maxWidth: '400px',
        '--card-theme-color': 'var(--color-quaternary)',
        '--card-theme-gradient': 'var(--color-gradient-septenary-90)',
    },
};
IsThemed.parameters = {
    docs: {
        description: {
            story: 'Cards are themeable by passing the `--card-theme-color` and `--card-theme-gradient` variables to the style prop of the `Card`.',
        },
    },
};
export const HasFooter = HasFooterTemplate.bind({});
HasFooter.args = {
    ...Primary.args,
};
