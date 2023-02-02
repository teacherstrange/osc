import {
    AccessibleIcon,
    Button,
    CardBody,
    CardBodyInner,
    CardCallout,
    CardHeader,
    CardInner,
    CardPriceTag,
    CardTitle,
    CardWishListButton,
    CourseCard as OSCCourseCard,
    Icon,
    Popover,
    PopoverArrow,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from 'osc-ui';
import spritesheet from 'osc-ui/dist/spritesheet.svg';
import { useState } from 'react';
import type { courseCardModule } from '~/types/sanity';

interface Props {
    data: courseCardModule;
}

// TODO: Update this to use Shopify storekit helpers
export const CourseCard = (props: Props) => {
    const { data } = props;
    const store = data?.reference?.store;
    const [isActive, setIsActive] = useState(false);

    return (
        <OSCCourseCard>
            <CardInner>
                <CardHeader>
                    <CardWishListButton
                        label="Save for later"
                        className={isActive ? 'is-active' : ''}
                        onClick={() => setIsActive(!isActive)}
                    />

                    <CardTitle>{store?.title}</CardTitle>
                    <CardTitle as="h3" subtitle isSmall>
                        {/* // TODO: This data should come from the CMS */}
                        Single course
                    </CardTitle>
                </CardHeader>

                <CardBody>
                    <CardBodyInner>
                        <h4>Course options available</h4>
                        {store?.options ? (
                            <ul>
                                {store?.options
                                    .filter((option) => option?._key === 'Format')
                                    .map(
                                        (option) =>
                                            option?.values &&
                                            option?.values.map((value) => (
                                                <li key={value}>{value}</li>
                                            ))
                                    )}
                            </ul>
                        ) : null}
                    </CardBodyInner>

                    <CardCallout>
                        {/* // TODO: This data should come from the CMS */}
                        <strong>Save up to £200</strong>

                        <Popover>
                            <PopoverTrigger>
                                <AccessibleIcon label="More information">
                                    <Icon path={spritesheet} id="warning" />
                                </AccessibleIcon>
                            </PopoverTrigger>
                            <PopoverContent side="top">
                                <PopoverArrow />

                                <PopoverClose className="c-popover__close" aria-label="Close">
                                    <Icon path={spritesheet} id="close" />
                                </PopoverClose>

                                <p>Save up to £200 when you purchase</p>
                                <p>Interior Design and Heritage Interior Design QLS Level 3 </p>
                            </PopoverContent>
                        </Popover>
                    </CardCallout>

                    <CardPriceTag>
                        <p>
                            {/* // TODO: This data should come from the CMS */}
                            <span className="u-text-bold">From £23</span>/month
                        </p>
                        <p>
                            or from{' '}
                            <span className="u-text-bold">
                                £{store?.priceRange?.minVariantPrice} in full
                            </span>
                        </p>
                    </CardPriceTag>

                    <Button as="link" to={`/products/${store?.slug?.current}`} isFull>
                        View course
                    </Button>
                </CardBody>
            </CardInner>
        </OSCCourseCard>
    );
};
