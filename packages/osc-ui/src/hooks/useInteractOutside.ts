import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

/**
 * Triggers a callback when user clicks or interacts outside the target element
 */

const defaultEvents = ['mouseup', 'touchstart'];

export const useInteractOutside = <E extends Event = Event>(
    ref: RefObject<HTMLElement | null>,
    onClickAway: (event: E) => void,
    events: string[] = defaultEvents
) => {
    const savedCallback = useRef(onClickAway);

    useEffect(() => {
        savedCallback.current = onClickAway;
    }, [onClickAway]);

    useEffect(() => {
        const handler = (event) => {
            const { current: el } = ref;

            el && !el.contains(event.target) && savedCallback.current(event);
        };

        const keyboardHandler = (event) => {
            const { current: el } = ref;

            if (event.code === 'Space' || event.code === 'Enter') {
                el && !el.contains(event.target) && savedCallback.current(event);
            }
        };

        for (const eventName of events) {
            if (
                eventName.includes('keyup') ||
                eventName.includes('keydown') ||
                eventName.includes('keypress')
            ) {
                document.addEventListener(eventName, keyboardHandler);
            } else {
                document.addEventListener(eventName, handler);
            }
        }

        return () => {
            for (const eventName of events) {
                document.removeEventListener(eventName, handler);
                document.addEventListener(eventName, keyboardHandler);
            }
        };
    }, [events, ref]);
};
