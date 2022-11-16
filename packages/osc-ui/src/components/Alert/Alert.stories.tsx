import type { Meta, Story } from '@storybook/react';
import React from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from './Alert';

export default {
    title: 'osc-ui/Alert',
    component: Alert,
    parameters: {
        docs: {
            description: {
                component:
                    'Alert component to communicate a state that affects a system, feature or page.'
            }
        }
    },
    argTypes: {
        children: {
            table: {
                disable: true
            }
        },
        className: {
            description: 'Custom class'
        },
        displayIcon: {
            description: 'Controls whether Icon is displayed or not'
        },
        iconSize: {
            description: 'Controls size of Icon'
        },
        status: {
            description: 'Sets the type of status to display'
        }
    }
} as Meta;

const AlertTemplateOne: Story = ({ items }) => {
    return (
        <div>
            {items.map((item, i) => (
                <div key={i} style={{ margin: '1em', width: '30%' }}>
                    <Alert {...item}>
                        <AlertTitle>{item.title}</AlertTitle>
                    </Alert>
                </div>
            ))}
        </div>
    );
};

const AlertTemplateTwo: Story = (args) => {
    const { customElement, description, status, title } = args;

    return (
        <div>
            <div style={{ margin: '1em', width: '50%' }}>
                <Alert status={status}>
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>{description}</AlertDescription>
                    {customElement}
                </Alert>
            </div>
        </div>
    );
};
const AlertTemplateThree: Story = (args) => {
    const { customElement, displayIcon, status, title } = args;

    return (
        <div>
            <div style={{ margin: '1em', width: '30%' }}>
                <Alert displayIcon={displayIcon} status={status}>
                    <AlertTitle>{title}</AlertTitle>
                    {customElement}
                </Alert>
            </div>
        </div>
    );
};

export const Primary = AlertTemplateOne.bind({});
export const WithDescription = AlertTemplateTwo.bind({});
export const NoIcons = AlertTemplateThree.bind({});
export const CloseButton = AlertTemplateThree.bind({});

Primary.args = {
    items: [
        {
            title: 'This is an information alert!',
            status: 'info'
        },
        {
            title: 'This is a warning alert!',
            status: 'warning'
        },
        {
            title: 'This is a success alert!',
            status: 'success'
        },
        {
            title: 'This is an error alert!',
            status: 'error'
        }
    ]
};

WithDescription.args = {
    status: 'error',
    title: 'Your browser is outdated!',
    description: 'Chakra experience may be degraded'
};

NoIcons.args = {
    displayIcon: false,
    status: 'info',
    title: 'OSC is going live on August 30th. Get ready!'
};
CloseButton.args = {
    status: 'warning',
    title: 'Your account is about expire, upgrade now',
    customElement: <Cross2Icon width="18" height="18" className="c-alert__button--right" />
};
