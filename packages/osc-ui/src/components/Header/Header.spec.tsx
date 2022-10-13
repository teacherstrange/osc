/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { Header } from './Header';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

test('renders header', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Header />{' '}
        </Router>
    );
    const linkElement = screen.getByText(/changed title/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.classList.contains('tester').valueOf()).toBe(true);
});
