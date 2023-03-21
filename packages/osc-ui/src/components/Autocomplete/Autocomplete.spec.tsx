import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import React from 'react';
import { render } from 'test-utils';
import { Autocomplete } from './Autocomplete';

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_ID_SEARCH_ONLY_API_KEY = process.env.ALGOLIA_ID_SEARCH_ONLY_API_KEY;
const ALGOLIA_PRIMARY_INDEX_GROUPED = process.env.ALGOLIA_PRIMARY_INDEX_GROUPED;
const ALGOLIA__QUERY_SUGGESTIONS = process.env.ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS;
test('renders a Autcomplete panel when the input is clicked', async () => {
    const user = userEvent.setup();
    render(
        <Autocomplete
            ALGOLIA_APP_ID={ALGOLIA_APP_ID}
            ALGOLIA_ID_SEARCH_ONLY_API_KEY={ALGOLIA_ID_SEARCH_ONLY_API_KEY}
            ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS={ALGOLIA__QUERY_SUGGESTIONS}
            ALGOLIA_PRIMARY_INDEX_GROUPED={ALGOLIA_PRIMARY_INDEX_GROUPED}
        />
    );
    const input = screen.getByRole('searchbox', { name: 'Search' });
    await user.type(input, 'English');
    await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    });
});

test('typing updates autocomplete results', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
        <Autocomplete
            ALGOLIA_APP_ID={ALGOLIA_APP_ID}
            ALGOLIA_ID_SEARCH_ONLY_API_KEY={ALGOLIA_ID_SEARCH_ONLY_API_KEY}
            ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS={ALGOLIA__QUERY_SUGGESTIONS}
            ALGOLIA_PRIMARY_INDEX_GROUPED={ALGOLIA_PRIMARY_INDEX_GROUPED}
        />
    );

    const input = screen.getByRole('searchbox', { name: 'Search' });

    await user.type(input, 'English');
    const sections = await screen.findAllByRole('option');

    rerender(
        <Autocomplete
            ALGOLIA_APP_ID={ALGOLIA_APP_ID}
            ALGOLIA_ID_SEARCH_ONLY_API_KEY={ALGOLIA_ID_SEARCH_ONLY_API_KEY}
            ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS={ALGOLIA__QUERY_SUGGESTIONS}
            ALGOLIA_PRIMARY_INDEX_GROUPED={ALGOLIA_PRIMARY_INDEX_GROUPED}
        />
    );

    await user.type(input, 'Geography');
    const newSections = await screen.findAllByRole('option');

    await waitFor(() => {
        expect(_.isEqual(sections, newSections)).toBeFalsy();
    });
});

test('Searching for A Level Geography returns A Level Geography as the fist direct result.', async () => {
    const user = userEvent.setup();
    render(
        <Autocomplete
            ALGOLIA_APP_ID={ALGOLIA_APP_ID}
            ALGOLIA_ID_SEARCH_ONLY_API_KEY={ALGOLIA_ID_SEARCH_ONLY_API_KEY}
            ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS={ALGOLIA__QUERY_SUGGESTIONS}
            ALGOLIA_PRIMARY_INDEX_GROUPED={ALGOLIA_PRIMARY_INDEX_GROUPED}
        />
    );
    const input = screen.getByRole('searchbox', { name: 'Search' });
    await user.type(input, 'A Level Geography');

    const results = await screen.findAllByTestId('results');
    const firstResult = results[0].querySelector('.c-autocomplete__item-title');
    await waitFor(() => expect(firstResult).toHaveTextContent('A Level Geography'));
});

test('clicking the reset button clears the search results', async () => {
    const user = userEvent.setup();
    render(
        <Autocomplete
            ALGOLIA_APP_ID={ALGOLIA_APP_ID}
            ALGOLIA_ID_SEARCH_ONLY_API_KEY={ALGOLIA_ID_SEARCH_ONLY_API_KEY}
            ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS={ALGOLIA__QUERY_SUGGESTIONS}
            ALGOLIA_PRIMARY_INDEX_GROUPED={ALGOLIA_PRIMARY_INDEX_GROUPED}
        />
    );
    const input = screen.getByRole('searchbox', { name: 'Search' });
    await user.type(input, 'English');

    // click clear button
    const clearButton = await screen.findByTestId('clearButton');
    clearButton.click();

    await waitFor(() => expect(input).toHaveValue(''));
});

test('limits the amount of results to 2', async () => {
    const user = userEvent.setup();
    render(
        <Autocomplete
            resultsLimit={2}
            ALGOLIA_APP_ID={ALGOLIA_APP_ID}
            ALGOLIA_ID_SEARCH_ONLY_API_KEY={ALGOLIA_ID_SEARCH_ONLY_API_KEY}
            ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS={ALGOLIA__QUERY_SUGGESTIONS}
            ALGOLIA_PRIMARY_INDEX_GROUPED={ALGOLIA_PRIMARY_INDEX_GROUPED}
        />
    );
    const input = screen.getByRole('searchbox', { name: 'Search' });
    await user.type(input, 'English');
    const results = await screen.findAllByTestId('results');
    // populate aa panel
    await waitFor(() => {
        expect(results.length === 2).toBeTruthy();
    });
});
