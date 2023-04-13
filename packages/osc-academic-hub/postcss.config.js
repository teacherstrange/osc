// eslint-disable-next-line no-lone-blocks
{
    // postcss.config.js
    module.exports = {
        plugins: [
            require('autoprefixer'),
            require('cssnano')({ safe: true }),
            require('@fullhuman/postcss-purgecss')({
                content: ['**/*.ts', '**/*.tsx', '**/*.svg'],
                css: ['**/*.css'],
                safelist: {
                    greedy: [/\b\w*react-datepicker\w*\b/i],
                },
                defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                variables: false,
            }),
        ],
    };
}
