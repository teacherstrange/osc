import type { AnyCalendarDate, CalendarDate } from '@internationalized/date';
import type { AriaDateRangePickerProps } from '@react-aria/datepicker';
import { useDateRangePicker } from '@react-aria/datepicker';
import { useDateRangePickerState } from '@react-stately/datepicker';
import type { DateValue } from '@react-types/calendar';
import type { RangeValue } from '@react-types/shared';
import { mediaQueries as breakpoints } from 'osc-design-tokens';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useUniqueId } from '../../../hooks/useUniqueId';
import { classNames } from '../../../utils/classNames';
import { validateDatepicker } from '../../../utils/clientSideValidation';
import { rem } from '../../../utils/rem';
import { Button } from '../../Button/Button';
import { Icon } from '../../Icon/Icon';
import { DateField } from '../DateField/DateField';
import { RangeCalendarContainer } from '../RangeCalendar/RangeCalendar';
import { ReactAriaDialog, ReactAriaPopover } from '../ReactAriaComponents/ReactAriaComponents';
import { createTimePresets } from '../utils';

/* -------------------------------------------------------------------------------------------------
 * DateRangePickerContainer
 * -----------------------------------------------------------------------------------------------*/

interface DateRangePickerContainerProps extends AriaDateRangePickerProps<DateValue> {
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
    /**
     * A label for the DateRangePicker
     */
    label: string;
    /**
     * Preset time periods a user can select
     */
    presets?: { name: string; length: number }[];
    /**
     * Allows for client side validation once a server side error has been received
     */
    setErrors?: Dispatch<SetStateAction<any>>;
    /**
     * The Zod Schema used for validation
     */
    schema?: ZodObject<ZodRawShape>;
}

