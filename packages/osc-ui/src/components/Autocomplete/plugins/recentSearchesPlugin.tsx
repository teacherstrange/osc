import {
    createLocalStorageRecentSearchesPlugin,
    search,
} from '@algolia/autocomplete-plugin-recent-searches';
import React from 'react';

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
            templates: {
                item({ item }) {
                    return <RecentItem hit={item} />;
                },
            },
        };
    },
});

type RecentItemProps = {
    hit: any;
};

function RecentItem({ hit }: RecentItemProps) {
    return (
        <div className="aa-ItemWrapper">
            <div className="aa-ItemIcon aa-ItemIcon--noBorder"></div>
            <div className="aa-ItemContent">
                <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">{hit.label}</div>
                </div>
            </div>
        </div>
    );
}
