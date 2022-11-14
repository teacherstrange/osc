import type { Meta, Story } from '@storybook/react';
import React from 'react';

import { Badge } from './Badge';

export default {
    title: 'osc-ui/Badge',
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
    items: [{ badgeName: 'Badge', variant: 'subtle' }]
};

SubtleBadge.args = {
    items: [
        {
            ...Primary.args.items[0],
            theme: 'primary'
        },
        {
            ...Primary.args.items[0],
            theme: 'secondary'
        },
        {
            ...Primary.args.items[0],
            theme: 'tertiary'
        }
    ]
};
SolidBadge.args = {
    items: [
        {
            ...Primary.args.items[0],
            theme: 'primary'
        },
        {
            ...Primary.args.items[0],
            theme: 'secondary'
        },
        {
            ...Primary.args.items[0],
            theme: 'tertiary'
        }
    ]
};
OutlineBadge.args = {
    items: [
        {
            ...Primary.args.items[0],
            theme: 'primary',
            variant: 'outline'
        },
        {
            ...Primary.args.items[0],
            theme: 'secondary',
            variant: 'outline'
        },
        {
            ...Primary.args.items[0],
            theme: 'tertiary',
            variant: 'outline'
        }
    ]
};
