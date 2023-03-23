import { parseDate } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import type { DateValue } from '@react-types/calendar';
import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Calendar } from '../Calendar/Calendar';
import { CalendarCell, CalendarGrid } from '../Calendar/CalendarGridAndCell';
import { DatePicker } from './DatePicker';
import { datePickerSchema } from './mockSchema';

export default {
    title: 'osc-ui/DatePicker',
    component: DatePicker,
    parameters: {
        docs: {
            description: {
                component:
                    'Provides the behavior and accessibility implementation for a date picker component. A date picker combines a DateField and a Calendar popover to allow users to enter or select a date and time value.',
            },
        },
    },
    argTypes: {
        granularity: {
            description:
                "Determines the smallest unit that is displayed in the date picker - 'day' | 'hour' | 'minute' | 'second'",
            control: 'select',
            options: ['day', 'month', 'year'],
        },
        label: {
            description: 'The content to display as the label.',
        },
        maxValue: {
            description: 'The maximum allowed date that a user may select.',
            type: Object,
        },
        minValue: {
            description: 'The minimum allowed date that a user may select',
            type: Object,
        },
    },
    subcomponents: {
        Calendar,
        CalendarGrid,
        CalendarCell,
    },
} as Meta;

const Template: Story = ({ minValue, maxValue, ...args }) => {
    let [date, setDate] = useState<DateValue | undefined>(
        args.defaultValue ? parseDate(args.defaultValue) : null
    );

    return (
        // Passing the 118nProvider because locale was defaulting to en-US - This is
        // required to change the date order to dd-mm-YYYY rather than US mm-dd-YYYY
        <I18nProvider locale="en-GB">
            <DatePicker
                granularity={args.granularity}
                minValue={minValue && parseDate('2023-02-03')}
                maxValue={maxValue && parseDate('2024-04-03')}
                onChange={setDate}
                value={date}
                {...args}
            />
        </I18nProvider>
    );
};

const ValidationTemplate: Story = ({ minValue, maxValue, ...args }) => {
    const [errors, setErrors] = useState({
        date: ['Field is required'],
    });

    let [date, setDate] = useState<DateValue | undefined>(
        args.defaultValue ? parseDate(args.defaultValue) : null
    );

    return (
        // Passing the 118nProvider because locale was defaulting to en-US - This is
        // required to change the date order to dd-mm-YYYY rather than US mm-dd-YYYY
        <I18nProvider locale="en-GB">
            <DatePicker
                errors={errors.date}
                onChange={setDate}
                setErrors={setErrors}
                schema={datePickerSchema.date}
                value={date}
                {...args}
            />
        </I18nProvider>
    );
};

export const Primary = Template.bind({});
export const DefaultDate = Template.bind({});
export const MinAndMaxDates = Template.bind({});
export const Validation = ValidationTemplate.bind({});

Primary.args = {
    label: 'Date',
};
DefaultDate.args = {
    defaultValue: '2022-02-03',
    label: 'Date',
};
DefaultDate.parameters = {
    docs: {
        description: {
            story: 'A default date can be passed into the calendar.',
        },
    },
};
MinAndMaxDates.args = {
    label: 'Date',
    minValue: true,
    maxValue: true,
};
MinAndMaxDates.parameters = {
    docs: {
        description: {
            story: 'Min and max dates can be set which will limit what the user can select. Dates outside of this will trigger validation requirement.',
        },
    },
};
Validation.args = {
    label: 'Date',
};
Validation.parameters = {
    docs: {
        description: {
            story: 'Min and max dates can be set which will limit what the user can select. Dates outside of this will trigger validation requirement.',
        },
    },
};
