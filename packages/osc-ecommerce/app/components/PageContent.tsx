import type { UsePreview } from '@sanity/preview-kit';
import { definePreview } from '@sanity/preview-kit';
import { previewConfig } from '~/lib/sanity/config';
import type { PreviewProps, module } from '~/types/sanity';
import Module from './Module';

export default function PageContent(props: { modules: module[] }) {
    const { modules } = props;

    return (
        <>
            {modules?.map((module: module) =>
                module ? <Module key={module?._key} module={module} /> : null
            )}
        </>
    );
}

export function PagePreview(props: Omit<PreviewProps, 'token'>) {
    const { query, params } = props;

    const data = usePreview(null, query, params);

    return <PageContent {...data[0]} />;
}

const usePreview: UsePreview = definePreview(previewConfig);
