import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { DateRangePicker } from './DateRangePicker';
import { DateRangePickerContainer } from './DateRangerPickerContainer';
import { parseDate } from '@internationalized/date';

export default {
    title: 'osc-ui/DateRangePicker',
    component: DateRangePicker,
} as Meta;

const todaysDate = new Date().toISOString().split('T')[0];
const dates = {
    nextWeek: parseDate(todaysDate).add({ weeks: 1 }),
    lastWeek: parseDate(todaysDate).subtract({ weeks: 1 }),
    threeWeeksAgo: parseDate(todaysDate).subtract({ weeks: 3 }),
};

const Template: Story = (args) => {
    return (
        // Passing the 118nProvider because locale was defaulting to en-US - This is
        // required to change the date order to dd-mm-YYYY rather than US mm-dd-YYYY
        <I18nProvider locale="en-GB">
            <DateRangePickerContainer
                defaultValue={
                    args.defaultValue
                        ? { start: parseDate(todaysDate), end: dates['nextWeek'] }
                        : null
                }
                presets={args.presets}
                minValue={dates[args.minValue]}
                maxValue={dates[args.maxValue]}
            />
        </I18nProvider>
    );
};

export const Primary = Template.bind({});
export const WithTimePresets = Template.bind({});
export const DefaultValue = Template.bind({});
export const MinAndMax = Template.bind({});
export const Validation = Template.bind({});

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

DefaultValue.args = {
    defaultValue: true,
};
MinAndMax.args = {
    defaultValue: true,
    minValue: 'lastWeek',
    maxValue: 'nextWeek',
};
Validation.args = {
    defaultValue: true,
    minValue: 'threeWeeksAgo',
    maxValue: 'lastWeek',
};
