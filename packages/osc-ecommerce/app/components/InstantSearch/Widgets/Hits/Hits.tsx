import type { UseHitsProps } from 'react-instantsearch-hooks-web';
import { useHits } from 'react-instantsearch-hooks-web';
import type { AllHitsWithVariantTitle } from '~/routes/search';
import { Hit } from './Hit';
import type { AlgoliaHit } from '../../types';

type HitProps = {
    allHitsWithVariantTitle?: AllHitsWithVariantTitle[];
};

export const Hits = (props: UseHitsProps & HitProps) => {
    const { allHitsWithVariantTitle } = props;

    // TODO - Check whether we want to customise click & conversions with 'sendEvent' - https://www.algolia.com/doc/api-reference/widgets/hits/react-hooks/#click-and-conversion-events
    const { hits, sendEvent } = useHits();

    return (
        <>
            {hits.map((hit) => {
                const variants = allHitsWithVariantTitle?.filter((hitWithVariant) => {
                    return hitWithVariant.id === hit.id;
                });
                return (
                    <Hit
                        className="o-grid__col--12"
                        hit={hit as AlgoliaHit}
                        key={hit.id as string}
                        sendEvent={sendEvent}
                        courseVariants={variants}
                    />
                );
            })}
        </>
    );
};
