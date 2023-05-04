import type { UsePreview } from '@sanity/preview-kit';
import { definePreview } from '@sanity/preview-kit';
import { previewConfig } from '~/lib/sanity/config';
import type { PreviewProps } from '~/types/sanity';
import type { PageContent, PageContentUpper } from './PageContent';

interface PagePreviewProps extends Omit<PreviewProps, 'token'> {
    /**
     * Component that holds the page data
     */
    Component: typeof PageContent | typeof PageContentUpper;
}

// Export as a default function so we can use with react.lazy
export default function PagePreview(props: PagePreviewProps) {
    const { query, params, Component } = props;

    const data = usePreview(null, query, params);

    return <Component {...data[0]} />;
}

const usePreview: UsePreview = definePreview(previewConfig);
