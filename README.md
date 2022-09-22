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
```

The first time you clone the repo run `npm install` to get the Lerna dependencies etc.

Next run `npm run setup` this will run:

-   `npm install`
-   `prisma generate` - generates prisma client
-   `lerna link convert` - takes all dev deps and moves them to the root of the project

Run `npm run dev` to start the development server.

This will run osc-ecommerce on [http://localhost:2000](http://localhost:2000) and osc-academic-hub on [http://localhost:3000](http://localhost:3000).
