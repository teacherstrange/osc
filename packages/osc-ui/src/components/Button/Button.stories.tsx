import { EnvelopeClosedIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { ButtonProps, CopyButtonProps } from './Button';
import { Button, ButtonGroup, CopyButton } from './Button';

export default {
    title: 'osc-ui/Button',
    component: Button,
    subcomponents: { ButtonGroup, CopyButton },
    parameters: {
        docs: {
            description: {
                component:
                    'Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation.',
            },
        },
    },
    argTypes: {
        children: {
            control: false,
        },
        as: {
            control: {
                type: 'select',
            },
        },
        size: {
            control: {
                type: 'select',
            },
        },
        target: {
            table: {
                type: {
                    summary: 'string',
                },
            },
            control: 'text',
        },
        to: {
            control: 'text',
        },
        type: {
            control: {
                type: 'select',
            },
        },
    },
} as Meta;

const Template: Story<ButtonProps> = ({ children, ...args }) => (
    <Button {...args}>{children}</Button>
);
const VariationsTemplate: Story<ButtonProps> = ({ children, ...args }) => (
    <ButtonGroup>
        <Button {...args} variant="primary">
            Primary
        </Button>
        <Button {...args} variant="secondary">
            Secondary
        </Button>
        <Button {...args} variant="tertiary">
            Tertiary
        </Button>
        <Button {...args} variant="quaternary">
            Quaternary
        </Button>
        <Button {...args} variant="quinary">
            Quinary
        </Button>
        <Button {...args} variant="septenary">
            Septenary
        </Button>
        <Button {...args} variant="octonary">
            Octonary
        </Button>
    </ButtonGroup>
);
const DisabledLoadingTemplate: Story<ButtonProps> = ({ children, ...args }) => (
    <ButtonGroup>
        <Button {...args} isDisabled>
            {children}
        </Button>
        <Button {...args} isLoading>
            {children}
        </Button>
    </ButtonGroup>
);
const IconsTemplate: Story<ButtonProps> = ({ children, ...args }) => (
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
const CopyTemplate: Story<CopyButtonProps> = ({ children, ...args }) => (
    <CopyButton {...args}>{children}</CopyButton>
);

export const Primary = Template.bind({});
Primary.args = {
    children: 'Special offers',
};

export const Variations = VariationsTemplate.bind({});
Variations.args = {};

export const DisabledAndLoading = DisabledLoadingTemplate.bind({});
DisabledAndLoading.args = {
    ...Primary.args,
};

export const IncludesIcon = IconsTemplate.bind({});
IncludesIcon.parameters = {
    docs: {
        description: {
            story: 'Add an icon as a child to include within the button.<br>If you wrap the text in a `<VisuallyHidden>` component you can make an accessible icon only button.',
        },
    },
};

export const Anchor = Template.bind({});
Anchor.args = {
    ...Primary.args,
    children: 'External link',
    as: 'a',
    href: 'https://example.com',
    target: '_blank',
};
Anchor.parameters = {
    docs: {
        description: {
            story: 'Using `as="a"` transforms our button into an `<a>` tag, which means it can take any anchor element attributes such as `target="_blank"`.<br>Note: when using `target="_blank"` `rel="noopener noreferrer"` is automatically added for security purposes.',
        },
    },
};

export const Link = Template.bind({});
Link.args = {
    ...Primary.args,
    children: 'Internal link',
    as: 'link',
    to: '/test-page',
};
Link.parameters = {
    docs: {
        description: {
            story: 'Using `as="link"` transforms our button into a `<Link>` component from Remix, which allows us to pass a url path to the `to` attribute.',
        },
    },
};

export const CopyToClipboard = CopyTemplate.bind({});
CopyToClipboard.args = {
    ...Primary.args,
    children: 'Copy to clipboard',
    textToCopy: 'Copied text',
};
CopyToClipboard.parameters = {
    docs: {
        description: {
            story: 'The CopyButton is an extension of the `<Button>` component, which adds a copy to clipboard functionality.<br>The `textToCopy` prop is sets the text that will be copied to the clipboard when the button is clicked.',
        },
    },
};
