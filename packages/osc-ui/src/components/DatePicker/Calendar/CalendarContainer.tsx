import type { AriaCalendarProps } from '@react-aria/calendar';

import type { DateValue } from '@react-types/calendar';

import React, { useState } from 'react';

import { Calendar } from './Calendar';
import { DecadeCalendar } from './DecadeCalendar';
import { YearCalendar } from './YearCalendar';

interface CalendarContainerProps extends AriaCalendarProps<DateValue> {}

export const CalendarContainer = (props: CalendarContainerProps) => {
    const [calendarView, setCalendarView] = useState('month');

    switch (calendarView) {
        case 'month':
            return <Calendar setCalendarView={setCalendarView} {...props} />;

        case 'year':
            return <YearCalendar setCalendarView={setCalendarView} {...props} />;

        case 'decade':
            return <DecadeCalendar setCalendarView={setCalendarView} {...props} />;

        default:
            console.error('No calendar selected');
    }
};
