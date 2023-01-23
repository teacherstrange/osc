import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { DatePicker } from './DatePicker';
import { parseDate } from '@internationalized/date';

export default {
    title: 'osc-ui/DatePicker',
    component: DatePicker,
} as Meta;

const Template: Story = (args) => {
    let [date, setDate] = React.useState(parseDate('2020-02-03'));
    console.log('VALUE', date);

    return (
        // Passing the 118nProvider because locale was defaulting to en-US - This is
        // required to change the date order to dd-mm-YYYY rather than US mm-dd-YYYY
        <I18nProvider locale="en-GB">
            <DatePicker value={date} onChange={setDate} {...args} />
        </I18nProvider>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    label: 'Date',
};
