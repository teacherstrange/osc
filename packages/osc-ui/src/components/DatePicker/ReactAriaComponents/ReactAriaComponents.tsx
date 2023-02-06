import type { AriaButtonProps } from '@react-aria/button';
import { useButton } from '@react-aria/button';
import type { AriaDialogProps } from '@react-aria/dialog';
import { useDialog } from '@react-aria/dialog';
import { DismissButton, Overlay, usePopover } from '@react-aria/overlays';
import type { AriaPopoverProps } from '@react-aria/overlays';
import type { ReactNode } from 'react';
import React, { useRef } from 'react';
import type { DatePickerState, DateRangePickerState } from '@react-stately/datepicker';

import '../date-picker.scss';
import '../react-aria-components.scss';

export const ReactAriaButton = (props: AriaButtonProps) => {
    let ref = useRef();
    let { buttonProps } = useButton(props, ref);

    return (
        <button className="c-react-aria__button" {...buttonProps} ref={ref}>
            {props.children}
        </button>
    );
};

interface DialogProps extends AriaDialogProps {
    children: ReactNode;
}

export const ReactAriaDialog = ({ children, ...props }: DialogProps) => {
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

export const ReactAriaPopover = ({ children, state, ...props }: PopoverProps) => {
    let popoverRef = useRef();

    let { popoverProps, underlayProps } = usePopover(
        {
            ...props,
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
