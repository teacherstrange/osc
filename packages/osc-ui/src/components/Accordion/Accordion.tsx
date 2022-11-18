import type {
    AccordionContentProps,
    AccordionHeaderProps,
    AccordionItemProps,
    AccordionMultipleProps,
    AccordionSingleProps
} from '@radix-ui/react-accordion';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type { ComponentPropsWithoutRef, ElementRef, FC, RefAttributes } from 'react';
import React, { forwardRef } from 'react';
import { useFontSize } from '../../hooks/useFontSize';
import { classNames } from '../../utils/classNames';

import './accordion.scss';

export type AccordionProps = (AccordionSingleProps | AccordionMultipleProps) &
    RefAttributes<HTMLDivElement>;

export const Accordion: FC<AccordionProps> = (props: AccordionProps) => {
    const { children, className } = props;
    const classes = classNames('c-accordion', className);

    return (
        <AccordionPrimitive.Root className={classes} {...props}>
            {children}
        </AccordionPrimitive.Root>
    );
};

export const AccordionItem: FC<AccordionItemProps> = (props: AccordionItemProps) => {
    const { children, className } = props;
    const classes = classNames('c-accordion__item', className);

    return (
        <AccordionPrimitive.Item className={classes} {...props}>
            {children}
        </AccordionPrimitive.Item>
    );
};

const AccordionIcon = () => {
    // aria-hidden="true" hides the SVG from screen readers and other assistive technologies
    // focusable="false" addresses the issue that Internet Explorer/Edge make SVGs focusable by default
    return (
        <svg viewBox="0 0 10 10" className="c-accordion__icon" aria-hidden="true" focusable="false">
            <rect className="c-accordion__icon-vert" height="8" width="2" y="1" x="4" />
            <rect height="2" width="8" y="4" x="1" />
        </svg>
    );
};

// There may be times where this comes after a h2 so we want it to be h3 (default)
// but there may also be times where this isn't the case.
// So we want to be able to swap out which heading level we use.
// Radix gives us the `asChild` prop to squash the heading from the `AccordionPrimitive.Header`
// into the Trigger. We're then adding our own heading in its place with the as/Component prop
export interface AccordionHeadingProps extends AccordionHeaderProps {
    as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

// Using a forwardRef so we can pass refs down if we want to handle clicks etc. outside of the component
export const AccordionHeader: FC<AccordionHeadingProps> = forwardRef<
    ElementRef<typeof AccordionPrimitive.Header>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>((props: AccordionHeadingProps, forwardedRef) => {
    const { as: Component, asChild, children, className } = props;
    const fontSize = useFontSize('delta');
    const classes = classNames('c-accordion__header', fontSize, className);

    if (asChild && Component) {
        return (
            <AccordionPrimitive.Header asChild className={classes} {...props} ref={forwardedRef}>
                <Component>
                    <AccordionPrimitive.Trigger className="c-accordion__trigger">
                        {children}
                        <AccordionIcon />
                    </AccordionPrimitive.Trigger>
                </Component>
            </AccordionPrimitive.Header>
        );
    }

    return (
        <AccordionPrimitive.Header className={classes} {...props}>
            <AccordionPrimitive.Trigger className="c-accordion__trigger">
                {children}
                <AccordionIcon />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
});
AccordionHeader.displayName = 'AccordionHeader';

export const AccordionPanel: FC<AccordionContentProps> = (props: AccordionContentProps) => {
    const { children, className } = props;
    const classes = classNames('c-accordion__content', className);

    return (
        <AccordionPrimitive.Content className={classes} {...props}>
            {children}
        </AccordionPrimitive.Content>
    );
};
