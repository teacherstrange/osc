import { Popover } from '@radix-ui/react-popover';
import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button, ButtonGroup } from '../Button/Button';
import { AccessibleIcon, Icon } from '../Icon/Icon';
import { PopoverArrow, PopoverClose, PopoverContent, PopoverTrigger } from '../Popover/Popover';
import { Price } from '../Price/Price';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
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
                    'The course variant of the card is mainly used for displaying course content from the cms.',
            },
        },
    },
} as Meta;

// TODO: Tooltip on wishlist button
// TODO: Badge needs styling
// TODO: Popover need styling
const Template: Story<CardProps> = ({ ...args }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <CourseCard {...args}>
            <CardInner>
                <CardHeader>
                    <CardWishListButton
                        label="Save for later"
                        className={isActive && 'is-active'}
                        onClick={() => setIsActive(!isActive)}
                    />

                    <CardTitle isUnderlined>AAT Level 3 Diploma in Accounting</CardTitle>
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
                        <Price size="sm">
                            <span className="u-text-bold">From £23</span>/month
                        </Price>
                        <Price size="sm">
                            or from <span className="u-text-bold">£849 in full</span>
                        </Price>
                    </CardPriceTag>

                    <Button as="link" to="/courses/aat-level-3-diploma-in-accounting" isFull>
                        View course
                        <VisuallyHidden>AAT Level 3 Diploma in Accounting</VisuallyHidden>
                    </Button>
                </CardBody>
            </CardInner>
        </CourseCard>
    );
};

const HasCalloutTemplate: Story<CardProps> = ({ ...args }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <CourseCard {...args}>
            <CardInner>
                <CardHeader>
                    <CardWishListButton
                        label="Save for later"
                        className={isActive && 'is-active'}
                        onClick={() => setIsActive(!isActive)}
                    />

                    <CardTitle isUnderlined>AAT Level 3 Diploma in Accounting</CardTitle>
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
                                <AccessibleIcon label="More information">
                                    <Icon id="warning" />
                                </AccessibleIcon>
                            </PopoverTrigger>
                            <PopoverContent side="top">
                                <PopoverArrow />

                                <PopoverClose className="c-popover__close" aria-label="Close">
                                    <Icon id="close" />
                                </PopoverClose>

                                <p>Save up to £200 when you purchase</p>
                                <p>Interior Design and Heritage Interior Design QLS Level 3 </p>
                            </PopoverContent>
                        </Popover>
                    </CardCallout>

                    <CardPriceTag>
                        <Price size="sm">
                            <span className="u-text-bold">From £23</span>/month
                        </Price>
                        <Price size="sm">
                            or from <span className="u-text-bold">£849 in full</span>
                        </Price>
                    </CardPriceTag>

                    <Button as="link" to="/courses/aat-level-3-diploma-in-accounting" isFull>
                        View course
                        <VisuallyHidden>AAT Level 3 Diploma in Accounting</VisuallyHidden>
                    </Button>
                </CardBody>
            </CardInner>
        </CourseCard>
    );
};

const IsFullWidthTemplate: Story<CardProps> = ({ ...args }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <CourseCard {...args}>
            <CardInner>
                <CardHeader>
                    <CardPriceTag className="u-hidden-until@tab">
                        <Price size="sm">
                            <span className="u-text-bold">From £23</span>/month
                        </Price>
                        <Price size="sm">
                            or from <span className="u-text-bold">£849 in full</span>
                        </Price>
                    </CardPriceTag>
                    <CardTitle isUnderlined>AAT Level 3 Diploma in Accounting</CardTitle>
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
                                <AccessibleIcon label="More information">
                                    <Icon id="warning" />
                                </AccessibleIcon>
                            </PopoverTrigger>
                            <PopoverContent side="top">
                                <PopoverArrow />

                                <PopoverClose className="c-popover__close" aria-label="Close">
                                    <Icon id="close" />
                                </PopoverClose>

                                <p>Save up to £200 when you purchase</p>
                                <p>Interior Design and Heritage Interior Design QLS Level 3 </p>
                            </PopoverContent>
                        </Popover>
                    </CardCallout>

                    <CardPriceTag className="u-hidden-from@tab">
                        <Price size="sm">
                            <span className="u-text-bold">From £23</span>/month
                        </Price>
                        <Price size="sm">
                            or from <span className="u-text-bold">£849 in full</span>
                        </Price>
                    </CardPriceTag>

                    <ButtonGroup>
                        <CardWishListButton
                            label="Save for later"
                            size="lg"
                            className={isActive && 'is-active'}
                            onClick={() => setIsActive(!isActive)}
                        />

                        <Button as="link" to="/courses/aat-level-3-diploma-in-accounting">
                            View course
                            <VisuallyHidden>AAT Level 3 Diploma in Accounting</VisuallyHidden>
                        </Button>
                    </ButtonGroup>
                </CardBody>
            </CardInner>
        </CourseCard>
    );
};

const HasFooterTemplate: Story<CardProps> = ({ ...args }) => (
    <CourseCard {...args}>
        <CardInner>
            <CardHeader>
                <CardTitle isUnderlined>AAT Level 3 Diploma in Accounting</CardTitle>
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
                    <Price size="sm">
                        <span className="u-text-bold">From £23</span>/month
                    </Price>
                    <Price size="sm">
                        or from <span className="u-text-bold">£849 in full</span>
                    </Price>
                </CardPriceTag>

                <Button isFull>Add to bag</Button>
            </CardBody>

            <CardFooter>
                <Button variant="quaternary" className="u-text-underline">
                    Remove
                </Button>
                <Button variant="secondary" size="sm">
                    View course
                    <VisuallyHidden>AAT Level 3 Diploma in Accounting</VisuallyHidden>
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
            story: 'Add the `<CardCallout>` component to the `<CardBody>` to add a callout box to the card. You can enhance this by adding our `<Popover>` component.',
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
            story: 'Add the `isFull` prop to apply the `is-full` class to the card. This allows you have have a bit more space within the card so you can change the markup if needed.',
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
