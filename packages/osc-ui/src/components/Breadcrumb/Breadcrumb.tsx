import React from 'react';
import type { FC } from 'react';
import './breadcrumb.scss';

import {
    Breadcrumb as ChakraBreadcrumb,
    BreadcrumbItem as ChakraBreadcrumbItem,
    BreadcrumbLink as ChakraBreadcrumbLink
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';

interface Match {
    pathname: string;
    title: string;
}

export interface Props {
    className?: string;
    matches: Match[];
    separator: any;
}

export const Breadcrumb: FC<Props> = (props: Props) => {
    const { className, matches, separator } = props;

    const shouldRenderALinkOrNot = (matches, match, index) => {
        let breadCrumb;
        if (matches.length === index + 1) {
            // If it is the current page then don't add Link, and set to 'isCurrentPage'
            breadCrumb = (
                <ChakraBreadcrumbItem key={index} isCurrentPage className="c-breadcrumb__item">
                    <ChakraBreadcrumbLink>{match.title}</ChakraBreadcrumbLink>
                </ChakraBreadcrumbItem>
            );
        } else {
            breadCrumb = (
                <ChakraBreadcrumbItem key={index} className="c-breadcrumb__item">
                    <ChakraBreadcrumbLink as={Link} to={match.pathname}>
                        {match.title}
                    </ChakraBreadcrumbLink>
                </ChakraBreadcrumbItem>
            );
        }
        return breadCrumb;
    };

    return (
        <ChakraBreadcrumb
            className={`c-breadcrumb ${className ? className : ''}`}
            separator={separator}
        >
            {matches.map((match, index) => {
                let chakraBreadCrumb = shouldRenderALinkOrNot(matches, match, index);
                return chakraBreadCrumb;
            })}
        </ChakraBreadcrumb>
    );
};
