// OSC-UI
import { SpritesheetProvider } from '../packages/osc-ui/src/components/Icon/Icon';
import '../packages/osc-ui/src/styles/main.scss';

import React from 'react';
import { MemoryRouter } from 'react-router';

const withTheme = (story, context) => {
    const { theme } = context.globals;

    if (theme === 'dark') {
        document.documentElement.classList.add('theme--dark');
    } else {
        document.documentElement.classList.remove('theme--dark');
    }

    return (
        <MemoryRouter initialEntries={['/']}>
            <SpritesheetProvider>{story()}</SpritesheetProvider>
        </MemoryRouter>
    );
};

export const decorators = [withTheme];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Select colour theme',
        defaultValue: 'light',
        toolbar: {
            icon: 'mirror',
            items: ['light', 'dark'],
            showName: true,
            dynamicTitle: true,
        },
    },
};
