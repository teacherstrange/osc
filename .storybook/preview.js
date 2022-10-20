// OSC-UI
import '../packages/osc-ui/src/styles/main.scss';
import '../packages/osc-ui/src/components/Header/header.scss';

// Dont think we will need this
// import darkTheme from '../app/theme/darkTheme';
// import lightTheme from '../app/theme/lightTheme';

import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
    key: 'css',
    prepend: true
});

addDecorator((story) => {
    return (
        <CacheProvider value={cache}>
            <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
        </CacheProvider>
    );
});

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};
