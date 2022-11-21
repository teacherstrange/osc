import { EnvelopeClosedIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Button';
import { Button, ButtonGroup } from './Button';

export default {
    title: 'osc-ui/Button',
    component: Button,
    subcomponents: { ButtonGroup },
    parameters: {
        docs: {
            description: {
                component:
                    'Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation.'
            }
        }
    },
    argTypes: {
        children: {
            table: {
                disable: true
            }
        },
        action: {
            description:
                'Sets the button action, if its set to `link` then it will change the button to an `a` tag',
            control: 'select'
        },
        className: {
            description: 'Custom class'
        },
        href: {
            description:
                'Sets the url the button links to, used in conjunction with `action="link"`'
        },
        isDisabled: {
            description: 'Sets the disabled state of the button and whether it is usable'
        },
        isLoading: {
            description: 'Sets the loading state of the button and whether it is usable'
        },
        loadingText: {
            description: 'Sets the loading text of the button, used in conjunction with `isLoading`'
        },
        size: {
            description: 'Sets the size of the button',
            control: 'select'
        },
        textToCopy: {
            description: 'Sets the text that gets copied, used in conjunction with `action="copy"`'
        },
        to: {
            description:
                'Sets the url the button links to when using Remix `Link`, used in conjunction with `action="link"`'
        },
        type: {
            description: 'Sets the type of button',
            control: 'select'
        },
        variant: {
            description: 'Sets the style of the button, solid, outline etc.',
            control: 'select'
        }
    }
} as Meta;

const Template: Story<Props> = ({ children, ...args }) => <Button {...args}>{children}</Button>;
const IconsTemplate: Story<Props> = ({ children, ...args }) => (
    <ButtonGroup direction="column">
        <Button {...args}>
            <EnvelopeClosedIcon aria-hidden="true" />
            Email us
        </Button>

        <Button {...args}>
            Search
            <MagnifyingGlassIcon aria-hidden="true" />
        </Button>

        <Button {...args}>
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon aria-hidden="true" />
        </Button>
    </ButtonGroup>
);

export const Primary = Template.bind({});
Primary.args = {
    children: 'Button',
    variant: 'solid'
};

export const IncludesIcon = IconsTemplate.bind({});
IncludesIcon.parameters = {
    docs: {
        description: {
            story: 'Add an icon as a child to include within the button.<br>If you wrap the text in a `<span className="sr-only">` you can make an accessible icon only button.'
        }
    }
};

export const Anchor = Template.bind({});
Anchor.args = {
    ...Primary.args,
    children: 'External link',
    action: 'anchor',
    href: 'https://example.com',
    target: '_blank'
};
Anchor.parameters = {
    docs: {
        description: {
            story: 'Using `action="anchor"` transforms our button into an `a` tag, which means it can take any anchor element attributes such as `target="_blank"`.'
        }
    }
};

export const Link = Template.bind({});
Link.args = {
    ...Primary.args,
    children: 'Internal link',
    action: 'link',
    to: '/'
};
Link.parameters = {
    docs: {
        description: {
            story: 'Using `action="link"` transforms our button into a `Link` component from Remix, which allows us to pass a url path to the `to` attribute.'
        }
    }
};

export const CopyToClipboard = Template.bind({});
CopyToClipboard.args = {
    ...Primary.args,
    children: 'Copy to clipboard',
    action: 'copy',
    textToCopy: 'Copy me!'
};
CopyToClipboard.parameters = {
    docs: {
        description: {
            story: 'Using `action="copy"` adds an `eventhandler` to our button. Allowing us to add the `textToCopy` content to the clipboard when the button is pressed.'
        }
    }
};
