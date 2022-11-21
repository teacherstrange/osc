import { act, render, screen } from '@testing-library/react';

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

test('should render popover content when trigger is clicked and close when trigger is clicked again', () => {
    render(
        <Popover>
            <PopoverTrigger>Click to toggle</PopoverTrigger>
            <PopoverContent>Test Content</PopoverContent>
        </Popover>
    );

    act(() => {
        screen.getByRole('button').click();
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveTextContent('Test Content');

    act(() => {
        screen.getByRole('button').click();
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
