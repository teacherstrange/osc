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
import spritesheet from 'osc-ui/dist/spritesheet.svg';
import type { collectionCardModule } from '~/types/sanity';

interface Props {
    data: collectionCardModule;
}

// TODO: Update this to use Shopify storekit helpers
export const CollectionCard = (props: Props) => {
    const { data } = props;
    const store = data?.reference?.store;

    return (
        <OSCCollectionCard size="sm">
            <CardImage>
                {/* // TODO: This data should come from the CMS */}
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/c_crop,y_0/v1674823207/cat-img-3_qrlvcq.png"
                    alt=""
                    width={452}
                    height={310}
                />
            </CardImage>
            <CardInner>
                <CardHeader>
                    <CardTitle>{store?.title}</CardTitle>
                </CardHeader>

                <CardBody>{store?.descriptionHtml}</CardBody>

                <CardFooter>
                    <span className="u-text-bold">23 courses</span>
                    <Button
                        variant="quaternary"
                        as="link"
                        to={`/collections/${store?.slug?.current}`}
                    >
                        Find out more
                        <Icon path={spritesheet} id="chevron-right" />
                    </Button>
                </CardFooter>
            </CardInner>
        </OSCCollectionCard>
    );
};
