import type { MouseEvent, RefObject } from 'react';
import type { TransformPattern } from '../types';

/**
 * Handle mouse move event by updating the transform property of all elements
 * matching the given CSS selector.
 *
 * @param e - The MouseEvent object containing information about the event.
 * @param container - A RefObject pointing to the container element containing the
 *                    elements to transform.
 * @param target - A CSS selector string identifying the elements to transform.
 * @param pattern - An optional array of objects representing the initial transform
 *                  properties of each element in the target list.
 */
export const translateNodes = (
    e: MouseEvent,
    container: RefObject<HTMLElement | null>,
    target: string,
    pattern?: TransformPattern[]
) => {
    const nodes: NodeListOf<HTMLElement> = container.current.querySelectorAll(target);

    if (nodes.length === 0) {
        console.warn(`No flourishes found matching selector: ${target}`);
        return;
    }

    // Store cursor position as variables
    let curX = e.clientX;
    let curY = e.clientY;

    nodes.forEach((node, i) => {
        node.style.transform = `
                ${pattern ? `rotate(${pattern[i].initial.rotate}deg)` : ''}
                translate(${curX / -80}px, ${curY / -80}px)
            `;
    });
};

/**
 * Rotate the specified target elements back to their initial position based on the provided pattern.
 *
 * @param container - A RefObject pointing to the container element containing the
 *                    elements to transform.
 * @param target - A CSS selector string identifying the elements to transform.
 * @param pattern - An optional array of objects representing the initial transform
 *                  properties of each element in the target list.
 */
export const restoreNodePosition = (
    container: RefObject<HTMLElement | null>,
    target: string,
    pattern?: TransformPattern[]
) => {
    const nodes: NodeListOf<HTMLElement> = container.current.querySelectorAll(target);

    if (nodes.length === 0) {
        console.warn(`No flourishes found matching selector: ${target}`);
        return;
    }

    nodes.forEach((node, i) => {
        node.style.transform = `${pattern ? `rotate(${pattern[i].initial.rotate}deg)` : ''}`;
    });
};
