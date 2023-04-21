import { Money } from '@shopify/hydrogen';
import type { ProductVariant } from '@shopify/hydrogen/storefront-api-types';
import { classNames } from 'osc-ui';

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

    const classes = classNames(
        'c-price__container',
        isOnSale ? 'has-sale-price' : '',
        isLoading ? 'is-loading' : ''
    );

    return (
        <div className={classes}>
            <div className="o-flex">
                {selectedVariant ? (
                    <span className="c-price t-font-xl u-text-bold u-color-primary u-mb-0">
                        {isOnSale ? (
                            <Money
                                withoutTrailingZeros
                                data={selectedVariant?.compareAtPrice!}
                                as="span"
                                className="c-price c-price--strike u-text-reg u-color-neutral-600 u-mb-0"
                            />
                        ) : null}
                        {/* // TODO: This "in full" text will need to be dynamic once we have the option to offer monthly payments */}
                        <Money withoutTrailingZeros data={selectedVariant?.price!} as="span" /> in
                        full
                    </span>
                ) : null}
            </div>

            <span>Course code: {selectedVariant?.sku}</span>
        </div>
    );
};
