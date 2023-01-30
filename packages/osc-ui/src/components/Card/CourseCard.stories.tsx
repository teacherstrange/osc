import { Cross2Icon } from '@radix-ui/react-icons';
import { Popover } from '@radix-ui/react-popover';
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button, ButtonGroup } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { PopoverArrow, PopoverClose, PopoverContent, PopoverTrigger } from '../Popover/Popover';
import type { CardProps } from './Card';
import {
    CardBody,
    CardBodyInner,
    CardCallout,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardPriceTag,
    CardTitle,
    CardWishListButton,
    CourseCard,
} from './Card';

export default {
    title: 'osc-ui/Cards/Course Card',
    component: CourseCard,
    subcomponents: {
        CardInner,
        CardImage,
        CardHeader,
        CardTitle,
        CardBody,
        CardBodyInner,
        CardCallout,
        CardPriceTag,
        CardWishListButton,
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

// TODO: CourseCardWide (list view)
// TODO: Move popover into CardCallout?
// TODO: Tests
// TODO: Typescript
// TODO: Tooltip on wishlist button
// TODO: Badge?
// TODO: Refactor variants into their own components

const Template: Story<CardProps> = ({ ...args }) => (
    <CourseCard {...args}>
        <CardInner>
            <CardHeader>
                <CardWishListButton label="Save for later" className="is-active" />

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
    </CourseCard>
);

const HasCalloutTemplate: Story<CardProps> = ({ ...args }) => (
    <CourseCard {...args}>
        <CardInner>
            <CardHeader>
                <CardWishListButton label="Save for later" />

                <CardTitle>AAT Level 3 Diploma in Accounting</CardTitle>
                <CardTitle as="h3" subtitle isSmall>
                    Single course
                </CardTitle>
            </CardHeader>

            <CardBody>
                <CardBodyInner>
                    <h4>Course options available</h4>
                    <ul>
                        <li>Course Material</li>
                        <li>Course Material + Exams</li>
                    </ul>
                </CardBodyInner>

                <CardCallout>
                    <strong>Save up to £200</strong>
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
    </CourseCard>
);

const IsFullWidthTemplate: Story<CardProps> = ({ ...args }) => (
    <CourseCard {...args}>
        <CardInner>
            <CardHeader>
                <CardPriceTag className="u-hidden-until@tab">
                    <p>
                        <span className="u-text-bold">From £23</span>/month
                    </p>
                    <p>
                        or from <span className="u-text-bold">£849 in full</span>
                    </p>
                </CardPriceTag>
                <CardTitle>AAT Level 3 Diploma in Accounting</CardTitle>
                <CardTitle as="h3" subtitle isSmall>
                    Single course
                </CardTitle>
            </CardHeader>

            <CardBody>
                <CardBodyInner>
                    <h4>Course options available</h4>
                    <ul>
                        <li>Course Material</li>
                        <li>Course Material + Exams</li>
                    </ul>
                </CardBodyInner>

                <CardCallout>
                    <strong>Save up to £200</strong>
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

                <CardPriceTag className="u-hidden-from@tab">
                    <p>
                        <span className="u-text-bold">From £23</span>/month
                    </p>
                    <p>
                        or from <span className="u-text-bold">£849 in full</span>
                    </p>
                </CardPriceTag>

                <ButtonGroup>
                    <CardWishListButton label="Save for later" size="lg" />

                    <Button as="link" to="/courses/aat-level-3-diploma-in-accounting">
                        View course
                    </Button>
                </ButtonGroup>
            </CardBody>
        </CardInner>
    </CourseCard>
);

const HasFooterTemplate: Story<CardProps> = ({ ...args }) => (
    <CourseCard {...args}>
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
    </CourseCard>
);

export const Primary = Template.bind({});
Primary.args = {
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
export const IsFullWidth = IsFullWidthTemplate.bind({});
IsFullWidth.args = {
    ...Primary.args,
    isFull: true,
    style: {
        maxWidth: '100%',
    },
};
IsFullWidth.parameters = {
    docs: {
        description: {
            story: '...',
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
