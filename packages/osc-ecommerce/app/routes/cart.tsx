import { flattenConnection } from '@shopify/hydrogen';
import type {
    CartBuyerIdentityInput,
    CartLineInput,
    Cart as CartType,
    CartUserError,
    UserError,
} from '@shopify/hydrogen/storefront-api-types';
import type { ActionArgs } from '@shopify/remix-oxygen';
import { json } from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';
import { useCart } from '~/hooks/useCart';
import type { CartActions } from '~/types/shopify';
import { CartAction } from '~/types/shopify';
import { addLinesToCart, createCart } from '~/utils/cart.helpers';

export async function action({ request, context }: ActionArgs) {
    const { session, storefront } = context;
    const headers = new Headers();

    const [
        formData,
        storedCartId,
        // In Hydrogen demo store this is used when updating the buyer identity
        // Leaving this here for now, I'll add the buyer identity function in the future
        // TODO: Remove this comment when buyer identity function is added in future sprint
        customerAccessToken,
    ] = await Promise.all([
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
}

export default function CartRoute() {
    const cart = useCart();
    const linesCount = Boolean(cart?.lines?.edges?.length || 0);

    if (!linesCount) {
        return <p>Looks like you haven't added anything to your cart.</p>;
    }
    const cartLines = cart?.lines ? flattenConnection(cart?.lines) : [];

    return (
        <>
            <h1>Cart</h1>
            <ul>
                {cartLines.map((line) => (
                    <div key={line.id}>
                        <h2>
                            {line?.merchandise?.product?.title} - {line?.merchandise?.title}
                        </h2>
                    </div>
                ))}
            </ul>
        </>
    );
}
