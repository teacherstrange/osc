import { Money } from '@shopify/hydrogen';
import type { CartCost } from '@shopify/hydrogen/storefront-api-types';
import { LineItem, LineItemHeader, LineItemPrice, Price } from 'osc-ui';

interface CartTotalProps {
    cost: CartCost;
    isLoading?: boolean;
}

export const CartTotal = (props: CartTotalProps) => {
    const { cost, isLoading } = props;

    return (
        <LineItem variant="tertiary" asChild>
            <div data-anim={isLoading ? 'shimmer' : ''}>
                <LineItemHeader className="t-font-l u-text-bold u-mb-0">Total</LineItemHeader>

                {cost?.totalAmount?.amount ? (
                    <LineItemPrice asChild>
                        <Price>
                            <Money
                                data={cost?.totalAmount}
                                as="span"
                                className="t-font-l u-text-bold"
                            />
                        </Price>
                    </LineItemPrice>
                ) : null}
            </div>
        </LineItem>
    );
};
