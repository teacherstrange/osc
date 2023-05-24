import { flattenConnection } from '@shopify/hydrogen';
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
import { CartLineItem } from '~/components/Cart/LineItem';
import { PATHS } from '~/constants';
import { useCart } from '~/hooks/useCart';
import { EmptyCartMessage } from './EmptyCartMessage';

export const CartLayout = () => {
    const cart = useCart();
    const linesCount = Boolean(cart?.lines?.edges?.length || 0);

    const cartLines = linesCount && cart?.lines ? flattenConnection(cart?.lines) : [];

    const isGreaterThanTab = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);
    const [showOnGreaterThanTab, setShowOnGreaterThanTab] = useState(false);

    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnGreaterThanTab(isGreaterThanTab);
    }, [isGreaterThanTab]);

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
                <div className="o-grid__col o-grid__col--12 o-grid__col--6@tab o-grid__col--start-2@tab">
                    {!linesCount ? <EmptyCartMessage /> : null}

                    {linesCount && showOnGreaterThanTab ? (
                        <>
                            <ul>
                                {cartLines.map((line) => {
                                    if (!line.id) return null;

                                    return <CartCardItem line={line} key={line.id} />;
                                })}
                            </ul>
                        </>
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
                    <div className="o-grid__col o-grid__col--12 o-grid__col--4@tab">
                        <div className="is-sticky-from@tab">
                            <Card hasShadow className="u-pt-m u-pr-l u-pl-l u-pb-2xl u-h-auto">
                                <CardTitle isUnderlined>Total</CardTitle>
                                <CardBody>
                                    <ul>
                                        {cartLines.map((line) => {
                                            if (!line.id) return null;

                                            return showOnGreaterThanTab ? (
                                                <CartLineItem line={line} key={line.id} />
                                            ) : (
                                                <CartCardItem line={line} key={line.id} />
                                            );
                                        })}
                                    </ul>

                                    <CartTotal cost={cart.cost} />
                                </CardBody>

                                <CardFooter className="u-pt-xl">
                                    <Button as="a" href={cart.checkoutUrl} isFull>
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
                        </div>
                    </div>
                ) : null}

                <div className="o-grid__col o-grid__col--12 u-hidden-from@tab">
                    <Button
                        as="link"
                        to={`/${PATHS.COLLECTIONS}`}
                        variant="tertiary"
                        isFull
                        className="u-mt-l"
                    >
                        Add more courses <Icon id="plus" />
                    </Button>
                </div>
            </div>
        </Flourishes>
    );
};
