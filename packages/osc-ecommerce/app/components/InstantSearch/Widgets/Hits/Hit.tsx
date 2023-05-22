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
import type { AllHitsWithVariantTitle } from '~/routes/search';
import type { AlgoliaHit, SendEventForHits } from '../../types';

type HitProps = {
    courseVariants?: AllHitsWithVariantTitle[];
    className?: string;
    hit: AlgoliaHit;
    sendEvent?: SendEventForHits;
};

export const Hit = (props: HitProps) => {
    const { className, courseVariants, hit, sendEvent } = props;

    const [isActive, setIsActive] = useState(false);
    console.log('ACTIVE', isActive);

    return (
        <CourseCard key={`search_${hit.id}`} isFull className={className}>
            <CardInner className={className}>
                <CardHeader>
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
                    <CardTitle>{hit.title}</CardTitle>
                    <CardTitle as="h3" subtitle isSmall>
                        {/* TODO: USE FIELD IN ALGOLIA TO DETERMINE IF THIS IS A SINGLE OR PACKAGE COURSE */}
                        TO ADD - Single Or Package Course
                    </CardTitle>
                </CardHeader>

                <CardBody>
                    <CardBodyInner>
                        <h4>Course options available</h4>
                        <ul>
                            {courseVariants?.map((variant) => {
                                return <li key={`${variant.objectID}`}>{variant.variant_title}</li>;
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

                    <CardPriceTag className="u-hidden-from@tab">
                        <p>
                            <span className="u-text-bold">From £23</span>/month
                        </p>
                        <p>
                            or from <span className="u-text-bold">{`£${hit.price} in full`}</span>
                        </p>
                    </CardPriceTag>

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
                </CardBody>
            </CardInner>
        </CourseCard>
    );
};
