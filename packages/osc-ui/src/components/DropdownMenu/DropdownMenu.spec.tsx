/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import React from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './DropdownMenu';

describe('DropdownMenu Component', () => {
    const setup = () =>
        render(
            <DropdownMenu>
                <DropdownMenuTrigger asChild={true}>
                    <button className="c-dropdown-menu__icon-button" aria-label="Customise options">
                        Open
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Menu Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Menu Item 2</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

    test('Renders the dropdown menu trigger', () => {
        setup();
        expect(screen.getByRole('button')).toHaveTextContent('Open');
    });
});
