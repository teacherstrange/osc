/**
 * @vitest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SkipLink } from './SkipLink';

test('SkipLink component tabs focus to the main content', async () => {
    const user = userEvent.setup();

    render(<SkipLink anchor="main-content">Skip to main content</SkipLink>);

    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });

    await user.tab();
    expect(skipLink).toHaveFocus();
});
