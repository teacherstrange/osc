/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
    cacheDirectory: './node_modules/.cache/remix',
    ignoredRouteFiles: ['**/.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],
    // serverDependenciesToBundle: [/^header.*/],
    watchPaths: ['../osc-ui/dist/*'],
    devServerPort: 8002,
    serverDependenciesToBundle: [
        'instantsearch.js/es/connectors',
        /^osc-ui\/dist\/.*\.svg$/, // match svg files in dist folder, this prevents the unhandled token error being thrown
    ],
    future: {
        v2_normalizeFormMethod: true,
    },
};
