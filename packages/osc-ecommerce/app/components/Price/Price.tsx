import { Money } from '@shopify/hydrogen';
import type { ProductVariant } from '@shopify/hydrogen/storefront-api-types';
import { classNames, Price as OSCPrice } from 'osc-ui';

interface PriceProps {
    price: ProductVariant['price'];
    compareAtPrice: ProductVariant['compareAtPrice'];
    sku?: ProductVariant['sku'];
    isLoading?: boolean;
}

export const Price = (props: PriceProps) => {
    const { price, compareAtPrice, sku, isLoading } = props;

    // In Shopify setting a higher compare at price is what is used to show a sale
    const isOnSale =
        price?.amount && compareAtPrice?.amount && price?.amount < compareAtPrice?.amount;

    const classes = classNames('u-color-primary', isLoading ? 'is-loading' : '');

    return (
        <OSCPrice
            className={classes}
            sku={sku}
            compareAtPrice={
                isOnSale ? <Money withoutTrailingZeros data={compareAtPrice} as="span" /> : null
            }
        >
            {/* // TODO: This "in full" text will need to be dynamic once we have the option to offer monthly payments */}
            <Money withoutTrailingZeros data={price} as="span" className="u-text-bold" /> in full
        </OSCPrice>
    );
};
