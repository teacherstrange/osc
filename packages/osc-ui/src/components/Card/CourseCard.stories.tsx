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
                <CardTitle>AAT Level 3 Diploma in Accounting</CardTitle>
                <CardTitle as="h3" subtitle isSmall className="u-color-primary">
                    Single course
                </CardTitle>
            </CardHeader>

            <CardBody>
                <h4>Course options available</h4>
                <ul>
                    <li>Course Material</li>
                    <li>Course Material + Exams</li>
                </ul>

                <Button isFull>Click me</Button>
            </CardBody>

            <CardFooter>
                <p>Offer ends midnight 30th November 2022.</p>
            </CardFooter>
        </CardInner>
    </Card>
);

export const Primary = Template.bind({});
Primary.args = {};
