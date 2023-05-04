/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />
/// <reference types="@remix-run/node" />
/// <reference types="@shopify/oxygen-workers-types" />

import type { Storefront } from '@shopify/hydrogen';

interface DocumentEnv {
    readonly SANITY_STUDIO_CI: string;
    readonly SANITY_STUDIO_API_PROJECT_ID: string;
    readonly SANITY_STUDIO_API_DATASET: string;
}

declare global {
    interface Document {
        readonly env: DocumentEnv;
    }
}

/**
 * Declare local additions to `AppLoadContext` to include the session utilities we injected in `server.ts`.
 */
declare module '@remix-run/node' {
    export interface AppLoadContext {
        session: HydrogenSession;
        storefront: Storefront;
        cache?: Cache;
    }
}
