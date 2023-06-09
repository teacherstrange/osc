import { Link, useFetcher } from '@remix-run/react';
import type { CartLine } from '@shopify/hydrogen/storefront-api-types';
import { mediaQueries as mq } from 'osc-design-tokens';
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardInner,
    CardPriceTag,
    CardTitle,
    Content,
    Select,
    SelectItem,
    rem,
    useMediaQuery,
} from 'osc-ui';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { Price } from '~/components/Price/Price';
import { PATHS } from '~/constants';
import type { CartLineWithSanityData } from '~/types/shopify';
import { CartAction } from '~/types/shopify';
import { stripMarks } from '~/utils/storefront.helpers';
import { RemoveFromCart } from '../Forms/CartActions/RemoveFromCart';

interface CartCardItemProps {
    line: CartLineWithSanityData;
    isLoading?: boolean;
}

export const CartCardItem = (props: CartCardItemProps) => {
    const { line, isLoading } = props;

    const isGreaterThanTab = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);
    const [showOnGreaterThanTab, setShowOnGreaterThanTab] = useState(false);

    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnGreaterThanTab(isGreaterThanTab);
    }, [isGreaterThanTab]);

    if (typeof line.quantity === 'undefined' || !line.merchandise?.product) return null;

    return (
        <li
            className={showOnGreaterThanTab ? 'u-mb-m' : 'u-mt-2xl'}
            data-anim={isLoading ? 'shimmer' : ''}
        >
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
                        {line?.sanityData?.description?.body ? (
                            <div className="u-mb-m u-hidden-until@tab">
                                <Content
                                    value={[stripMarks(line?.sanityData?.description?.body)]}
                                />
                            </div>
                        ) : (
                            ''
                        )}

                        {showOnGreaterThanTab ? (
                            <Options line={line} />
                        ) : (
                            <Accordion collapsible type="single" variant="quaternary">
                                <AccordionItem value="0">
                                    <AccordionHeader asChild as="h2" icon="chevron">
                                        View options
                                    </AccordionHeader>
                                    <AccordionPanel>
                                        <Options line={line} />
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

                            <RemoveFromCart lineIds={[line?.id]} />
                        </ButtonGroup>

                        <CardPriceTag className="u-self-end u-mt-0 u-ml-auto">
                            {/* <Price selectedVariant={line?.merchandise} /> */}
                            <Price
                                compareAtPrice={line.cost.amountPerQuantity}
                                price={line.cost.totalAmount}
                            />
                        </CardPriceTag>
                    </CardFooter>
                </CardInner>
            </Card>
        </li>
    );
};

interface OptionsProps {
    line: CartLine;
}

const Options = (props: OptionsProps) => {
    const { line } = props;
    const merchandise = line?.merchandise;
    const fetcher = useFetcher();
    const [selectedOptions, setSelectedOptions] = useState<
        CartLine['merchandise']['selectedOptions']
    >(merchandise?.selectedOptions);

    if (!merchandise?.product?.options || !merchandise?.selectedOptions) return null;

    const { options } = merchandise?.product;

    const handleSubmitOnChange = (e: ChangeEvent<HTMLFormElement>) => {
        // Map over selected options and replace the value of the option that has changed
        const updatedOptions = selectedOptions.map((option) => {
            if (option.name === e.target.name) {
                return { ...option, value: e.target.value };
            }
            return option;
        });

        setSelectedOptions(updatedOptions);

        // Rather than using the hidden fields in the form we are passing the data to the submit method.
        // This allows us to submit when the updatedOptions value changes, if we use the hidden fields then the state will
        // change after the form has been submitted.
        fetcher.submit(
            {
                cartAction: CartAction.UPDATE_CART,
                linesIds: JSON.stringify([line.id]),
                productId: merchandise.product.id,
                selectedOptions: JSON.stringify(updatedOptions),
            },
            {
                method: 'post',
                action: '/cart',
            }
        );
    };

    return (
        <fetcher.Form action="/cart" method="post" onChange={handleSubmitOnChange}>
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
        </fetcher.Form>
    );
};
