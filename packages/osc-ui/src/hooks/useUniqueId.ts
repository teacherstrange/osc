import uniqueId from 'lodash.uniqueid';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
let isClient = false;

/**
 * Generate an SSR safe unique id.
 */
export const useUniqueId = (prefix: string) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to run this on mount
    const idRef = useMemo<string | undefined>(() => (isClient ? uniqueId(prefix) : undefined), []);
    const [id, setId] = useState<string>(idRef);

    useIsomorphicLayoutEffect(() => {
        if (id === undefined) {
            setId(uniqueId(prefix));
        }
    }, []);

    useEffect(() => {
        if (!isClient) {
            isClient = true;
        }
    }, []);

    return id;
};
