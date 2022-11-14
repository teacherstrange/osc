/**
 * @vitest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Header } from './Header';

test('renders header', () => {
    render(<Header />);

    const header = screen.getByText(/header/i);
    expect(header).toBeInTheDocument();
});
