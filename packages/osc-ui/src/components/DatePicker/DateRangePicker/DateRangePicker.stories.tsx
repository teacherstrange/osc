import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { DateRangePicker } from './DateRangePicker';
import { parseDate } from '@internationalized/date';

export default {
    title: 'osc-ui/DateRangePicker',
    component: DateRangePicker,
} as Meta;

const Template: Story = (args) => {
    let [date, setDate] = useState(parseDate('2020-02-03'));

    return (
        // Passing the 118nProvider because locale was defaulting to en-US - This is
        // required to change the date order to dd-mm-YYYY rather than US mm-dd-YYYY
        <I18nProvider locale="en-GB">
            <DateRangePicker value={date} onChange={setDate} {...args} />
        </I18nProvider>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    // label: 'Date',
};
