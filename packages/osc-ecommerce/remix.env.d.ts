/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

interface DocumentEnv {
    readonly SANITY_STUDIO_CI: string;
    readonly SANITY_STUDIO_API_PROJECT_ID: string;
    readonly SANITY_STUDIO_API_DATASET: string;
}

interface Document {
    readonly env: DocumentEnv;
}
