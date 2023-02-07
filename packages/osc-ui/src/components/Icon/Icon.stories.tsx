import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { IconProps } from './Icon';
import { AccessibleIcon, Icon, SpritesheetProvider } from './Icon';

// Can't use fs in a browser, so we have to manually list the icons 😭
const icons: string[] = [
    'arrow',
    'assessment',
    'bag',
    'bell',
    'bookmark',
    'calendar',
    'check',
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'chevron-up',
    'clipboard',
    'clock',
    'close',
    'content',
    'dashboard',
    'discussion',
    'document',
    'envelope',
    'folder',
    'gear',
    'graduation-cap',
    'grid',
    'heart',
    'list',
    'minus',
    'paper-plane',
    'payments',
    'phone',
    'plus',
    'search',
    'star',
    'tasks',
    'tick-box',
    'user',
    'users',
];

export default {
    title: 'osc-ui/Icons',
    component: Icon,
    subcomponents: { AccessibleIcon, SpritesheetProvider },
    parameters: {
        docs: {
            description: {
                component:
                    'Icons are used to represent actions, objects, and concepts. They are used to communicate information and help users navigate the interface.<br>Icons can appear small in navy or white or as a featured icon in a gradient that matches with the page colours.<br>Must be wrapped in the `<SpritesheetProvider>` to work.',
            },
        },
    },
    argTypes: {
        id: {
            control: {
                type: 'select',
                options: icons,
            },
        },
    },
} as Meta;

const Template: Story<IconProps> = ({ ...args }) => <Icon {...args} />;

const AllIconsTemplate: Story<IconProps> = ({ ...args }) => {
    return (
        <div
            style={{
                display: 'grid',
                gap: '1.5rem',
                gridTemplateColumns: 'repeat(6, max-content)',
                justifyItems: 'center',
            }}
        >
            {icons.map((icon) => (
                <div
                    key={icon}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <Icon id={icon} {...args} />
                    <p>{icon}</p>
                </div>
            ))}
        </div>
    );
};

const AccessibleIconTemplate: Story<IconProps> = ({ ...args }) => (
    <AccessibleIcon label="Phone us">
        <Icon id="phone" />
    </AccessibleIcon>
);

export const Primary = Template.bind({});
Primary.args = {
    id: 'arrow',
};

export const AllIcons = AllIconsTemplate.bind({});
AllIcons.args = {};

export const IconAccessibility = AccessibleIconTemplate.bind({});
IconAccessibility.args = {};
IconAccessibility.parameters = {
    docs: {
        description: {
            story: 'There may be times when you want to make your icon more accessible. For example, if you have an icon that is used as a link to a phone number, you may want to add an accessible label. You can do this by wrapping the icon in the `AccessibleIcon` component. This will quickly make any icon accessible by wrapping it and providing a meaningful label. There is no visual difference, but announced correctly by screen readers.',
        },
    },
};
