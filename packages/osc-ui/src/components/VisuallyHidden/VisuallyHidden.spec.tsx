/**
 * @vitest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { VisuallyHidden } from './VisuallyHidden';

test('It renders some text', () => {
    render(
        <VisuallyHidden>
            <p>You can't see me!</p>
        </VisuallyHidden>
    );

    const parent = document.querySelector('.sr-only');
    expect(parent).toBeInTheDocument();
    expect(parent.childNodes).toHaveLength(1);

    expect(screen.getByText("You can't see me!")).toBeInTheDocument();
});

test('It renders as a child', () => {
    render(
        <VisuallyHidden asChild>
            <p>You can't see me!</p>
        </VisuallyHidden>
    );

    expect(screen.getByText("You can't see me!")).toHaveClass('sr-only');
});
