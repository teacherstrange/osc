import { NavLink as RemixNavLink } from '@remix-run/react';
import type { HTMLAttributes } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';
import { AccessibleIcon, Icon } from '../Icon/Icon';

import './logo.scss';

/* -------------------------------------------------------------------------------------------------
 * Logo
 * -----------------------------------------------------------------------------------------------*/
export interface LogoProps extends HTMLAttributes<HTMLElement> {
    /**
     * The href to link the logo to.
     * This should be an internal link as it uses Remix's NavLink under the hood
     * @default /
     */
    href?: string;
    /**
     * The accessible label for the logo.
     * @default Open Study College
     */
    label?: string;
    /**
     * Custom class
     */
    className?: string;
}

export const Logo = (props: LogoProps) => {
    const { href = '/', label = 'Open Study College', className } = props;
    const classes = classNames('c-logo', className);

    return (
        <RemixNavLink to={href} className={classes}>
            <AccessibleIcon label={label}>
                <Icon id="logo" size={[278, 33]} />
            </AccessibleIcon>
        </RemixNavLink>
    );
};