export const DateRangePickerContainer = (props: DateRangePickerContainerProps) => {
    const { defaultValue, errors, label, presets, schema, setErrors, ...rest } = props;

    // Used to set the value of the range calender to a preset or to clear it
    const [value, setValue] = useState<RangeValue<DateValue>>(defaultValue ? defaultValue : null);

    // Additional piece of state to ensure prompt to 'select end date' doesn't show if default has been set
    const [initialDefault, setInitialDefault] = useState(defaultValue ? true : false);

    const [selectedRange, setSelectedRange] = useState({
        timePreset: false,
        range: null,
        timePresetLength: 0,
    });

    const dateFieldId = useUniqueId('dateField:');

    useEffect(() => {
        // Client side error handling - Sets any errors on an input in
        // accordance with the schema validation
        if (errors && schema) {
            validateDatepicker(
                'dateRangePicker',
                schema,
                setErrors,
                value as RangeValue<CalendarDate>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- should only update when the checked value changes
    }, [value]);

    const isDesktop = useMediaQuery(`(min-width: ${rem(breakpoints.desk)}rem)`);

    const ClearSelection = () => (
        <Button
            variant="quaternary"
            className="c-calendar__button--clear-selection"
            onClick={() => {
                setValue(null);
                setSelectedRange({ timePreset: false, range: null, timePresetLength: 0 });
            }}
        >
            Clear Selection
        </Button>
    );

    return (
        <>
            <DateRangePicker
                clearSelection={<ClearSelection />}
                dateFieldId={dateFieldId}
                errors={errors}
                initialDefault={initialDefault}
                isDesktop={isDesktop}
                label={label}
                // Runs only when start AND end date are both selected
                onChange={(e: { start: DateValue; end: DateValue }) => {
                    setValue(e);
                    // Reset length
                    setSelectedRange((prev) => ({ ...prev, timePresetLength: 0 }));
                }}
                selectedRange={selectedRange}
                setInitialDefault={setInitialDefault}
                setSelectedRange={setSelectedRange}
                timePresets={
                    presets ? (
                        <TimePresets
                            isDesktop={isDesktop}
                            presets={presets}
                            selectedRange={selectedRange}
                            setValue={setValue}
                            setSelectedRange={setSelectedRange}
                        />
                    ) : null
                }
                value={value}
                {...rest}
            />
        </>
    );
};

interface TimePresetProps {
    isDesktop: boolean;
    presets: { name: string; length: number }[];
    selectedRange: SelectedRange;
    setSelectedRange: Dispatch<SetStateAction<SelectedRange>>;
    setValue: Dispatch<SetStateAction<{ start: AnyCalendarDate; end: AnyCalendarDate }>>;
}

const TimePresets = (props: TimePresetProps) => {
    const { isDesktop, presets, selectedRange, setSelectedRange, setValue } = props;

    return (
        <div className="c-calendar__range-time-presets" aria-label="Time Presets" role="group">
            {isDesktop ? <div>Time Presets</div> : null}
            {createTimePresets(presets).map(({ endDate, length, name, startDate }, index) => {
                const selectedClass =
                    selectedRange.timePresetLength === length ? 'is-selected' : null;
                const mobileClasses = !isDesktop ? 'is-mobile' : null;

                const classes = classNames(
                    'c-calendar__button--time-preset',
                    selectedClass && selectedClass,
                    mobileClasses && mobileClasses
                );

                return (
                    <Button
                        key={index}
                        variant={isDesktop ? 'quaternary' : 'tertiary'}
                        isPill={isDesktop ? false : true}
                        onClick={() => {
                            setSelectedRange((prevRange) => ({
                                ...prevRange,
                                timePresetLength: length,
                                timePreset: true,
                            }));
                            setValue({
                                start: startDate,
                                end: endDate,
                            });
                        }}
                        className={classes}
                    >
                        {name}
                    </Button>
                );
            })}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker
 * -----------------------------------------------------------------------------------------------*/

type SelectedRange = {
    timePreset: boolean;
    range: RangeValue<CalendarDate>;
    timePresetLength: number;
};
interface DateRangePickerProps extends AriaDateRangePickerProps<DateValue> {
    /**
     * A button component that allows the selected range to be cleared
     */
    clearSelection: ReactNode;
    /**
     * A unique Id
     */
    dateFieldId: string;
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
    /**
     * Indicates where a defaultValue has been set
     */
    initialDefault: boolean;
    /**
     * Indicates whether screen size is desktop or mobile
     */
    isDesktop: boolean;
    /**
     * The selected date range as well as whether a time preset is being used and
     * what length it is (ie, how many days)
     */
    selectedRange: SelectedRange;
    /**
     * A Dispatch that allows initialDefault value to be reset
     */
    setInitialDefault: Dispatch<SetStateAction<boolean>>;
    /**
     * A Dispatch that allows selectedRange state to be updated in the Range Calendar
     */
    setSelectedRange: Dispatch<SetStateAction<SelectedRange>>;
    /**
     * Preset time periods a user can select
     */
    timePresets: ReactNode;
}

export const DateRangePicker = (props: DateRangePickerProps) => {
    let state = useDateRangePickerState({ ...props, shouldCloseOnSelect: false });

    let ref = useRef();
    let {
        labelProps,
        groupProps,
        startFieldProps,
        endFieldProps,
        buttonProps,
        dialogProps,
        calendarProps,
    } = useDateRangePicker(props, state, ref);
    const {
        clearSelection,
        dateFieldId,
        errors,
        initialDefault,
        isDesktop,
        selectedRange,
        setInitialDefault,
        setSelectedRange,
        timePresets,
    } = props;
    return (
        <div className="c-datepicker c-datepicker__range">
            <label className="c-label" {...labelProps}>
                {props.label}
            </label>
            <div {...groupProps} ref={ref}>
                <div
                    className="c-datepicker__date-field-container"
                    id={dateFieldId}
                    aria-invalid={errors ? true : false}
                >
                    <div className="c-datepicker__date-field-inner-container">
                        <DateField
                            aria-describedby={errors ? `${dateFieldId}-error` : undefined}
                            buttonProps={buttonProps}
                            dateFieldId={dateFieldId}
                            errors={errors}
                            {...startFieldProps}
                        />
                    </div>
                    {isDesktop ? (
                        <Icon className="c-datepicker__date-field-container--arrow" id="arrow" />
                    ) : null}
                    <div className="c-datepicker__date-field-inner-container">
                        <DateField
                            buttonProps={buttonProps}
                            dateFieldId={dateFieldId}
                            errors={errors}
                            {...endFieldProps}
                        />
                    </div>
                </div>
            </div>
            {state.isOpen && (
                <ReactAriaPopover
                    state={state}
                    triggerRef={ref}
                    popoverRef={ref}
                    placement="bottom start"
                >
                    <ReactAriaDialog {...dialogProps}>
                        <RangeCalendarContainer
                            {...calendarProps}
                            initialDefault={initialDefault}
                            isDesktop={isDesktop}
                            clearSelection={clearSelection}
                            timePresets={timePresets}
                            setInitialDefault={setInitialDefault}
                            setSelectedRange={setSelectedRange}
                            selectedRange={selectedRange}
                        />
                    </ReactAriaDialog>
                </ReactAriaPopover>
            )}
            {errors ? (
                <div className="c-date-field__error--text" id={`${dateFieldId}-error`}>
                    {errors}
                </div>
            ) : null}
        </div>
    );
};
