import { Money } from '@shopify/hydrogen';
import type { CartCost } from '@shopify/hydrogen/storefront-api-types';
import { LineItem, LineItemHeader, LineItemPrice, Price } from 'osc-ui';

interface CartTotalProps {
    cost: CartCost;
    isLoading?: boolean;
}

export const CartTotal = (props: CartTotalProps) => {
    const { cost, isLoading } = props;

    const { totalAmount, subtotalAmount } = cost;

    const hasCartDiscount =
        totalAmount.amount && subtotalAmount.amount && totalAmount.amount < subtotalAmount.amount;

    return (
        <>
            <LineItem variant="tertiary" asChild>
                <div data-anim={isLoading ? 'shimmer' : ''}>
                    <LineItemHeader className="t-font-m u-mb-0 u-color-neutral-700 u-text-reg">
                        Subtotal
                    </LineItemHeader>

                    {subtotalAmount?.amount ? (
                        <LineItemPrice asChild>
                            <Price size="sm">
                                <Money
                                    data={subtotalAmount}
                                    as="span"
                                    className="t-font-m u-color-neutral-700 u-text-bold"
                                />
                            </Price>
                        </LineItemPrice>
                    ) : null}
                </div>
            </LineItem>

            <LineItem variant="tertiary" asChild>
                <div data-anim={isLoading ? 'shimmer' : ''}>
                    <LineItemHeader className="t-font-l u-text-bold u-mb-0">Total</LineItemHeader>

                    {totalAmount?.amount ? (
                        <LineItemPrice asChild>
                            <Price
                                compareAtPrice={
                                    hasCartDiscount ? (
                                        <Money data={subtotalAmount} as="span" />
                                    ) : null
                                }
                            >
                                <Money
                                    data={totalAmount}
                                    as="span"
                                    className="t-font-l u-text-bold"
                                />
                            </Price>
                        </LineItemPrice>
                    ) : null}
                </div>
            </LineItem>
        </>
    );
};
