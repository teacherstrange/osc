// 1) render panel open
// 2) test typing updating results
// 3) clearing results from searchbox
// 4) test limit for results

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from 'test-utils';
import { Autocomplete } from './Autocomplete';
import { searchClient } from './searchClient';

test('renders a Autcomplete panel when the input is clicked', async () => {
    const user = userEvent.setup();
    render(<Autocomplete searchClient={searchClient} />);
    const input = await screen.getByRole('textbox', { name: 'Search' });
    // await user.type(input, 'G');
    await user.type(input, 'English');
    await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    });
    screen.debug(undefined, Infinity);
});

test('typing updates autocomplete results', async () => {
    const user = userEvent.setup();
    render(<Autocomplete searchClient={searchClient} />);
    const input = await screen.getByRole('textbox', { name: 'Search' });
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
    render(<Autocomplete searchClient={searchClient} />);
    const input = await screen.getByRole('textbox', { name: 'Search' });
    await user.type(input, 'English');

    // click clear button
    const clearButton = await screen.findByText('X');
    clearButton.click();
    await waitFor(() => expect(input).toHaveAttribute('value', ''));
});

test('limits the amount of results to three', async () => {
    const user = userEvent.setup();
    render(<Autocomplete searchClient={searchClient} />);
    const input = await screen.getByRole('textbox', { name: 'Search' });
    await user.type(input, 'English');
    // populate aa panel
    await waitFor(() =>
        expect(
            document.querySelectorAll('section')[document.querySelectorAll('section').length - 1]
                .children.length === 3
        )
    );
});
