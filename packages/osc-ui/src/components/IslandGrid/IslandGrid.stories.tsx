import type { Meta, Story } from '@storybook/react';
import React from 'react';
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
            <div
                style={{
                    height: '638px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '310px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '310px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
        </IslandGrid>
    </div>
);

const TemplateWithFour: Story<IslandGridProps> = ({ ...args }) => (
    <div className="o-container">
        <IslandGrid {...args}>
            <div
                style={{
                    height: '665px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '200px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '200px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '200px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
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
