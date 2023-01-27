import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { truncate } from '../../utils/truncate';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import type { CardProps } from './Card';
import { Card, CardBody, CardFooter, CardHeader, CardImage, CardInner, CardTitle } from './Card';
import { collectionCardData, collectionCardDataHzntl, collectionCardDataSml } from './cardData';

export default {
    title: 'osc-ui/Cards/Collection Card',
    component: Card,
    subcomponents: { CardInner, CardImage, CardHeader, CardTitle, CardBody, CardFooter },
    parameters: {
        docs: {
            description: {
                component:
                    'The aspect card variation is mostly controlled by the images aspect ratio. You can further refine the positioning of the card contents by using the `direction="horizontal"` or `direction="vertical"` properties.',
            },
        },
    },
} as Meta;

const SmallTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardImage>
            <Image
                src={collectionCardDataSml.image.secure_url}
                alt={collectionCardDataSml.image.alt}
                width={collectionCardDataSml.image.width}
                height={collectionCardDataSml.image.height}
            />
        </CardImage>
        <CardInner>
            <CardHeader>
                <CardTitle>{collectionCardDataSml.title}</CardTitle>
            </CardHeader>

            <CardBody>
                <p>{truncate(collectionCardDataSml.body)}</p>
            </CardBody>

            <CardFooter>
                <span className="u-text-bold">23 courses</span>
                <Button variant="quaternary">
                    Find our more {/* // TODO: update this with Icon component */}
                    <svg
                        width="13"
                        height="18"
                        viewBox="0 0 13 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.64277 8.64467L0.973619 14.3314L3.77309 17.1221L12.1978 8.671L3.75554 0.176041L0.964843 2.96674L6.64277 8.64467Z"
                            fill="#062134"
                        />
                    </svg>
                </Button>
            </CardFooter>
        </CardInner>
    </Card>
);
const MediumTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardImage>
            <Image
                src={collectionCardDataHzntl.image.secure_url}
                alt={collectionCardDataHzntl.image.alt}
                width={collectionCardDataHzntl.image.width}
                height={collectionCardDataHzntl.image.height}
            />
        </CardImage>
        <CardInner>
            <CardHeader>
                <CardTitle>{collectionCardDataHzntl.title}</CardTitle>
            </CardHeader>

            <CardBody>
                <p>{truncate(collectionCardDataHzntl.body)}</p>
                <Button isFull>23 Courses</Button>
            </CardBody>
        </CardInner>
    </Card>
);

const LargeTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardImage>
            <Image
                src={collectionCardData.image.secure_url}
                alt={collectionCardData.image.alt}
                width={collectionCardData.image.width}
                height={collectionCardData.image.height}
            />
        </CardImage>
        <CardInner>
            <CardHeader>
                <CardTitle>{collectionCardData.title}</CardTitle>
            </CardHeader>

            <CardBody>
                <p>{truncate(collectionCardData.body)}</p>
                <Button isFull>23 Courses</Button>
            </CardBody>
        </CardInner>
    </Card>
);

export const Small = SmallTemplate.bind({});
Small.args = {
    variant: 'collection',
    size: 'sm',
    style: { maxWidth: '452px' },
};
export const Medium = MediumTemplate.bind({});
Medium.args = {
    variant: 'collection',
    size: 'md',
    style: { maxWidth: '610px' },
};
export const Large = LargeTemplate.bind({});
Large.args = {
    variant: 'collection',
    size: 'lg',
    style: { maxWidth: '610px' },
};
