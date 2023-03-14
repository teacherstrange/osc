// 1) render panel open
// 2) test typing updating results
// 3) clearing results from searchbox
// 4) test limit for results

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from 'test-utils';
import { Autocomplete } from './Autocomplete';
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_ID_SEARCH_ONLY_API_KEY = process.env.ALGOLIA_ID_SEARCH_ONLY_API_KEY;
const ALGOLIA_PRIMARY_INDEX_GROUPED = process.env.ALGOLIA_PRIMARY_INDEX_GROUPED;
const ALGOLIA__QUERY_SUGGESTIONS = process.env.ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS;
debugger;
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
    const input = screen.getByRole('textbox', { name: 'Search' });
    // await user.type(input, 'G');
    await user.type(input, 'English');
    await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    });
    screen.debug(undefined, Infinity);
});

test('typing updates autocomplete results', async () => {
    const user = userEvent.setup();
    render(
        <Autocomplete
            ALGOLIA_APP_ID={ALGOLIA_APP_ID}
            ALGOLIA_ID_SEARCH_ONLY_API_KEY={ALGOLIA_ID_SEARCH_ONLY_API_KEY}
            ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS={ALGOLIA__QUERY_SUGGESTIONS}
            ALGOLIA_PRIMARY_INDEX_GROUPED={ALGOLIA_PRIMARY_INDEX_GROUPED}
        />
    );
    const input = screen.getByRole('textbox', { name: 'Search' });
    await user.type(input, 'English');
    const hits =
        document.querySelectorAll('section')[document.querySelectorAll('section').length - 1];
    await user.type(input, 'Maths');
    const newHits =
        document.querySelectorAll('section')[document.querySelectorAll('section').length - 1];
    await waitFor(() => expect(hits != newHits));
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
    const input = screen.getByRole('textbox', { name: 'Search' });
    await user.type(input, 'English');

    // click clear button
    const clearButton = await screen.findByText('X');
    clearButton.click();
    await waitFor(() => expect(input).toHaveAttribute('value', ''));
});

test('limits the amount of results to three', async () => {
    const user = userEvent.setup();
    render(
        <Autocomplete
            ALGOLIA_APP_ID={ALGOLIA_APP_ID}
            ALGOLIA_ID_SEARCH_ONLY_API_KEY={ALGOLIA_ID_SEARCH_ONLY_API_KEY}
            ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS={ALGOLIA__QUERY_SUGGESTIONS}
            ALGOLIA_PRIMARY_INDEX_GROUPED={ALGOLIA_PRIMARY_INDEX_GROUPED}
        />
    );
    const input = screen.getByRole('textbox', { name: 'Search' });
    await user.type(input, 'English');
    // populate aa panel
    await waitFor(() =>
        expect(
            document.querySelectorAll('section')[document.querySelectorAll('section').length - 1]
                .children.length === 3
        )
    );
});
