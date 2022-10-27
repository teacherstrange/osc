import React from 'react';
import type { FC } from 'react';
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

    return (
        <ChakraBreadcrumb className={className ? className : ''} separator={separator}>
            {matches.map((match, idx) => {
                return (
                    <ChakraBreadcrumbItem
                        key={idx}
                        isCurrentPage={matches.length === idx + 1 ? true : false}
                    >
                        <ChakraBreadcrumbLink as={Link} to={match.pathname}>
                            {match.title}
                        </ChakraBreadcrumbLink>
                    </ChakraBreadcrumbItem>
                );
            })}
        </ChakraBreadcrumb>
    );
};
