import {
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardTitle,
    Icon,
    Image,
    CollectionCard as OSCCollectionCard,
} from 'osc-ui';
import type { collectionCardModule } from '~/types/sanity';
import { PATHS } from '~/constants';

interface Props {
    className: string;
    course_count?: string;
    data?: collectionCardModule;
    title?: string;
}

// TODO: Update this to use Shopify storekit helpers
export const CollectionCard = (props: Props) => {
    const { course_count, className, data, title } = props;

    return (
        <OSCCollectionCard size={data?.variant} hasShadow className={className}>
            {data?.reference?.featuredImage?.src ? (
                <CardImage>
                    <Image
                        src={
                            data?.reference?.featuredImage?.src
                                ? data?.reference?.featuredImage?.src
                                : ''
                        }
                        alt={
                            data?.reference?.featuredImage?.alt
                                ? data?.reference?.featuredImage?.alt
                                : ''
                        }
                        width={610}
                        height={432}
                        fit="cover"
                        overlayColor={
                            data?.reference?.featuredImage?.imageStyles?.overlayColor
                                ? data?.reference?.featuredImage?.imageStyles?.overlayColor
                                : data?.reference?.theme?.color
                        }
                        isGrayScale={data?.reference?.featuredImage?.imageStyles?.grayscale}
                        hasTransparency={data?.reference?.featuredImage?.imageStyles?.opacity}
                    />
                </CardImage>
            ) : null}

            <CardInner>
                <CardHeader>
                    <CardTitle>{data?.reference?.store?.title || title}</CardTitle>
                </CardHeader>

                <CardBody>
                    {/* // TODO: This data should come from the CMS */}
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra duis
                        vehicula justo, sagittis quam nam nisi.
                    </p>

                    {/* TODO: Needs to get number of courses */}
                    {data?.variant !== 'sm' ? <Button isFull>{course_count} Courses</Button> : null}
                </CardBody>

                {data?.variant === 'sm' ? (
                    <CardFooter>
                        <span className="u-text-bold">{course_count} courses</span>
                        {data?.reference?.slug ? (
                            <Button
                                as="link"
                                to={`/${PATHS.COLLECTIONS}/${data?.reference?.slug}`}
                                variant="quaternary"
                            >
                                Find our more
                                <Icon id="chevron-right" />
                            </Button>
                        ) : null}
                    </CardFooter>
                ) : null}
            </CardInner>
        </OSCCollectionCard>
    );
};
