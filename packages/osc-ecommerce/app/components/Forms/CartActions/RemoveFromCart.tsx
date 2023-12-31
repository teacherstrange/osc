import { useFetcher } from '@remix-run/react';
import type { CartLine } from '@shopify/hydrogen/storefront-api-types';
import { Button } from 'osc-ui';
import { PATHS } from '~/constants';
import { CartAction } from '~/types/shopify';
import { fetcherIsPending } from '~/utils/storefront.helpers';

interface RemoveFromCartProps {
    lineIds: CartLine['id'][];
}

export const RemoveFromCart = (props: RemoveFromCartProps) => {
    const { lineIds } = props;
    const fetcher = useFetcher();
    const isPending = fetcherIsPending(fetcher);

    return (
        <fetcher.Form method="post" action={`/${PATHS.CART}`}>
            <input type="hidden" name="cartAction" value={CartAction.REMOVE_FROM_CART} />
            <input type="hidden" name="linesIds" value={JSON.stringify(lineIds)} />

            <Button
                variant="quaternary"
                isDisabled={isPending}
                isLoading={isPending}
                loadingText="Remove"
                className="u-text-underline"
            >
                Remove
            </Button>
        </fetcher.Form>
    );
};
