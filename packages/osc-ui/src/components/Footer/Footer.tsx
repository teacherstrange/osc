import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import './footer.scss';

export interface SharedFooterProps {
    /**
     * The content of the component
     */
    children?: ReactNode;
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Footer
 * -----------------------------------------------------------------------------------------------*/
export interface FooterProps extends SharedFooterProps, HTMLAttributes<HTMLDivElement> {}

export const Footer = (props: FooterProps) => {
    const { children, className, ...attr } = props;
    const classes = classNames('c-footer', 'o-container', className);

    return (
        <footer className={classes} {...attr}>
            {children}
        </footer>
    );
};

/* -------------------------------------------------------------------------------------------------
 * FooterGroup
 * -----------------------------------------------------------------------------------------------*/
export interface FooterGroupProps extends SharedFooterProps, HTMLAttributes<HTMLDivElement> {
    /**
     * The flow direction of the content
     * @default row
     */
    direction?: 'row' | 'column';
}

export const FooterGroup = (props: FooterGroupProps) => {
    const { children, className, direction = 'row', ...attr } = props;
    const directionModifier = useModifier('c-footer__group', direction);

    const classes = classNames('c-footer__group', directionModifier, className);

    return (
        <div className={classes} {...attr}>
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * FooterBottom
 * -----------------------------------------------------------------------------------------------*/
export interface FooterBottomProps extends SharedFooterProps, HTMLAttributes<HTMLDivElement> {}

export const FooterBottom = (props: FooterBottomProps) => {
    const { children, className, ...attr } = props;

    const classes = classNames('c-footer__btm', className);
    const year = new Date().getFullYear();

    return (
        <div className={classes} {...attr}>
            <div className="c-footer__btm-item">&copy; Open Study College {year}</div>
            <div className="c-footer__btm-item">{children}</div>
        </div>
    );
};
