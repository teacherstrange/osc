# OSC Monorepo

## Getting started

Make a copy of the `.env.sample` and rename it to `.env`. Next add the values to the following constants.

```.env
PLANETSCALE_PRISMA_DATABASE_URL=''
SESSION_SECRET="super-duper-s3cret"
LOAD_PATH="app/styles"
PATH_TO_MAIN_SCSS="/app/styles/main.scss"
PATH_TO_DEST_MAIN_CSS="/app/styles/dest"
PATH_TO_COMPONENTS="/app/components"
GA_TRACKING_ID=""
GTM_TRACKING_ID=""
VAPID_PUBLIC_KEY=""
VAPID_PRIVATE_KEY=""
DATABASE_URL=""
ALGOLIA_ID=""
ALGOLIA_ID_SEARCH_ONLY=""
SANITY_STUDIO_API_PROJECT_ID=""
SANITY_STUDIO_API_DATASET="staging"
SANITY_STUDIO_API_TOKEN=""
```

The first time you clone the repo run `npm install` to get the Lerna dependencies etc and then `npm run setup` to install the dependencies for each package:

```sh
npm install
npm run setup
```

`npm run setup` will run:

-   `npm install`
-   `prisma generate` - generates prisma client
-   `lerna link convert` - takes all dev deps and moves them to the root of the project

Run `npm run dev` to start the development server.

## Setting up Sanity Studio

There's an extra step to get Sanity working.

Navigate into the `osc-studio` package and make a copy of the `.env.sample.development`, rename it `.env.development` and add the following variables to it

```.env
SANITY_STUDIO_API_PROJECT_ID=""
SANITY_STUDIO_API_DATASET="staging"
```

## Development commands

Run `osc-ecommerce`, `osc-academic-hub` and `osc-ui`.

Because `osc-studio` isn't part of the packages array in `lerna.json` then it has to be run as a separate command.

```sh
npm run dev
```

Run `osc-ecommerce` & `osc-ui` or `osc-academic-hub` & `osc-ui`

```sh
npm run dev:osc-ecommerce
npm run dev:osc-academic-hub
```

Run Sanity Studio

```sh
npm run dev:osc-studio
```

This will run osc-ecommerce on [http://localhost:2000](http://localhost:2000) and osc-academic-hub on [http://localhost:3000](http://localhost:3000).

## Our tech

-   [Fly app deployment](https://fly.io) with [Docker](https://www.docker.com/)
-   Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
-   [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
-   Database ORM with [Prisma](https://prisma.io)
-   UI library [Chakra UI](https://chakra-ui.com/)
-   Styling with [Sass](https://sass-lang.com/)
-   End-to-end testing with [Playwright](https://playwright.dev/)
-   Local third party request mocking with [MSW](https://mswjs.io)
-   Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
-   Code formatting with [Prettier](https://prettier.io)
-   Linting with [ESLint](https://eslint.org)
-   Static Types with [TypeScript](https://typescriptlang.org)

<details>
    <summary>Setting up a new monorepo</summary>
This Remix Stack comes with two GitHub Actions that handle automatically deploying your app to production and staging environments.

Prior to your first deployment, you'll need to do a few things:

-   [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

-   Sign up and log in to Fly

    ```sh
    fly auth signup
    ```

    > **Note:** If you have more than one Fly account, ensure that you are signed into the same account in the Fly CLI as you are in the browser. In your terminal, run `fly auth whoami` and ensure the email matches the Fly account signed into the browser.

-   Create two apps on Fly, one for staging and one for production:

    ```sh
    fly create osc-ecommerce
    fly create osc-ecommerce-staging
    ```

    -   Initialize Git.

    ```sh
    git init
    ```

-   Create a new [GitHub Repository](https://repo.new), and then add it as the remote for your project. **Do not push your app yet!**

    ```sh
    git remote add origin <ORIGIN_URL>
    ```

-   Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.

-   Add a `SESSION_SECRET` to your fly app secrets, to do this you can run the following commands:

    ```sh
    fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app osc-ecommerce
    fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app osc-ecommerce-staging
    ```

    If you don't have openssl installed, you can also use [1password](https://1password.com/password-generator/) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

-   Create a persistent volume for the sqlite database for both your staging and production environments. Run the following:

    ```sh
    fly volumes create data --size 1 --app osc-ecommerce
    fly volumes create data --size 1 --app osc-ecommerce-staging
    ```

Now that everything is set up you can commit and push your changes to your repo. Every commit to your `main` branch will trigger a deployment to your production environment, and every commit to your `dev` branch will trigger a deployment to your staging environment.

### Connecting to your database

The sqlite database lives at `/data/sqlite.db` in your deployed application. You can connect to the live database by running `fly ssh console -C database-cli`.

### Getting Help with Deployment

If you run into any issues deploying to Fly, make sure you've followed all of the steps above and if you have, then post as many details about your deployment (including your app name) to [the Fly support community](https://community.fly.io). They're normally pretty responsive over there and hopefully can help resolve any of your deployment issues and questions.

</details>

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `production` branch will be deployed to production after running tests/build/etc. Anything in the `staging` branch will be deployed to staging.

## Testing

### Playwright

We use Playwright for our End-to-End tests in this project. You'll find those in the `e2e` directory.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Playwright test runner. Make sure the database is running in docker as described above.

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
