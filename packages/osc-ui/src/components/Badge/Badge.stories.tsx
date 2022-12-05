import type { Meta, Story } from '@storybook/react';
import React from 'react';

import { Badge } from './Badge';

export default {
    title: 'osc-ui/Badge',
    component: Badge,
    parameters: {
        docs: {
            description: {
                component: "Badges are used to highlight an item's status for quick recognition."
            }
        }
    },
    argTypes: {
        badgeName: {
            description: 'Content of the badge'
        },
        className: {
            description: 'Custom class'
        },
        fontSize: {
            description: 'Sets the font size class'
        },
        items: {
            table: {
                disable: true
            }
        },
        theme: {
            description: 'Sets theme colour class',
            defaultValue: 'primary',
            table: {
                defaultValue: {
                    summary: 'primary'
                }
            }
        },
        variant: {
            description: 'Sets variant modifier class',
            control: {
                type: 'select'
            }
        }
    }
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
SubtleBadge.parameters = {
    docs: {
        description: {
            story: 'The subtle badge variant. Add the `variant="subtle"` prop.'
        },
        source: {
            code: '<Badge badgeName="Badge" theme="primary" variant="subtle"/>',
            language: 'ts',
            type: 'auto'
        }
    }
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
SolidBadge.parameters = {
    docs: {
        description: {
            story: 'The solid badge variant. Add the `variant="solid"` prop.'
        },
        source: {
            code: '<Badge badgeName="Badge" theme="primary" variant="solid"/>',
            language: 'ts',
            type: 'auto'
        }
    }
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
OutlineBadge.parameters = {
    docs: {
        description: {
            story: 'The outline badge variant. Add the `variant="outline"` prop.'
        },
        source: {
            code: '<Badge badgeName="Badge" theme="primary" variant="outline"/>',
            language: 'ts',
            type: 'auto'
        }
    }
};
