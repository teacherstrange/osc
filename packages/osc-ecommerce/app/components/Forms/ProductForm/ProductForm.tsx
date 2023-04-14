import { useSearchParams, useTransition } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import type {
    Product as ProductType,
    ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import { Button, ButtonGroup, RadioGroup, RadioItem } from 'osc-ui';
import { Fragment, useMemo } from 'react';
import { SaveForLaterButton } from './SaveForLaterButton';

interface ProductFormProps {
    product: ProductType & { selectedVariant?: ProductVariant };
}
export const ProductForm = (props: ProductFormProps) => {
    const { product } = props;

    const [currentSearchParams] = useSearchParams();
    const transition = useTransition();

    /**
     * We update `searchParams` with in-flight request data from `transition` (if available)
     * to create an optimistic UI, e.g. check the product option before the
     * request has completed.
     */
    const searchParams = useMemo(() => {
        return transition.location
            ? new URLSearchParams(transition.location.search)
            : currentSearchParams;
    }, [currentSearchParams, transition]);

    const firstVariant = product.variants.nodes[0];

    /**
     * We're making an explicit choice here to display the product options
     * UI with a default variant, rather than wait for the user to select
     * options first.
     * By default, the first variant's options are used.
     */
    const searchParamsWithDefaults = useMemo<URLSearchParams>(() => {
        const clonedParams = new URLSearchParams(searchParams);

        for (const { name, value } of firstVariant.selectedOptions) {
            if (!searchParams.has(name)) {
                clonedParams.set(name, value);
            }
        }

        return clonedParams;
    }, [searchParams, firstVariant.selectedOptions]);

    /**
     * Likewise, we're defaulting to the first variant for purposes
     * of add to cart if there is none returned from the loader.
     */
    const selectedVariant = product.selectedVariant ?? firstVariant;
    const isOutOfStock = !selectedVariant?.availableForSale;

    const isOnSale =
        selectedVariant?.price?.amount &&
        selectedVariant?.compareAtPrice?.amount &&
        selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

    return (
        <div className="c-product-form">
            {product.options && product.options.length > 0
                ? product.options.map((option, index) => (
                      <Fragment key={`option-${index}-${option.name}`}>
                          {/* // TODO: When user changes radio button then the url needs to update the urls params E.g. ?Study-method=Study%20Pack&Format=Course%20Material%20%2B%20Exams */}
                          <RadioGroup
                              // TODO: Could we update the data in Shopify so the name values reflect the name on the FE?
                              // TODO: Can we change the order in the CMS?
                              description={{ id: `option-${option.name}`, value: option.name }}
                              name={`option-${option.name}`}
                              defaultValue={searchParamsWithDefaults.get(option.name)!}
                              className="c-product-form__radio-group"
                          >
                              {option.values.map((value) => (
                                  <RadioItem
                                      key={`option-${option.name}-${value}`}
                                      id={`option-${option.name}-${value}`}
                                      name={value}
                                      value={value}
                                  />
                              ))}
                          </RadioGroup>
                      </Fragment>
                  ))
                : null}

            {/* // TODO: This needs to come from Shopify once we have the setup */}
            <RadioGroup
                description={{ id: 'payment-options', value: 'Payment Options' }}
                name="payment-options"
                defaultValue="Pay upfront"
                className="c-product-form__radio-group"
            >
                <RadioItem id="payment-option-pay-upfront" name="Pay upfront" value="Pay upfront" />
            </RadioGroup>

            <div className="o-flex o-flex--between o-flex--wrap o-flex--v-center">
                <SaveForLaterButton />

                <div className="o-flex o-flex--stacked o-flex--v-bottom">
                    {/* // TODO: Should be a component as it's reused */}
                    <Money
                        withoutTrailingZeros
                        data={selectedVariant?.price!}
                        as="span"
                        className="t-font-xl u-text-bold u-color-primary u-mb-0"
                    />
                    {isOnSale ? (
                        // TODO: Need to test this and see what changes in styles we can make
                        <Money
                            withoutTrailingZeros
                            data={selectedVariant?.compareAtPrice!}
                            as="span"
                        />
                    ) : null}
                    <span>Course code: {selectedVariant.sku}</span>
                </div>
            </div>

            <ButtonGroup direction="column">
                {isOutOfStock ? <></> : <Button isFull>Add to bag</Button>}

                <Button variant="tertiary" isFull>
                    Request a callback
                </Button>
            </ButtonGroup>
        </div>
    );
};
