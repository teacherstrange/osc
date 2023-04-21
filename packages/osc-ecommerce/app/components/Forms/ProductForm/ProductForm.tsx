import { Form, useNavigation, useSearchParams, useSubmit } from '@remix-run/react';
import type {
    Product as ProductType,
    ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import { Button, ButtonGroup, RadioGroup, RadioItem } from 'osc-ui';
import type { FormEvent } from 'react';
import { Fragment, useMemo } from 'react';
import { Price } from '~/components/Price/Price';

interface ProductFormProps {
    product: ProductType & { selectedVariant?: ProductVariant };
}
export const ProductForm = (props: ProductFormProps) => {
    const { product } = props;
    const [currentSearchParams] = useSearchParams();
    const transition = useNavigation();
    const submit = useSubmit();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        submit(e.currentTarget, {
            // Replace history stack so users can go back without having to revisit every selected option
            replace: true,
            // As we're using a 'get' method we want to make sure the page doesn't move around when the form is submitted
            preventScrollReset: true,
        });
    };

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

    return (
        <div className="c-product-form">
            <Form onChange={handleSubmit} className="c-product-form__form">
                {product.options && product.options.length > 0
                    ? product.options.map((option, index) => {
                          return (
                              <Fragment key={`option-${index}-${option.name}`}>
                                  <RadioGroup
                                      // TODO: Could we update the data in Shopify so the name values reflect the name on the FE?
                                      // TODO: Can we change the order in the CMS?
                                      description={{
                                          id: option.name,
                                          value: `<h2 class="t-font-l u-text-bold u-color-secondary">${option.name}</h2>`,
                                      }}
                                      name={option.name}
                                      defaultValue={searchParamsWithDefaults.get(option.name)!}
                                      direction={option.name === 'Format' ? 'column' : 'row'}
                                      className="c-product-form__radio-group c-radio-group--col-gap-l"
                                  >
                                      {option.values.map((value) => (
                                          <RadioItem
                                              key={`${option.name}-${value}`}
                                              id={`${option.name}-${value}`}
                                              name={value}
                                              value={value}
                                          />
                                      ))}
                                  </RadioGroup>
                              </Fragment>
                          );
                      })
                    : null}
            </Form>

            {/*
                // TODO: This needs to come from Shopify once we have the setup
                // TODO: Add to above form when this is available in Shopify, currently causes form to fail to submit correctly as the options are not available
            */}
            <RadioGroup
                description={{
                    id: 'payment-options',
                    value: '<h2 class="t-font-l u-text-bold u-color-secondary">Payment Options</h2>',
                }}
                name="payment-options"
                defaultValue="Pay upfront"
                direction="row"
                className="c-product-form__radio-group"
            >
                <RadioItem id="payment-option-pay-upfront" name="Pay upfront" value="Pay upfront" />
            </RadioGroup>

            <div className="o-flex o-flex--end o-flex--wrap o-flex--v-center">
                {/* // TODO: add this back in once Wishlist is ready  */}
                {/* <SaveForLaterButton /> */}

                <Price selectedVariant={selectedVariant} />
            </div>

            <ButtonGroup direction="column">
                {isOutOfStock ? <></> : <Button isFull>Add to bag</Button>}

                <Button variant="tertiary" isFull as="link" to="/contact">
                    Request a callback
                </Button>
            </ButtonGroup>
        </div>
    );
};
