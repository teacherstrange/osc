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

interface Props {
    data: collectionCardModule;
}

// TODO: Update this to use Shopify storekit helpers
export const CollectionCard = (props: Props) => {
    const { data } = props;
    const { store } = data?.reference;
    const { theme, featuredImage } = data?.reference;

    return (
        <OSCCollectionCard size={data?.variant} hasShadow>
            {featuredImage?.src ? (
                <CardImage>
                    <Image
                        src={featuredImage?.src ? featuredImage?.src : ''}
                        alt={featuredImage?.alt ? featuredImage?.alt : ''}
                        width={610}
                        height={432}
                        fit="cover"
                        overlayColor={
                            featuredImage?.imageStyles?.overlayColor
                                ? featuredImage?.imageStyles?.overlayColor
                                : theme?.color
                        }
                        isGrayScale={featuredImage?.imageStyles?.grayscale}
                        hasTransparency={featuredImage?.imageStyles?.opacity}
                    />
                </CardImage>
            ) : null}

            <CardInner>
                <CardHeader>
                    <CardTitle>{store?.title}</CardTitle>
                </CardHeader>

                <CardBody>
                    {/* // TODO: This data should come from the CMS */}
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra duis
                        vehicula justo, sagittis quam nam nisi.
                    </p>

                    {/* TODO: Needs to get number of courses */}
                    {data?.variant !== 'sm' ? <Button isFull>23 Courses</Button> : null}
                </CardBody>

                {data?.variant === 'sm' ? (
                    <CardFooter>
                        <span className="u-text-bold">23 courses</span>
                        {data?.reference?.slug ? (
                            <Button as="link" to={data?.reference?.slug} variant="quaternary">
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
