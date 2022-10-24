import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './FormToggle';
import { FormToggle } from './FormToggle';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default {
    title: 'FormToggle',
    component: FormToggle
} as Meta;

const Template: Story<Props> = (args) => {
    return (
        <FormToggle
            leftIcon={<MoonIcon color={'secondary'} margin={2} />}
            rightIcon={<SunIcon color={'secondary'} margin={2} />}
            {...args}
        />
    );
};

export const Primary = Template.bind({});

Primary.args = {
    onToggle: () => {}
};
