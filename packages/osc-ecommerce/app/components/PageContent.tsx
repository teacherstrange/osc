import type { module } from '~/types/sanity';
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
