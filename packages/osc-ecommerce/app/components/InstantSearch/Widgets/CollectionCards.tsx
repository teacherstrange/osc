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
    CollectionCard as OscCollectionCard,
    truncate,
} from 'osc-ui';
import { useEffect, useState } from 'react';
import { useHits } from 'react-instantsearch-hooks-web';
import type { AlgoliaHit } from '../types';

// TODO - This info eventually needs to come from Algolia Insights
const COLLECTION_HIGHLIGHT_ONE = 'A levels';
const COLLECTION_HIGHLIGHT_TWO = 'GCSEs';

interface CardProps {
    body?: string;
    className?: string;
    course_count?: number;
    image?: { secure_url: string; alt: string; width: number; height: number };
    size?: 'sm' | 'md' | 'lg';
    title?: string;
}

const Card = (props: CardProps) => {
    const { body, className, course_count, image, size, title } = props;
    return (
        <OscCollectionCard className={className} size={size}>
            {image ? (
                <CardImage>
                    <Image
                        src={image.secure_url}
                        alt={image.alt}
                        height={image.height}
                        width={image.width}
                    />
                </CardImage>
            ) : null}
            <CardInner>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>

                {body ? (
                    <CardBody>
                        <p>{truncate(body)}</p>
                    </CardBody>
                ) : null}

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
    const [collections, setCollections] = useState<AlgoliaHit[]>([]);

    // Save collections in state as we don't want these to change as the refinement lists are updated
    useEffect(() => {
        const highlightedCollections = hits.filter(
            (hit) =>
                hit.title === COLLECTION_HIGHLIGHT_ONE || hit.title === COLLECTION_HIGHLIGHT_TWO
        );
        if (highlightedCollections.length > 0) {
            setCollections(highlightedCollections);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- We don't want it to update based on changes to refinement lists
    }, []);

    return (
        <>
            {collections?.map((collection, i) => (
                <Card
                    // TODO - To come from Sanity
                    body={
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra duis vehicula justo, sagittis quam nam nisi.'
                    }
                    className={'o-grid__col--12 o-grid__col--6@mob-lrg'}
                    course_count={collection.products_count as number}
                    key={i}
                    // TODO - To come from Sanity
                    image={{
                        secure_url:
                            'https://res.cloudinary.com/de2iu8gkv/image/upload/c_crop,y_0/v1674823207/cat-img-3_qrlvcq.png',
                        alt: '',
                        width: 452,
                        height: 310,
                    }}
                    size={'sm'}
                    title={collection.title as string}
                />
            ))}
        </>
    );
};
