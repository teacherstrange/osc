import { Form } from '@remix-run/react';
import type { CartLineInput } from '@shopify/hydrogen/storefront-api-types';
import { Button } from 'osc-ui';
import { CartAction } from '~/types/shopify';

interface AddToCartFormProps {
    label: string;
    lines: CartLineInput[];
    isDisabled?: boolean;
    analytics?: unknown;
}
export const AddToCart = (props: AddToCartFormProps) => {
    const { label, lines, analytics, isDisabled } = props;

    return (
        <Form action="/cart" method="post" className="u-w-full">
            <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
            <input type="hidden" name="lines" value={JSON.stringify(lines)} />
            <input type="hidden" name="analytics" value={JSON.stringify(analytics)} />

            <Button isFull isDisabled={isDisabled}>
                {label}
            </Button>
        </Form>
    );
};
