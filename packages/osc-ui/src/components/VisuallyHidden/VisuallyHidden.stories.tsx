import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './VisuallyHidden';
import { VisuallyHidden } from './VisuallyHidden';

export default {
    title: 'osc-ui/VisuallyHidden',
    component: VisuallyHidden,
    parameters: {
        docs: {
            description: {
                component:
                    'A component that renders its children visually hidden. This is useful for screen reader users to provide additional context to the content of a page.'
            }
        }
    },
    argTypes: {
        asChild: {
            description: 'Whether to render the component as the child of its parent',
            defaultValue: false,
            table: {
                defaultValue: {
                    summary: false
                }
            }
        },
        children: {
            description: 'The content of the component'
        },
        className: {
            description: 'Custom class'
        }
    }
} as Meta;

const Template: Story<Props> = ({ children, ...args }) => (
    <>
        <VisuallyHidden {...args}>
            <p>{children}</p>
        </VisuallyHidden>
        <p>Some of the text here is only visible to screen readers.</p>
    </>
);

export const Primary = Template.bind({});

Primary.args = {
    children: "I'm only visible to screen readers"
};

export const AsChild = Template.bind({});
AsChild.args = {
    ...Primary.args,
    asChild: true
};
AsChild.parameters = {
    docs: {
        description: {
            story: 'If you pass the `asChild` prop, the component will render as the child element.<br>In this case rather than rendering as a parent with a child it will render as just the child.'
        }
    }
};
