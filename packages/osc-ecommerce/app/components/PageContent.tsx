import type { module } from '~/types/sanity';
import Module from './Module';

export function PageContent(props: { modules: module[] }) {
    const { modules } = props;

    return (
        <>
            {modules?.map((module: module) =>
                module ? <Module key={module?._key} module={module} /> : null
            )}
        </>
    );
}

export const PageContentUpper = (props: { upperContent: module[] }) => {
    const { upperContent } = props;

    return (
        <>
            {upperContent?.map((module: module) =>
                module ? <Module key={module?._key} module={module} isFlush /> : null
            )}
        </>
    );
};
