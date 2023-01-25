import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { DateField } from './DateField';
import { getLocalTimeZone, today, parseDate } from '@internationalized/date';

export default {
    title: 'osc-ui/DateField',
    component: DateField,
    argTypes: {
        defaultValue: {
            description: 'Sets the default value for the date field',
        },
        minValue: {
            description: 'Minimum value that can be provided',
        },
        maxValue: {
            description: 'Maximum value that can be provided',
        },
        placeholder: {
            description:
                'Controls the default values of each segment when the user first interacts with them, e.g. using the up and down arrow keys. ',
        },
    },
} as Meta;

const Template: Story = (args) => {
    let todaysDate = new Date().toISOString().split('T')[0];
    let nextWeek = parseDate(todaysDate).add({ weeks: 1 });

    return (
        // Passing the 118nProvider because locale was defaulting to en-US - This is
        // required to change the date order to dd-mm-YYYY rather than US mm-dd-YYYY
        <I18nProvider locale="en-GB">
            <DateField
                defaultValue={args.defaultValue ? parseDate('2022-01-02') : null}
                minValue={args.minValue && parseDate(todaysDate)}
                maxValue={args.maxValue ? nextWeek : null}
                placeholderValue={args.placeholder ? today(getLocalTimeZone()) : null}
                label={args.date}
            />
        </I18nProvider>
    );
};

export const Primary = Template.bind({});
export const MinAndMax = Template.bind({});
export const DefaultValue = Template.bind({});
export const Placeholder = Template.bind({});
export const Validation = Template.bind({});

Primary.args = {
    label: 'Date',
};
MinAndMax.args = {
    label: 'Date',
    minValue: true,
    maxValue: true,
};
DefaultValue.args = {
    defaultValue: true,
};
Validation.args = {
    defaultValue: true,
    minValue: true,
};
Placeholder.args = {
    placeholder: true,
};
