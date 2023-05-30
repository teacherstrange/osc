import type { ObjectWithObjectID } from '@algolia/client-search';
import { useLoaderData } from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import algoliasearch from 'algoliasearch';
import { Accordion, Select, SelectItem, SpritesheetProvider } from 'osc-ui';
import spritesheet from 'osc-ui/dist/spritesheet.svg';
import oscUiAutcompleteStyles from 'osc-ui/dist/src-components-Autocomplete-autocomplete.css';
import oscUiButtonStyles from 'osc-ui/dist/src-components-Button-button.css';
import oscUiCardStyles from 'osc-ui/dist/src-components-Card-card.css';
import oscUiCheckboxStyles from 'osc-ui/dist/src-components-Checkbox-checkbox.css';
import oscUiLabelStyles from 'osc-ui/dist/src-components-Label-label.css';
import oscUiPopoverStyles from 'osc-ui/dist/src-components-Popover-popover.css';
import oscUiSelectStyles from 'osc-ui/dist/src-components-Select-select.css';
import oscUiSliderStyles from 'osc-ui/dist/src-components-Slider-slider.css';
import oscUiTextInputStyles from 'osc-ui/dist/src-components-TextInput-text-input.css';
import { useState } from 'react';
import { renderToString } from 'react-dom/server';
import { getServerState } from 'react-instantsearch-hooks-server';
import type { InstantSearchServerState } from 'react-instantsearch-hooks-web';
import {
    Index,
    InstantSearch,
    InstantSearchSSRProvider,
    SearchBox,
} from 'react-instantsearch-hooks-web';
import { CollectionCards } from '~/components/InstantSearch/Widgets/CollectionCards';
import { Configure } from '~/components/InstantSearch/Widgets/Configure';
import { ClearRefinements } from '~/components/InstantSearch/Widgets/Refinements/ClearRefinements';
import { RefinementList } from '~/components/InstantSearch/Widgets/Refinements/RefinementList';
import { RefinementSlider } from '~/components/InstantSearch/Widgets/Refinements/RefinementSlider';
import { SortBy } from '~/components/InstantSearch/Widgets/Refinements/SortBy';
import { sortingIndexes } from '~/components/InstantSearch/helpers';
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
        { rel: 'stylesheet', href: oscUiSelectStyles },
        { rel: 'stylesheet', href: oscUiSliderStyles },
    ];
};

const HITS_PER_PAGE = 20;

export const loader: LoaderFunction = async ({ request }) => {
    const serverUrl = request.url;

    const serverState = await getServerState(
        <Search
            hitsPerPage={HITS_PER_PAGE}
            env={{
                ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID!,
                ALGOLIA_API_KEY_SEARCH: process.env.ALGOLIA_API_KEY_SEARCH!,
                ALGOLIA_API_KEY_ADMIN: process.env.ALGOLIA_API_KEY_ADMIN!,
                ALGOLIA_PRIMARY_PRODUCTS_INDEX: process.env.ALGOLIA_PRIMARY_PRODUCTS_INDEX!,
                ALGOLIA_PRIMARY_COLLECTIONS_INDEX: process.env.ALGOLIA_PRIMARY_COLLECTIONS_INDEX!,
                ALGOLIA_PRODUCTS_INDEX_GROUPED_BY_ID:
                    process.env.ALGOLIA_PRODUCTS_INDEX_GROUPED_BY_ID!,
            }}
            serverUrl={serverUrl}
        />,
        {
            renderToString,
        }
    );

    return json({
        serverState,
        serverUrl,
        ENV: {
            ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID!,
            ALGOLIA_API_KEY_SEARCH: process.env.ALGOLIA_API_KEY_SEARCH!,
            ALGOLIA_API_KEY_ADMIN: process.env.ALGOLIA_API_KEY_ADMIN!,
            ALGOLIA_PRIMARY_PRODUCTS_INDEX: process.env.ALGOLIA_PRIMARY_PRODUCTS_INDEX!,
            ALGOLIA_PRIMARY_COLLECTIONS_INDEX: process.env.ALGOLIA_PRIMARY_COLLECTIONS_INDEX,
            ALGOLIA_PRODUCTS_INDEX_GROUPED_BY_ID: process.env.ALGOLIA_PRODUCTS_INDEX_GROUPED_BY_ID!,
        },
    });
};

type SearchProps = {
    env?: {
        ALGOLIA_APP_ID: string;
        ALGOLIA_API_KEY_SEARCH: string;
        ALGOLIA_API_KEY_ADMIN?: string;
        ALGOLIA_PRIMARY_PRODUCTS_INDEX?: string;
        ALGOLIA_PRIMARY_COLLECTIONS_INDEX?: string;
        ALGOLIA_PRODUCTS_INDEX_GROUPED_BY_ID?: string;
    };
    hitsPerPage?: number;
    serverState?: InstantSearchServerState;
    serverState2?: InstantSearchServerState;
    serverUrl?: string;
};

// I tried putting this in it's own file, but it causes the app to get stuck in a cycle of errors 🤷‍♂️
const Search = (props: SearchProps) => {
    const { env, hitsPerPage, serverState, serverUrl } = props;

    const searchClient = algoliasearch(env!.ALGOLIA_APP_ID, env!.ALGOLIA_API_KEY_SEARCH);

    const [view, setView] = useState<'listview' | 'gridview'>('listview');

    const [selects] = useState([
        {
            description: { label: 'List View' },
            value: 'listview',
            name: 'List View',
            required: true,
        },
        {
            description: { label: 'Grid View' },
            value: 'gridview',
            name: 'Grid View',
            required: true,
        },
    ]);

    return (
        <InstantSearchSSRProvider {...serverState}>
            <InstantSearch
                searchClient={searchClient}
                indexName={env!.ALGOLIA_PRODUCTS_INDEX_GROUPED_BY_ID}
            >
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
                            <RefinementSlider
                                accordionItem={true}
                                accordionValue="price"
                                attribute="price"
                                prefix="£"
                                start={[100, 200]}
                                title="Filter by Price"
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
                        <div className="o-grid__col--12 o-flex o-flex--end o-flex--spaced">
                            <Select
                                defaultValue="listview"
                                description={{
                                    icon: view === 'listview' ? 'list' : 'grid',
                                }}
                                groupVariants={['inline', 'tertiary']}
                                name={'view_select'}
                                setValue={setView}
                            >
                                {selects.map((item, index) => (
                                    <SelectItem key={index} {...item}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <SortBy items={sortingIndexes} />
                        </div>
                        <div className="o-grid o-grid__col--12">
                            <Index indexName={env!.ALGOLIA_PRIMARY_COLLECTIONS_INDEX!}>
                                <Configure hitsPerPage={100} />
                                <CollectionCards />
                            </Index>
                        </div>

                        <div className="o-grid o-grid__col--12">
                            <Configure hitsPerPage={hitsPerPage} />
                            <Hits view={view} />
                        </div>
                    </div>
                </div>
            </InstantSearch>
        </InstantSearchSSRProvider>
    );
};

export default function SearchPage() {
    const { ENV, serverState, serverUrl } = useLoaderData();

    return (
        <Search
            env={ENV}
            hitsPerPage={HITS_PER_PAGE}
            serverState={serverState}
            serverUrl={serverUrl}
        />
    );
}
