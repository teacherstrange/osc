import { Link } from '@remix-run/react';
import { Alert, Button, Icon } from 'osc-ui';
import { useState } from 'react';
import { PATHS } from '~/constants';
import type { CartLineWithSanityData } from '~/types/shopify';

interface CartCardItemProps {
    line: CartLineWithSanityData;
}

export const RemovedFromCardMessage = (props: CartCardItemProps) => {
    const { line } = props;
    const [hidden, setHidden] = useState<boolean>(false);

    return (
        <li hidden={hidden}>
            <Alert status="info">
                <p className="u-mb-0">
                    <Link
                        to={`/${PATHS.PRODUCTS}/${line?.merchandise?.product?.handle}`}
                        className="u-text-bold"
                    >
                        {line?.merchandise?.product?.title}
                    </Link>{' '}
                    has been removed from the cart
                </p>

                <Button
                    variant="quaternary"
                    size="sm"
                    className="u-ml-auto"
                    onClick={() => setHidden(true)}
                >
                    <Icon id="close" />
                </Button>
            </Alert>
        </li>
    );
};
