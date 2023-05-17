import type {
    AccordionContentProps,
    AccordionHeaderProps,
    AccordionItemProps,
    AccordionMultipleProps,
    AccordionSingleProps,
} from '@radix-ui/react-accordion';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type { ComponentPropsWithoutRef, ElementRef, FC, RefAttributes } from 'react';
import React, { createContext, forwardRef, useContext, useEffect, useRef } from 'react';
import { useFontSize } from '../../hooks/useFontSize';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';

import './accordion.scss';

export type AccordionProps = (AccordionSingleProps | AccordionMultipleProps) & {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
} & RefAttributes<HTMLDivElement>;

const AccordionContext = createContext<{ variant: AccordionProps['variant'] } | null>(null);

export const Accordion: FC<AccordionProps> = (props: AccordionProps) => {
    const { children, className, variant = 'primary' } = props;
    const modifierClass = useModifier('c-accordion', variant);
    const classes = classNames('c-accordion', className, modifierClass);

    return (
        <AccordionContext.Provider value={{ variant }}>
            <AccordionPrimitive.Root className={classes} {...props}>
                {children}
            </AccordionPrimitive.Root>
        </AccordionContext.Provider>
    );
};

export const AccordionItem: FC<AccordionItemProps> = (props: AccordionItemProps) => {
    const { children, className } = props;
    const { variant } = useAccordionContext();
    const modifierClass = useModifier('c-accordion__item', variant);
    const classes = classNames('c-accordion__item', modifierClass, className);

    return (
        <AccordionPrimitive.Item className={classes} {...props}>
            {children}
        </AccordionPrimitive.Item>
    );
};

interface AccordionIconProps {
    icon?: 'chevron' | 'plusMinus';
}

const AccordionIcon = (props: AccordionIconProps) => {
    const { icon = 'plusMinus' } = props;
    const { variant } = useAccordionContext();
    const modifierClass = useModifier('c-accordion__icon', variant);
    const classes = classNames('c-accordion__icon', modifierClass);

    // aria-hidden="true" hides the SVG from screen readers and other assistive technologies
    // focusable="false" addresses the issue that Internet Explorer/Edge make SVGs focusable by default

    if (icon === 'chevron') {
        return (
            <svg
                viewBox="0 0 20 22"
                className={`${classes} c-accordion__icon--chevron`}
                aria-hidden="true"
                focusable="false"
            >
                <path d="M10.355 11.66 4.67 5.991l-2.791 2.8 8.451 8.424 8.495-8.442-2.79-2.79-5.679 5.677Z" />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 10 10"
            className={`${classes} c-accordion__icon--plusminus`}
            aria-hidden="true"
            focusable="false"
        >
            <rect height="8" width="2" y="1" x="4" />
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
    icon?: AccordionIconProps['icon'];
}

// Using a forwardRef so we can pass refs down if we want to handle clicks etc. outside of the component
export const AccordionHeader: FC<AccordionHeadingProps> = forwardRef<
    ElementRef<typeof AccordionPrimitive.Header>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>((props: AccordionHeadingProps, forwardedRef) => {
    const { as: Component, asChild, children, className, icon } = props;
    const fontSize = useFontSize('xl');
    const { variant } = useAccordionContext();
    const modifierClass = useModifier('c-accordion__header', variant);
    const classes = classNames('c-accordion__header', fontSize, modifierClass, className);

    if (asChild && Component) {
        return (
            <AccordionPrimitive.Header asChild className={classes} {...props} ref={forwardedRef}>
                <Component>
                    <AccordionPrimitive.Trigger
                        className={`c-accordion__trigger c-accordion__trigger--${variant}`}
                    >
                        <span>{children}</span>
                        <AccordionIcon icon={icon} />
                    </AccordionPrimitive.Trigger>
                </Component>
            </AccordionPrimitive.Header>
        );
    }

    return (
        <AccordionPrimitive.Header className={classes} {...props}>
            <AccordionPrimitive.Trigger
                className={`c-accordion__trigger c-accordion__trigger--${variant}`}
            >
                <span>{children}</span>
                <AccordionIcon icon={icon} />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
});
AccordionHeader.displayName = 'AccordionHeader';

export const AccordionPanel: FC<AccordionContentProps> = (props: AccordionContentProps) => {
    const ref = useRef(null);
    const { children, className } = props;
    const { variant } = useAccordionContext();
    const modifierClass = useModifier('c-accordion__content', variant);
    const classes = classNames('c-accordion__content', modifierClass, className);

    useEffect(() => {
        // Because we're using the `forceMount` prop on the AccordionPrimitive.Content
        // we need to manually set the height of the content so that the animation works smoothly.
        // Because Radix removes the css variable when the content is collapsed the animation looks
        // a bit janky as the height gets added during the open state.
        if (ref.current) {
            const accordionParent = ref.current.closest('.c-accordion__item');
            const content = ref.current.querySelector('.c-accordion__text');

            // We're using ResizeObserver to get the height of the content and then setting it
            // as a CSS variable on the parent element so that we can use it in the animation.
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.contentBoxSize) {
                        const height = entry.borderBoxSize[0].blockSize;

                        if (height) {
                            accordionParent.style.setProperty(
                                '--radix-collapsible-content-height',
                                `${height}px`
                            );
                        }
                    }
                }
            });

            resizeObserver.observe(content);

            // Clean up the observer
            return () => {
                resizeObserver.unobserve(content);
            };
        }
    }, []);

    return (
        // Use `forceMount` to keep the content in the DOM and prevent it from being unmounted when closed.
        <AccordionPrimitive.Content className={classes} {...props} forceMount ref={ref}>
            <div className={`c-accordion__text c-accordion__text--${variant}`}>{children}</div>
        </AccordionPrimitive.Content>
    );
};

/* -------------------------------------------------------------------------------------------------
 * useAccordionContext
 * -----------------------------------------------------------------------------------------------*/
const useAccordionContext = () => {
    const context = useContext(AccordionContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useDrawerContext was used outside of its Provider');
    }

    return context;
};
