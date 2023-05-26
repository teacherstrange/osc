import {
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardTitle,
    CollectionCard as OscCollectionCard,
    Icon,
    Image,
} from 'osc-ui';
import { useHits } from 'react-instantsearch-hooks-web';

// TODO - This info eventually needs to come from Algolia Insights
const COLLECTION_HIGHLIGHT_ONE = 'A levels';
const COLLECTION_HIGHLIGHT_TWO = 'GCSEs';

interface CardProps {
    title?: string;
    product_image?: string;
    body?: string;
    course_count?: number;
    className: string;
}

const Card = ({ title, product_image, body, course_count, className }: CardProps) => {
    return (
        <OscCollectionCard className={className}>
            {product_image ? (
                <CardImage>
                    <Image src={product_image} alt={title ?? ''} height={200} width={200} />
                </CardImage>
            ) : null}
            <CardInner>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardBody>
                    <p>{body}</p>
                </CardBody>

                <CardFooter>
                    <span className="u-text-bold">{course_count} Courses</span>
                    <Button variant="quaternary">
                        Find our more
                        <Icon id="chevron-right" />
                    </Button>
                </CardFooter>
            </CardInner>
        </OscCollectionCard>
    );
};

interface CollectionCardsProps {}

export const CollectionCards = (props: CollectionCardsProps) => {
    // TODO - Add events
    const { hits, sendEvent } = useHits();

    const highlightedCollections = hits.filter(
        (hit) => hit.title === COLLECTION_HIGHLIGHT_ONE || hit.title === COLLECTION_HIGHLIGHT_TWO
    );

    return (
        <>
            {highlightedCollections.map((collection, i) => (
                <Card
                    // TODO - To come from Sanity
                    body={''}
                    className={'o-grid__col--12 o-grid__col--6@mob-lrg'}
                    course_count={collection.products_count as number}
                    key={i}
                    // TODO - To come from Sanity
                    product_image={
                        'https://res.cloudinary.com/de2iu8gkv/image/upload/c_crop,y_0/v1674823207/cat-img-3_qrlvcq.png'
                    }
                    title={collection.title as string}
                />
            ))}
        </>
    );
};
