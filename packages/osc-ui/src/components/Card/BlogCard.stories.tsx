import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { formatDate } from '../../utils/formatDate';
import { truncate } from '../../utils/truncate';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import type { CardProps } from './Card';
import {
    BlogCard,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardTitle,
} from './Card';
import { postCardData } from './cardData';

export default {
    title: 'osc-ui/Cards/Blog Card',
    component: BlogCard,
    subcomponents: { CardInner, CardImage, CardHeader, CardTitle, CardBody, CardFooter },
    parameters: {
        docs: {
            description: {
                component:
                    'The blog variant of the card is mainly used for displaying blog post content from the cms.',
            },
        },
    },
    argTypes: {
        variant: {
            control: {
                type: 'select',
            },
        },
    },
} as Meta;

const Template: Story<CardProps> = ({ ...args }) => (
    <BlogCard {...args}>
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
                <time dateTime="2022-09-28T15:36:12Z" className="u-text-reg">
                    {formatDate('2022-09-28T15:36:12Z', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>
                <Button variant="secondary">
                    Read more
                    <VisuallyHidden>about {postCardData.title}</VisuallyHidden>
                </Button>
            </CardFooter>
        </CardInner>
    </BlogCard>
);

const MediaObjectTemplate: Story<CardProps> = ({ ...args }) => (
    <BlogCard {...args}>
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
                <Button variant="secondary">
                    Read more <VisuallyHidden>about {postCardData.title}</VisuallyHidden>
                </Button>
            </CardFooter>
        </CardInner>
    </BlogCard>
);

const FeaturedTemplate: Story<CardProps> = ({ ...args }) => (
    <div className="o-container">
        <BlogCard {...args}>
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
                    <Button variant="quinary">
                        Read more{' '}
                        <VisuallyHidden>
                            about A third of women change their career after having children
                        </VisuallyHidden>
                    </Button>
                </CardFooter>
            </CardInner>
        </BlogCard>
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    style: { maxWidth: '610px' },
};

export const MediaObject = MediaObjectTemplate.bind({});
MediaObject.args = {
    ...Primary.args,
    variant: 'media-object',
    style: { maxWidth: '566px' },
};
MediaObject.parameters = {
    docs: {
        description: {
            story: 'Add the `variant="media-object"` prop to apply the media object styles. Works best with the `isRounded` prop on the `CardImage` component and no `CardBody`.',
        },
    },
};

export const Featured = FeaturedTemplate.bind({});
Featured.args = {
    ...Primary.args,
    variant: 'featured',
    className: 'u-bg-color-nonary',
    blockLink: true,
    style: { maxWidth: '400px' },
};
Featured.parameters = {
    docs: {
        description: {
            story: 'Add the `variant="featured"` prop to apply the featured styles. This works well with the `blockLink` prop.',
        },
    },
};

export const FeaturedFullWidth = FeaturedTemplate.bind({});
FeaturedFullWidth.args = {
    ...Primary.args,
    variant: 'featured',
    isFull: true,
    className: 'u-bg-color-nonary',
    blockLink: true,
    style: { maxWidth: '100%' },
};
FeaturedFullWidth.parameters = {
    docs: {
        description: {
            story: 'Make the card fill the width by adding the `isFull` prop.',
        },
    },
};
