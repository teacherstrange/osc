/**
 * Merges two event handlers into one. Useful for adding an event handler to a component with forwardRef
 * Shamelessly pulled from https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx#L1
 *
 * @param originalEventHandler - The original event handler to call.
 * @param ourEventHandler - Our event handler to call.
 * @param checkForDefaultPrevented - Whether to check if the default event was prevented.
 * @returns A function that handles the event by calling both original and our event handlers.
 */
export const mergeEventHandlers = <E>(
    originalEventHandler?: (event: E) => void,
    ourEventHandler?: (event: E) => void,
    { checkForDefaultPrevented = true } = {}
) => {
    return function handleEvent(event: E) {
        originalEventHandler?.(event);

        if (checkForDefaultPrevented === false || !(event as unknown as Event).defaultPrevented) {
            return ourEventHandler?.(event);
        }
    };
};
