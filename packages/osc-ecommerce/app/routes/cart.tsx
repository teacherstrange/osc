import type { ActionArgs, LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { flattenConnection } from '@shopify/hydrogen';
import type {
    CartBuyerIdentityInput,
    CartLineInput,
    Cart as CartType,
    CartUserError,
    UserError,
} from '@shopify/hydrogen/storefront-api-types';
import { Button, Card, CardBody, CardFooter, CardTitle, Icon } from 'osc-ui';
import buttonStyles from 'osc-ui/dist/src-components-Button-button.css';
import cardStyles from 'osc-ui/dist/src-components-Card-card.css';
import lineItemStyles from 'osc-ui/dist/src-components-LineItem-line-item.css';
import selectStyles from 'osc-ui/dist/src-components-Select-select.css';
import invariant from 'tiny-invariant';
import { CartCardItem } from '~/components/Cart/CartCardItem';
import { CartTotal } from '~/components/Cart/CartTotal';
import { CartLineItem } from '~/components/Cart/LineItem';
import { PATHS } from '~/constants';
import { useCart } from '~/hooks/useCart';
import type { CartActions } from '~/types/shopify';
import { CartAction } from '~/types/shopify';
import { addLinesToCart, createCart } from '~/utils/cart.helpers';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: buttonStyles },
        { rel: 'stylesheet', href: cardStyles },
        { rel: 'stylesheet', href: lineItemStyles },
        { rel: 'stylesheet', href: selectStyles },
    ];
};

export async function action({ request, context }: ActionArgs) {
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
}

export default function CartRoute() {
    const cart = useCart();
    const linesCount = Boolean(cart?.lines?.edges?.length || 0);

    const cartLines = linesCount && cart?.lines ? flattenConnection(cart?.lines) : [];

    return (
        <>
            <header className="o-container o-grid">
                <div className="o-grid__col o-grid__col--11 o-grid__col--start-2">
                    <h1 className="t-font-secondary t-font-5xl u-pt-2xl">
                        Your bag {linesCount ? '' : <>is empty</>}
                    </h1>
                </div>
            </header>

            <div className="o-container o-grid u-pb-6xl">
                <div className="o-grid__col o-grid__col--6 o-grid__col--start-2">
                    {linesCount ? (
                        <ul>
                            {cartLines.map((line) => {
                                if (!line.id) return null;

                                return <CartCardItem line={line} key={line.id} />;
                            })}
                        </ul>
                    ) : (
                        // TODO: Can make this text CMS editable
                        <p>
                            We have more than 750 courses and qualifications to choose from,
                            continue browsing and join our family of over 110,000 students today.
                        </p>
                    )}

                    <Button as="link" to={`/${PATHS.WISHLIST}`} variant="tertiary">
                        View Wishlist <Icon id="heart" />
                    </Button>
                </div>

                {linesCount ? (
                    <div className="o-grid__col o-grid__col--4">
                        <Card hasShadow className="u-pt-m u-pr-l u-pl-l u-pb-2xl u-h-auto">
                            <CardTitle isUnderlined>Total</CardTitle>
                            <CardBody>
                                <ul>
                                    {cartLines.map((line) => {
                                        if (!line.id) return null;

                                        return <CartLineItem line={line} key={line.id} />;
                                    })}
                                </ul>

                                <CartTotal cost={cart.cost} />
                            </CardBody>

                            <CardFooter>
                                <Button isFull>Enrol now</Button>
                            </CardFooter>
                        </Card>
                    </div>
                ) : null}
            </div>
        </>
    );
}
