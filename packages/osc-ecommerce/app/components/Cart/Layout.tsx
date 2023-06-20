import { useActionData, useFetchers } from '@remix-run/react';
import { flattenConnection } from '@shopify/hydrogen';
import type { CartLine } from '@shopify/hydrogen/storefront-api-types';
import { mediaQueries as mq } from 'osc-design-tokens';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Flourishes,
    Icon,
    flourishPrimary,
    rem,
    useMediaQuery,
} from 'osc-ui';
import { useEffect, useState } from 'react';
import { CartCardItem } from '~/components/Cart/CartCardItem';
import { CartTotal } from '~/components/Cart/CartTotal';
import { DiscountBox } from '~/components/Cart/DiscountBox/DiscountBox';
import { EmptyCartMessage } from '~/components/Cart/EmptyCartMessage';
import { CartLineItem } from '~/components/Cart/LineItem';
import { ErrorAlert } from '~/components/ErrorAlert/ErrorAlert';
import { PATHS } from '~/constants';
import { useCart } from '~/hooks/useCart';
import { CartAction } from '~/types/shopify';
import { getDifferenceBetweenArrays } from '~/utils/getDifferenceBetweenArrays';
import { fetcherHasError, fetcherIsPending } from '~/utils/storefront.helpers';
import { RemovedFromCardMessage } from './RemovedFromCartMessage';

export const CartLayout = () => {
    const cart = useCart();
    const action = useActionData();
    const isGreaterThanTab = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);
    const [showOnGreaterThanTab, setShowOnGreaterThanTab] = useState(false);
    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnGreaterThanTab(isGreaterThanTab);
    }, [isGreaterThanTab]);

    // Get the number of lines in the cart from the cart object
    const linesCount = Boolean(cart?.lines?.edges?.length || 0);

    // Here we're grabbing all of the fetchers that are currently firing
    // and filtering them down to the ones that are submitting
    const allFetchers = useFetchers();
    const pendingFetchers = allFetchers.filter((f) => fetcherIsPending(f));

    // We only want to show the loading state for the fetchers that are removing or updating lines
    const cartLineActionFetchers = pendingFetchers.filter(
        (f) =>
            f.formData?.get('cartAction') === CartAction.REMOVE_FROM_CART ||
            f.formData?.get('cartAction') === CartAction.UPDATE_CART
    );

    // Create an array of line ids that are currently being removed from the cart
    const pendingLineIds = cartLineActionFetchers.map(
        (f) => JSON.parse(String(f.submission?.formData.get('linesIds')) || '[]')[0]
    );
    const lineIsPending = (line: string) => pendingLineIds.includes(line);
    const linesArePending = pendingLineIds.length > 0;

    // Get the fetchers that are updating the discount code
    const discountCodeFetchers = pendingFetchers.filter(
        (f) => f.formData?.get('cartAction') === CartAction.UPDATE_DISCOUNT
    );
    const discountCodeIsPending = discountCodeFetchers.length > 0;

    // Get any fetchers that have errors
    const fetchersWithErrors = allFetchers.filter((f) => fetcherHasError(f));

    const cartLines = linesCount && cart?.lines ? flattenConnection(cart?.lines) : [];
    // Store the cart lines in state so we can compare them to the cart lines in the cart object when the component updates
    const [cartLineItems] = useState(cartLines);
    // Compare the cart lines in state to the cart lines in the cart object so we can determine which lines were removed
    const removedItems = getDifferenceBetweenArrays(
        cartLineItems as CartLine[],
        cartLines as CartLine[],
        'id'
    );

    return (
        <Flourishes color="gradient-senary" pattern={flourishPrimary} variant="primary">
            <header className="o-container o-grid">
                <div className="o-grid__col o-grid__col--11 o-grid__col--start-2@tab">
                    <h1 className="t-font-secondary t-font-5xl u-pt-2xl">
                        Your bag {!linesCount ? <>is empty</> : ''}
                    </h1>
                </div>
            </header>

            <div className="o-container o-grid u-pb-6xl">
                {fetchersWithErrors.length > 0 || action?.errors.length > 0 ? (
                    <div className="o-grid__col o-grid__col--12 o-grid__col--10@tab o-grid__col--start-2@tab">
                        <ErrorAlert
                            errors={
                                fetchersWithErrors.length > 0 ? fetchersWithErrors : action?.errors
                            }
                        />
                    </div>
                ) : null}

                <div className="o-grid__col o-grid__col--12 o-grid__col--6@tab o-grid__col--start-2@tab">
                    {removedItems && removedItems.length > 0 ? (
                        <ul>
                            {removedItems.map((line) => (
                                <RemovedFromCardMessage line={line} key={line.id} />
                            ))}
                        </ul>
                    ) : null}

                    {!linesCount ? <EmptyCartMessage /> : null}

                    {linesCount && showOnGreaterThanTab ? (
                        <ul hidden={!linesCount}>
                            {cartLines.map((line) => {
                                if (!line.id) return null;

                                return (
                                    <CartCardItem
                                        line={line}
                                        key={line.id}
                                        isLoading={lineIsPending(line.id)}
                                    />
                                );
                            })}
                        </ul>
                    ) : null}

                    {linesCount ? (
                        <Button
                            as="link"
                            to={`/${PATHS.WISHLIST}`}
                            variant="tertiary"
                            className="u-hidden-until@tab"
                        >
                            View Wishlist <Icon id="heart" />
                        </Button>
                    ) : null}
                </div>

                {linesCount ? (
                    <div
                        className="o-grid__col o-grid__col--12 o-grid__col--4@tab"
                        hidden={!linesCount}
                    >
                        <div className="is-sticky-from@tab">
                            <Card hasShadow className="u-pt-m u-pr-l u-pl-l u-pb-2xl u-h-auto">
                                <CardTitle isUnderlined>Total</CardTitle>
                                <CardBody>
                                    <ul>
                                        {cartLines.map((line) => {
                                            if (!line.id) return null;

                                            return showOnGreaterThanTab ? (
                                                <CartLineItem
                                                    line={line}
                                                    key={line.id}
                                                    isLoading={lineIsPending(line.id)}
                                                />
                                            ) : (
                                                <CartCardItem
                                                    line={line}
                                                    key={line.id}
                                                    isLoading={lineIsPending(line.id)}
                                                />
                                            );
                                        })}
                                    </ul>

                                    <DiscountBox
                                        title="Have a discount code?"
                                        description="Please note: We only publish discount codes online via official Open Study College channels."
                                        discountCodes={cart?.discountCodes}
                                    />

                                    <CartTotal
                                        cost={cart.cost}
                                        isLoading={linesArePending || discountCodeIsPending}
                                    />
                                </CardBody>

                                <CardFooter className="u-pt-xl">
                                    <Button
                                        as="a"
                                        href={cart.checkoutUrl}
                                        isFull
                                        isDisabled={linesArePending || discountCodeIsPending}
                                        isLoading={linesArePending || discountCodeIsPending}
                                    >
                                        Enrol now
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Button
                                as="link"
                                to={`/${PATHS.COLLECTIONS}`}
                                variant="tertiary"
                                className="u-mt-m u-hidden-until@tab"
                            >
                                Add more courses
                            </Button>

                            <Button
                                as="link"
                                to={`/${PATHS.COLLECTIONS}`}
                                variant="tertiary"
                                isFull
                                className="u-mt-l u-hidden-from@tab"
                            >
                                Add more courses <Icon id="plus" />
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
        </Flourishes>
    );
};
