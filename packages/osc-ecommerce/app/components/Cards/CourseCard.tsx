import { Money } from '@shopify/hydrogen';
import type { ProductOption } from '@shopify/hydrogen/storefront-api-types';
import {
    Button,
    CardBody,
    CardBodyInner,
    CardHeader,
    CardInner,
    CardPriceTag,
    CardTitle,
    CourseCard as OSCCourseCard,
} from 'osc-ui';
import { PATHS } from '~/constants';
import type { courseCardModule } from '~/types/sanity';

interface Props {
    product: courseCardModule;
}

export const CourseCard = (props: Props) => {
    const { product } = props;
    const store = product?.reference?.store;
    // const [isActive, setIsActive] = useState(false);

    const title = store?.title ?? product.title;
    const slug = store?.slug?.current ?? product.handle;

    const price = store ? (
        <span className="u-text-bold">£{<>{store?.priceRange?.minVariantPrice}</>}</span>
    ) : (
        <Money
            withoutTrailingZeros
            data={product.priceRange?.minVariantPrice}
            as="span"
            className="u-text-bold"
        />
    );

    const Options = (props: { options: ProductOption[] }) => {
        const { options } = props;

        if (!options) return null;

        return (
            <>
                {options
                    .filter(
                        // Handle both format and course options as both names are being used in Shopify currently
                        (option) => option?.name === 'Format' || option?.name === 'Course Options'
                    )
                    .map(
                        (option) =>
                            option?.values &&
                            option?.values.map((value, index) => (
                                <li key={value + index}>{value}</li>
                            ))
                    )}
            </>
        );
    };

    return (
        <OSCCourseCard>
            <CardInner>
                <CardHeader>
                    {/* // TODO: Reactivate when wishlist is enabled */}
                    {/* <CardWishListButton
                        label="Save for later"
                        className={isActive ? 'is-active' : ''}
                        onClick={() => setIsActive(!isActive)}
                    /> */}

                    <CardTitle isUnderlined>{title}</CardTitle>
                    <CardTitle as="h3" subtitle isSmall>
                        {/* // TODO: This data should come from the SHOPIFY/CMS once packages/bundles are sorted */}
                        Single course
                    </CardTitle>
                </CardHeader>

                <CardBody>
                    <CardBodyInner>
                        <h4>Course options available</h4>

                        <ul>
                            {store?.options ? (
                                <Options options={store?.options as ProductOption[]} />
                            ) : (
                                <Options options={product?.options} />
                            )}
                        </ul>
                    </CardBodyInner>

                    {/* // TODO: This data should come from the CMS once packages/bundles are sorted? */}
                    {/* <CardCallout>
                        <strong>Save up to £200</strong>

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

                                <p>Save up to £200 when you purchase</p>
                                <p>Interior Design and Heritage Interior Design QLS Level 3 </p>
                            </PopoverContent>
                        </Popover>
                    </CardCallout> */}

                    <CardPriceTag>
                        <p>
                            From {price} <span className="u-text-bold">in full</span>
                        </p>
                    </CardPriceTag>

                    <Button as="link" to={`/${PATHS.PRODUCTS}/${slug}`} isFull>
                        View course
                    </Button>
                </CardBody>
            </CardInner>
        </OSCCourseCard>
    );
};
