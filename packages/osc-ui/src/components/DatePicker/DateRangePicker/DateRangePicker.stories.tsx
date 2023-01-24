import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { DateRangePicker } from './DateRangePicker';
import { DateRangePickerContainer } from './DateRangerPickerContainer';

export default {
    title: 'osc-ui/DateRangePicker',
    component: DateRangePicker,
} as Meta;

const Template: Story = (args) => {
    return (
        // Passing the 118nProvider because locale was defaulting to en-US - This is
        // required to change the date order to dd-mm-YYYY rather than US mm-dd-YYYY
        <I18nProvider locale="en-GB">
            <DateRangePickerContainer presets={args.presets} {...args} />
        </I18nProvider>
    );
};

export const Primary = Template.bind({});
export const WithTimePresets = Template.bind({});

WithTimePresets.args = {
    presets: [
        {
            name: 'Today',
            length: 1,
        },
        {
            name: 'Yesterday',
            length: -1,
        },
        {
            name: 'Past 7 days',
            length: -7,
        },
        {
            name: 'Past 30 days',
            length: -30,
        },
        {
            name: 'Past 90 days',
            length: -90,
        },
        {
            name: 'Past Year',
            length: -365,
        },
    ],
};
