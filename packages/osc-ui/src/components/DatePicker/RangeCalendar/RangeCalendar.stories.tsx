import { getLocalTimeZone, today } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { RangeCalendar } from './RangeCalendar';
import { RangeCalendarContainer } from './RangeCalendarContainer';

export default {
    title: 'osc-ui/RangeCalendar',
    component: RangeCalendar,
} as Meta;

const Template: Story = (args) => {
    let [value, setValue] = useState(null);
    let [focusedDate, setFocusedDate] = useState(today(getLocalTimeZone()));

    return (
        // Passing the 118nProvider because locale was defaulting to en-US - This is
        // required to change the date order to dd-mm-YYYY rather than US mm-dd-YYYY
        <I18nProvider locale="en-GB">
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <button style={{ cursor: 'pointer' }} onClick={() => setValue(null)}>
                        Clear Selection
                    </button>
                    <button
                        style={{ cursor: 'pointer' }}
                        onClick={() => setFocusedDate(today(getLocalTimeZone()))}
                    >
                        Jump to today
                    </button>
                </div>
                <RangeCalendar
                    minValue={today(getLocalTimeZone())}
                    defaultValue={{
                        start: today(getLocalTimeZone()),
                        end: today(getLocalTimeZone()).add({ weeks: 2 }),
                    }}
                    focusedValue={focusedDate}
                    onFocusChange={setFocusedDate}
                    aria-label="Date range (controlled)"
                    value={value}
                    onChange={setValue}
                />
            </div>
        </I18nProvider>
    );
};

const TemplateTwo: Story = (args) => {
    return <RangeCalendarContainer timePresets={args.presets} />;
};

export const Primary = Template.bind({});
export const PrimaryTwo = TemplateTwo.bind({});

Primary.args = {
    label: 'Date',
};

PrimaryTwo.args = {
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
