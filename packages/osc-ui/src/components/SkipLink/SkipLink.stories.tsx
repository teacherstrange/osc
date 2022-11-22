import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './SkipLink';
import { SkipLink } from './SkipLink';

export default {
    title: 'osc-ui/SkipLink',
    component: SkipLink,
    parameters: {
        docs: {
            description: {
                component:
                    'A skip link provides a way for keyboard and screen reader users to skip to the main content of a page.'
            }
        }
    },
    argTypes: {
        anchor: {
            description: 'The ID of the element to skip to'
        },
        children: {
            description: 'The content of the skip link'
        },
        className: {
            description: 'Custom class'
        }
    }
} as Meta;

const Template: Story<Props> = ({ children, ...args }) => (
    <>
        <SkipLink {...args}>{children}</SkipLink>
        <div id="main-content" style={{ paddingBlock: '2rem' }} tabIndex={-1}>
            <p>
                Click above this text and press <kbd>tab</kbd>.
            </p>
            <p>
                Then pressing <kbd>enter</kbd> will focus this text. (Note: that if you are in the
                main storybook view this might open a new window instead)
            </p>
        </div>
    </>
);

export const Primary = Template.bind({});

Primary.args = {
    anchor: 'main-content',
    children: 'Skip to main content'
};

Primary.parameters = {
    docs: {
        source: {
            code: '<SkipLink anchor="main-content">Skip to main content</SkipLink>'
        }
    }
};
