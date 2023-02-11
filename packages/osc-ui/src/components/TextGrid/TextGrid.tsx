import type { ReactNode } from 'react';
import React, { Children } from 'react';
import { classNames } from '../../utils/classNames';

import './text-grid.scss';

interface SharedProps {
    /**
     * The content of the TextGrid
     */
    children: ReactNode;
    /**
     * Custom class
     */
    className?: string;
}

export interface TextGridProps extends SharedProps {
    /**
     * Heading of the TextGrid, will either sit above or inline with the content
     */
    heading?: string;
    /**
     * Sets the Heading inline with the grid
     * @default false
     */
    hasInlineHeading?: boolean;
}

export const TextGrid = (props: TextGridProps) => {
    const { children, className, heading, hasInlineHeading } = props;

    const classes = classNames(
        'c-text-grid',
        hasInlineHeading ? 'has-inline-heading' : '',
        className
    );

    return (
        <div className={classes}>
            {heading && !hasInlineHeading ? <TextGridHeading>{heading}</TextGridHeading> : null}

            <div className="c-text-grid__items is-bare">
                {heading && hasInlineHeading ? <TextGridHeading>{heading}</TextGridHeading> : null}

                {Children.map(children, (child, index) => (
                    <div className="c-text-grid__item" key={index}>
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * TextGrid Heading
 * -----------------------------------------------------------------------------------------------*/
export interface TextGridHeadingProps extends SharedProps {}

const TextGridHeading = (props: TextGridHeadingProps) => {
    const { children, className } = props;

    const classes = classNames('c-text-grid__heading', 't-font-secondary', 'u-mb-zeta', className);

    return <h2 className={classes}>{children}</h2>;
};
