import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import type { CardProps } from './Card';
import { Card, CardBody, CardFooter, CardHeader, CardImage, CardInner, CardTitle } from './Card';

export default {
    title: 'osc-ui/Cards/Course Card',
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

export const Primary = Template.bind({});
Primary.args = {};
