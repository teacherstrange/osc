import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Content } from '../Content/Content';
import { Image } from '../Image/Image';
import { imageData } from '../Image/imageData';
import type { CardProps } from './Card';
import { Card, CardBody, CardFooter, CardHeader, CardImage, CardInner, CardTitle } from './Card';
import { bioCardData } from './cardData';

export default {
    title: 'osc-ui/Cards/Default Card',
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

const HasRoundImageTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardImage isRounded>
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

export const Primary = Template.bind({});
Primary.args = {};

export const HasRoundImage = HasRoundImageTemplate.bind({});
HasRoundImage.args = {
    ...Primary.args,
};
HasRoundImage.parameters = {
    docs: {
        description: {
            story: 'To set the image to be rounded, set the `isRounded` prop to true on the `<CardImage>`.<br>This applied the `is-rounded` class to the image container, which will round the image and set some margin above it.',
        },
    },
};
