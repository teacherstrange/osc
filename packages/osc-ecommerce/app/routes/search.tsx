import { useLoaderData } from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import algoliasearch from 'algoliasearch';
import { mediaQueries as mq } from 'osc-design-tokens';
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Select,
    SelectItem,
    SpritesheetProvider,
    rem,
    useMediaQuery,
} from 'osc-ui';
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
import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { getServerState } from 'react-instantsearch-hooks-server';
import type { InstantSearchServerState } from 'react-instantsearch-hooks-web';
import { Index, InstantSearch, InstantSearchSSRProvider } from 'react-instantsearch-hooks-web';
import { ItemCounter } from '~/components/InstantSearch/Components/ItemCounter';
import { SearchBox } from '~/components/InstantSearch/Components/SearchBox';
import { CollectionCards } from '~/components/InstantSearch/Widgets/CollectionCards';
import { Configure } from '~/components/InstantSearch/Widgets/Configure';
import { Hits } from '~/components/InstantSearch/Widgets/Hits/Hits';
import { NoResults } from '~/components/InstantSearch/Widgets/NoResults/NoResults';
import { NoResultsBoundary } from '~/components/InstantSearch/Widgets/NoResults/NoResultsBoundary';
import { ClearRefinements } from '~/components/InstantSearch/Widgets/Refinements/ClearRefinements';
import { SortBy } from '~/components/InstantSearch/Widgets/Refinements/SortBy';
import { REFINEMENT_DATA, SORTING_INDEXES, VIEW_OPTIONS } from '~/components/InstantSearch/data';
import oscUiInstantSearchStyles from '~/components/InstantSearch/instant-search.css';
import { getRefinementWidget } from '~/components/InstantSearch/utils/getRefinementWidget';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: oscUiAutcompleteStyles },
        { rel: 'stylesheet', href: oscUiButtonStyles },
        { rel: 'stylesheet', href: oscUiCheckboxStyles },
        { rel: 'stylesheet', href: oscUiLabelStyles },
        { rel: 'stylesheet', href: oscUiInstantSearchStyles },
        { rel: 'stylesheet', href: oscUiTextInputStyles },
        { rel: 'stylesheet', href: oscUiCardStyles },
        { rel: 'stylesheet', href: oscUiPopoverStyles },
        { rel: 'stylesheet', href: oscUiSelectStyles },
        { rel: 'stylesheet', href: oscUiSliderStyles },
    ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const serverUrl = request.url;

    const serverState = await getServerState(
        <Search
            env={{
                ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID!,
                ALGOLIA_API_KEY_SEARCH: process.env.ALGOLIA_API_KEY_SEARCH!,
                ALGOLIA_API_KEY_ADMIN: process.env.ALGOLIA_API_KEY_ADMIN!,
                ALGOLIA_PRIMARY_PRODUCTS_INDEX: process.env.ALGOLIA_PRIMARY_PRODUCTS_INDEX!,
                ALGOLIA_PRIMARY_COLLECTIONS_INDEX: process.env.ALGOLIA_PRIMARY_COLLECTIONS_INDEX!,
                ALGOLIA_PRODUCTS_INDEX_GROUPED_BY_ID:
                    process.env.ALGOLIA_PRODUCTS_INDEX_GROUPED_BY_ID!,
                ALGOLIA_HITS_PER_PAGE: +process.env.ALGOLIA_HITS_PER_PAGE!,
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
            ALGOLIA_HITS_PER_PAGE: process.env.ALGOLIA_HITS_PER_PAGE!,
            SANITY_STUDIO_API_TOKEN: process.env.SANITY_STUDIO_API_TOKEN!,
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
        ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS?: string;
        ALGOLIA_HITS_PER_PAGE?: number;
        SANITY_STUDIO_API_TOKEN?: string;
    };
    hitsPerPage?: number;
    serverState?: InstantSearchServerState;
    serverUrl?: string;
};

// I tried putting this in it's own file, but it causes the app to get stuck in a cycle of errors 🤷‍♂️
const Search = (props: SearchProps) => {
    const { env, serverState } = props;

    const searchClient = algoliasearch(env!.ALGOLIA_APP_ID, env!.ALGOLIA_API_KEY_SEARCH);

    const [view, setView] = useState<'listview' | 'gridview'>('listview');

    // Setting in state as trying directly through 'isGreaterThanTab' throws a strange error related to ResizeObserver
    const [nestedAccordion, setNestedAccordion] = useState(false);

    const isGreaterThanTab: Boolean = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);

    useEffect(() => {
        if (isGreaterThanTab) {
            setNestedAccordion(false);
            setView('listview');
        } else {
            setNestedAccordion(true);
            setView('gridview');
        }
    }, [isGreaterThanTab]);

    return (
        <SpritesheetProvider spriteSheetPath={spritesheet}>
            <InstantSearchSSRProvider {...serverState}>
                <InstantSearch
                    searchClient={searchClient}
                    indexName={env!.ALGOLIA_PRODUCTS_INDEX_GROUPED_BY_ID}
                >
                    <div
                        className={`${
                            !nestedAccordion ? 'u-mb-l' : ''
                        } u-bg-color-neutral-200 u-pt-5xl u-pb-5xl`}
                    >
                        <div
                            className={`${
                                !nestedAccordion ? 'u-pl-7xl u-pr-4xl' : ''
                            } o-container o-container--3xs`}
                        >
                            <ItemCounter />
                            <SearchBox />
                        </div>
                    </div>

                    <div
                        className={`${
                            !nestedAccordion ? 'o-container' : ''
                        } o-grid u-pb-l c-instant-search u-pt-3xl`}
                    >
                        <div
                            className={`${
                                nestedAccordion
                                    ? 'c-instant-search__accordion--nested o-container'
                                    : 'c-instant-search__accordion'
                            } o-grid__col--12 o-grid__col--3@tab o-flex o-flex--stack o-flex--spaced u-pr-xl`}
                        >
                            <Accordion type="single" collapsible={true}>
                                {!nestedAccordion ? (
                                    REFINEMENT_DATA?.map((refinement, index) =>
                                        getRefinementWidget(refinement, index)
                                    )
                                ) : (
                                    <AccordionItem value="child-0">
                                        <AccordionHeader
                                            icon="plusMinus"
                                            asChild={true}
                                            as="h2"
                                            className="c-instant-search__accordion-header"
                                        >
                                            Filters
                                        </AccordionHeader>
                                        <AccordionPanel>
                                            <Accordion type="multiple">
                                                {REFINEMENT_DATA?.map((refinement, index) =>
                                                    getRefinementWidget(refinement, index)
                                                )}
                                            </Accordion>
                                            <ClearRefinements
                                                className={
                                                    nestedAccordion
                                                        ? 'o-flex o-flex--end u-pt-s'
                                                        : ''
                                                }
                                            />
                                        </AccordionPanel>
                                    </AccordionItem>
                                )}
                            </Accordion>

                            {!nestedAccordion ? <ClearRefinements /> : null}
                        </div>
                        <div
                            className={`${
                                nestedAccordion ? 'o-container' : ''
                            } o-grid o-grid__col--12 o-grid__col--9@tab`}
                        >
                            <div className="o-grid__col--12 o-flex o-flex--end o-flex--spaced">
                                {!nestedAccordion ? (
                                    <Select
                                        defaultValue="listview"
                                        description={{
                                            icon: view === 'listview' ? 'list' : 'grid',
                                        }}
                                        groupVariants={['inline', 'tertiary']}
                                        name={'view_select'}
                                        setExternalValue={setView}
                                    >
                                        {VIEW_OPTIONS?.map((item, index) => (
                                            <SelectItem key={index} {...item}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                ) : null}
                                <SortBy items={SORTING_INDEXES} />
                            </div>
                            <div className="o-grid o-grid__col--12 u-pt-3xl u-pb-xl">
                                <Index indexName={env!.ALGOLIA_PRIMARY_COLLECTIONS_INDEX!}>
                                    <Configure hitsPerPage={100} />
                                    <CollectionCards env={env!.SANITY_STUDIO_API_TOKEN!} />
                                </Index>
                            </div>
                            <div className="o-grid o-grid__col--12">
                                <Configure hitsPerPage={env!.ALGOLIA_HITS_PER_PAGE!} />
                                <NoResultsBoundary fallback={<NoResults />}>
                                    <Hits view={view} />
                                </NoResultsBoundary>
                            </div>
                        </div>
                    </div>
                </InstantSearch>
            </InstantSearchSSRProvider>
        </SpritesheetProvider>
    );
};

export default function SearchPage() {
    const { ENV, serverState, serverUrl } = useLoaderData();

    return <Search env={ENV} serverState={serverState} serverUrl={serverUrl} />;
}
