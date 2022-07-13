/**
 * @jest-environment jsdom
 */

import React from 'react';
import { screen, render } from '@testing-library/react';
import { Header } from './Header';

test('renders header', () => {
    render(<Header />);
    const linkElement = screen.getByText(/changed title/i);
    expect(linkElement).toBeInTheDocument();
});
