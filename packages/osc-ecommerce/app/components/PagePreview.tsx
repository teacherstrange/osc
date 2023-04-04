import type { UsePreview } from '@sanity/preview-kit';
import { definePreview } from '@sanity/preview-kit';
import { previewConfig } from '~/lib/sanity/config';
import type { PreviewProps } from '~/types/sanity';
import PageContent from './PageContent';

// Export as a default function so we can use with react.lazy
export default function PagePreview(props: Omit<PreviewProps, 'token'>) {
    const { query, params } = props;

    const data = usePreview(null, query, params);

    return <PageContent {...data[0]} />;
}

const usePreview: UsePreview = definePreview(previewConfig);
