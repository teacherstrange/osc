/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { Footer } from './Footer';
import { screen, render } from '@testing-library/react';

test('renders header', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/changed title/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.classList.contains('tester').valueOf()).toBe(true);
});
