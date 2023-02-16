import { parseDate } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { CalendarCell, CalendarGrid } from '../Calendar/CalendarGridAndCell';
import { RangeCalendar, RangeCalendarContainer } from '../RangeCalendar/RangeCalendar';
import { DateRangePicker, DateRangePickerContainer } from './DateRangePicker';

export default {
    title: 'osc-ui/DateRangePicker',
    component: DateRangePickerContainer,
    parameters: {
        docs: {
            description: {
                component:
                    'Provides the behavior and accessibility implementation for a date picker component. A date range picker combines two DateFields and a RangeCalendar popover to allow users to enter or select a date and time range.',
            },
        },
    },
    argTypes: {
        presets: {
            description: 'Preset time periods a user can select',
        },
    },
    subcomponents: {
        DateRangePicker,
        RangeCalendarContainer,
        RangeCalendar,
        CalendarGrid,
        CalendarCell,
    },
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
                label={args.label}
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

Primary.args = {
    label: 'Date Range',
};

WithTimePresets.args = {
    label: 'Date Range',
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
WithTimePresets.parameters = {
    docs: {
        description: {
            story: 'Allows users the option to select from a range of time presets',
        },
    },
};

DefaultValue.args = {
    defaultValue: true,
    label: 'Date Range',
};
DefaultValue.parameters = {
    docs: {
        description: {
            story: 'A default date range that can be passed into the calendar.',
        },
    },
};

MinAndMax.args = {
    defaultValue: true,
    label: 'Date Range',
    minValue: 'lastWeek',
    maxValue: 'nextWeek',
};
MinAndMax.parameters = {
    docs: {
        description: {
            story: 'Min and max dates can be set which will limit what the user can select. Dates outside of this will trigger validation requirement.',
        },
    },
};
Validation.args = {
    defaultValue: true,
    label: 'Date Range',
    minValue: 'threeWeeksAgo',
    maxValue: 'lastWeek',
};
Validation.parameters = {
    docs: {
        description: {
            story: 'Validation styling when selected date range is invalid',
        },
    },
};
