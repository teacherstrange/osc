import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
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
        variant: {
            control: {
                type: 'select',
            },
        },
    },
} as Meta;

const Template: Story<ButtonProps> = ({ children, ...args }) => (
    <Button {...args}>{children}</Button>
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
            <EnvelopeClosedIcon aria-hidden="true" />
        </Button>

        <Button {...args}>
            <VisuallyHidden>Search</VisuallyHidden>
            <EnvelopeClosedIcon aria-hidden="true" />
        </Button>
    </ButtonGroup>
);

const CopyTemplate: Story<CopyButtonProps> = ({ children, ...args }) => (
    <CopyButton {...args}>{children}</CopyButton>
);

export const Primary = Template.bind({});
Primary.args = {
    children: 'Button',
    variant: 'primary',
};
export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Button',
    variant: 'secondary',
};
export const Tertiary = Template.bind({});
Tertiary.args = {
    children: 'Button',
    variant: 'tertiary',
};
export const Quaternary = Template.bind({});
Quaternary.args = {
    children: 'Button',
    variant: 'quaternary',
};
export const Quinary = Template.bind({});
Quinary.args = {
    children: 'Button',
    variant: 'quinary',
};
export const PrimaryGradient = Template.bind({});
PrimaryGradient.args = {
    children: 'Button',
    variant: 'primary-gradient',
};
export const SecondaryGradient = Template.bind({});
SecondaryGradient.args = {
    children: 'Button',
    variant: 'secondary-gradient',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
    children: 'Button',
    variant: 'primary',
    isFull: true,
};
FullWidth.parameters = {
    docs: {
        description: {
            story: 'To set a button to fill the width of the container, add the `is-full` className.',
        },
    },
};

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
