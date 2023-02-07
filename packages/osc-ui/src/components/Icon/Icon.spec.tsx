import { render } from '@testing-library/react';
import React from 'react';
import { Icon, SpritesheetProvider } from './Icon';

test('correctly passes the ID to the href', () => {
    render(
        <SpritesheetProvider>
            <Icon id="arrow" />
        </SpritesheetProvider>
    );
    const use = document.querySelector('use');

    expect(use).toHaveAttribute('href', './spritesheet.svg#arrow');
});

test('passes correct classNames', () => {
    render(
        <SpritesheetProvider>
            <Icon className="test" id="arrow" />
        </SpritesheetProvider>
    );
    const svg = document.querySelector('svg');

    expect(svg).toHaveClass('o-icon test');
});

test('provider provides a custom spritesheet path', () => {
    render(
        <SpritesheetProvider
            value={{
                spriteSheetPath: './custom-spritesheet.svg',
            }}
        >
            <Icon id="arrow" />
        </SpritesheetProvider>
    );
    const use = document.querySelector('use');

    expect(use).toHaveAttribute('href', './custom-spritesheet.svg#arrow');
});
