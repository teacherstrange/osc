import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import type { CartLine } from '@shopify/hydrogen/storefront-api-types';
import { Button, LineItem, LineItemGroup, LineItemHeader, LineItemPrice, Price } from 'osc-ui';
import { PATHS } from '~/constants';

interface CartLineItemProps {
    line: CartLine;
}

export const CartLineItem = (props: CartLineItemProps) => {
    const { line } = props;

    if (typeof line.quantity === 'undefined' || !line.merchandise?.product) return null;

    return (
        <LineItem variant="primary" asChild>
            <li>
                <LineItemGroup>
                    <LineItemHeader className="u-mb-0">
                        <Link to={`/${PATHS.PRODUCTS}/${line?.merchandise?.product?.handle}`}>
                            {line?.merchandise?.product?.title}
                        </Link>
                    </LineItemHeader>
                    <Button variant="quaternary" className="u-text-underline">
                        Remove
                    </Button>
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

    return (
        <LineItemPrice asChild>
            <Price>
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
