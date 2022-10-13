/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { Footer } from './Footer';
import { screen, render } from '@testing-library/react';

test('renders footer', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/changed title/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.classList.contains('tester').valueOf()).toBe(true);
});

test('accepts className', () => {
    const { container } = render(<Footer className={'tester'}></Footer>);
    expect(container.getElementsByClassName('tester')[0]).toBeInTheDocument();
});
