// OSC-UI
import '../packages/osc-ui/src/styles/main.scss';
import '../packages/osc-ui/src/components/Header/header.scss';

import React from 'react';
import { addDecorator } from '@storybook/react';
import createCache from '@emotion/cache';
import { withThemes } from '@react-theming/storybook-addon';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router';

// add prop name to each theme so the buttons have correct title
import lightThemeEcommerce from '../packages/osc-ecommerce/app/theme/lightTheme';
import darkThemeEcommerce from '../packages/osc-ecommerce/app/theme/darkTheme';
import lightThemeAcademic from '../packages/osc-academic-hub/app/theme/lightTheme';
import darkThemeAcademic from '../packages/osc-academic-hub/app/theme/darkTheme';

const providerFn = ({ theme, children }) => {
    const extendedTheme = extendTheme(theme);
    return (
        <ChakraProvider theme={extendedTheme}>
            <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
        </ChakraProvider>
    );
};

addDecorator(
    withThemes(
        null,
        [lightThemeEcommerce, darkThemeEcommerce, lightThemeAcademic, darkThemeAcademic],
        {
            providerFn
        }
    )
);

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};
