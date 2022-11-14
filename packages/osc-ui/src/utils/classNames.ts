/**
 * Joins a list of classes together
 *
 * @param classes A comma separated list of classNames
 * @returns A string of classNames
 * @example classNames('c-badge', vairant, fontSizeClass, themeClass, className)
 */
export const classNames = (...classes: string[]) => {
    // Filter out falsy values such as empty spaces
    const classNames = classes
        .filter((className) => className)
        .join(' ')
        .trim();

    return classNames;
};
