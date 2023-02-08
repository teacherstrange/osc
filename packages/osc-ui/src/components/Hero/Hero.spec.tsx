import { render, screen } from '@testing-library/react';
import React from 'react';
import { Hero } from './Hero';

test('renders Hero', () => {
    render(<Hero>Hello, world!</Hero>);
    const hello = screen.getByText(/Hello, world!/i);
    expect(hello).toBeInTheDocument();
});
