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
                    'The blog variant of the card is mainly used for displaying blog post content from the cms.<br> Add the `variant="blog"` to the `<Card>` to apply the modifier.',
            },
        },
    },
} as Meta;

const Template: Story<CardProps> = ({ ...args }) => (
    <Card {...args} style={{ maxWidth: '610px' }}>
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
                <CardTitle as="h3" subtitle>
                    {postCardData.subtitle}
                </CardTitle>
            </CardHeader>

            <CardBody>
                <p>{truncate(postCardData.body)}</p>
            </CardBody>

            <CardFooter>
                <time dateTime="2022-10-08" className="u-text-reg">
                    Wednesday 8th October
                </time>
                <Button variant="secondary">Read more</Button>
            </CardFooter>
        </CardInner>
    </Card>
);

const MediaObjectTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardImage isRounded>
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
                <CardTitle as="h3" subtitle>
                    {postCardData.subtitle}
                </CardTitle>
            </CardHeader>

            <CardFooter>
                <Button variant="secondary">Read more</Button>
            </CardFooter>
        </CardInner>
    </Card>
);

const FeaturedTemplate: Story<CardProps> = ({ ...args }) => (
    <div className="o-container">
        <Card {...args}>
            <CardImage>
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1674744069/db8cdf9db0ec39f88706516410a64ed7_kxoiou.png"
                    alt=""
                    width={400}
                    height={460}
                />
            </CardImage>
            <CardInner>
                <CardHeader>
                    <CardTitle>
                        A third of women change their career after having children
                    </CardTitle>
                    <CardTitle as="h3" subtitle>
                        Study tips
                    </CardTitle>
                </CardHeader>

                <CardBody>
                    <p>December 29th, 2021</p>
                </CardBody>

                <CardFooter>
                    <Button variant="quinary">Read more</Button>
                </CardFooter>
            </CardInner>
        </Card>
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    variant: 'blog',
};

export const MediaObject = MediaObjectTemplate.bind({});
MediaObject.args = {
    ...Primary.args,
    subVariant: 'media-object',
};

export const Featured = FeaturedTemplate.bind({});
Featured.args = {
    ...Primary.args,
    variant: 'blog',
    subVariant: 'featured',
    className: 'u-bg-color-nonary',
};

export const FeaturedFullWidth = FeaturedTemplate.bind({});
FeaturedFullWidth.args = {
    ...Primary.args,
    variant: 'blog',
    subVariant: 'featured',
    isFull: true,
    className: 'u-bg-color-nonary',
};
