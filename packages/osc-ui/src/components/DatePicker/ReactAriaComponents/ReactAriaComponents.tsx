import type { AriaButtonProps } from '@react-aria/button';
import { useButton } from '@react-aria/button';
import type { AriaDialogProps } from '@react-aria/dialog';
import { useDialog } from '@react-aria/dialog';
import type { AriaPopoverProps } from '@react-aria/overlays';
import { DismissButton, Overlay, usePopover } from '@react-aria/overlays';
import type { DatePickerState, DateRangePickerState } from '@react-stately/datepicker';
import type { ReactNode } from 'react';
import React, { useRef } from 'react';

import { classNames } from '../../../utils/classNames';
import '../date-picker.scss';
import '../react-aria-components.scss';

interface ButtonProps extends AriaButtonProps {
    className?: string;
}

export const ReactAriaButton = (props: ButtonProps) => {
    const { className } = props;
    let ref = useRef();
    let { buttonProps } = useButton(props, ref);
    const classes = classNames('c-react-aria__button', className);
    const disabledClasses = buttonProps.disabled ? 'c-calendar__button--disabled' : '';

    return (
        <button className={`${classes} ${disabledClasses}`} {...buttonProps} ref={ref}>
            {props.children}
        </button>
    );
};

interface DialogProps extends AriaDialogProps {
    children: ReactNode;
}

export const ReactAriaDialog = (props: DialogProps) => {
    const { children } = props;
    let ref = useRef();
    let { dialogProps } = useDialog(props, ref);

    return (
        <div className="c-react-aria__dialog" {...dialogProps} ref={ref}>
            {children}
        </div>
    );
};

interface PopoverProps extends AriaPopoverProps {
    children: ReactNode;
    state: DatePickerState | DateRangePickerState;
}

export const ReactAriaPopover = (props: PopoverProps) => {
    const { children, state, ...rest } = props;
    let popoverRef = useRef();

    let { popoverProps, underlayProps } = usePopover(
        {
            ...rest,
            popoverRef,
        },
        state
    );

    return (
        <Overlay>
            <div {...underlayProps} />
            <div
                className="c-react-aria__popover"
                {...popoverProps}
                ref={popoverRef}
                style={{
                    ...popoverProps.style,
                }}
            >
                <DismissButton onDismiss={state.close} />
                {children}
                <DismissButton onDismiss={state.close} />
            </div>
        </Overlay>
    );
};
