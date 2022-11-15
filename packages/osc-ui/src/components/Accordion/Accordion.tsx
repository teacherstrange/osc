import type {
    AccordionContentProps,
    AccordionHeaderProps,
    AccordionItemProps,
    AccordionMultipleProps,
    AccordionSingleProps
} from '@radix-ui/react-accordion';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import type { FC, RefAttributes } from 'react';
import React, { forwardRef } from 'react';
import { useFontSize } from '../../hooks/useFontSize';
import { classNames } from '../../utils/classNames';

import './accordion.scss';

export type AccordionProps = (AccordionSingleProps | AccordionMultipleProps) &
    RefAttributes<HTMLDivElement>;

export const Accordion: FC<AccordionProps> = forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>((props: AccordionProps, forwardedRef) => {
    const { children, className } = props;
    const classes = classNames('c-accordion', className);

    return (
        <AccordionPrimitive.Root className={classes} {...props} ref={forwardedRef}>
            {children}
        </AccordionPrimitive.Root>
    );
});
Accordion.displayName = 'Accordion';

export const AccordionItem: FC<AccordionItemProps> = forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>((props: AccordionItemProps, forwardedRef) => {
    const { children, className } = props;
    const classes = classNames('c-accordion__item', className);

    return (
        <AccordionPrimitive.Item className={classes} {...props} ref={forwardedRef}>
            {children}
        </AccordionPrimitive.Item>
    );
});
AccordionItem.displayName = 'AccordionItem';

export interface AccordionHeadingProps extends AccordionHeaderProps {
    as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const AccordionHeader: FC<AccordionHeadingProps> = forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Header>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>((props: AccordionHeadingProps, forwardedRef) => {
    const { as: Component, asChild, children, className } = props;
    const fontSize = useFontSize('delta');
    const classes = classNames('c-accordion__header', fontSize, className);

    if (asChild && Component) {
        return (
            <AccordionPrimitive.Header className={classes} {...props} ref={forwardedRef}>
                <Component>
                    <AccordionPrimitive.Trigger className="c-accordion__trigger">
                        {children}
                        <ChevronDownIcon className="c-accordion__chevron" aria-hidden />
                    </AccordionPrimitive.Trigger>
                </Component>
            </AccordionPrimitive.Header>
        );
    }

    return (
        <AccordionPrimitive.Header className={classes} {...props} ref={forwardedRef}>
            <AccordionPrimitive.Trigger className="c-accordion__trigger">
                {children}
                <ChevronDownIcon className="c-accordion__chevron" aria-hidden />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
});
AccordionHeader.displayName = 'AccordionHeading';

export const AccordionPanel: FC<AccordionContentProps> = forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>((props: AccordionContentProps, forwardedRef) => {
    const { children, className } = props;
    const classes = classNames('c-accordion__content', className);

    return (
        <AccordionPrimitive.Content className={classes} {...props} ref={forwardedRef}>
            <div className="c-accordion__content-text">{children}</div>
        </AccordionPrimitive.Content>
    );
});
AccordionPanel.displayName = 'AccordionPanel';
