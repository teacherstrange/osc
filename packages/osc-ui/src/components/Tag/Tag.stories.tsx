import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';

import { Tag } from './Tag';

export default {
    title: 'Tag',
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
    items: [{ tagName: 'Tag', theme: { backgroundColor: 'primary', color: 'secondary' } }]
};
WithLeftIcon.args = {
    items: [
        {
            icon: SmallAddIcon,
            iconPosition: 'left',
            tagName: 'Tag with Left Icon',
            theme: { backgroundColor: 'primary', color: 'secondary' }
        }
    ]
};
WithRightIcon.args = {
    items: [
        {
            icon: SmallAddIcon,
            iconPosition: 'right',
            tagName: 'Tag with Right Icon',
            theme: { backgroundColor: 'primary', color: 'secondary' }
        }
    ]
};

WithCustomElement.args = {
    items: [
        {
            className: 'u-p-15',
            tagName: 'Tag with Custom Element',
            iconPosition: 'left',
            customElement: <ChakraAvatar src="https://bit.ly/sage-adebayo" name="Segun Adebayo" />,
            theme: { backgroundColor: 'primary', color: 'secondary' }
        }
    ]
};
