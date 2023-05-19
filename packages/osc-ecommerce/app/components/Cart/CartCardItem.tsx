import { Link } from '@remix-run/react';
import type { CartLine } from '@shopify/hydrogen/storefront-api-types';
import { mediaQueries as mq } from 'osc-design-tokens';
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardInner,
    CardPriceTag,
    CardTitle,
    Select,
    SelectItem,
    rem,
    useMediaQuery,
} from 'osc-ui';
import { useEffect, useState } from 'react';
import { Price } from '~/components/Price/Price';
import { PATHS } from '~/constants';

interface CartCardItemProps {
    line: CartLine;
}

export const CartCardItem = (props: CartCardItemProps) => {
    const { line } = props;

    const isGreaterThanTab = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);
    const [showOnGreaterThanTab, setShowOnGreaterThanTab] = useState(false);

    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnGreaterThanTab(isGreaterThanTab);
    }, [isGreaterThanTab]);

    if (typeof line.quantity === 'undefined' || !line.merchandise?.product) return null;

    return (
        <li className={showOnGreaterThanTab ? '' : 'u-mt-2xl'}>
            <Card hasBorder isTransparent>
                <CardInner>
                    <CardHeader>
                        <CardTitle isUnderlined>
                            <Link to={`/${PATHS.PRODUCTS}/${line?.merchandise?.product?.handle}`}>
                                {line?.merchandise?.product?.title}
                            </Link>
                        </CardTitle>
                        <CardTitle as="h3" subtitle isSmall isThemeable position="bottom">
                            Single course
                        </CardTitle>
                    </CardHeader>

                    <CardBody isNarrow>
                        <p className="u-mb-l u-hidden-until@tab">
                            {/* // TODO: Pull from Sanity probs */}
                            Offer information Lorem ipsum dolor sit amet, consectetur. Offer
                            information Lorem ipsum dolor sit amet, consectetur.
                        </p>

                        {showOnGreaterThanTab ? (
                            <Options merchandise={line?.merchandise} />
                        ) : (
                            <Accordion collapsible type="single" variant="quaternary">
                                <AccordionItem value="0">
                                    <AccordionHeader asChild as="h2" icon="chevron">
                                        View options
                                    </AccordionHeader>
                                    <AccordionPanel>
                                        <Options merchandise={line?.merchandise} />
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        )}
                    </CardBody>

                    <CardFooter className="u-pt-xl">
                        <ButtonGroup direction="column">
                            {/* // TODO: Enable wishlist once ready */}
                            {/* <Button variant="tertiary" className="u-hidden-until@tab">
                                Save for later <Icon id="heart" />
                            </Button> */}

                            <Button variant="quaternary" className="u-text-underline">
                                Remove
                            </Button>
                        </ButtonGroup>

                        <CardPriceTag className="u-self-end u-mt-0">
                            <Price selectedVariant={line?.merchandise} />
                        </CardPriceTag>
                    </CardFooter>
                </CardInner>
            </Card>
        </li>
    );
};

interface OptionsProps {
    merchandise: CartLine['merchandise'];
}

const Options = (props: OptionsProps) => {
    const { merchandise } = props;

    if (!merchandise?.product?.options || !merchandise?.selectedOptions) return null;

    const { selectedOptions } = merchandise;
    const { options } = merchandise?.product;

    return (
        <>
            {options.map((option, i) => (
                <Select
                    description={{ label: option.name }}
                    name={option.name}
                    defaultValue={selectedOptions?.[i]?.value}
                    groupVariants={['secondary', 'inline-wrap']}
                    hasDarkLabel
                    triggerWidth="70"
                    className={`u-justify-between ${i > 0 ? 'u-pt-xs' : ''}`}
                    key={`${i}-${option.name}`}
                >
                    {option.values.map((value) => (
                        <SelectItem
                            value={value}
                            id={`${i}-${option.name}-${value}`}
                            key={`${i}-${option.name}-${value}`}
                        >
                            {value}
                        </SelectItem>
                    ))}
                </Select>
            ))}
        </>
    );
};
