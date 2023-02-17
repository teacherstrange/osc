import { render, screen } from '@testing-library/react';
import React from 'react';
import { Burger } from './Burger';

test('renders Burger component', () => {
    render(<Burger label="Open menu" isOpen={false} />);

    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'closed');
});

test('renders Burger component in open state', () => {
    render(<Burger label="Open menu" isOpen={true} />);

    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'open');
});
