import { Link } from '@remix-run/react';
import React from 'react';
import { classNames } from '../../utils/classNames';
import './breadcrumb.scss';

interface Match {
    pathname: string;
    title: string;
}

export interface Props {
    className?: string;
    matches: Match[];
    separator: any;
}

export const Breadcrumb = (props: Props) => {
    const { className, matches, separator } = props;
    const classes = classNames('c-breadcrumb', className);

    const shouldRenderALinkOrNot = (
        matches: Props['matches'],
        match: Match,
        index: number,
        separator: any
    ) => {
        let breadcrumbItem;

        if (matches.length === index + 1) {
            // If it is the current page then don't add Link, and set to 'isCurrentPage'
            breadcrumbItem = (
                <li key={index} className="c-breadcrumb__item">
                    <span aria-current="page">{match.title}</span>
                </li>
            );
        } else {
            breadcrumbItem = (
                <li key={index} className="c-breadcrumb__item">
                    <Link to={match.pathname}>{match.title}</Link>
                    <span className="c-breadcrumb__separator">{separator}</span>
                </li>
            );
        }
        return breadcrumbItem;
    };

    return (
        <ol className={classes}>
            {matches.map((match, index) => {
                const breadcrumbItem = shouldRenderALinkOrNot(matches, match, index, separator);
                return breadcrumbItem;
            })}
        </ol>
    );
};
