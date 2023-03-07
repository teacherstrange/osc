/**
 * Returns back a NodeList of focusable elements
 * that exist within the passed parent HTMLElement
 */
export const getFocusableElements = (parent: HTMLElement) => {
    if (!parent) {
        console.warn('You need to pass a parent HTMLElement');
        return [];
    }

    const focusableElements = [
        'a[href]',
        'area[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'iframe',
        'object',
        'embed',
        '*[tabindex]',
        '*[contenteditable]',
    ];

    const elements: NodeListOf<HTMLElement> = parent.querySelectorAll(focusableElements.join(','));

    // Return as an array rather than a nodelist so we can use all array properties
    return [...elements];
};
