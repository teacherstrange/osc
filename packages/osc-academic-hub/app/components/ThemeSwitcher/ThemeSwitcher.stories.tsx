import type { Meta, Story } from '@storybook/react';
import type { Props } from './ThemeSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
    title: 'osc-academic-hub/ThemeSwitcher',
    component: ThemeSwitcher,
    parameters: {
        docs: {
            description: {
                component: 'Controlled theme switcher for toggling between light and dark theme'
            }
        }
    },
    argTypes: {
        label: {
            description: 'Visually hidden label describing the input'
        },
        isChecked: {
            description: 'Control that handles toggling the switch'
        },
        onToggle: {
            description: 'Event handler that runs when the `isChecked` prop is changed'
        }
    }
} as Meta;

const Template: Story<Props> = (args) => {
    return <ThemeSwitcher {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
    label: 'Toggle colour scheme',
    isChecked: false,
    onToggle: () => {}
};
