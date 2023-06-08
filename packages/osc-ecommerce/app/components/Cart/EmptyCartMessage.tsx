import { useLoaderData } from '@remix-run/react';
import { Button, Content } from 'osc-ui';
import { PATHS } from '~/constants';
import type { LoaderData as CartLoaderData } from '~/routes/cart';

export const EmptyCartMessage = () => {
    const { emptyCartMessage } = useLoaderData<CartLoaderData>();

    return emptyCartMessage ? (
        <>
            <Content value={emptyCartMessage} />

            <Button as="link" to={`/${PATHS.COLLECTIONS}`} variant="secondary" className="u-mt-m">
                Browse our courses
            </Button>
        </>
    ) : null;
};
