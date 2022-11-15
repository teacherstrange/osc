import { PlusIcon } from '@radix-ui/react-icons';
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Tag } from './Tag';

export default {
    title: 'osc-ui/Tag',
    component: Tag
} as Meta;

const TagTemplate: Story = ({ items }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {items.map((item, i) => (
                <div key={i} style={{ margin: '1em' }}>
                    <Tag {...item} />
                </div>
            ))}
        </div>
    );
};

export const Primary = TagTemplate.bind({});
export const WithLeftIcon = TagTemplate.bind({});
export const WithRightIcon = TagTemplate.bind({});
export const WithCustomElement = TagTemplate.bind({});

Primary.args = {
    items: [{ tagName: 'Tag', theme: 'primary' }]
};
WithLeftIcon.args = {
    items: [
        {
            icon: <PlusIcon />,
            iconLabel: 'Add',
            iconPosition: 'left',
            tagName: 'Tag with Left Icon',
            theme: 'primary'
        }
    ]
};
WithRightIcon.args = {
    items: [
        {
            icon: <PlusIcon />,
            iconLabel: 'Add',
            iconPosition: 'right',
            tagName: 'Tag with Right Icon',
            theme: 'primary'
        }
    ]
};

WithCustomElement.args = {
    items: [
        {
            className: 'u-p-15',
            tagName: 'Tag with Custom Element',
            iconPosition: 'left',
            customElement: <Avatar src="https://bit.ly/sage-adebayo" name="Segun Adebayo" />,
            theme: 'primary'
        }
    ]
};
