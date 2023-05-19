import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { Flourish, Flourishes } from './Flourishes';
import { primary } from './patterns';

describe('Singular flourish', () => {
    test('renders an individual Flourish with defaults', () => {
        render(<Flourish width="2/16" height="12/16" color="primary" data-testid="flourish" />);

        const flourish = screen.getByTestId('flourish');

        expect(flourish).toHaveAttribute('aria-hidden', 'true');
        expect(flourish).toHaveStyle({
            width: '40px',
            height: '240px',
        });
        expect(flourish).toHaveClass('c-flourish c-flourish-color--primary');
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
});

describe('Flourishes', () => {
    test('renders the flourishes with correct class names', () => {
        render(<Flourishes color="multicolor" pattern={primary} variant="primary" />);

        const flourishes = document.querySelectorAll('.c-flourish');

        expect(flourishes).toHaveLength(primary.length);
        flourishes.forEach((flourish) => {
            expect(flourish).toHaveClass(
                'c-flourish c-flourish-color--multicolor c-flourish--primary'
            );
        });
    });
});
