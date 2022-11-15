import { render, screen } from '@testing-library/react';
import React from 'react';
import type { Props } from './Badge';
import { Badge } from './Badge';

describe('Badge component', () => {
    const setup = ({ badgeName, className, theme, variant }: Props) =>
        render(
            <Badge badgeName={badgeName} className={className} theme={theme} variant={variant} />
        );

    test('renders a Badge with the correct name', () => {
        setup({ badgeName: 'Default' });
        expect(screen.getByText('Default')).toHaveTextContent('Default');
    });

    test('renders a Badge with correct default classNames', () => {
        setup({ badgeName: 'Default' });
        expect(screen.getByText('Default')).toHaveClass('c-badge');
    });

    test('passes className to the Badge component', () => {
        setup({ badgeName: 'Default', className: 'test-class' });
        expect(screen.getByText('Default')).toHaveClass('test-class');
    });
});
