import { visionTool } from '@sanity/vision';
import { defineConfig, isDev } from 'sanity';
import {
    cloudinaryAssetSourcePlugin,
    cloudinaryImageSource,
    cloudinarySchemaPlugin,
} from 'sanity-plugin-cloudinary';
import { deskTool } from 'sanity/desk';
import { LOCKED_DOCUMENT_IDS } from './constants';
import { getDefaultDocumentNode as defaultDocumentNode, structure } from './desk';
import { customDocumentActions } from './plugins/customDocumentActions';
import { schemaTypes } from './schemas/schema';

const devOnlyPlugins = [visionTool()];

export default defineConfig({
    name: 'default',
    title: 'Open Study College',

    projectId: process.env.SANITY_STUDIO_API_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_API_DATASET!,

    plugins: [
        deskTool({
            defaultDocumentNode,
            structure,
        }),
        cloudinaryAssetSourcePlugin(),
        cloudinarySchemaPlugin(),
        customDocumentActions(),
        ...(isDev ? devOnlyPlugins : []),
    ],

    document: {
        newDocumentOptions: (prev) => {
            // Hide locked documents from 'create new document' menu
            const filteredItems = prev.filter((previousItem) => {
                const locked = LOCKED_DOCUMENT_IDS.find((id) => id === previousItem.templateId);

                return previousItem.templateId !== locked;
            });

            return filteredItems;
        },
    },

    schema: {
        types: schemaTypes,
    },

    form: {
        image: {
            assetSources: () => {
                // only use cloudinary as an asset source
                return [cloudinaryImageSource];
            },
        },
    },
});
