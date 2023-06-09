import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import type { CartLine } from '@shopify/hydrogen/storefront-api-types';
import { LineItem, LineItemGroup, LineItemHeader, LineItemPrice, Price } from 'osc-ui';
import { PATHS } from '~/constants';
import { RemoveFromCart } from '../Forms/CartActions/RemoveFromCart';

interface CartLineItemProps {
    line: CartLine;
    isLoading?: boolean;
}

export const CartLineItem = (props: CartLineItemProps) => {
    const { line, isLoading } = props;

    if (typeof line.quantity === 'undefined' || !line.merchandise?.product) return null;

    return (
        <LineItem variant="primary" asChild>
            <li data-anim={isLoading ? 'shimmer' : ''}>
                <LineItemGroup>
                    <LineItemHeader className="u-mb-0">
                        <Link to={`/${PATHS.PRODUCTS}/${line?.merchandise?.product?.handle}`}>
                            {line?.merchandise?.product?.title}
                        </Link>
                    </LineItemHeader>

                    <RemoveFromCart lineIds={[line?.id]} />
                </LineItemGroup>

                <CartLineItemPrice line={line} />
            </li>
        </LineItem>
    );
};

interface CartLineItemPriceProps {
    line: CartLine;
}

const CartLineItemPrice = (props: CartLineItemPriceProps) => {
    const { line } = props;

    if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

    console.log(line);

    const { amountPerQuantity, totalAmount } = line?.cost;

    const isOnSale =
        totalAmount?.amount &&
        amountPerQuantity?.amount &&
        totalAmount?.amount < amountPerQuantity?.amount;

    return (
        <LineItemPrice asChild>
            <Price
                size="sm"
                compareAtPrice={isOnSale ? <Money data={amountPerQuantity} as="span" /> : null}
            >
                <Money
                    data={line?.cost?.totalAmount}
                    as="span"
                    className="t-font-m u-mb-0 u-text-right"
                />
                {/* // TODO: This in full value needs to change depending on etika */}
                <p className="t-font-s u-color-neutral-700 u-mb-0 u-text-right">Pay in full</p>
            </Price>
        </LineItemPrice>
    );
};
