import {
    AccessibleIcon,
    Button,
    ButtonGroup,
    CardBody,
    CardBodyInner,
    CardCallout,
    CardHeader,
    CardInner,
    CardPriceTag,
    CardTitle,
    CardWishListButton,
    CourseCard,
    Icon,
    Popover,
    PopoverArrow,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
    VisuallyHidden,
} from 'osc-ui';
import { useState } from 'react';
import type { AlgoliaHit, SendEventForHits } from '../../types';
import { Highlight } from 'react-instantsearch-hooks-web';

type HitProps = {
    className?: string;
    hit: AlgoliaHit;
    sendEvent?: SendEventForHits;
    view: 'listview' | 'gridview';
};

export const Hit = (props: HitProps) => {
    // TODO - Set up the sendEvent
    const { className, hit, sendEvent, view } = props;

    const [isActive, setIsActive] = useState(false);

    const productVariants =
        hit.meta?.osc?.product_variants && JSON.parse(hit.meta?.osc?.product_variants.trim());

    // We're removing the '/Study Pack' or '/Online' and creating a Set to get unique values only
    const uniqueProductVariants = [
        ...new Set<string>(productVariants?.map((variant: string) => variant.trim().split('/')[0])),
    ];

    return (
        <CourseCard
            key={`search_${hit.id}`}
            isFull={view === 'listview' ? true : false}
            className={className}
        >
            <CardInner className={className}>
                <CardHeader>
                    {view === 'listview' ? (
                        <CardPriceTag className="u-hidden-until@tab">
                            <>
                                {/* TODO: REPLACE THIS WITH ETIKA DATA */}
                                <p>
                                    <span className="u-text-bold">DATA FROM ETIKA</span>/month
                                </p>
                                <p>
                                    or from{' '}
                                    <span className="u-text-bold">{`£${hit.price} in full`}</span>
                                </p>
                            </>
                        </CardPriceTag>
                    ) : (
                        <CardWishListButton
                            label="Save for later"
                            size="lg"
                            className={isActive ? 'is-active' : ''}
                            onClick={() => {
                                setIsActive(!isActive);
                            }}
                        />
                    )}
                    <CardTitle>
                        <span className="c-instant-search__card-title">
                            <Highlight
                                hit={hit}
                                attribute={'title'}
                                classNames={{
                                    highlighted: 'u-bg-color-primary u-color-tertiary',
                                }}
                            />
                        </span>
                    </CardTitle>
                    <CardTitle as="h3" subtitle isSmall>
                        {/* TODO: USE FIELD IN ALGOLIA TO DETERMINE IF THIS IS A SINGLE OR PACKAGE COURSE */}
                        TO ADD - Single Or Package Course
                    </CardTitle>
                </CardHeader>

                <CardBody>
                    <CardBodyInner>
                        <h4>Course options available</h4>
                        <ul>
                            {uniqueProductVariants?.map((variant: string) => {
                                return <li key={`id-${variant}`}>{variant}</li>;
                            })}
                        </ul>
                    </CardBodyInner>

                    <CardCallout>
                        <strong>TO ADD FROM SHOPIFY BUNDLES - Save up to £200</strong>
                        <Popover>
                            <PopoverTrigger>
                                <AccessibleIcon label="More information">
                                    <Icon id="warning" />
                                </AccessibleIcon>
                            </PopoverTrigger>
                            <PopoverContent side="top">
                                <PopoverArrow />

                                <PopoverClose className="c-popover__close" aria-label="Close">
                                    <Icon id="close" />
                                </PopoverClose>

                                <p>TO ADD FROM BUNDLES- Save up to £200 when you purchase</p>
                                <p>{hit.title}</p>
                            </PopoverContent>
                        </Popover>
                    </CardCallout>

                    {view === 'listview' ? (
                        <ButtonGroup>
                            <CardWishListButton
                                label="Save for later"
                                size="lg"
                                className={isActive ? 'is-active' : ''}
                                onClick={() => {
                                    setIsActive(!isActive);
                                }}
                            />
                            <Button as="link" to="/courses/aat-level-3-diploma-in-accounting">
                                View course
                                <VisuallyHidden>{hit.title}</VisuallyHidden>
                            </Button>
                        </ButtonGroup>
                    ) : (
                        <>
                            <CardPriceTag>
                                <p>
                                    <span className="u-text-bold">From £23</span>/month
                                </p>
                                <p>
                                    or from{' '}
                                    <span className="u-text-bold">{`£${hit.price} in full`}</span>
                                </p>
                            </CardPriceTag>
                            <ButtonGroup>
                                <Button
                                    as="link"
                                    to="/courses/aat-level-3-diploma-in-accounting"
                                    isFull
                                >
                                    View course
                                    <VisuallyHidden>{hit.title}</VisuallyHidden>
                                </Button>
                            </ButtonGroup>
                        </>
                    )}
                </CardBody>
            </CardInner>
        </CourseCard>
    );
};
