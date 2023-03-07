import type { ReactNode } from 'react';
import React, { Children } from 'react';
import { classNames } from '../../utils/classNames';

import './island-grid.scss';

export interface IslandGridProps {
    /**
     * The content of the IslandGrid
     * Must take a minimum of 3 children, or a maximum of 4
     */
    children: [ReactNode, ReactNode, ReactNode, ReactNode?] | ReactNode[];
    /**
     * Custom class
     */
    className?: string;
}

export const IslandGrid = (props: IslandGridProps) => {
    const { children, className } = props;

    const classes = classNames('c-island-grid', 'o-grid', className);

    return (
        <div className={classes}>
            {Children.map(children, (child, index) => {
                return (
                    <div
                        className="c-island-grid__island o-grid__col--12 o-grid__col--6@tab"
                        key={index}
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
};
