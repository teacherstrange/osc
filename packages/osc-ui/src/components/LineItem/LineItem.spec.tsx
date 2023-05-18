import React from 'react';
import { render } from 'test-utils';
import { Button } from '../Button/Button';
import { Price } from '../Price/Price';
import { LineItem, LineItemGroup, LineItemHeader, LineItemPrice } from './LineItem';

const setup = (variant) => {
    render(
        <LineItem variant={variant}>
            <LineItemGroup>
                <LineItemHeader className="u-mb-0">A level Biology</LineItemHeader>
                <Button variant="quaternary" className="u-text-underline">
                    Remove
                </Button>
            </LineItemGroup>

            <LineItemPrice asChild>
                <Price>
                    <p className="t-font-m u-mb-0">£15.00</p>
                    <p className="t-font-s u-color-neutral-700 u-mb-0">Pay monthly</p>
                </Price>
            </LineItemPrice>
        </LineItem>
    );
};

test('renders the LineItem component', () => {
    setup('primary');

    expect(document.querySelector('.c-line-item')).toBeInTheDocument();
    expect(document.querySelector('.c-line-item')).toHaveClass('c-line-item--primary');

    expect(document.querySelector('.c-line-item__group')).toBeInTheDocument();
    expect(document.querySelector('.c-line-item__group')).toHaveClass(
        'c-line-item__group--primary'
    );

    expect(document.querySelector('.c-line-item__header')).toBeInTheDocument();
    expect(document.querySelector('.c-line-item__header')).toHaveClass(
        'c-line-item__header--primary'
    );

    expect(document.querySelector('.c-line-item__price')).toBeInTheDocument();
    expect(document.querySelector('.c-line-item__price')).toHaveClass(
        'c-line-item__price--primary'
    );
});

test('renders the LineItem component with secondary variant', () => {
    setup('secondary');

    expect(document.querySelector('.c-line-item')).toHaveClass('c-line-item--secondary');
    expect(document.querySelector('.c-line-item__group')).toHaveClass(
        'c-line-item__group--secondary'
    );
    expect(document.querySelector('.c-line-item__header')).toHaveClass(
        'c-line-item__header--secondary'
    );
    expect(document.querySelector('.c-line-item__price')).toHaveClass(
        'c-line-item__price--secondary'
    );
});

test('renders the LineItem component with tertiary variant', () => {
    setup('tertiary');

    expect(document.querySelector('.c-line-item')).toHaveClass('c-line-item--tertiary');
    expect(document.querySelector('.c-line-item__group')).toHaveClass(
        'c-line-item__group--tertiary'
    );
    expect(document.querySelector('.c-line-item__header')).toHaveClass(
        'c-line-item__header--tertiary'
    );
    expect(document.querySelector('.c-line-item__price')).toHaveClass(
        'c-line-item__price--tertiary'
    );
});
