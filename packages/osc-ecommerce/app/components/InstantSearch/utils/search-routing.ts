import { history } from 'instantsearch.js/es/lib/routers';
import type { UiState } from 'instantsearch.js';
import { SORTING_INDEXES } from '../data';
import type QueryString from 'qs';

interface QueryParameters {
    award: string[];
    awarding_body: string[];
    query: string;
    price: string[];
    study_method: string[];
    sortBy: string;
}

const router = (serverUrl: string) => {
    return history({
        getLocation: () => {
            return typeof document === 'undefined'
                ? (new URL(serverUrl!) as unknown as Location)
                : window.location;
        },
        windowTitle({ query }) {
            const queryTitle = query ? `Results for "${query}"` : 'Search';
            return queryTitle;
        },

        createURL({ qsModule, routeState, location }) {
            const urlParts = location.href.match(/^(.*?)\/search/);
            const baseUrl = `${urlParts ? urlParts[1] : ''}/`;
            const queryParameters: Partial<QueryParameters> = {};

            if (routeState.query) {
                queryParameters.query = encodeURIComponent(routeState.query as string);
            }
            if (routeState.price && (routeState.price as []).length > 0) {
                if (Array.isArray(routeState.price)) {
                    queryParameters.price = (routeState.price as string[])
                        .filter((q) => q)
                        .map(encodeURIComponent);
                } else {
                    queryParameters.price = (routeState.price as string)
                        .split(':')
                        .map((value) => {
                            return value;
                        })
                        .map(encodeURIComponent);
                }
            }

            if (routeState.award) {
                queryParameters.award = (routeState.award as string[]).map(encodeURIComponent);
            }
            if (routeState.awarding_body) {
                queryParameters.awarding_body = (routeState.awarding_body as string[]).map(
                    encodeURIComponent
                );
            }
            if (routeState.study_method) {
                queryParameters.study_method = (routeState.study_method as string[]).map(
                    encodeURIComponent
                );
            }
            if (routeState.sortBy) {
                const index = SORTING_INDEXES.find((index) => index.value === routeState.sortBy);
                if (index) {
                    queryParameters.sortBy = encodeURIComponent(index.label);
                }
            }
            const queryString = qsModule.stringify(queryParameters, {
                addQueryPrefix: true,
                arrayFormat: 'repeat',
            });

            return `${baseUrl}search/${queryString}`;
        },

        parseURL({ qsModule, location }) {
            const {
                award = [],
                awarding_body = [],
                query = '',
                price = [],
                sortBy = '',
                study_method = [],
            } = qsModule.parse(location.search.slice(1));

            /**
             * Ensures return value is an array
             */
            const asArray = (
                value: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[]
            ) =>
                Array.isArray(value) ? (value as string[]) : ([value].filter(Boolean) as string[]);

            // `qs` does not return an array when there's a single value.
            const allAwards = asArray(award);
            const awardingBodies = asArray(awarding_body);
            const studyMethods = asArray(study_method);
            const prices = asArray(price);

            const res = {
                award: allAwards.map(decodeURIComponent),
                awarding_body: awardingBodies.map(decodeURIComponent),
                query: decodeURIComponent(query as string),
                study_method: studyMethods.map(decodeURIComponent),
                sortBy: SORTING_INDEXES.find(
                    (index) => index.label === decodeURIComponent(sortBy as string)
                )?.value,
                price: prices.map(decodeURIComponent),
            } as UiState;

            return res;
        },
    });
};

const searchRouting = {
    router: (serverUrl: string) => router(serverUrl),
};

export default searchRouting;
