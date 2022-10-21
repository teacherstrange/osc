import type { Meta, Story } from '@storybook/react';
import React from 'react';

import { Badge } from './Badge';

export default {
    title: 'Badge',
    component: Badge
} as Meta;

const BadgeTemplate: Story = ({ items }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {items.map((item, i) => (
                <div key={i} style={{ margin: '1em' }}>
                    <Badge {...item} />
                </div>
            ))}
        </div>
    );
};

export const Primary = BadgeTemplate.bind({});
export const SubtleBadge = BadgeTemplate.bind({});
export const SolidBadge = BadgeTemplate.bind({});
export const OutlineBadge = BadgeTemplate.bind({});

Primary.args = {
    items: [{ badgeName: 'Badge', color: 'blue', variant: 'subtle' }]
};

SubtleBadge.args = {
    items: [
        {
            ...Primary.args.items[0],
            color: 'red'
        },
        {
            ...Primary.args.items[0],
            color: 'blue'
        },
        {
            ...Primary.args.items[0],
            color: 'green'
        }
    ]
};
SolidBadge.args = {
    items: [
        {
            ...Primary.args.items[0],
            color: 'red',
            variant: 'solid'
        },
        {
            ...Primary.args.items[0],
            color: 'blue',
            variant: 'solid'
        },
        {
            ...Primary.args.items[0],
            color: 'green',
            variant: 'solid'
        }
    ]
};
OutlineBadge.args = {
    items: [
        {
            ...Primary.args.items[0],
            color: 'red',
            variant: 'outline'
        },
        {
            ...Primary.args.items[0],
            color: 'blue',
            variant: 'outline'
        },
        {
            ...Primary.args.items[0],
            color: 'green',
            variant: 'outline'
        }
    ]
};
