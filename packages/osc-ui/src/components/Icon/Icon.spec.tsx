import { render } from '@testing-library/react';
import React from 'react';
import { Icon } from './Icon';

test('correctly passes the ID to the href', () => {
    render(<Icon id="arrow" />);
    const use = document.querySelector('use');

    expect(use).toHaveAttribute('href', './spritesheet.svg#arrow');
});

test('passes correct classNames', () => {
    render(<Icon className="test" id="arrow" />);
    const svg = document.querySelector('svg');

    expect(svg).toHaveClass('o-icon test');
});
