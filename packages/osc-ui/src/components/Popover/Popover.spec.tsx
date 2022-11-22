/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from './Popover';

global.ResizeObserver = require('resize-observer-polyfill');

test('should render popover content when trigger is clicked and close when trigger is clicked again', async () => {
    const user = userEvent.setup();
    render(
        <Popover>
            <PopoverTrigger>Click to toggle</PopoverTrigger>
            <PopoverContent>Test Content</PopoverContent>
        </Popover>
    );
    await user.click(screen.getByRole('button', { name: /Click to toggle/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveTextContent('Test Content');

    await user.click(screen.getByRole('button', { name: /Click to toggle/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('should render popover content when trigger is clicked and close when parent content is clicked', async () => {
    const user = userEvent.setup();
    render(
        <div>
            Parent content
            <Popover>
                <PopoverTrigger>Click to toggle</PopoverTrigger>
                <PopoverContent>Test Content</PopoverContent>
            </Popover>
        </div>
    );
    await user.click(screen.getByRole('button', { name: /Click to toggle/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByText(/Parent content/i));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('should render <PopoverClose> when content is opened and <PopoverClose> should close the content', async () => {
    const user = userEvent.setup();
    render(
        <Popover>
            <PopoverTrigger>Click to toggle</PopoverTrigger>
            <PopoverContent>
                Test Content
                <PopoverClose>Close</PopoverClose>
            </PopoverContent>
        </Popover>
    );

    await user.click(screen.getByRole('button', { name: /Click to toggle/i }));
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Close/i }));
    expect(screen.queryByRole('button', { name: /Close/i })).not.toBeInTheDocument();
});
