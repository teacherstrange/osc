import type { ObjectWithObjectID } from '@algolia/client-search';
import { useLoaderData } from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import algoliasearch from 'algoliasearch';
import { Accordion } from 'osc-ui';
import oscUiAutcompleteStyles from 'osc-ui/dist/src-components-Autocomplete-autocomplete.css';
import oscUiButtonStyles from 'osc-ui/dist/src-components-Button-button.css';
import oscUiCardStyles from 'osc-ui/dist/src-components-Card-card.css';
import oscUiCheckboxStyles from 'osc-ui/dist/src-components-Checkbox-checkbox.css';
import oscUiLabelStyles from 'osc-ui/dist/src-components-Label-label.css';
import oscUiPopoverStyles from 'osc-ui/dist/src-components-Popover-popover.css';
import oscUiTextInputStyles from 'osc-ui/dist/src-components-TextInput-text-input.css';
import { renderToString } from 'react-dom/server';
import { getServerState } from 'react-instantsearch-hooks-server';
import type { InstantSearchServerState } from 'react-instantsearch-hooks-web';
import {
    Index,
    InstantSearch,
    InstantSearchSSRProvider,
    SearchBox,
} from 'react-instantsearch-hooks-web';
import { ClearRefinements } from '~/components/InstantSearch/Widgets/ClearRefinements';
import { Configure } from '~/components/InstantSearch/Widgets/Configure';
import { RefinementList } from '~/components/InstantSearch/Widgets/RefinementList';
import { Hits } from '../../components/InstantSearch/Widgets/Hits/Hits';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: oscUiAutcompleteStyles },
        { rel: 'stylesheet', href: oscUiButtonStyles },
        { rel: 'stylesheet', href: oscUiCheckboxStyles },
        { rel: 'stylesheet', href: oscUiLabelStyles },
        { rel: 'stylesheet', href: oscUiTextInputStyles },
        { rel: 'stylesheet', href: oscUiCardStyles },
        { rel: 'stylesheet', href: oscUiPopoverStyles },
    ];
};

const HITS_PER_PAGE = 20;

export type AllHitsWithVariantTitle = Partial<
    {
        id: number;
        variant_title: string;
        objectId: string;
    } & ObjectWithObjectID
>;

export const loader: LoaderFunction = async ({ request }) => {
    const adminClient = algoliasearch(
        process.env.ALGOLIA_APP_ID!,
        process.env.ALGOLIA_API_KEY_ADMIN!
    );

    const serverUrl = request.url;

    const serverState = await getServerState(
        <Search
            hitsPerPage={HITS_PER_PAGE}
            env={{
                ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID!,
                ALGOLIA_API_KEY_SEARCH: process.env.ALGOLIA_API_KEY_SEARCH!,
                ALGOLIA_API_KEY_ADMIN: process.env.ALGOLIA_API_KEY_ADMIN!,
                ALGOLIA_PRIMARY_INDEX: process.env.ALGOLIA_PRIMARY_INDEX!,
                ALGOLIA_PRIMARY_INDEX_GROUPED_BY_ID:
                    process.env.ALGOLIA_PRIMARY_INDEX_GROUPED_BY_ID!,
            }}
            serverUrl={serverUrl}
        />,
        {
            renderToString,
        }
    );

    const index = await adminClient.initIndex(process.env.ALGOLIA_PRIMARY_INDEX!);

    let allHitsWithVariantTitle: AllHitsWithVariantTitle[] = [];

    try {
        await index.browseObjects({
            attributesToRetrieve: ['id', 'variant_title'],
            batch: (batch) => {
                allHitsWithVariantTitle = allHitsWithVariantTitle.concat(batch);
            },
        });
    } catch (error) {
        // TODO - Add in error logging
        console.log('Error retrieving variants', error);
    }

    return json({
        allHitsWithVariantTitle,
        serverState,
        serverUrl,
        ENV: {
            ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID!,
            ALGOLIA_API_KEY_SEARCH: process.env.ALGOLIA_API_KEY_SEARCH!,
            ALGOLIA_API_KEY_ADMIN: process.env.ALGOLIA_API_KEY_ADMIN!,
            ALGOLIA_PRIMARY_INDEX: process.env.ALGOLIA_PRIMARY_INDEX!,
            ALGOLIA_PRIMARY_INDEX_GROUPED_BY_ID: process.env.ALGOLIA_PRIMARY_INDEX_GROUPED_BY_ID!,
        },
    });
};

