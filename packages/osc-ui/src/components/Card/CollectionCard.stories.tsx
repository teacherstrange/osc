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
                <Button>23 Courses</Button>
            </CardBody>
        </CardInner>
    </Card>
);

const SmallTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args} style={{ maxWidth: '452px' }}>
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
                <Button>Find our more</Button>
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
                <Button>23 Courses</Button>
            </CardBody>
        </CardInner>
    </Card>
);

export const Small = SmallTemplate.bind({});
Small.args = {
    variant: 'collection',
    size: 'sm',
};
export const Medium = MediumTemplate.bind({});
Medium.args = {
    variant: 'collection',
    size: 'md',
};
export const Large = LargeTemplate.bind({});
Large.args = {
    variant: 'collection',
    size: 'lg',
};
