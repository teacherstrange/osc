import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { Calendar } from './Calendar';

export default {
    title: 'osc-ui/Calendar',
    component: Calendar,
} as Meta;

const Template: Story = (args) => {
    return (
        // Passing the 118nProvider because locale was defaulting to en-US - This is
        // required to change the date order to dd-mm-YYYY rather than US mm-dd-YYYY
        <I18nProvider locale="en-GB">
            <Calendar granularity="second" {...args} />
        </I18nProvider>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    label: 'Date',
};
