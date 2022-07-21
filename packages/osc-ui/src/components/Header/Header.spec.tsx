/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { Header } from './Header';
import { screen, render } from '@testing-library/react';

test('renders header', () => {
    render(<Header />);
    const linkElement = screen.getByText(/changed title/i);
    expect(linkElement).toBeInTheDocument();
});
