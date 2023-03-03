import {
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardTitle,
    CollectionCard as OSCCollectionCard,
    Icon,
    Image,
} from 'osc-ui';
import type { collectionCardModule } from '~/types/sanity';

interface Props {
    data: collectionCardModule;
}

// TODO: Update this to use Shopify storekit helpers
export const CollectionCard = (props: Props) => {
    const { data } = props;
    const store = data?.reference?.store;

    if (data?.variant === 'sm') {
        <OSCCollectionCard size={data?.variant}>
            <CardImage>
                {/* // TODO: This data should come from the CMS */}
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1674577946/cat-img_rwumo5.png"
                    alt=""
                    width={610}
                    height={557}
                />
            </CardImage>
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
                </CardBody>

                <CardFooter>
                    <span className="u-text-bold">23 courses</span>
                    <Button variant="quaternary">
                        Find our more
                        <Icon id="chevron-right" />
                    </Button>
                </CardFooter>
            </CardInner>
        </OSCCollectionCard>;
    }

    return (
        <OSCCollectionCard size={data?.variant}>
            <CardImage>
                {/* // TODO: This data should come from the CMS */}
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1674577946/cat-img_rwumo5.png"
                    alt=""
                    width={610}
                    height={557}
                />
            </CardImage>
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
                    <Button isFull>23 Courses</Button>
                </CardBody>
            </CardInner>
        </OSCCollectionCard>
    );
};