type SearchProps = {
    allHitsWithVariantTitle?: AllHitsWithVariantTitle[];
    env?: {
        ALGOLIA_APP_ID: string;
        ALGOLIA_API_KEY_SEARCH: string;
        ALGOLIA_API_KEY_ADMIN: string;
        ALGOLIA_PRIMARY_INDEX: string;
        ALGOLIA_PRIMARY_INDEX_GROUPED_BY_ID: string;
    };
    hitsPerPage?: number;
    serverState?: InstantSearchServerState;
    serverUrl?: string;
};

// I tried putting this in it's own file, but it causes the app to get stuck in a cycle of errors 🤷‍♂️
const Search = (props: SearchProps) => {
    const { allHitsWithVariantTitle, env, hitsPerPage, serverState, serverUrl } = props;

    const searchClient = algoliasearch(env!.ALGOLIA_APP_ID, env!.ALGOLIA_API_KEY_SEARCH);

    return (
        <InstantSearchSSRProvider {...serverState}>
            <InstantSearch searchClient={searchClient} indexName={env!.ALGOLIA_PRIMARY_INDEX}>
                <SearchBox />
                <div className="o-grid o-container c-instant-search__container">
                    <div className="o-grid__col--12  o-grid__col--3@tab o-flex o-flex--stack o-flex--spaced">
                        <Accordion type="multiple">
                            <RefinementList
                                attribute={'tbc'}
                                sortBy={['name:asc']}
                                accordionItem={true}
                                title="Filter by Result type"
                                value="TO BE CREATED"
                            />
                            <RefinementList
                                attribute={'tbc'}
                                sortBy={['name:asc']}
                                accordionItem={true}
                                title="Filter by Monthly Payments"
                                value="TO BE CREATED"
                            />
                            <RefinementList
                                attribute={'tbc'}
                                sortBy={['name:asc']}
                                accordionItem={true}
                                title="Filter by Price"
                                value="TO BE CREATED"
                            />
                            <RefinementList
                                attribute={'meta.osc.award'}
                                sortBy={['name:asc']}
                                accordionItem={true}
                                title="Filter by award"
                                value="award"
                            />
                            <RefinementList
                                attribute={'meta.osc.awarding_body'}
                                sortBy={['name:asc']}
                                accordionItem={true}
                                title="Filter by awarding body"
                                value="awarding_body"
                            />
                            <RefinementList
                                attribute={'options.study-method'}
                                sortBy={['name:asc']}
                                accordionItem={true}
                                title="Filter by study method"
                                value="study_method"
                            />
                        </Accordion>
                        <ClearRefinements />
                    </div>
                    <div className="o-grid o-grid__col--12 o-grid__col--9@tab">
                        {/* Use Flex */}
                        <div>
                            <div>SELECTS</div>
                        </div>
                        {/* Use Grid */}
                        <div className="o-grid o-grid__col--12">
                            <div className="o-grid__col--6">COLLECTION 1</div>
                            <div className="o-grid__col--6">COLLECTION 2</div>
                        </div>
                        <Index indexName={env!.ALGOLIA_PRIMARY_INDEX_GROUPED_BY_ID}>
                            <Configure hitsPerPage={hitsPerPage} />
                            <Hits allHitsWithVariantTitle={allHitsWithVariantTitle} />
                        </Index>
                    </div>
                </div>
            </InstantSearch>
        </InstantSearchSSRProvider>
    );
};

export default function SearchPage() {
    const { allHitsWithVariantTitle, ENV, serverState, serverUrl } = useLoaderData();

    return (
        <Search
            allHitsWithVariantTitle={allHitsWithVariantTitle}
            env={ENV}
            hitsPerPage={HITS_PER_PAGE}
            serverState={serverState}
            serverUrl={serverUrl}
        />
    );
}
