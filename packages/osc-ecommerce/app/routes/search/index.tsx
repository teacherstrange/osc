import { useLoaderData } from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import { Autocomplete } from 'osc-ui';
import oscUiAutcompleteStyles from 'osc-ui/dist/src-components-Autocomplete-autocomplete.css';
import oscUiButtonStyles from 'osc-ui/dist/src-components-Button-button.css';
import oscUiTextInputStyles from 'osc-ui/dist/src-components-TextInput-text-input.css';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: oscUiAutcompleteStyles },
        { rel: 'stylesheet', href: oscUiButtonStyles },
        { rel: 'stylesheet', href: oscUiTextInputStyles },
    ];
};

export const loader: LoaderFunction = async () => {
    return json({
        ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID!,
        ALGOLIA_ID_SEARCH_ONLY_API_KEY: process.env.ALGOLIA_ID_SEARCH_ONLY_API_KEY!,
        ALGOLIA_PRIMARY_INDEX: process.env.ALGOLIA_PRIMARY_INDEX,
        ALGOLIA_PRIMARY_INDEX_GROUPED: process.env.ALGOLIA_PRIMARY_INDEX_GROUPED!,
        ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS:
            process.env.ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS!,
    });
};

export default function Search() {
    const data = useLoaderData();
    return (
        <div className="o-container o-container--2xs">
            <Autocomplete {...data} />
        </div>
    );
}
