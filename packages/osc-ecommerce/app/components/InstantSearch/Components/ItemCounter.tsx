import { useHits } from 'react-instantsearch-hooks';
import type { UseHitsProps } from 'react-instantsearch-hooks-web';

export const ItemCounter = (props: UseHitsProps) => {
    const { results } = useHits(props);

    return (
        <p className="t-font-xl">
            {results ? (
                <strong key={`${results?.nbHits}`}>Showing {results?.nbHits} Results for</strong>
            ) : null}
        </p>
    );
};
