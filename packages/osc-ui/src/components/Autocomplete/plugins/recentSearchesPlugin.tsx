import {
    createLocalStorageRecentSearchesPlugin,
    search,
} from '@algolia/autocomplete-plugin-recent-searches';

export const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'Recent Searches',
    search(params) {
        return search({ ...params, limit: 3 });
    },
    transformSource({ source }) {
        return {
            ...source,
            sourceId: 'Recent Searches',
            getItemInputValue({ item }) {
                return item.label;
            },
            onSelect({ setIsOpen }) {
                setIsOpen(true);
            },
        };
    },
});
