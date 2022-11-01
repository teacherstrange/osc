import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { screen, render } from '@testing-library/react';
import type { Props } from './Breadcrumb';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ArrowRightIcon } from '@chakra-ui/icons';

describe('Breadcrumb component', () => {
    const setup = ({ className, matches, separator }: Props) =>
        render(<Breadcrumb className={className} matches={matches} separator={separator} />, {
            wrapper: MemoryRouter
        });

    const links = [
        { pathname: '/courses', title: 'courses' },
        { pathname: '/courses/biology', title: 'biology' },
        { pathname: '/courses/biology/module-1', title: 'module 1' }
    ];

    test('renders breadcrumbs with the correct titles', () => {
        setup({
            matches: links,
            separator: '/'
        });
        links.forEach((link) => {
            expect(screen.getByText(`${link.title}`)).toHaveTextContent(`${link.title}`);
        });
    });
    test('renders breadcrumbs with anchor tag and correct pathnames', () => {
        setup({
            matches: links,
            separator: '/'
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
            separator: '/'
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
            separator: '/'
        });
        expect(screen.getAllByRole('presentation')[0]).toHaveTextContent('/');
        expect(screen.getAllByRole('presentation')[1]).toHaveTextContent('/');
    });
    test('renders an icon separator that is passed in', () => {
        setup({
            matches: links,
            separator: <ArrowRightIcon />
        });
        expect(screen.getAllByRole('presentation')[0].childNodes[0].nodeName).toBe('SVG');
        expect(screen.getAllByRole('presentation')[1].childNodes[0].nodeName).toBe('SVG');
    });
});
