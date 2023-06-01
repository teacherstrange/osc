import { useInstantSearch } from 'react-instantsearch-hooks-web';

export const NoResults = () => {
    const { indexUiState } = useInstantSearch();

    return (
        <p className="o-grid__col--12 o-flex o-flex--center t-font-xl">
            No results for "{indexUiState.query}"
        </p>
    );
};
