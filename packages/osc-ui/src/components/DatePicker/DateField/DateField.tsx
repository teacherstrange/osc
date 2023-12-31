import type { AriaButtonProps } from '@react-aria/button';
import type { AriaDateFieldProps } from '@react-aria/datepicker';
import { useDateField, useDateSegment } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import type { DateFieldState, DateSegment } from '@react-stately/datepicker';
import { useDateFieldState } from '@react-stately/datepicker';
import type { DateValue } from '@react-types/calendar';
import React, { useRef } from 'react';
import { useUniqueId } from '../../../hooks/useUniqueId';
import { Icon } from '../../Icon/Icon';
import '../date-field.scss';
import { ReactAriaButton } from '../ReactAriaComponents/ReactAriaComponents';
import { createCalendar } from '../utils';
interface DateFieldProps extends AriaDateFieldProps<DateValue> {
    buttonProps: AriaButtonProps;
    dateFieldContainerId: string;
    errors?: string[] | undefined;
}

export const DateField = (props: DateFieldProps) => {
    const { dateFieldContainerId, errors } = props;
    let { locale } = useLocale();

    const buttonId = useUniqueId('calendarBtn:');
    const dateFieldId = useUniqueId('dateField:');
    const buttonLabelledById = useUniqueId('buttonLabelledById:');

    let state = useDateFieldState({
        ...props,
        locale,
        createCalendar,
    });

    let ref = useRef();
    let { fieldProps } = useDateField(props, state, ref);

    return (
        <>
            <div
                className={
                    state.validationState === 'invalid' || (errors && errors.length > 0)
                        ? `c-date-field__wrapper c-date-field__wrapper--error`
                        : `c-date-field__wrapper`
                }
            >
                <div {...fieldProps} ref={ref} className="c-date-field" id={dateFieldId}>
                    {state.segments.map((segment, i) => (
                        <DateSegmentComponent key={i} segment={segment} state={state} />
                    ))}
                </div>
                <ReactAriaButton
                    {...props.buttonProps}
                    aria-describedby={
                        errors && errors.length > 0 ? `${dateFieldContainerId}-error` : undefined
                    }
                    aria-labelledby={buttonLabelledById}
                    id={buttonId}
                >
                    <Icon id="calendar" />
                </ReactAriaButton>
            </div>
            {state.validationState === 'invalid' ? (
                <div className="c-date-field__error--text">Invalid Date</div>
            ) : null}
        </>
    );
};

interface DateSegmentProps {
    segment: DateSegment;
    state: DateFieldState;
}

const DateSegmentComponent = (props: DateSegmentProps) => {
    const { segment, state } = props;

    const dateSegmentId = useUniqueId('dateSegment:');
    const dateSegmentLabelledById = useUniqueId('dateSegmentLabelledById:');
    const dateSegmentDescribedById = useUniqueId('dateSegmentDescribedById:');

    let ref = useRef();
    let { segmentProps } = useDateSegment(segment, state, ref);

    return (
        <div
            {...segmentProps}
            ref={ref}
            className={`c-date-field__segment ${
                segment.isPlaceholder ? 'c-date-field__placeholder' : ''
            }`}
            id={dateSegmentId}
            aria-labelledby={dateSegmentLabelledById}
            aria-describedby={dateSegmentDescribedById}
        >
            {segment.text}
        </div>
    );
};
