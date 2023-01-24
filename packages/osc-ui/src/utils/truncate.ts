/**
 * Truncate a string to a given length.
 */
export const truncate = (str: string, maxLength: number = 343) => {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3) + '[…]';
    }
    return str;
};
