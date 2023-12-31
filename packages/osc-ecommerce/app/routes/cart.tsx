import type { PortableTextBlock } from '@portabletext/types';
import type { ActionArgs, ActionFunction, LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import type {
    CartBuyerIdentityInput,
    CartLineInput,
    Cart as CartType,
    CartUserError,
    UserError,
} from '@shopify/hydrogen/storefront-api-types';
import accordionStyles from 'osc-ui/dist/src-components-Accordion-accordion.css';
import alertStyles from 'osc-ui/dist/src-components-Alert-alert.css';
import buttonStyles from 'osc-ui/dist/src-components-Button-button.css';
import cardStyles from 'osc-ui/dist/src-components-Card-card.css';
import flourishStyles from 'osc-ui/dist/src-components-Flourishes-flourish.css';
import lineItemStyles from 'osc-ui/dist/src-components-LineItem-line-item.css';
import selectStyles from 'osc-ui/dist/src-components-Select-select.css';
import textInputStyles from 'osc-ui/dist/src-components-TextInput-text-input.css';
import invariant from 'tiny-invariant';
import discountBoxStyles from '~/components/Cart/DiscountBox/discount-box.css';
import { CartLayout } from '~/components/Cart/Layout';
import { getSettingsData } from '~/models/sanity.server';
import { CART_QUERY } from '~/queries/sanity/cart';
import type { CartActions } from '~/types/shopify';
import { CartAction } from '~/types/shopify';
import {
    addLinesToCart,
    createCart,
    removeLinesFromCart,
    updateCartBuyerIdentity,
    updateCartDiscounts,
    updateLinesInCart,
} from '~/utils/cart.helpers';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: accordionStyles },
        { rel: 'stylesheet', href: alertStyles },
        { rel: 'stylesheet', href: buttonStyles },
        { rel: 'stylesheet', href: cardStyles },
        { rel: 'stylesheet', href: discountBoxStyles },
        { rel: 'stylesheet', href: flourishStyles },
        { rel: 'stylesheet', href: lineItemStyles },
        { rel: 'stylesheet', href: selectStyles },
        { rel: 'stylesheet', href: textInputStyles },
    ];
};

export type LoaderData = {
    emptyCartMessage: PortableTextBlock[];
};

export const loader: LoaderFunction = async () => {
    const emptyCartMessage = await getSettingsData({
        query: CART_QUERY,
    });

    return json<LoaderData>(emptyCartMessage);
};

