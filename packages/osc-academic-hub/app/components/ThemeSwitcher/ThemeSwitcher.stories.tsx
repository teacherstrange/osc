import type { Meta, Story } from '@storybook/react';
import type { Props } from './ThemeSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
    title: 'osc-academic-hub/ThemeSwitcher',
    component: ThemeSwitcher
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
