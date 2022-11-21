import { render, screen } from '@testing-library/react';
import React from 'react';
import { Footer } from './Footer';

test('renders footer', () => {
    render(<Footer />);
    const footer = screen.getByText(/footer/i);
    expect(footer).toBeInTheDocument();
});