export const action: ActionFunction = async ({ request, context }: ActionArgs) => {
    const { session, storefront } = context;
    const headers = new Headers();

    const [formData, storedCartId, customerAccessToken] = await Promise.all([
        request.formData(),
        session.get('cartId'),
        session.get('customerAccessToken'),
    ]);

    let cartId = storedCartId;

    const cartAction = formData.get('cartAction') as CartActions;
    invariant(cartAction, 'No cartAction defined');

    const countryCode = formData.get('countryCode')
        ? (formData.get('countryCode') as CartBuyerIdentityInput['countryCode'])
        : null;

    let status = 200;
    let result: {
        cart: CartType;
        errors?: CartUserError[] | UserError[];
    };

    switch (cartAction) {
        case CartAction.ADD_TO_CART:
            const lines = formData.get('lines')
                ? (JSON.parse(String(formData.get('lines'))) as CartLineInput[])
                : ([] as CartLineInput[]);

            try {
                invariant(lines.length, 'No lines to add');

                /**
                 * If no previous cart exists, create one with the lines.
                 */
                if (!cartId) {
                    result = await createCart({
                        input: countryCode ? { lines, buyerIdentity: { countryCode } } : { lines },
                        storefront,
                    });
                } else {
                    result = await addLinesToCart({
                        cartId,
                        lines,
                        storefront,
                    });
                }

                cartId = result.cart.id;
            } catch (error) {
                console.error(error);

                result = {
                    cart: {} as CartType,
                    errors: [
                        {
                            code: 'INVALID',
                            message: 'No lines to add',
                        },
                    ],
                };
            }

            break;

        case CartAction.REMOVE_FROM_CART:
            const lineIds = formData.get('linesIds')
                ? (JSON.parse(String(formData.get('linesIds'))) as CartType['id'][])
                : ([] as CartType['id'][]);

            try {
                invariant(lineIds.length, 'No lines to remove');

                result = await removeLinesFromCart({
                    cartId,
                    lineIds,
                    storefront,
                });

                cartId = result.cart.id;
            } catch (error) {
                console.error(error);

                result = {
                    cart: {} as CartType,
                    errors: [
                        {
                            code: 'INVALID',
                            message: 'No lines to remove',
                        },
                    ],
                };
            }

            break;

        case CartAction.UPDATE_CART:
            const updateLinesIds = formData.get('linesIds')
                ? (JSON.parse(String(formData.get('linesIds'))) as CartType['id'][])
                : ([] as CartType['id'][]);
            const productId = String(formData.get('productId'));
            const selectedOptions = JSON.parse(String(formData.get('selectedOptions')));

            try {
                invariant(updateLinesIds.length, 'No lines to update');

                result = await updateLinesInCart({
                    cartId,
                    linesIds: updateLinesIds,
                    productId,
                    selectedOptions,
                    storefront,
                });

                cartId = result.cart.id;
            } catch (error) {
                console.error(error);

                result = {
                    cart: {} as CartType,
                    errors: [
                        {
                            code: 'INVALID',
                            message: 'No lines to update',
                        },
                    ],
                };
            }

            break;

        case CartAction.UPDATE_DISCOUNT:
            try {
                invariant(cartId, 'Missing cartId');

                const applicableDiscountCodes = formData.get('applicableDiscountCodes')
                    ? JSON.parse(String(formData.get('applicableDiscountCodes')))
                    : ('' as string);

                const formDiscountCode = formData.get('discountCode');
                const discountCodes = ([...applicableDiscountCodes, formDiscountCode] || [
                    '',
                ]) as string[];

                result = await updateCartDiscounts({
                    cartId,
                    discountCodes,
                    storefront,
                });

                cartId = result.cart.id;
            } catch (e) {
                console.error(e);

                result = {
                    cart: {} as CartType,
                    errors: [
                        {
                            code: 'INVALID',
                            message: 'Missing cartId',
                        },
                    ],
                };
            }

            break;

        case CartAction.UPDATE_BUYER_IDENTITY:
            const buyerIdentity = formData.get('buyerIdentity')
                ? (JSON.parse(String(formData.get('buyerIdentity'))) as CartBuyerIdentityInput)
                : ({} as CartBuyerIdentityInput);

            try {
                invariant(buyerIdentity, 'No buyer identity to update');

                result = cartId
                    ? await updateCartBuyerIdentity({
                          cartId,
                          buyerIdentity: {
                              ...buyerIdentity,
                              customerAccessToken,
                          },
                          storefront,
                      })
                    : await createCart({
                          input: {
                              buyerIdentity: {
                                  ...buyerIdentity,
                                  customerAccessToken,
                              },
                          },
                          storefront,
                      });

                cartId = result.cart.id;
            } catch (error) {
                console.error(error);

                result = {
                    cart: {} as CartType,
                    errors: [
                        {
                            code: 'INVALID',
                            message: 'No buyer identity to update',
                        },
                    ],
                };
            }

            break;

        default:
            invariant(false, `${cartAction} cart action is not defined`);
    }

    /**
     * The Cart ID may change after each mutation. We need to update it each time in the session.
     */
    session.set('cartId', cartId);
    headers.set('Set-Cookie', await session.commit());

    const { cart, errors } = result;

    return json(
        {
            cart,
            errors,
            analytics: {
                cartId,
            },
        },
        { status, headers }
    );
};

export default function CartRoute() {
    return <CartLayout />;
}
