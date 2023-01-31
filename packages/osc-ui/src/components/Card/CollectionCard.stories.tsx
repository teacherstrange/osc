import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { truncate } from '../../utils/truncate';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Image } from '../Image/Image';
import type { CardProps } from './Card';
import {
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardTitle,
    CollectionCard,
} from './Card';
import { collectionCardData, collectionCardDataHzntl, collectionCardDataSml } from './cardData';

export default {
    title: 'osc-ui/Cards/Collection Card',
    component: CollectionCard,
    subcomponents: { CardInner, CardImage, CardHeader, CardTitle, CardBody, CardFooter },
    parameters: {
        docs: {
            description: {
                component:
                    'The collection variant of the card is mainly used for displaying collection content from the cms.<br>This variant is mostly controlled by the size of the image, but you can add a `size` prop to apply more specific styles.',
            },
        },
    },
} as Meta;

const SmallTemplate: Story<CardProps> = ({ ...args }) => (
    <CollectionCard {...args}>
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
                    Find our more
                    <Icon id="chevron-right" />
                </Button>
            </CardFooter>
        </CardInner>
    </CollectionCard>
);
const MediumTemplate: Story<CardProps> = ({ ...args }) => (
    <CollectionCard {...args}>
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
    </CollectionCard>
);

const LargeTemplate: Story<CardProps> = ({ ...args }) => (
    <CollectionCard {...args}>
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
    </CollectionCard>
);

export const Large = LargeTemplate.bind({});
Large.args = {
    size: 'lg',
    style: { maxWidth: '610px' },
};
export const Medium = MediumTemplate.bind({});
Medium.args = {
    size: 'md',
    style: { maxWidth: '610px' },
};
export const Small = SmallTemplate.bind({});
Small.args = {
    size: 'sm',
    style: { maxWidth: '452px' },
};
