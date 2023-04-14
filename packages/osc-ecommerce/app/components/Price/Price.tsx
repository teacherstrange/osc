import { Money } from '@shopify/hydrogen';
import type { ProductVariant } from '@shopify/hydrogen/storefront-api-types';

interface PriceProps {
    selectedVariant: ProductVariant;
}

export const Price = (props: PriceProps) => {
    const { selectedVariant } = props;

    // IF selectedVariant has a price and a compare at price return the
    const isOnSale =
        selectedVariant?.price?.amount &&
        selectedVariant?.compareAtPrice?.amount &&
        selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

    return (
        <div className={`c-price__container ${isOnSale ? 'has-sale-price' : ''}`}>
            <div className="o-flex">
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
                    <Money withoutTrailingZeros data={selectedVariant?.price!} as="span" /> in full
                </span>
            </div>

            <span>Course code: {selectedVariant.sku}</span>
        </div>
    );
};
