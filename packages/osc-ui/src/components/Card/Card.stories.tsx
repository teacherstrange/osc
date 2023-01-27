import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button, CopyButton } from '../Button/Button';
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
                component: 'Cards can be used to group related subjects in a container.',
            },
        },
    },
} as Meta;

const Template: Story<CardProps> = ({ ...args }) => (
    <Card {...args} style={{ maxWidth: '400px' }}>
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
                <CardTitle as="h3" subtitle>
                    Subtitle
                </CardTitle>
            </CardHeader>

            <CardBody>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra duis vehicula
                    justo, sagittis quam nam nisi.
                </p>

                <Button isFull>Button</Button>
            </CardBody>

            <CardFooter>
                <p>Lorem ipsum dolor sit amet.</p>
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
                <CardTitle as="h3" subtitle>
                    {bioCardData.role}
                </CardTitle>
            </CardHeader>

            <CardBody>
                <Content value={bioCardData.bio} />
            </CardBody>
        </CardInner>
    </Card>
);

const HasCustomHeadingTextTemplate: Story<CardProps> = ({ ...args }) => (
    <Card {...args}>
        <CardImage>
            <Image
                src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1674742617/Frame_796_kz2zqr.png"
                alt="A Levels or GCSEs £150 off on three or more"
                width={400}
                height={250}
            />
        </CardImage>
        <CardInner>
            <CardHeader>
                <CardTitle isSmall className="u-color-primary">
                    Enter code ALEVELGCSE to save.
                </CardTitle>
            </CardHeader>

            <CardBody>
                <p>
                    Study three or more A levels or GCSEs to save and start working towards a
                    brighter future.
                </p>

                <CopyButton isFull textToCopy="ALEVELGCSE">
                    Copy code
                </CopyButton>
            </CardBody>

            <CardFooter>
                <p>Offer ends midnight 30th November 2022.</p>
            </CardFooter>
        </CardInner>
    </Card>
);

export const Primary = Template.bind({});
Primary.args = {
    style: { maxWidth: '400px' },
};

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

export const HasCustomHeadingText = HasCustomHeadingTextTemplate.bind({});
HasCustomHeadingText.args = {
    ...Primary.args,
};
HasCustomHeadingText.parameters = {
    docs: {
        description: {
            story: 'You can change the size and style of the heading text by adding the `isSmall` prop to the `<CardTitle>`.<br>To change the color add one of the `u-color-<color>` utility classes such as `u-color-primary`.',
        },
    },
};
