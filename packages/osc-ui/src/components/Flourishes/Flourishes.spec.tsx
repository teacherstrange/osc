import { render, screen } from '@testing-library/react';
import React from 'react';
import { Flourish } from './Flourishes';

test('renders an individual Flourish with defaults', () => {
    render(<Flourish width="2/16" height="12/16" color="primary" data-testid="flourish" />);

    const flourish = screen.getByTestId('flourish');

    expect(flourish).toHaveAttribute('aria-hidden', 'true');
    expect(flourish).toHaveStyle({
        width: '40px',
        height: '240px',
    });
    expect(flourish).toHaveClass('c-flourish u-bg-color-gradient-primary');
});

test('scales the width and height based on the maxHeight prop', () => {
    render(
        <Flourish
            width="2/16"
            height="12/16"
            color="primary"
            maxHeight={200}
            data-testid="flourish"
        />
    );

    const flourish = screen.getByTestId('flourish');

    expect(flourish).toHaveStyle({
        width: '25px',
        height: '150px',
    });
});
