// OSC-UI
import '../packages/osc-ui/src/styles/main.scss';

import React from 'react';
import { MemoryRouter } from 'react-router';

const withTheme = (story, context) => {
    const { theme } = context.globals;

    if (theme === 'dark') {
        document.body.classList.add('theme--dark');
    } else {
        document.body.classList.remove('theme--dark');
    }

    return <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>;
};

export const decorators = [withTheme];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
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
            dynamicTitle: true
        }
    }
};
