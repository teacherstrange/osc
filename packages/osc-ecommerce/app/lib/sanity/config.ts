// Becuase this needs to work on both the server and the browser we need to check for the document being defined https://remix.run/docs/en/v1/guides/constraints#document-guard
import type { PreviewConfig } from '@sanity/preview-kit';
import invariant from 'tiny-invariant';

// The document.env should be set in the root.tsx file so we can access it across all routes
const SANITY_STUDIO_API_PROJECT_ID =
    typeof document !== 'undefined' && document.env
        ? document.env.SANITY_STUDIO_API_PROJECT_ID
        : process.env.SANITY_STUDIO_API_PROJECT_ID;

const SANITY_STUDIO_API_DATASET =
    typeof document !== 'undefined' && document.env
        ? document.env.SANITY_STUDIO_API_DATASET
        : process.env.SANITY_STUDIO_API_DATASET;

invariant(SANITY_STUDIO_API_PROJECT_ID, `SANITY_STUDIO_API_PROJECT_ID must be set`);
invariant(SANITY_STUDIO_API_DATASET, `SANITY_STUDIO_API_DATASET must be set`);

export const config = {
    apiVersion: '2021-10-21', // see studio/contstants.js
    projectId: SANITY_STUDIO_API_PROJECT_ID,
    dataset: SANITY_STUDIO_API_DATASET,
    useCdn: true,
};

export const previewConfig: PreviewConfig = {
    ...config,
    // The limit on number of documents, to prevent using too much memory unexpectedly
    // It's 3000 by default, increase or decrease as needed and use `includeTypes` to further optimize the performance
    documentLimit: 3000,
    // Optional allow list filter for document types. You can use this to limit the amount of documents by declaring the types you want to sync. Note that since you're fetching a subset of your dataset, queries that works against your Content Lake might not work against the local groq-store.
    includeTypes: ['home', 'blog', 'collection', 'page', 'post', 'product'],
    // By default documents that are "draft" are overlayed with their published counterparts.
    // This lets you simulate what your app will look like after the drafts are published.
    // If your queries are already equipped to handle drafts vs published
    // or you otherwise show UI depending on draft status set this to false
    overlayDrafts: true,
    onPublicAccessOnly: () => alert('You are not logged in. You will only see public data.'),
};
