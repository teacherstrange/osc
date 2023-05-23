import { Money } from '@shopify/hydrogen';
import type { ProductVariant } from '@shopify/hydrogen/storefront-api-types';
import { classNames, Price as OSCPrice } from 'osc-ui';

interface PriceProps {
    selectedVariant: ProductVariant;
    isLoading?: boolean;
}

export const Price = (props: PriceProps) => {
    const { selectedVariant, isLoading } = props;

    // IF selectedVariant has a price and a compare at price return true if the compare at price is larger than the price
    // In Shopify setting a higher compare at price is what is used to show a sale
    const isOnSale =
        selectedVariant?.price?.amount &&
        selectedVariant?.compareAtPrice?.amount &&
        selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

    const classes = classNames('u-color-primary', isLoading ? 'is-loading' : '');

    return (
        <OSCPrice
            className={classes}
            sku={selectedVariant?.sku}
            compareAtPrice={
                isOnSale ? (
                    <Money withoutTrailingZeros data={selectedVariant?.compareAtPrice!} as="span" />
                ) : null
            }
        >
            {/* // TODO: This "in full" text will need to be dynamic once we have the option to offer monthly payments */}
            <Money
                withoutTrailingZeros
                data={selectedVariant?.price!}
                as="span"
                className="u-text-bold"
            />{' '}
            in full
        </OSCPrice>
    );
};
