import { render } from 'test-utils';

import { ChevronRightIcon } from '@radix-ui/react-icons';
import { screen } from '@testing-library/react';
import React from 'react';
import type { Props } from './Breadcrumb';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb component', () => {
    const setup = ({ className, matches, separator }: Props) =>
        render(<Breadcrumb className={className} matches={matches} separator={separator} />);

    const links = [
        { pathname: '/courses', title: 'courses' },
        { pathname: '/courses/biology', title: 'biology' },
        { pathname: '/courses/biology/module-1', title: 'module 1' },
    ];

    test('renders breadcrumbs with the correct titles', () => {
        setup({
            matches: links,
            separator: '/',
        });
        links.forEach((link) => {
            expect(screen.getByText(`${link.title}`)).toHaveTextContent(`${link.title}`);
        });
    });

    test('renders breadcrumbs with anchor tag and correct pathnames', () => {
        setup({
            matches: links,
            separator: '/',
        });
        expect(screen.getByRole('link', { name: `${links[0].title}` })).toHaveAttribute(
            'href',
            `${links[0].pathname}`
        );
        expect(screen.getByRole('link', { name: `${links[0].title}` }).nodeName).toBe('A');
    });

    test('renders a breadcrumb without an anchor tag or pathname when it is the last breadcrumb', () => {
        setup({
            matches: links,
            separator: '/',
        });
        expect(screen.getByText(`${links[2].title}`)).not.toHaveAttribute(
            'href',
            `${links[2].pathname}`
        );
        expect(screen.getByText(`${links[2].title}`).nodeName).not.toBe('A');
    });

    test('renders a string separator that is passed in', () => {
        setup({
            matches: links,
            separator: '/',
        });
        expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('/');
        expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('/');
    });

    test('renders an icon separator that is passed in', () => {
        setup({
            matches: links,
            separator: <ChevronRightIcon />,
        });

        expect(screen.getAllByRole('listitem')[0].childNodes[1].childNodes[0].nodeName).toBe('svg');
    });
});
