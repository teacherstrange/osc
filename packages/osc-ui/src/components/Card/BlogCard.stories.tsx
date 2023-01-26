import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { truncate } from '../../utils/truncate';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import type { CardProps } from './Card';
import { Card, CardBody, CardFooter, CardHeader, CardImage, CardInner, CardTitle } from './Card';
import { postCardData } from './cardData';

export default {
    title: 'osc-ui/Cards/Blog Card',
    component: Card,
    subcomponents: { CardInner, CardImage, CardHeader, CardTitle, CardBody, CardFooter },
    parameters: {
        docs: {
            description: {
                component:
                    'The post variant of the card is mainly used for displaying blog post content from the cms.<br> Add the `variant="post"` to the `<Card>` to apply the modifier.',
            },
        },
    },
} as Meta;

const Template: Story<CardProps> = ({ ...args }) => (
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

            <CardFooter hasBorderTop hasBorderBottom>
                <time dateTime="2022-10-08" className="u-text-bold">
                    Wednesday 8th October
                </time>
                <Button>Read more</Button>
            </CardFooter>
        </CardInner>
    </Card>
);

export const Primary = Template.bind({});
Primary.args = {
    variant: 'blog',
};
