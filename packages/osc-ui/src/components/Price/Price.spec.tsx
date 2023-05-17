import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { Price } from './Price';

test('renders the Price component', () => {
    render(<Price>£1,149 in full</Price>);

    expect(screen.getByText('£1,149 in full')).toBeInTheDocument();
});

test('renders the Price component with a sku', () => {
    render(<Price sku="AAT056">£1,149 in full</Price>);

    expect(screen.getByText('£1,149 in full')).toBeInTheDocument();
    expect(screen.getByText('Course code: AAT056')).toBeInTheDocument();
});

test('renders the Price component with a compare at price', () => {
    render(
        <Price compareAtPrice={<span>£1600</span>}>
            <span>£1,149 in full</span>
        </Price>
    );

    expect(screen.getByText('£1,149 in full')).toBeInTheDocument();
    expect(screen.getByText('£1600')).toBeInTheDocument();
    expect(screen.getByText('£1600')).toHaveClass(
        'c-price__item c-price__item--strike u-color-neutral-600'
    );
});
