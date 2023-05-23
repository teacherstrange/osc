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
import buttonStyles from 'osc-ui/dist/src-components-Button-button.css';
import cardStyles from 'osc-ui/dist/src-components-Card-card.css';
import lineItemStyles from 'osc-ui/dist/src-components-LineItem-line-item.css';
import selectStyles from 'osc-ui/dist/src-components-Select-select.css';
import invariant from 'tiny-invariant';
import { CartLayout } from '~/components/Cart/Layout';
import { getSettingsData } from '~/models/sanity.server';
import { CART_QUERY } from '~/queries/sanity/cart';

import type { CartActions } from '~/types/shopify';
import { CartAction } from '~/types/shopify';
import { addLinesToCart, createCart } from '~/utils/cart.helpers';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: accordionStyles },
        { rel: 'stylesheet', href: buttonStyles },
        { rel: 'stylesheet', href: cardStyles },
        { rel: 'stylesheet', href: lineItemStyles },
        { rel: 'stylesheet', href: selectStyles },
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

    const [
        formData,
        storedCartId,
        // In Hydrogen demo store this is used when updating the buyer identity
        // Leaving this here for now, I'll add the buyer identity function in the future
        // TODO: Remove this comment when buyer identity function is added in future sprint
        // customerAccessToken,
    ] = await Promise.all([
        request.formData(),
        session.get('cartId'),
        // session.get('customerAccessToken'),
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
