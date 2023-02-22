import type { ReactNode } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';

import './callout-banner.scss';

export interface CalloutBannerProps {
    /**
     * The content of the CalloutBanner
     */
    children: ReactNode;
    /**
     * Custom class
     */
    className?: string;
}

export const CalloutBanner = (props: CalloutBannerProps) => {
    const { children, className } = props;

    const classes = classNames('c-callout-banner', className);

    return <div className={classes}>{children}</div>;
};
