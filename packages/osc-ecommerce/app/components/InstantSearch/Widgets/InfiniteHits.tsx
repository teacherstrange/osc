import { Pagination as OSCPagination } from 'osc-ui';
import { useEffect, useState } from 'react';
import type { UseInfiniteHitsProps } from 'react-instantsearch-hooks-web';
import { useInfiniteHits } from 'react-instantsearch-hooks-web';
import { Configure } from '~/components/InstantSearch/Widgets/Configure';
import type { AlgoliaHit } from '../types';
import { Hit } from './Hits/Hit';
import { NoResults } from './NoResults/NoResults';
import { NoResultsBoundary } from './NoResults/NoResultsBoundary';

interface InfiniteHitProps extends UseInfiniteHitsProps {
    hitsPerPage?: number;
    view?: 'listview' | 'gridview';
}

export const InfiniteHits = (props: InfiniteHitProps) => {
    const { view = 'listview', hitsPerPage } = props;

    // TODO - set up SendEvents
    const { hits, results, showMore, sendEvent } = useInfiniteHits(props);
    const [isLoading, setIsLoading] = useState(false);

    const onPaginateHandler = () => {
        showMore();
        setIsLoading(true);
    };

    useEffect(() => {
        setIsLoading(false);
    }, [hits]);

    return (
        <div className="o-grid o-grid__col--12">
            <Configure hitsPerPage={hitsPerPage} />
            <NoResultsBoundary fallback={<NoResults />}>
                {hits.map((hit) => (
                    <Hit
                        className={
                            view === 'listview'
                                ? 'o-grid__col--12'
                                : 'o-grid__col--6@tab o-grid__col--12'
                        }
                        hit={hit as AlgoliaHit}
                        key={hit.id as string}
                        sendEvent={sendEvent}
                        view={view}
                    />
                ))}
            </NoResultsBoundary>
            {results?.nbHits !== 0 ? (
                <OSCPagination
                    itemTypeDescription="courses"
                    total={results?.nbHits}
                    numberLoaded={hits.length}
                    onPaginate={onPaginateHandler}
                    isLoading={isLoading}
                    className="o-grid o-grid__col--12 o-container o-container--6xs u-pt-4xl u-pb-3xl"
                />
            ) : null}
        </div>
    );
};
