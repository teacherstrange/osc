import { useEffect, useState } from 'react';
import { useHits } from 'react-instantsearch-hooks-web';
import type { AlgoliaHit } from '../types';

import { CollectionCard } from '~/components/Cards/CollectionCard';
import { getClient } from '~/lib/sanity/getClient';
import { HIGHLIGHTED_COLLECTIONS_IMAGES_QUERY } from '~/queries/sanity/collection';
import type { collectionCardModule } from '~/types/sanity';

// TODO - This info eventually needs to come from Algolia Insights
const COLLECTION_HIGHLIGHT_ONE = 'A levels';
const COLLECTION_HIGHLIGHT_TWO = 'GCSEs';

interface CollectionCardsProps {
    env: string;
}

export const CollectionCards = (props: CollectionCardsProps) => {
    const { env } = props;
    // TODO - Add events
    const { hits, sendEvent } = useHits();
    const [collections, setCollections] = useState<AlgoliaHit[]>([]);

    // Save collections in state as we don't want these to change as the refinement lists are updated
    useEffect(() => {
        // Filter out highlighted collections from Algolia data
        const algoliaHighlightedCollectionsData = hits.filter(
            (hit) =>
                hit.title === COLLECTION_HIGHLIGHT_ONE || hit.title === COLLECTION_HIGHLIGHT_TWO
        );
        if (algoliaHighlightedCollectionsData.length > 0) {
            // Combine Algolia collection data with image data from Sanity
            const combineCollectionData = async () => {
                try {
                    const querySanityDataset = await getClient(env).fetch(
                        HIGHLIGHTED_COLLECTIONS_IMAGES_QUERY,
                        {
                            highlightCategoryOne: algoliaHighlightedCollectionsData[0].handle,
                            highlightCategoryTwo: algoliaHighlightedCollectionsData[1].handle,
                        }
                    );
                    // console.log('querySanityDataset', querySanityDataset);
                    if (querySanityDataset) {
                        setCollections(
                            algoliaHighlightedCollectionsData.map((collection, index) => {
                                // Add Sanity data
                                collection.data = {
                                    reference: {
                                        featuredImage: {
                                            src: querySanityDataset[index].image.secure_url,
                                            imageStyles:
                                                querySanityDataset[index].image.imageStyles,
                                            alt: querySanityDataset[index].alt,
                                        },
                                        slug: querySanityDataset[index].slug,
                                    },
                                    variant: 'sm',
                                };
                                return collection;
                            })
                        );
                    } else {
                        setCollections(algoliaHighlightedCollectionsData);
                    }
                } catch (e) {
                    console.log('ERROR', e);
                }
            };
            combineCollectionData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- We don't want it to update based on changes to refinement lists
    }, []);

    return (
        <>
            {collections?.map((collection, i) => (
                <CollectionCard
                    // TODO - Pass data for body which should come from CMS?
                    className="o-grid__col--12 o-grid__col--6@mob-lrg"
                    course_count={collection.products_count}
                    data={collection.data as collectionCardModule}
                    key={i}
                    title={collection.title}
                />
            ))}
        </>
    );
};
