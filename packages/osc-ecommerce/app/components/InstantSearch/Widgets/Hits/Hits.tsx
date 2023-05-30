import type { UseHitsProps } from 'react-instantsearch-hooks-web';
import { useHits } from 'react-instantsearch-hooks-web';
import { Hit } from './Hit';
import type { AlgoliaHit } from '../../types';

type HitProps = {
    view: 'listview' | 'gridview';
};

export const Hits = (props: UseHitsProps & HitProps) => {
    const { view } = props;

    // TODO - Check whether we want to customise click & conversions with 'sendEvent' - https://www.algolia.com/doc/api-reference/widgets/hits/react-hooks/#click-and-conversion-events
    const { hits, sendEvent } = useHits();

    return (
        <>
            {hits.map((hit) => (
                <Hit
                    className={view === 'listview' ? 'o-grid__col--12' : 'o-grid__col--6'}
                    hit={hit as AlgoliaHit}
                    key={hit.id as string}
                    sendEvent={sendEvent}
                    view={view}
                />
            ))}
        </>
    );
};
