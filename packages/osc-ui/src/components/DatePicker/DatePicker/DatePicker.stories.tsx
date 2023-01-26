import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { DatePicker } from './DatePicker';
import { parseDate } from '@internationalized/date';
import type { DateValue } from '@react-types/calendar';

export default {
    title: 'osc-ui/DatePicker',
    component: DatePicker,
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
                value={date}
                minValue={minValue && parseDate('2023-02-03')}
                maxValue={maxValue && parseDate('2023-02-20')}
                onChange={setDate}
                {...args}
            />
        </I18nProvider>
    );
};

export const Primary = Template.bind({});
export const DefaultDate = Template.bind({});
export const MinAndMaxDates = Template.bind({});

Primary.args = {
    label: 'Date',
};
DefaultDate.args = {
    defaultValue: '2022-02-03',
    label: 'Date',
};
MinAndMaxDates.args = {
    label: 'Date',
    minValue: true,
    maxValue: true,
};
