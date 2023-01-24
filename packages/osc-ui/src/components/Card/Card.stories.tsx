import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { truncate } from '../../utils/truncate';
import { Button } from '../Button/Button';
import { Content } from '../Content/Content';
import { Image } from '../Image/Image';
import { imageData } from '../Image/imageData';
import type { CardProps } from './Card';
import { Card, CardBody, CardFooter, CardHeader, CardImage, CardInner, CardTitle } from './Card';
import { bioCardData, collectionCardData, postCardData } from './cardData';

export default {
    title: 'osc-ui/Card',
    component: Card,
    subcomponents: { CardInner, CardImage, CardHeader, CardTitle, CardBody, CardFooter },
    parameters: {
        docs: {
            description: {
                component: '',
            },
        },
    },
} as Meta;

const Template: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardImage>
            <Image
                src={imageData.src}
                alt={imageData.alt}
                width={imageData.width}
                height={imageData.height}
            />
        </CardImage>
        <CardInner>
            <CardHeader>
                <CardTitle>Title</CardTitle>
                <CardTitle as="h3" is="subtitle">
                    Subtitle
                </CardTitle>
            </CardHeader>

            <CardBody>
                <p>
                    Study three or more A levels or GCSEs to save and start working towards a
                    brighter future.
                </p>

                <Button>Click me</Button>
            </CardBody>

            <CardFooter>
                <p>Offer ends midnight 30th November 2022.</p>
            </CardFooter>
        </CardInner>
    </Card>
);

const BioTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardImage>
            <Image
                src={bioCardData.image.secure_url}
                alt={bioCardData.image.alt}
                width={bioCardData.image.width}
                height={bioCardData.image.height}
            />
        </CardImage>
        <CardInner>
            <CardHeader>
                <CardTitle>{bioCardData.name}</CardTitle>
                <CardTitle as="h3" is="subtitle">
                    {bioCardData.role}
                </CardTitle>
            </CardHeader>

            <CardBody>
                <Content value={bioCardData.bio} />
            </CardBody>
        </CardInner>
    </Card>
);

const PostTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardImage>
            <Image
                src={postCardData.image.secure_url}
                alt={postCardData.image.alt}
                width={postCardData.image.width}
                height={postCardData.image.height}
            />
        </CardImage>
        <CardInner>
            <CardHeader>
                <CardTitle>{postCardData.title}</CardTitle>
                <CardTitle as="h3" is="subtitle">
                    {postCardData.subtitle}
                </CardTitle>
            </CardHeader>

            <CardBody>
                <p>{truncate(postCardData.body)}</p>
            </CardBody>

            <CardFooter>
                <time dateTime="2022-10-08">Wednesday 8th October</time>
                <Button>Read more</Button>
            </CardFooter>
        </CardInner>
    </Card>
);

const aspectTemplate: Story<CardProps> = ({ ...args }) => (
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

export const Primary = Template.bind({});
Primary.args = {};

export const Bio = BioTemplate.bind({});
Bio.args = {
    ...Primary.args,
};

export const Post = PostTemplate.bind({});
Post.args = {
    ...Primary.args,
    variant: 'post',
};
Post.parameters = {
    docs: {
        description: {
            story: 'The post variant of the card is mainly used for displaying blog post content from the cms.<br> Add the `variant="post"` to the `<Card>` to apply the modifier.',
        },
    },
};

export const AspectCard = aspectTemplate.bind({});
AspectCard.args = {
    ...Primary.args,
    variant: 'aspectCard',
};
