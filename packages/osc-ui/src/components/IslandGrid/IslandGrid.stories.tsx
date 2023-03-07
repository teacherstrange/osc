import { VisuallyHidden } from '@react-aria/visually-hidden';
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { truncate } from '../../utils/truncate';
import { Button } from '../Button/Button';
import {
    BlogCard,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardTitle,
    CollectionCard,
} from '../Card/Card';
import { collectionCardData, collectionCardDataHzntl, postCardData } from '../Card/cardData';
import { Image } from '../Image/Image';
import type { IslandGridProps } from './IslandGrid';
import { IslandGrid } from './IslandGrid';

export default {
    title: 'osc-ui/IslandGrid',
    component: IslandGrid,
    parameters: {
        docs: {
            description: {
                component:
                    'A specific layout grid component for displaying items in a two column layout, with one item on the left and two to three on the right.',
            },
        },
    },
} as Meta;

const Template: Story<IslandGridProps> = ({ ...args }) => (
    <div className="o-container">
        <IslandGrid {...args}>
            <CollectionCard size="lg">
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
            <CollectionCard size="md">
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
            <CollectionCard size="md">
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
        </IslandGrid>
    </div>
);

const TemplateWithFour: Story<IslandGridProps> = ({ ...args }) => (
    <div className="o-container">
        <IslandGrid {...args}>
            <BlogCard>
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
                        <Button variant="secondary">
                            Read more
                            <VisuallyHidden>about {postCardData.title}</VisuallyHidden>
                        </Button>
                    </CardFooter>
                </CardInner>
            </BlogCard>
            <BlogCard variant="media-object">
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
            <BlogCard variant="media-object">
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
            <BlogCard variant="media-object">
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
        </IslandGrid>
    </div>
);

export const Primary = Template.bind({});
Primary.args = {};
export const HasFourChildren = TemplateWithFour.bind({});
TemplateWithFour.args = {};
TemplateWithFour.parameters = {
    docs: {
        description: {
            story: 'To bring the grid up to having three items on the right, add four children.',
        },
    },
};
