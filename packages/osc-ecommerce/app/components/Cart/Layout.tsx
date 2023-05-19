import { flattenConnection } from '@shopify/hydrogen';
import { mediaQueries as mq } from 'osc-design-tokens';
import { Button, Card, CardBody, CardFooter, CardTitle, Icon, rem, useMediaQuery } from 'osc-ui';
import { useEffect, useState } from 'react';
import { CartCardItem } from '~/components/Cart/CartCardItem';
import { CartTotal } from '~/components/Cart/CartTotal';
import { CartLineItem } from '~/components/Cart/LineItem';
import { PATHS } from '~/constants';
import { useCart } from '~/hooks/useCart';

export const CartLayout = () => {
    const cart = useCart();
    const linesCount = Boolean(cart?.lines?.edges?.length || 0);

    const cartLines = linesCount && cart?.lines ? flattenConnection(cart?.lines) : [];

    console.log('cart', cart);

    const isGreaterThanTab = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);
    const [showOnGreaterThanTab, setShowOnGreaterThanTab] = useState(false);

    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnGreaterThanTab(isGreaterThanTab);
    }, [isGreaterThanTab]);

    return (
        <>
            <header className="o-container o-grid">
                <div className="o-grid__col o-grid__col--11 o-grid__col--start-2@tab">
                    <h1 className="t-font-secondary t-font-5xl u-pt-2xl">
                        Your bag {!linesCount ? <>is empty</> : ''}
                    </h1>
                </div>
            </header>

            <div className="o-container o-grid u-pb-6xl">
                <div className="o-grid__col o-grid__col--12 o-grid__col--6@tab o-grid__col--start-2@tab">
                    {!linesCount ? (
                        // TODO: Make this text CMS editable
                        <p className="t-font-m u-mb-0">
                            We have more than 750 courses and qualifications to choose from,
                            continue browsing and join our family of over 110,000 students today.
                        </p>
                    ) : null}

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
                            className="u-mt-m u-hidden-until@tab"
                        >
                            View Wishlist <Icon id="heart" />
                        </Button>
                    ) : (
                        <Button
                            as="link"
                            to={`/${PATHS.COLLECTIONS}`}
                            variant="secondary"
                            className="u-mt-m u-hidden-until@tab"
                        >
                            Browse our courses
                        </Button>
                    )}
                </div>

                {linesCount ? (
                    <div className="o-grid__col o-grid__col--12 o-grid__col--4@tab">
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
        </>
    );
};
