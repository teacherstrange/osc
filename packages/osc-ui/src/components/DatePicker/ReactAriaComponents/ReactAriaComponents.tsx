import { useButton } from '@react-aria/button';
import { useDialog } from '@react-aria/dialog';
import { DismissButton, Overlay, usePopover } from '@react-aria/overlays';
import React, { useRef } from 'react';

import '../date-picker.scss';
import '../react-aria-components.scss';

export const ReactAriaButton = (props) => {
    let ref = useRef();
    let { buttonProps } = useButton(props, ref);

    return (
        <button className="c-react-aria-button" {...buttonProps} ref={ref}>
            {props.children}
        </button>
    );
};

export const ReactAriaDialog = ({ title, children, ...props }) => {
    let ref = useRef();
    let { dialogProps } = useDialog(props, ref);

    return (
        <div className="c-react-aria-dialog" {...dialogProps} ref={ref}>
            {children}
        </div>
    );
};

export const ReactAriaPopover = ({ children, state, ...props }) => {
    let ref = useRef();
    let { popoverRef = ref } = props;

    // TODO - temporarily assigned to any to shut TS up.
    let { popoverProps, underlayProps } = usePopover(
        {
            ...props,
            popoverRef,
        } as any,
        state
    );

    return (
        <Overlay>
            <div className="c-react-aria-popover" {...underlayProps} />
            <div
                {...popoverProps}
                ref={popoverRef}
                style={{
                    ...popoverProps.style,
                    background: 'var(--page-background)',
                    border: '1px solid gray',
                }}
            >
                <DismissButton onDismiss={state.close} />
                {children}
                <DismissButton onDismiss={state.close} />
            </div>
        </Overlay>
    );
};
