import { Slot } from '@radix-ui/react-slot';
import type { Maybe } from 'graphql/jsutils/Maybe';
import { classNames } from 'osc-ui';
import type { Spacing, Themes } from 'osc-ui/src/types';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/* -------------------------------------------------------------------------------------------------
 * Row
 * A structural element that allows containerisation of objects and components while also
 * applying vertical rhythm of said components. Grid elements can be used within the row object.
 * -----------------------------------------------------------------------------------------------*/

interface RowProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Merges its props onto its immediate child
     */
    asChild?: boolean;
    /**
     * The content of the component
     */
    children: ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    className?: string;
    /**
     * The background color of the row
     */
    backgroundColor?: Maybe<Themes>;
    /**
     * The bottom margin of the row
     */
    marginBottom?: Maybe<Spacing>;
    /**
     * The bottom padding of the row
     */
    paddingBottom?: Maybe<Spacing>;
    /**
     * The top padding of the row
     */
    paddingTop?: Maybe<Spacing>;
    /**
     * Control the container size
     */
    container?: Maybe<string>;
}

export const Row = (props: RowProps) => {
    const {
        asChild,
        children,
        className = '',
        backgroundColor,
        marginBottom,
        paddingBottom,
        paddingTop,
        container,
    } = props;

    const classes = classNames(
        'o-row',
        marginBottom ? `o-row--${marginBottom}` : '',
        paddingTop ? `u-pt-${paddingTop}` : 'u-pt-2xl',
        paddingBottom ? `u-pb-${paddingBottom}` : 'u-pb-2xl',
        backgroundColor ? `u-bg-color-${backgroundColor}` : '',
        className
    );

    const containerClasses = classNames('o-container', container ? container : '');

    const Component = asChild ? Slot : 'div';

    return (
        <article className={classes}>
            <Component className={containerClasses}>{children}</Component>
        </article>
    );
};
