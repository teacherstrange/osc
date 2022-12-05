require('dotenv').config;
const path = require('path');

const stories = [
    '../packages/osc-ui/src/components/**/*.stories.mdx',
    '../packages/osc-ui/src/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/osc-academic-hub/app/components/**/*.stories.mdx',
    '../packages/osc-academic-hub/app/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/osc-ecommerce/app/components/**/*.stories.mdx',
    '../packages/osc-ecommerce/app/components/**/*.stories.@(js|jsx|ts|tsx)'
];

module.exports = {
    features: {
        emotionAlias: false
    },
    stories,
    addons: [
        'storybook-addon-sass-postcss',
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false
            }
        },
        '@storybook/addon-interactions',
        '@storybook/addon-a11y'
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5'
    },
    webpackFinal: async (config, { configType }) => {
        config.resolve = {
            ...config.resolve,
            fallback: {
                ...(config.resolve || {}).fallback,
                fs: false,
                stream: false,
                os: false,
                emotionAlias: false
            },
            // Alias the font path in osc-ui so storybook can find it
            alias: {
                './fonts/Outfit-VariableFont_wght.woff2': path.resolve(
                    __dirname,
                    '../packages/osc-ui/src/fonts/Outfit-VariableFont_wght.woff2'
                )
            }
        };

        // Return the altered config
        return config;
    }
};
