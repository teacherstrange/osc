import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props as ContentProps } from './Content';
import { Content } from './Content';
import { textContent, textContentHasButtons } from './textContent';

export default {
    title: 'osc-ui/Content',
    component: Content,
    parameters: {
        docs: {
            description: {
                component:
                    'The Content component is used to display content in a page, it can be used to display text, images, videos, and more.<br>This component is built around the content that is exported from our Sanity studio.'
            }
        }
    },
    argTypes: {
        value: {
            table: {
                disable: true
            }
        },
        buttons: {
            table: {
                disable: true
            }
        },
        align: {
            description: 'Sets the alignment of the content',
            control: 'select'
        },
        backgroundColor: {
            description: 'Sets the background colour of the content'
        },
        className: {
            description: 'Custom class'
        },
        marginBottom: {
            description: 'Sets the bottom margin of the content',
            control: 'select'
        },
        paddingBottom: {
            description: 'Sets the bottom padding of the content',
            control: 'select'
        },
        paddingTop: {
            description: 'Sets the top padding of the content',
            control: 'select'
        },
        textColor: {
            description: 'Sets the text colour of the content'
        }
    }
} as Meta;

const Template: Story<ContentProps> = (args) => <Content {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    value: textContent.body
};

export const HasButtons = Template.bind({});
HasButtons.args = {
    value: textContentHasButtons.body,
    buttons: textContentHasButtons.buttons
};
HasButtons.parameters = {
    docs: {
        description: {
            story: 'If the buttons prop is passed in, it will render the buttons, contained in a `<ButtonGroup>` at the bottom of the content.'
        }
    }
};
