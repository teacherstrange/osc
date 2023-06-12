# OSC monorepo

Welcome to the OSC monorepo! 👋

## Our tech

-   Monorepo management with [NPM workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces) and [NX](https://nx.dev/getting-started/intro).
-   [Fly app deployment](https://fly.io) with [Docker](https://www.docker.com/)
-   Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
-   [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
-   Database ORM with [Prisma](https://prisma.io)
-   UI library [Radix UI Primitives](https://www.radix-ui.com/docs/primitives/overview/getting-started)
-   Styling with [Sass](https://sass-lang.com/)
-   End-to-end testing with [Playwright](https://playwright.dev/)
-   Local third party request mocking with [MSW](https://mswjs.io)
-   Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
-   Code formatting with [Prettier](https://prettier.io)
-   Linting with [ESLint](https://eslint.org)
-   Static Types with [TypeScript](https://typescriptlang.org)

## Getting started

Make a copy of the `.env.sample` in each workspace, rename it to `.env` and update any missing values. (You will be able to get any of the these from one of the team).

<details>
  <summary><h3>Environment Variable list<h3></summary>

-   `root`

    ```
    # Misc
    SESSION_SECRET=""
    LOAD_PATH="app/styles"

    # GTM
    GA_TRACKING_ID=""
    GTM_TRACKING_ID=""

    # Planetscale
    PLANETSCALE_PRISMA_DATABASE_URL=''
    VAPID_PUBLIC_KEY=""
    VAPID_PRIVATE_KEY=""
    DATABASE_URL=""

    # Sanity
    SANITY_STUDIO_API_PROJECT_ID=""
    SANITY_STUDIO_API_DATASET="staging"
    SANITY_STUDIO_API_TOKEN=""
    PREVIEW_SESSION_SECRET="s3cret1"

    # Algolia
    ALGOLIA_APP_ID=""
    ALGOLIA_ID_SEARCH_ONLY_API_KEY=""
    ALGOLIA_PRIMARY_INDEX=""
    ALGOLIA_PRIMARY_INDEX_GROUPED=""
    ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS=""
    STORYBOOK_ALGOLIA_APP_ID=""
    STORYBOOK_ALGOLIA_ID_SEARCH_ONLY_API_KEY=""
    STORYBOOK_ALGOLIA_PRIMARY_INDEX=""
    STORYBOOK_ALGOLIA_PRIMARY_INDEX_GROUPED=""
    STORYBOOK_ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS=""
    VITE_ALGOLIA_APP_ID=""
    VITE_ALGOLIA_ID_SEARCH_ONLY_API_KEY=""
    VITE_ALGOLIA_PRIMARY_INDEX=""
    VITE_ALGOLIA_PRIMARY_INDEX_GROUPED=""
    VITE_ALGOLIA_PRIMARY_INDEX_QUERY_SUGGESTIONS=""

    # OSC API
    API_GATEWAY_URL=http://localhost:4000

    # Hubspot
    HUBSPOT_ACCESS_TOKEN=""
    HUBSPOT_PORTAL_ID=""

    # Hydrogen
    PUBLIC_STOREFRONT_API_TOKEN=""
    PRIVATE_STOREFRONT_API_TOKEN=""
    PUBLIC_STOREFRONT_API_VERSION="2023-01"
    PUBLIC_STORE_DOMAIN="openstudydev.myshopify.com"
    SHOPIFY_ADMIN_API_TOKEN=""
    ```

-   `osc-api-admin`
    ```
    NODE_ENV=development
    ```
-   `osc-api-assignments`

    ```
    NODE_ENV=development
    S3_BUCKET=
    S3_KEY_ID=
    S3_KEY_SECRET=
    ```

-   `osc-api-auth`

    ```
    NODE_ENV=development
    SALT_ROUNDS=12
    JWT_SECRET=changeme
    JWT_AUDIENCE="http://localhost:4000/graphql"
    JWT_DURATION=3600
    JWT_REFRESH_DURATION=86400
    MAGIC_SECRET=changeme
    ```

-   `osc-api-crm`

    ```
    NODE_ENV=development
    HUBSPOT_ACCESS_TOKEN=
    ```

-   `osc-api-ecommerce`
    ```
    NODE_ENV=development
    ALGOLIA_APP_ID=
    ALGOLIA_SEARCH_KEY=
    SHOPIFY_API_KEY=
    SHOPIFY_SECRET=
    ```
-   `osc-api-gateway`

    ```
    NODE_ENV=development
    APOLLO_KEY=
    APOLLO_GRAPH_REF=
    AUTH_API_URL=http://localhost:4001
    ADMIN_API_URL=http://localhost:4005
    ```

-   `osc-api-lms`

    ```
    NODE_ENV=development
    LMS_URL=
    LMS_API_KEY=
    ```

</details>

-   Install all dependencies and setup prisma

    ```sh
    npm run setup
    ```

-   Run the build command

    ```sh
    npm run build
    ```

    Builds workspaces and sets up the cache

-   Start development

    ```sh
    npm run dev
    ```

    This will run all workspaces in development mode.

## Installing new packages

If you need to install a new package to one or multiple workspaces then it is best to install them using the `--workspace` flag on the end of the install command. For example:

```sh
npm i react --workspace=osc-ui
```

If you need the dependency installed in multiple workspaces then you can chain this flag like so:

```sh
npm i react --workspace=osc-ui --workspace=osc-ecommerce --workspace=osc-academic-hub
```

## Development

-   `npm run dev`

    Runs development server for all workspaces

-   `npm run dev:fe`

    Runs development server for frontend only workspaces

-   `npm run dev:api`

    Runs development server for api services

-   `npm run dev:<workspace-name>`

    Runs development server for osc-{ui|ecommerce|academic-hub|studio}

-   `npm run api:dev:<workspace-name>`

    Runs development server for osc-api-{\*}

-   `npm run storybook`

    Runs storybook for components in osc-{ui|ecommerce|academic-hub}

-   `npm run tokens:generate`

    Generate scss `_tokens.scss` file from the osc-design-tokens workspace

## Testing

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

-   `npm run test`

    Run tests for all workspaces

-   `npm run test:<workspace-name>`

    Runs tests for osc-{ui|ecommerce|academic-hub|api-\*}

-   `npm run test:watch`

    Runs tests in watch mode for all workspaces

-   `npm run test:watch:<workspace-name>`

    Runs tests in watch mode for osc-{ui|ecommerce|academic-hub}

### Playwright

We use `Playwright` for our End-to-End tests in this project. You'll find those in the `e2e` directory inside of our Remix apps.

-   `npm run test:e2e`

    Run tests for all workspaces

-   `npm run test:e2e:<workspace-name>`

    Runs tests for osc-{ecommerce|academic-hub}

## Linting & Typechecking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete.

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save.

-   `npm run lint`

    Lints the monorepo based on the `.eslint.js` config.

-   `npm run lint-and-fix`

    Lints and attempts to fix the monorepo based on the `.eslintrc` file.

-   `npm run prettier-format`

    Format all files against the `.prettierrc` file.

-   `npm run typecheck`

    Typecheck files against the `tsconfig` files

## Deployment

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc.
