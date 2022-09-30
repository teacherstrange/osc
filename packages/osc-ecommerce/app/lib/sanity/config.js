// Becuase this needs to work on both the server and the browser we need to check for the document being defined https://remix.run/docs/en/v1/guides/constraints#document-guard
// The document.env should be set in the root.tsx file so we can access it across all routes
const SANITY_STUDIO_API_PROJECT_ID =
    typeof document !== 'undefined'
        ? document.env.SANITY_STUDIO_API_PROJECT_ID
        : process.env.SANITY_STUDIO_API_PROJECT_ID;

const SANITY_STUDIO_API_DATASET =
    typeof document !== 'undefined'
        ? document.env.SANITY_STUDIO_API_DATASET
        : process.env.SANITY_STUDIO_API_DATASET;

export const config = {
    apiVersion: '2021-10-21', // see studio/contstants.js
    projectId: SANITY_STUDIO_API_PROJECT_ID,
    dataset: SANITY_STUDIO_API_DATASET,
    useCdn: true
};
