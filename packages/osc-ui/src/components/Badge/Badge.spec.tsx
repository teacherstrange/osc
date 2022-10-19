import React from 'react';
import { Badge } from './Badge';
import { screen, render } from '@testing-library/react';
import type { Props } from './Badge';

describe('Badge component', () => {
    const setup = ({ badgeName, className, color, variant }: Props) =>
        render(
            <Badge badgeName={badgeName} className={className} color={color} variant={variant} />
        );

    test('renders a Span element for the Badge component', () => {
        setup({ badgeName: 'Default' });
        expect(screen.getByText('Default').nodeName).toBe('SPAN');
    });
    test('renders a Badge with the correct name', () => {
        setup({ badgeName: 'Default' });
        expect(screen.getByText('Default')).toHaveTextContent('Default');
    });
    test('renders a Badge with correct default classNames', () => {
        setup({ badgeName: 'Default' });
        expect(screen.getByText('Default')).toHaveClass('chakra-badge o-badge');
    });
    test('passes className to the Badge component', () => {
        setup({ badgeName: 'Default', className: 'test-class' });
        expect(screen.getByText('Default')).toHaveClass('test-class');
    });
});
