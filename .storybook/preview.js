// OSC-UI
import '../packages/osc-ui/src/styles/main.scss';

import { addDecorator } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

addDecorator((story) => {
    return <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>;
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
