import { Form, useLoaderData, useNavigation, useSearchParams, useSubmit } from '@remix-run/react';
import type {
    ProductOption,
    Product as ProductType,
    ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import { Button, ButtonGroup, RadioGroup, RadioItem, classNames, useModifier } from 'osc-ui';
import type { ElementRef, FormEvent } from 'react';
import { forwardRef, useMemo } from 'react';
import { AlreadyInCartMessage } from '~/components/Cart/AlreadyInCartMessage';
import { Price } from '~/components/Price/Price';
import { useCart } from '~/hooks/useCart';
import { isGiftVoucher } from '~/utils/storefront.helpers';
import { AddToCart } from '../CartActions/AddToCart';

interface Product {
    product: ProductType & { selectedVariant?: ProductVariant };
}

interface ProductFormProps {
    id: string;
    direction?: 'right' | 'bottom';
}

export const ProductForm = forwardRef<ElementRef<'div'>, ProductFormProps>(
    (props, forwardedRef) => {
        const { id, direction } = props;
        const { product } = useLoaderData<Product>();
        const cart = useCart();

        const [currentSearchParams] = useSearchParams();
        const transition = useNavigation();
        const directionModifier = useModifier('c-product-form', direction);
        const submit = useSubmit();

        const transitionIsNotIdle =
            transition.state !== 'idle' && transition.formAction ? true : false;

        const classes = classNames(
            'c-product-form',
            transitionIsNotIdle ? 'is-loading' : '',
            directionModifier
        );

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

        /**
         * If variant is already in the cart then we want to prevent the user from adding it a second time
         * However we do want to allow the user to add a gift voucher to the cart multiple times
         */
        const isAlreadyInCart = cart?.lines.edges.some(
            (line) =>
                !isGiftVoucher(selectedVariant) &&
                line.node.merchandise?.product?.id === selectedVariant?.product?.id
        );

        return (
            <div
                className={classes}
                ref={forwardedRef}
                data-anim={transitionIsNotIdle ? 'shimmer' : ''}
            >
                <Form onChange={handleSubmit} className="c-product-form__form">
                    {product.options && product.options.length > 0
                        ? product.options.map((option, index) => {
                              return (
                                  <Options
                                      // Here we're passing the searchParamsWithDefaults as part of the key so the options remount when searchParams changes
                                      // This is needed to keep the main form and the drawer forms in sync
                                      key={`${id}-${index}-${
                                          option.name
                                      }-${searchParamsWithDefaults.get(option.name)}`}
                                      id={id}
                                      option={option}
                                      searchParamsWithDefaults={searchParamsWithDefaults}
                                  />
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
                    <RadioItem
                        id="payment-option-pay-upfront"
                        name="Pay upfront"
                        value="Pay upfront"
                    />
                </RadioGroup>

                <div className="o-flex o-flex--end o-flex--wrap o-flex--v-center">
                    {/* // TODO: add this back in once Wishlist is ready  */}
                    {/* <SaveForLaterButton /> */}

                    <Price selectedVariant={selectedVariant} />
                </div>

                <ButtonGroup direction="column">
                    {!isOutOfStock ? (
                        <AddToCart
                            isDisabled={transitionIsNotIdle}
                            lines={[
                                {
                                    merchandiseId: selectedVariant.id,
                                    // Don't update the quantity if the item is already in the cart
                                    quantity: !isAlreadyInCart ? 1 : 0,
                                },
                            ]}
                            isDisabled={transitionIsNotIdle || isAlreadyInCart}
                            label={isAlreadyInCart ? 'Added to cart' : 'Add to cart'}
                        />
                    ) : (
                        <></>
                    )}

                    <Button
                        variant="tertiary"
                        isFull
                        as="link"
                        to="/contact"
                        isDisabled={transitionIsNotIdle}
                    >
                        Request a callback
                    </Button>
                </ButtonGroup>

                {isAlreadyInCart ? <AlreadyInCartMessage /> : null}
            </div>
        );
    }
);
ProductForm.displayName = 'ProductForm';

/* -------------------------------------------------------------------------------------------------
 * Product Options
 * -----------------------------------------------------------------------------------------------*/
interface OptionsProps {
    id: string;
    option: ProductOption;
    searchParamsWithDefaults: URLSearchParams;
}

const Options = (props: OptionsProps) => {
    const { id, option, searchParamsWithDefaults } = props;

    return (
        <RadioGroup
            // TODO: Waiting for Tom to update the import so we have the correct option names on the FE
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
                    key={`${id}-${option.name}-${value}`}
                    id={`${id}-${option.name}-${value}`}
                    name={value}
                    value={value}
                />
            ))}
        </RadioGroup>
    );
};
